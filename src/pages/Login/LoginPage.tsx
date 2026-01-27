import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/atoms/Button/Button';
import { Input } from '../../components/atoms/Input/Input';

export const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulación de login para desarrollo
        try {
            setTimeout(() => {
                if (email === 'admin@farmacia.com' && password === 'admin123') {
                    login('fake-jwt-token', {
                        id: 'u-1',
                        nombre: 'Administrador Senior',
                        rol: 'admin',
                        email: email
                    });
                } else {
                    setError('Credenciales inválidas. Pruebe con admin@farmacia.com / admin123');
                }
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Error de conexión con el servidor');
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
            <div className="w-full max-w-md bg-card p-12 rounded-xl shadow-lg border border-border">
                <div className="text-center mb-12">
                    <span className="text-5xl block mb-4">💊</span>
                    <h1 className="text-2xl font-bold text-foreground mb-1">Bienvenido de nuevo</h1>
                    <p className="text-sm text-muted-foreground">Acceda a su panel de gestión farmacéutica</p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="ejemplo@farmacia.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="p-4 bg-error/10 border-l-4 border-error text-error text-[11px] rounded-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                        Iniciar Sesión
                    </Button>
                </form>

                <div className="mt-8 text-center text-[10px] text-muted-foreground">
                    <p>¿Problemas para acceder? <a href="#" className="text-primary font-medium hover:underline">Contacte a Soporte</a></p>
                </div>
            </div>
        </div>
    );
};
