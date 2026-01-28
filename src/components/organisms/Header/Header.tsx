import { Link } from "react-router-dom"
import { Pill, LayoutGrid, ShoppingCart } from "lucide-react"
import { useAuth } from "../../../context/AuthContext"
import { ThemeToggle } from "../../../components/atoms"
import type { User } from "../../../services/api"
import { UserMenu } from "../../molecules"

interface HeaderProps {
    categoryCount?: number
}

const navLinks: Record<User['rol'], { to: string; label: string }[]> = {
    admin: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
        { to: "/categorias", label: "Categorias" },
        { to: "/sucursales", label: "Sucursales" },
        { to: "/usuarios", label: "Usuarios" },
    ],
    farmaceutico: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
        { to: "/categorias", label: "Categorias" },
    ],
    vendedor: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
    ],
    cliente: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
    ],
    guest: [
        { to: "/", label: "Inicio" },
        { to: "/categorias", label: "Categorias" },
        { to: "/productos", label: "Productos" },
        { to: "/sucursales", label: "Sucursales" },
    ],
}

export default function Header({ categoryCount = 0 }: HeaderProps) {
    const { user, isAuthenticated, logout, role } = useAuth()
    const linksToRender = navLinks[isAuthenticated ? role : 'guest']
    const isCliente = user?.rol === "cliente"; // <-- Solo clientes pueden ver carrito

    return (
        <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors"
                    >
                        <Pill className="w-6 h-6 text-primary" />
                        <span>Farmacy Siempre Vivo</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <ThemeToggle />

                        {linksToRender.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-foreground hover:text-primary font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated && user && (
                            <UserMenu
                                userName={user.nombre}
                                logout={logout}
                                categoryCount={categoryCount}
                            />
                        )}

                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                className="relative flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                <LayoutGrid className="w-5 h-5" />
                                <span>Iniciar Sesión</span>
                                {categoryCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-error text-error-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                        {categoryCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Carrito solo para cliente */}
                        {isCliente && (
                            <button
                                className="relative p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary-500 transition-all"
                                title="Ver carrito"
                            >
                                <ShoppingCart className="w-6 h-6 text-primary-foreground" />

                                <span className="absolute -top-1 -right-1 bg-error text-error-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    1
                                </span>
                            </button>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-foreground hover:text-primary">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
