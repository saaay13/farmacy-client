import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, type Product } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function useAdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchProducts(token || undefined);
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return { products, loading, error, refreshProducts: loadProducts };
}
