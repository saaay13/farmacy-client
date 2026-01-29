import { useState, useEffect, useCallback } from "react";
import { fetchSalesReport, fetchStockReport, fetchExpiringReport, fetchExpiredReport, type SalesReport } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function useAdminStats() {
    const { token } = useAuth();
    const [salesReport, setSalesReport] = useState<SalesReport | null>(null);
    const [stockIssues, setStockIssues] = useState<any[]>([]);
    const [expiringCount, setExpiringCount] = useState(0);
    const [expiredCount, setExpiredCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStats = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const [sales, stock, expiring, expired] = await Promise.all([
                fetchSalesReport(token),
                fetchStockReport(token),
                fetchExpiringReport(token),
                fetchExpiredReport(token)
            ]);

            setSalesReport(sales);
            // Stock bajo
            setStockIssues(stock.filter(item => item.stockTotal < 10));
            setExpiringCount(expiring.length);
            setExpiredCount(expired.length);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    return {
        salesReport,
        stockIssues,
        expiringCount,
        expiredCount,
        loading,
        error,
        refresh: loadStats
    };
}
