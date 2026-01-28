import {
    LayoutDashboard,
    Box,
    ShoppingCart,
    ClipboardList,
    AlertCircle,
    Users,
    LogOut,
    ChevronRight,
    Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ThemeToggle } from "../../atoms";

export function AdminSidebar() {
    const { logout, user } = useAuth();

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin/dashboard"
        },
        {
            title: "Punto de Venta",
            icon: ShoppingCart,
            path: "/admin/pos"
        },
        {
            title: "Inventario",
            icon: Box,
            path: "/admin/inventario"
        },
        {
            title: "Lotes",
            icon: ClipboardList,
            path: "/admin/lotes"
        },
        {
            title: "Alertas",
            icon: AlertCircle,
            path: "/admin/alertas",
            badge: 3 // Ejemplo de badge para alertas
        },
        {
            title: "Usuarios",
            icon: Users,
            path: "/admin/usuarios"
        }
    ];

    return (
        <aside className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 z-40">
            {/* Header / Logo */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                        <Box className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-black text-foreground tracking-tight leading-none">FARMACY SIEMPRE VIVO</h2>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Panel Control</span>
                    </div>
                </div>
            </div>

            {/* Menu Navigation */}
            <nav className="flex-grow p-4 mt-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="font-semibold text-sm">{item.title}</span>
                        </div>
                        {item.badge ? (
                            <span className="bg-error text-error-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        ) : (
                            <ChevronRight className={`w-4 h-4 opacity-0 transition-opacity group-hover:opacity-100`} />
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-border bg-muted/30">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                        {user?.nombre.charAt(0)}
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-bold text-foreground line-clamp-1">{user?.nombre}</p>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">{user?.rol}</p>
                    </div>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Settings className="w-4 h-4" />
                    </button>
                    <ThemeToggle />
                </div>


                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-all font-bold text-sm"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
