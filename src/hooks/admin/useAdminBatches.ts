import { useState, useEffect, useCallback } from 'react';
import { fetchBatches, deleteBatch as apiDeleteBatch } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function useAdminBatches(productId?: string) {
    const [batches, setBatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const loadBatches = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchBatches(productId, token || undefined);
            setBatches(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar lotes');
        } finally {
            setLoading(false);
        }
    }, [productId, token]);

    const deleteBatch = async (batchId: string) => {
        if (!token) return;
        try {
            await apiDeleteBatch(batchId, token);
            await loadBatches();
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar lote');
            return false;
        }
    };

    useEffect(() => {
        loadBatches();
    }, [loadBatches]);

    return { batches, loading, error, refreshBatches: loadBatches, deleteBatch };
}
