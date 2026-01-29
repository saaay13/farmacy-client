import { useState, useEffect, useCallback } from "react";
import { fetchCustomers, createUserAPI, updateUserAPI, deleteUserAPI, type User } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function useCustomers() {
    const { token } = useAuth();
    const [customers, setCustomers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCustomers = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCustomers(token);
            setCustomers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar clientes');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const addCustomer = async (data: Partial<User>) => {
        if (!token) return;
        try {
            await createUserAPI({ ...data, rol: 'cliente' }, token);
            await loadCustomers();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al guardar cliente' };
        }
    };

    const editCustomer = async (id: string, data: Partial<User>) => {
        if (!token) return;
        try {
            await updateUserAPI(id, data, token);
            await loadCustomers();
            return { success: true };
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al actualizar cliente' };
        }
    };

    const removeCustomer = async (id: string) => {
        if (!token) return;
        try {
            const result = await deleteUserAPI(id, token);
            if (result.success) {
                await loadCustomers();
            }
            return result;
        } catch (err) {
            return { success: false, message: err instanceof Error ? err.message : 'Error al eliminar cliente' };
        }
    };

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    return {
        customers,
        loading,
        error,
        refresh: loadCustomers,
        addCustomer,
        editCustomer,
        removeCustomer
    };
}
