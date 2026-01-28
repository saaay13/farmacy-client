import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Pill } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../hooks/useCart";
import { ThemeToggle } from "../../atoms/Toggle/ThemeToggle";
import { UserMenu } from "../../molecules/Menu/UserMenu";
import type { User } from "../../../services/api";

const navLinks: Record<User['rol'], { to: string; label: string }[]> = {
    admin: [
        { to: "/admin/dashboard", label: "Panel de Control" },
        { to: "/admin/inventario", label: "Inventario" },
    ],
    farmaceutico: [
        { to: "/admin/dashboard", label: "Panel de Control" },
        { to: "/admin/inventario", label: "Inventario" },
    ],
    vendedor: [
        { to: "/admin/dashboard", label: "Panel de Control" },
    ],
    cliente: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
        { to: "/categorias", label: "Categorias" },
        { to: "/sucursales", label: "Sucursales" },
    ],
    guest: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
        { to: "/categorias", label: "Categorias" },
        { to: "/sucursales", label: "Sucursales" },
    ],
};

export function Header() {
    const { user, logout } = useAuth();
    const { toggleCart, cart } = useCart();
    const navigate = useNavigate();

    const role = user?.rol || 'guest';
    // Access links safely
    const links = navLinks[role] || navLinks['guest'];

    const isStaff = ['admin', 'farmaceutico', 'vendedor'].includes(role);

    useEffect(() => {
        if (isStaff && !window.location.pathname.startsWith('/admin')) {
            navigate('/admin/dashboard');
        }
    }, [isStaff, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                {/* Logo */}
                <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                        <Pill className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">Farmacy Siempre Vivo</span>
                </div>

                {/* Navigation Links - Centered */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-muted-foreground hover:text-primary font-medium transition-colors text-base hover:underline underline-offset-4"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {/* Botón Carrito - Solo para Clientes */}
                    {(role === 'cliente') && (
                        <button
                            onClick={toggleCart}
                            className="relative p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Abrir carrito"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cart.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    )}

                    <div className="h-6 w-px bg-border mx-1" />

                    {user ? (
                        <UserMenu
                            userName={user.nombre}
                            logout={handleLogout}
                        />
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                        >
                            <span>Iniciar Sesión</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
