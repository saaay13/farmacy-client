import { useState, useEffect, useCallback } from "react";
import { fetchAlerts, triggerAlertCheck, type Alert } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function useAdminAlerts() {
    const { token } = useAuth();
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAlerts = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await fetchAlerts(token);
            setAlerts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar alertas');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const runCheck = async () => {
        if (!token) return;
        try {
            await triggerAlertCheck(token);
            await loadAlerts();
        } catch (err) {
            console.error("Error running alert check:", err);
        }
    };

    useEffect(() => {
        loadAlerts();
    }, [loadAlerts]);

    return {
        alerts,
        loading,
        error,
        refresh: loadAlerts,
        runCheck
    };
}
