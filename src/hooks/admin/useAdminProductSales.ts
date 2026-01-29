import { useState, useEffect, useCallback } from 'react';
import { fetchSalesByProductReport, type ProductSalesData } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function useAdminProductSales() {
    const [sales, setSales] = useState<ProductSalesData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const loadSales = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            const data = await fetchSalesByProductReport(token);
            setSales(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar ventas por producto');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadSales();
    }, [loadSales]);

    return { sales, loading, error, refresh: loadSales };
}
