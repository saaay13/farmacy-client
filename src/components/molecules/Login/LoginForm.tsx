import { useState, type FormEvent } from 'react';
import { Input, Button } from '../../atoms';
import { useAuth } from '../../../hooks/useAuth';

interface LoginFormProps {
    onSuccess?: () => void; // callback opcional para redirección
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const { doLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await doLogin({ email, password });
            if (onSuccess) onSuccess(); // Llama al callback si existe
        } catch (err: any) {
            setError(err.message || 'Credenciales inválidas');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <Input
                type="email"
                placeholder="ejemplo@farmacia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-error text-sm">{error}</p>}
            <Button type="submit" isLoading={isLoading} className="w-full md:w-auto">
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
        </form>

    );
};
