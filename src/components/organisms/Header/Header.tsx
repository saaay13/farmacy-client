import { Link } from "react-router-dom";
import { Pill, LayoutGrid } from "lucide-react";

interface HeaderProps {
    categoryCount?: number;
}

export default function Header({ categoryCount = 0 }: HeaderProps) {
    return (
        <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors">
                        <Pill className="w-6 h-6 text-primary" />
                        <span>Farmacy Siempre Vivo</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-foreground hover:text-primary font-medium transition-colors"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/productos"
                            className="text-foreground hover:text-primary font-medium transition-colors"
                        >
                            Productos
                        </Link>
                        <Link
                            to="/categorias"
                            className="text-foreground hover:text-primary font-medium transition-colors"
                        >
                            Categorias
                        </Link>
                        <Link
                            to="/iniciarsesion"
                            className="relative flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary-700 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <LayoutGrid className="w-5 h-5" />
                            <span>Iniciar Sesion</span>
                            {categoryCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-error text-error-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                    {categoryCount}
                                </span>
                            )}
                        </Link>
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
    );
}
