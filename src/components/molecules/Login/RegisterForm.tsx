import { useState, useRef, type FormEvent } from 'react';
import { Input, Button } from '../../atoms';
import { useAuth } from '../../../hooks/useAuth';

interface RegisterFormProps {
    onSuccess?: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const { doRegister } = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('gato1.png');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);

    const avatars = [
        'gato1.png', 'gato2.png', 'gato3.png', 'gato4.png', 'gato5.png', 'gato6.png', 'gato7.png', 'gato8.png', 'gato9.png', 'gato10.png', 'gato11.png',
        'perro1.png', 'perro2.png', 'panda1.png', 'leon1.png', 'zorro1.png', 'mono1.png',
        'hamster1.png', 'hamster2.png', 'ave1.png', 'ave2.png', 'ave3.png', 'ave4.png',
        'caballo1.png', 'cebra1.png', 'cerdo1.png', 'chivo1.png', 'hipo1.png'
    ];

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
            setScrollProgress(progress);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await doRegister(nombre, email, password, `/img/avatar/${avatarUrl}`);
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.message || 'Error al completar el registro');
        } finally {
            setIsLoading(false);
        }
    };
    const ITEMS_PER_PAGE = 3;
    const currentIndex = avatars.indexOf(avatarUrl);
    const currentPage = Math.floor(currentIndex / ITEMS_PER_PAGE);
    const totalPages = Math.ceil(avatars.length / ITEMS_PER_PAGE);


    return (
        <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center w-full">
            {/* Avatar Selector Premium v2 */}
            {/* Avatar selector MINIMAL */}
            <div className="flex flex-col items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Elige tu avatar
                </span>

                <div className="flex items-center gap-6">
                    {avatars.slice(
                        Math.max(0, avatars.indexOf(avatarUrl) - 1),
                        avatars.indexOf(avatarUrl) + 2
                    ).map((av) => (
                        <button
                            key={av}
                            type="button"
                            onClick={() => setAvatarUrl(av)}
                            className={`transition-all duration-200
                    ${avatarUrl === av
                                    ? 'scale-125'
                                    : 'scale-90 opacity-60 hover:opacity-100'}
                `}
                        >
                            <img
                                src={`/img/avatar/${av}`}
                                alt="avatar"
                                className="w-14 h-14 rounded-full"
                            />
                        </button>
                    ))}
                </div>

                {/* Puntitos por página */}
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300
                ${currentPage === i
                                    ? 'w-6 bg-primary'
                                    : 'w-2 bg-muted-foreground/30'}
            `}
                        />
                    ))}
                </div>

            </div>


            <div className="w-full space-y-4">
                <Input
                    type="text"
                    placeholder="Nombre Completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
            </div>

            {error && <p className="text-error text-xs font-medium bg-error/10 px-4 py-2 rounded-lg w-full text-center">{error}</p>}

            <Button type="submit" isLoading={isLoading} className="w-full shadow-lg shadow-primary/20">
                {isLoading ? 'Registrando...' : 'Finalizar Registro'}
            </Button>
        </form>
    );
};
