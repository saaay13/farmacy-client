import { useNavigate, Link } from 'react-router-dom';
import { RegisterForm } from '../../molecules';

export const RegisterCard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border/50 animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 shadow-lg">
                    <span className="text-4xl">🌱</span>
                </div>
                <h2 className="text-2xl font-black text-foreground mb-2">Únete a Nosotros</h2>
                <p className="text-sm text-muted-foreground font-medium">Crea tu cuenta de cliente en segundos</p>
            </div>

            {/* Formulario */}
            <RegisterForm
                onSuccess={() => {
                    navigate('/');
                }}
            />

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground font-medium">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-700 font-black transition-colors">
                        Inicia Sesión
                    </Link>
                </p>
                <div className="mt-6 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    <p>© 2024 Store Farmacy</p>
                </div>
            </div>
        </div>
    );
};
