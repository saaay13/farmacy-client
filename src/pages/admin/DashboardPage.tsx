import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import {
    Clock,
    AlertTriangle,
    TrendingUp,
    AlertCircle,
    ThumbsUp,
    ThumbsDown,
    Eye
} from "lucide-react";
import { StatCard } from "../../components/molecules";
import { Card, Badge, Alert, Button } from "../../components/atoms";

export default function DashboardPage() {
    // Datos estáticos para simular (luego vendrán del backend)
    const alerts = [
        {
            id: "1",
            title: "Stock crítico",
            description: "Insulina Humana 100 UI está por debajo del mínimo requerido",
            severity: "error" as const,
            timestamp: "Hace 2 horas",
        },
        {
            id: "2",
            title: "Vencimiento próximo",
            description: "Paracetamol 500mg vence en 7 días (Lote: 2024-001)",
            severity: "warning" as const,
            timestamp: "Hace 1 hora",
        },
    ];

    const promotions = [
        {
            id: "1",
            product: "Vitamina C 1000mg",
            currentPrice: 45.99,
            suggestedPrice: 34.99,
            discount: 24,
            reason: "Próximo a vencer (15 días)",
            status: "pending",
            daysUntilExpiry: 15,
        },
        {
            id: "2",
            product: "Ibuprofeno 400mg",
            currentPrice: 28.99,
            suggestedPrice: 19.99,
            discount: 31,
            reason: "Stock alto (650 unidades)",
            status: "pending",
            daysUntilExpiry: 45,
        },
    ];

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-black text-foreground mb-1">Panel de Control</h1>
                <p className="text-muted-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    Sistema operativo • Resumen de hoy
                </p>
            </div>

            {/* Métrica Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Próximos a Vencer"
                    value={12}
                    trend="+2 esta semana"
                    icon={Clock}
                    variant="warning"
                />
                <StatCard
                    title="Productos Vencidos"
                    value={3}
                    trend="-1 esta semana"
                    icon={AlertTriangle}
                    variant="error"
                />
                <StatCard
                    title="Stock Bajo"
                    value={24}
                    trend="+5 esta semana"
                    icon={AlertCircle}
                    variant="info"
                />
                <StatCard
                    title="Ventas del Día"
                    value="$4,250"
                    trend="+12% vs ayer"
                    icon={TrendingUp}
                    variant="success"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel de Alertas Críticas */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <AlertTriangle className="w-5 h-5 text-error" />
                            <h3 className="font-bold text-lg">Alertas Críticas</h3>
                        </div>
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <Alert
                                    key={alert.id}
                                    variant={alert.severity}
                                    title={alert.title}
                                    className="border-none shadow-sm"
                                >
                                    {alert.description}
                                    <p className="mt-2 text-[10px] uppercase font-bold tracking-wider opacity-70">
                                        {alert.timestamp}
                                    </p>
                                </Alert>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Listado de Promociones Sugeridas */}
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-lg">Promociones Sugeridas</h3>
                                <p className="text-sm text-muted-foreground">Estrategias recomendadas para stock estancado</p>
                            </div>
                            <Badge variant="warning">{promotions.length} Pendientes</Badge>
                        </div>

                        <div className="space-y-4">
                            {promotions.map((promo) => (
                                <div
                                    key={promo.id}
                                    className="p-4 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-base">{promo.product}</h4>
                                                <Badge variant="warning">Pendiente</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {promo.reason} • <span className="font-medium text-error">{promo.daysUntilExpiry} días</span> restantes
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 bg-background/50 p-2 rounded-xl">
                                            <div className="text-right">
                                                <span className="block text-xs line-through text-muted-foreground">${promo.currentPrice}</span>
                                                <span className="block text-lg font-black text-success">${promo.suggestedPrice}</span>
                                            </div>
                                            <Badge variant="success" className="h-fit">-{promo.discount}%</Badge>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                                        <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                                            <ThumbsUp className="w-4 h-4 mr-2" />
                                            Aprobar
                                        </Button>
                                        <Button size="sm" variant="ghost" className="flex-1 text-error hover:bg-error/10 border-error/20">
                                            <ThumbsDown className="w-4 h-4 mr-2" />
                                            Rechazar
                                        </Button>
                                        <Button size="sm" variant="secondary" className="px-3">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
