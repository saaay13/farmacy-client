import { useAuth } from '../../../context/AuthContext';

interface NavItemProps {
    label: string;
    icon: string;
    roles: string[];
}

const NAV_ITEMS: NavItemProps[] = [
    { label: 'Catálogo', icon: '🛍️', roles: ['admin', 'farmaceutico', 'vendedor', 'cliente', 'guest'] },
    { label: 'Vender (POS)', icon: '🛒', roles: ['admin', 'farmaceutico', 'vendedor'] },
    { label: 'Inventario', icon: '📦', roles: ['admin', 'farmaceutico'] },
    { label: 'Promociones', icon: '🏷️', roles: ['admin', 'farmaceutico', 'vendedor'] },
    { label: 'Logística', icon: '🚛', roles: ['admin', 'farmaceutico'] },
    { label: 'Reportes', icon: '📊', roles: ['admin'] },
    { label: 'Mis Compras', icon: '📜', roles: ['cliente'] },
];

export const Sidebar = () => {
    const { role } = useAuth();

    const filteredItems = NAV_ITEMS.filter(item => item.roles.includes(role));

    return (
        <aside className="w-60 bg-background border-r border-border flex flex-col h-[calc(100vh-64px)] sticky top-16 py-6">
            <div className="flex-1 flex flex-col gap-1 px-4">
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all text-muted-foreground font-medium hover:bg-accent hover:text-primary"
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-border text-center">
                <p className="text-[10px] text-muted-foreground opacity-60">v1.0.0-PRO</p>
            </div>
        </aside>
    );
};
