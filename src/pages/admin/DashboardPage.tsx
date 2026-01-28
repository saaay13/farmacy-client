import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { TrendingUp, Users, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-black text-foreground mb-2">Dashboard Administrativo</h1>
                <p className="text-muted-foreground font-medium">Bienvenido al centro de control de Farmacy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Stats Cards Placeholder */}
                <StatCard title="Ventas del Día" value="$1,240.00" icon={TrendingUp} color="bg-primary" />
                <StatCard title="Clientes Nuevos" value="12" icon={Users} color="bg-info" />
                <StatCard title="Stock Bajo" value="5" icon={AlertTriangle} color="bg-warning" />
                <StatCard title="Alertas Viejas" value="2" icon={AlertTriangle} color="bg-error" />
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Actividad Reciente</h3>
                <div className="space-y-4">
                    <p className="text-muted-foreground italic">Cargando datos del servidor...</p>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`${color} p-3 rounded-2xl text-white shadow-lg shadow-current/10`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
            <p className="text-2xl font-black text-foreground">{value}</p>
        </div>
    );
}
