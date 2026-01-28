import { useState } from 'react';
import { createSale as apiCreateSale, type SaleRequest } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function useAdminSales() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const executeSale = async (saleData: SaleRequest) => {
        if (!token) {
            setError('No se encontró un token de sesión');
            return false;
        }

        setIsProcessing(true);
        setError(null);

        try {
            await apiCreateSale(saleData, token);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al procesar la venta');
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    return { executeSale, isProcessing, error, clearError: () => setError(null) };
}
