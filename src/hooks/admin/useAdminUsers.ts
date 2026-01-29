import { useState, useEffect, useCallback } from "react";
import { fetchUsers, deleteUserAPI, createUserAPI, updateUserAPI, restoreUserAPI } from "../../services/api";
import type { User } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function useAdminUsers() {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeactivated, setShowDeactivated] = useState(false);

    const loadUsers = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await fetchUsers(token, showDeactivated);
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    }, [token, showDeactivated]);

    const deleteUser = async (userId: string) => {
        if (!token) return;
        try {
            const result = await deleteUserAPI(userId, token);
            if (result.success) {
                await loadUsers();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo desactivar el usuario');
        }
    };

    const restoreUser = async (userId: string) => {
        if (!token) return;
        try {
            const result = await restoreUserAPI(userId, token);
            if (result.success) {
                await loadUsers();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo restaurar el usuario');
        }
    };

    const createUser = async (userData: Partial<User> & { password?: string }) => {
        if (!token) return;
        try {
            await createUserAPI(userData, token);
            await loadUsers();
            return { success: true };
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al crear usuario';
            setError(message);
            return { success: false, message };
        }
    };

    const updateUser = async (userId: string, userData: Partial<User>) => {
        if (!token) return;
        try {
            await updateUserAPI(userId, userData, token);
            await loadUsers();
            return { success: true };
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al actualizar usuario';
            setError(message);
            return { success: false, message };
        }
    };

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return {
        users,
        loading,
        error,
        showDeactivated,
        setShowDeactivated,
        refresh: loadUsers,
        deleteUser,
        restoreUser,
        createUser,
        updateUser
    };
}
