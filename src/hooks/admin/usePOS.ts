import { useState, useCallback } from "react";
import { useAdminProducts } from "./useAdminProducts";
import { useAdminSales } from "./useAdminSales";
import { type Product, type SaleRequest, type User } from "../../services/api"; // Added User type import

export interface POSCartItem extends Product {
    cartQuantity: number;
    validatedPrescription: boolean;
    originalPrice?: number;
    discountDetails?: {
        percentage: number;
        promoId: string;
    };
}

export function usePOS() {
    const { products, refreshProducts } = useAdminProducts();
    const { executeSale, isProcessing, error: saleError, clearError: clearSaleError } = useAdminSales();

    const [cart, setCart] = useState<POSCartItem[]>([]);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Nuevo estado para gestión de clientes
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

    const getDiscountedPrice = useCallback((product: Product) => {
        // Al venir del backend, product.promociones ya está filtrado por activas y aprobadas
        const promo = product.promociones && product.promociones.length > 0 ? product.promociones[0] : null;

        if (promo) {
            return {
                finalPrice: Number(product.precio) * (1 - Number(promo.porcentajeDescuento) / 100),
                discount: Number(promo.porcentajeDescuento),
                promoId: promo.id
            };
        }
        return { finalPrice: Number(product.precio), discount: 0, promoId: null };
    }, []);

    const addToCart = useCallback((product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            const { finalPrice, discount, promoId } = getDiscountedPrice(product);

            // Si ya existe, actualizamos cantidad pero mantenemos lógica de precio (que podría cambiar si recarga, pero por ahora simple)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            }

            return [...prev, {
                ...product,
                // Sobreescribimos el precio visual con el precio final para que el total se calcule solo
                // pero guardamos el original por referencia
                precio: finalPrice,
                originalPrice: Number(product.precio),
                discountDetails: discount > 0 ? { percentage: discount, promoId: promoId! } : undefined,
                cartQuantity: 1,
                validatedPrescription: false
            }];
        });
        setSuccess(false);
        setLocalError(null);
        clearSaleError();
    }, [clearSaleError, getDiscountedPrice]);

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

        // Aquí podríamos enviar el ID del cliente si el backend lo soportara en SaleRequest 
        // (Sería un TODO para el backend: soportar idUsuario/idCliente en la venta)
        if (selectedCustomer) {
            (saleData as any).idCliente = selectedCustomer.id;
        }

        const result = await executeSale(saleData);
        if (result) {
            setCart([]);
            setSelectedCustomer(null);
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
        selectedCustomer,
        handlers: {
            addToCart,
            updateQuantity,
            removeFromCart,
            togglePrescription,
            checkout,
            setCustomer: setSelectedCustomer
        }
    };
}
