import { useState, useEffect, useCallback } from 'react';
import { fetchBranches, createBranchAPI, updateBranchAPI, deleteBranchAPI, restoreBranchAPI } from '../services/api';
import type { Branch } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function useBranch(includeDeactivated: boolean = false) {
    const { token } = useAuth();
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadBranches = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchBranches(token || undefined, includeDeactivated);
            setBranches(data);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al cargar sucursales'
            );
        } finally {
            setLoading(false);
        }
    }, [token, includeDeactivated]);

    useEffect(() => {
        loadBranches();
    }, [loadBranches]);

    const addBranch = async (branchData: Partial<Branch>) => {
        if (!token) return;
        try {
            await createBranchAPI(branchData, token);
            await loadBranches();
        } catch (err: any) {
            throw new Error(err.message || 'Error al crear sucursal');
        }
    };

    const updateBranch = async (id: string, branchData: Partial<Branch>) => {
        if (!token) return;
        try {
            await updateBranchAPI(id, branchData, token);
            await loadBranches();
        } catch (err: any) {
            throw new Error(err.message || 'Error al actualizar sucursal');
        }
    };

    const deleteBranch = async (id: string) => {
        if (!token) return;
        try {
            await deleteBranchAPI(id, token);
            await loadBranches();
        } catch (err: any) {
            throw new Error(err.message || 'Error al desactivar sucursal');
        }
    };

    const restoreBranch = async (id: string) => {
        if (!token) return;
        try {
            await restoreBranchAPI(id, token);
            await loadBranches();
        } catch (err: any) {
            throw new Error(err.message || 'Error al reactivar sucursal');
        }
    };

    return {
        branches,
        loading,
        error,
        refreshBranches: loadBranches,
        addBranch,
        updateBranch,
        deleteBranch,
        restoreBranch
    };
}
