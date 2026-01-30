import { useState, useMemo } from "react";
import { useAdminProducts } from "./useAdminProducts";
import { useBranch } from "../useBranch";
import { createProductAPI, updateProductAPI, deleteProductAPI, restoreProductAPI } from "../../services/api";
import type { Product } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function useInventory() {
    const { token } = useAuth();
    const [showDeactivated, setShowDeactivated] = useState(false);
    const [idSucursal, setIdSucursal] = useState<string>("");
    const { branches, loading: loadingBranches } = useBranch(false);

    const { products, loading, refreshProducts } = useAdminProducts(showDeactivated, idSucursal || undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.categoria?.nombre || "").toLowerCase().includes(searchTerm.toLowerCase())
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

    const openCreate = () => {
        setSelectedProduct(null);
        setIsProductModalOpen(true);
    };

    const openEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleSaveProduct = async (productData: any) => {
        if (!token) return { success: false, message: "No hay sesión activa" };
        try {
            if (selectedProduct) {
                await updateProductAPI(selectedProduct.id, productData, token);
            } else {
                await createProductAPI(productData, token);
            }
            await refreshProducts();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : "Error al guardar" };
        }
    };

    const handleDeleteProduct = async (product: Product) => {
        if (!token) return;
        if (window.confirm(`¿Estás seguro de que deseas desactivar ${product.nombre}?`)) {
            try {
                await deleteProductAPI(product.id, token);
                await refreshProducts();
            } catch (err) {
                alert(err instanceof Error ? err.message : "Error al eliminar");
            }
        }
    };

    const handleRestoreProduct = async (product: Product) => {
        if (!token) return;
        try {
            await restoreProductAPI(product.id, token);
            await refreshProducts();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error al restaurar");
        }
    };

    return {
        products,
        filteredProducts,
        loading,
        loadingBranches,
        searchTerm,
        setSearchTerm,
        idSucursal,
        setIdSucursal,
        branches,
        selectedProduct,
        showDeactivated,
        setShowDeactivated,
        modalStates: {
            isRestockOpen,
            isHistoryOpen,
            isProductModalOpen,
            setIsRestockOpen,
            setIsHistoryOpen,
            setIsProductModalOpen
        },
        handlers: {
            openRestock,
            openHistory,
            openCreate,
            openEdit,
            handleDeleteProduct,
            handleRestoreProduct,
            handleSaveProduct,
            refresh: refreshProducts
        }
    };
}
