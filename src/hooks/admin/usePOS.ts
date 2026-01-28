import { useState, useCallback } from "react";
import { useAdminProducts } from "./useAdminProducts";
import { useAdminSales } from "./useAdminSales";
import type { Product, SaleRequest } from "../../services/api";

export interface POSCartItem extends Product {
    cartQuantity: number;
    validatedPrescription: boolean;
}

export function usePOS() {
    const { products, refreshProducts } = useAdminProducts();
    const { executeSale, isProcessing, error: saleError, clearError: clearSaleError } = useAdminSales();

    const [cart, setCart] = useState<POSCartItem[]>([]);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const addToCart = useCallback((product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, cartQuantity: 1, validatedPrescription: false }];
        });
        setSuccess(false);
        setLocalError(null);
        clearSaleError();
    }, [clearSaleError]);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.cartQuantity + delta);
                if (delta > 0 && item.inventario && newQty > item.inventario.stockTotal) {
                    setLocalError(`No hay suficiente stock para ${item.nombre}`);
                    return item;
                }
                return { ...item, cartQuantity: newQty };
            }
            return item;
        }));
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const togglePrescription = useCallback((id: string) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, validatedPrescription: !item.validatedPrescription } : item
        ));
    }, []);

    const checkout = async () => {
        const saleData: SaleRequest = {
            detalles: cart.map(item => ({
                idProducto: item.id,
                cantidad: item.cartQuantity
            }))
        };

        const result = await executeSale(saleData);
        if (result) {
            setCart([]);
            setSuccess(true);
            refreshProducts();
            setTimeout(() => setSuccess(false), 5000);
        }
    };

    return {
        cart,
        products,
        loading: isProcessing,
        error: localError || saleError,
        success,
        handlers: {
            addToCart,
            updateQuantity,
            removeFromCart,
            togglePrescription,
            checkout
        }
    };
}
