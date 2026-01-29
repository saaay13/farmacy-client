import { useState, useEffect, useCallback } from "react";
import { fetchPromotions, createPromotionAPI, approvePromotionAPI, deletePromotionAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function usePromotions() {
    const { token } = useAuth();
    const [promotions, setPromotions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPromotions = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPromotions(token);
            setPromotions(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar promociones');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const createPromotion = async (data: any) => {
        if (!token) return;
        try {
            await createPromotionAPI(data, token);
            await loadPromotions();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al crear sugerencia' };
        }
    };

    const approvePromotion = async (id: string) => {
        if (!token) return;
        try {
            await approvePromotionAPI(id, token);
            await loadPromotions();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al aprobar' };
        }
    };

    const removePromotion = async (id: string) => {
        if (!token) return;
        try {
            await deletePromotionAPI(id, token);
            await loadPromotions();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al eliminar' };
        }
    };

    useEffect(() => {
        loadPromotions();
    }, [loadPromotions]);

    return {
        promotions,
        loading,
        error,
        refresh: loadPromotions,
        createPromotion,
        approvePromotion,
        removePromotion
    };
}
