import { useState, useMemo } from "react";
import { useAdminProducts } from "./useAdminProducts";
import type { Product } from "../../services/api";

export function useInventory() {
    const { products, loading, refreshProducts } = useAdminProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.categoria?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const openRestock = (product: Product) => {
        setSelectedProduct(product);
        setIsRestockOpen(true);
    };

    const openHistory = (product: Product) => {
        setSelectedProduct(product);
        setIsHistoryOpen(true);
    };

    return {
        products,
        filteredProducts,
        loading,
        searchTerm,
        setSearchTerm,
        selectedProduct,
        modalStates: {
            isRestockOpen,
            isHistoryOpen,
            setIsRestockOpen,
            setIsHistoryOpen
        },
        handlers: {
            openRestock,
            openHistory,
            refresh: refreshProducts
        }
    };
}
