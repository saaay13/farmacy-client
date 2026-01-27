import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/atoms/Button/Button';
import { Input } from '../../components/atoms/Input/Input';

export const LoginPage = () => {
    const { doLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await doLogin({ email, password });
            console.log('Usuario logueado:', user);
            navigate('/'); // Redirige al home después del login
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-100 px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo y título */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
                        <span className="text-4xl text-primary-foreground">💊</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Store Farmacy</h1>
                    <p className="text-muted-foreground">Sistema de Gestión Farmacéutica</p>
                </div>

                {/* Card de Login */}
                <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border/50">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-2">Iniciar Sesión</h2>
                        <p className="text-sm text-muted-foreground">Ingrese sus credenciales para continuar</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
                            <Input
                                type="email"
                                placeholder="ejemplo@farmacia.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Contraseña</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-error/10 border border-error/20 text-error text-sm rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span>⚠️</span>
                                    {error}
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full bg-primary hover:bg-primary-700 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                            ¿Olvidó su contraseña?{' '}
                            <a
                                href="#"
                                className="text-primary hover:text-primary-700 font-medium hover:underline transition-colors"
                            >
                                Recuperar acceso
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-xs text-muted-foreground">
                    <p>© 2024 Store Farmacy. Todos los derechos reservados.</p>
                    <p className="mt-1">
                        ¿Necesita ayuda?{' '}
                        <a href="#" className="text-primary hover:text-primary-700 font-medium hover:underline">
                            Contactar Soporte
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
