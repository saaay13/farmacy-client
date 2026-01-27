import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import type { Product } from '../services/api';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar productos');
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return { products, loading, error };
}
