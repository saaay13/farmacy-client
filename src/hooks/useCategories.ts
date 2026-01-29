import { useState, useEffect, useCallback } from 'react';
import { fetchCategories, createCategoryAPI, updateCategoryAPI, deleteCategoryAPI, restoreCategoryAPI } from '../services/api';
import type { Category } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeactivated, setShowDeactivated] = useState(false);
    const { token } = useAuth();

    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchCategories(showDeactivated);
            setCategories(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar categorías');
        } finally {
            setLoading(false);
        }
    }, [showDeactivated]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const createCategory = async (name: string) => {
        if (!token) return { success: false, message: 'No autenticado' };
        try {
            await createCategoryAPI(name, token);
            await refresh();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al crear categoría' };
        }
    };

    const updateCategory = async (id: string, name: string) => {
        if (!token) return { success: false, message: 'No autenticado' };
        try {
            await updateCategoryAPI(id, name, token);
            await refresh();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al actualizar categoría' };
        }
    };

    const deleteCategory = async (id: string) => {
        if (!token) return { success: false, message: 'No autenticado' };
        try {
            await deleteCategoryAPI(id, token);
            await refresh();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al eliminar categoría' };
        }
    };

    const restoreCategory = async (id: string) => {
        if (!token) return { success: false, message: 'No autenticado' };
        try {
            await restoreCategoryAPI(id, token);
            await refresh();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al restaurar categoría' };
        }
    };

    return {
        categories,
        loading,
        error,
        refresh,
        createCategory,
        updateCategory,
        deleteCategory,
        restoreCategory,
        showDeactivated,
        setShowDeactivated
    };
}
