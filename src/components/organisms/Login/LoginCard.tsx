import { useNavigate, Link } from 'react-router-dom';
import { LoginForm } from '../../molecules';
import type { User } from '../../../services/api';

export const LoginCard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border/50">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
                    <span className="text-4xl text-primary-foreground">💊</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Iniciar Sesión</h2>
                <p className="text-sm text-muted-foreground">Ingrese sus credenciales para continuar</p>
            </div>

            {/* Formulario */}
            <LoginForm
                onSuccess={(user: User) => {
                    const staffRoles = ['admin', 'farmaceutico', 'vendedor'];
                    if (staffRoles.includes(user.rol)) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/');
                    }
                }}
            />

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground font-medium">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-primary hover:text-primary-700 font-black transition-colors">
                        Regístrate aquí
                    </Link>
                </p>
                <div className="mt-6 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    <p>© 2024 Store Farmacy</p>
                </div>
            </div>
        </div>
    );
};
