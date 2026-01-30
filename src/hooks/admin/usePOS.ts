import { useState, useCallback, useMemo } from "react";
import { useAdminProducts } from "./useAdminProducts";
import { useAdminSales } from "./useAdminSales";
import { type Product, type SaleRequest, type User } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

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
    const { user } = useAuth();
    // Suponemos que useAdminProducts maneja correctamente el filtro por sucusal si se pasa idSucursal
    const { products, loading: productsLoading, error: productsError, refreshProducts } = useAdminProducts(false, user?.idSucursal);
    const { executeSale, isProcessing, error: saleError, clearError: clearSaleError } = useAdminSales();

    const [cart, setCart] = useState<POSCartItem[]>([]);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Clientes
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

    const getDiscountedPrice = useCallback((product: Product) => {
        // Promociones activas
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

            // Validar stock incluso al añadir por primera vez o repetir
            const stockDisponible = product.inventarios?.reduce((acc, inv) => acc + inv.stockTotal, 0) || 0;
            const currentQty = existing ? existing.cartQuantity : 0;

            if (currentQty + 1 > stockDisponible) {
                setLocalError(`Stock insuficiente para ${product.nombre}. Disponible: ${stockDisponible}`);
                return prev;
            }

            setLocalError(null);
            clearSaleError();

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            }

            return [...prev, {
                ...product,
                precio: finalPrice,
                originalPrice: Number(product.precio),
                discountDetails: discount > 0 ? { percentage: discount, promoId: promoId! } : undefined,
                cartQuantity: 1,
                validatedPrescription: false
            }];
        });
        setSuccess(false);
    }, [clearSaleError, getDiscountedPrice]);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.cartQuantity + delta);
                const totalStock = item.inventarios?.reduce((acc, inv) => acc + inv.stockTotal, 0) || 0;

                if (delta > 0 && totalStock < newQty) {
                    setLocalError(`No hay suficiente stock para ${item.nombre}`);
                    return item;
                }

                // Limpiar error si la actualización es válida
                setLocalError(null);
                return { ...item, cartQuantity: newQty };
            }
            return item;
        }));
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
        setLocalError(null);
    }, []);

    const togglePrescription = useCallback((id: string) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, validatedPrescription: !item.validatedPrescription } : item
        ));
    }, []);

    const checkout = async () => {
        if (cart.length === 0) {
            setLocalError("El carrito está vacío");
            return;
        }

        const saleData: SaleRequest = {
            idCliente: selectedCustomer?.id || null,
            detalles: cart.map(item => ({
                idProducto: item.id,
                cantidad: item.cartQuantity
            }))
        };

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
        loading: productsLoading || isProcessing,
        error: localError || saleError || productsError,
        success,
        selectedCustomer,
        handlers: {
            addToCart,
            updateQuantity,
            removeFromCart,
            togglePrescription,
            checkout,
            setCustomer: setSelectedCustomer,
            clearError: () => {
                setLocalError(null);
                clearSaleError();
            }
        }
    };
}
