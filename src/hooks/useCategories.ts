import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';
import type { Category } from '../services/api';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                const data = await fetchCategories();
                setCategories(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar categorías');
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    return { categories, loading, error };
}
