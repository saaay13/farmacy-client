import { useState, useEffect } from 'react';
import type { BlockedAttemptsResponse, BlockedAttemptsStatsResponse, BlockedAttemptsFilters } from '../../types/blockedAttempts';

const API_URL = 'http://localhost:3001/api';

export function useBlockedAttempts(filters?: BlockedAttemptsFilters) {
    const [data, setData] = useState<BlockedAttemptsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlockedAttempts = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            // Build query params
            const params = new URLSearchParams();
            if (filters?.motivo) params.append('motivo', filters.motivo);
            if (filters?.idVendedor) params.append('idVendedor', filters.idVendedor);
            if (filters?.desde) params.append('desde', filters.desde);
            if (filters?.hasta) params.append('hasta', filters.hasta);

            const queryString = params.toString();
            const url = `${API_URL}/blocked-attempts${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener intentos bloqueados');
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlockedAttempts();
    }, [filters?.motivo, filters?.idVendedor, filters?.desde, filters?.hasta]);

    return { data, loading, error, refetch: fetchBlockedAttempts };
}

export function useBlockedAttemptsStats(dias: number = 30) {
    const [data, setData] = useState<BlockedAttemptsStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`${API_URL}/blocked-attempts/stats?dias=${dias}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener estadísticas');
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [dias]);

    return { data, loading, error, refetch: fetchStats };
}

export function useRecentBlockedAttempts() {
    const [data, setData] = useState<BlockedAttemptsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecent = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`${API_URL}/blocked-attempts/recent`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener intentos recientes');
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecent();
    }, []);

    return { data, loading, error, refetch: fetchRecent };
}
