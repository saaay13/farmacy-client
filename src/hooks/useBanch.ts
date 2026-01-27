import { useState, useEffect } from 'react';
import { fetchBanch } from '../services/api';
import type { Banch } from '../services/api';

export function useBanch() {
    const [banch, setBanch] = useState<Banch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadBanch() {
            try {
                setLoading(true);
                const data = await fetchBanch();
                setBanch(data);
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
        }

        loadBanch();
    }, []);

    return { banch, loading, error };
}
