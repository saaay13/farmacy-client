import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
    clientOnly?: boolean;
    requireAuth?: boolean;
}

export const ProtectedRoute = ({
    children,
    allowedRoles,
    clientOnly,
    requireAuth = true
}: ProtectedRouteProps) => {
    const { user, token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Verificando sesión...</p>
                </div>
            </div>
        );
    }

    const isStaff = user && ['admin', 'farmaceutico', 'vendedor'].includes(user.rol);

    // Usuarios Autenticados
    if (token && user) {
        // Si es una ruta "Solo Cliente" y el usuario es Staff -> Redirigir al Dashboard
        if (clientOnly && isStaff) {
            return <Navigate to="/admin/dashboard" replace />;
        }

        // Si se requieren roles específicos y no los tiene
        if (allowedRoles && !allowedRoles.includes(user.rol)) {
            return <Navigate to={isStaff ? "/admin/dashboard" : "/"} replace />;
        }

        return <>{children}</>;
    }

    // Invitados
    if (requireAuth) {
        // Si la ruta requiere autenticación, mandarlos al login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si no requiere autenticación y es invitado, permitir ver (ej: Home, Productos)
    return <>{children}</>;
};
