import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../molecules';

export const LoginCard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border/50">
            {/* Header con logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
                    <span className="text-4xl text-primary-foreground">💊</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Iniciar Sesión</h2>
                <p className="text-sm text-muted-foreground">Ingrese sus credenciales para continuar</p>
            </div>

            {/* Molecule: LoginForm */}
            <LoginForm onSuccess={() => navigate('/')} />

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>© 2024 Store Farmacy. Todos los derechos reservados.</p>
                <p className="mt-1">
                    ¿Necesita ayuda?{' '}
                    <a href="#" className="text-primary hover:text-primary-700 font-medium hover:underline">
                        Contactar Soporte
                    </a>
                </p>
            </div>
        </div>
    );
};
