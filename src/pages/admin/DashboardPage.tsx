import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import {
    Clock,
    AlertTriangle,
    TrendingUp,
    AlertCircle,
    ThumbsUp,
    ThumbsDown,
    Eye,
    Loader2,
    RefreshCw
} from "lucide-react";
import { StatCard } from "../../components/molecules";
import { Card, Badge, Alert, Button } from "../../components/atoms";
import { useAdminStats } from "../../hooks/admin/useAdminStats";
import { useAdminAlerts } from "../../hooks/admin/useAdminAlerts";

export default function DashboardPage() {
    const {
        salesReport,
        stockIssues,
        expiringCount,
        expiredCount,
        loading: statsLoading,
        refresh: refreshStats
    } = useAdminStats();

    const {
        alerts,
        loading: alertsLoading,
        runCheck
    } = useAdminAlerts();

    const loading = statsLoading || alertsLoading;

    // Solo tomamos las primeras 5 alertas para el dashboard
    const displayAlerts = alerts.slice(0, 5);

    return (
        <AdminLayout title="Dashboard">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1">Panel de Control</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${loading ? 'bg-warning animate-pulse' : 'bg-success'}`}></span>
                        {loading ? 'Actualizando datos...' : 'Sistema operativo • Resumen de hoy'}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { refreshStats(); runCheck(); }}
                    disabled={loading}
                    className="rounded-xl border border-border bg-card shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </Button>
            </div>

            {/* Métrica Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Próximos a Vencer"
                    value={expiringCount}
                    trend="Vista 60 días"
                    icon={Clock}
                    variant="warning"
                />
                <StatCard
                    title="Productos Vencidos"
                    value={expiredCount}
                    trend="Stock bloqueado"
                    icon={AlertTriangle}
                    variant="error"
                />
                <StatCard
                    title="Stock Bajo"
                    value={stockIssues.length}
                    trend="< 10 unidades"
                    icon={AlertCircle}
                    variant="info"
                />
                <StatCard
                    title="Ventas del Mes"
                    value={`$${salesReport?.summary.totalVendido.toLocaleString() || '0'}`}
                    trend={`${salesReport?.summary.cantidadTransacciones || 0} ventas`}
                    icon={TrendingUp}
                    variant="success"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel de Alertas Recientes */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-error" />
                                <h3 className="font-bold text-lg">Alertas Críticas</h3>
                            </div>
                            <Badge variant="error" className="animate-pulse">{alerts.length}</Badge>
                        </div>

                        {alertsLoading ? (
                            <div className="py-12 flex justify-center">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                        ) : alerts.length > 0 ? (
                            <div className="space-y-4">
                                {displayAlerts.map((alert) => (
                                    <Alert
                                        key={alert.id}
                                        variant={alert.tipo === 'expirado' ? 'error' : 'warning'}
                                        title={alert.tipo === 'expirado' ? 'Vencimiento' : 'Stock Bajo'}
                                        className="border-none shadow-sm bg-muted/30"
                                    >
                                        <p className="text-sm font-medium leading-relaxed">{alert.mensaje}</p>
                                        <p className="mt-2 text-[10px] uppercase font-bold tracking-wider opacity-60">
                                            {new Date(alert.fecha).toLocaleString()}
                                        </p>
                                    </Alert>
                                ))}
                                {alerts.length > 5 && (
                                    <Button variant="ghost" size="sm" className="w-full text-primary font-bold">
                                        Ver todas las alertas ({alerts.length})
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="py-12 text-center text-muted-foreground">
                                <p className="text-4xl mb-4">✅</p>
                                <p className="font-bold">Todo en orden</p>
                                <p className="text-xs">No hay alertas activas</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Listado de Productos más vendidos (Top Products) */}
                <div className="lg:col-span-2">
                    <Card className="p-6 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-lg">Productos con Mayor Demanda</h3>
                                <p className="text-sm text-muted-foreground">Top 5 productos más vendidos del mes</p>
                            </div>
                        </div>

                        {statsLoading ? (
                            <div className="py-20 flex justify-center">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            </div>
                        ) : salesReport?.topProducts && salesReport.topProducts.length > 0 ? (
                            <div className="space-y-4">
                                {salesReport.topProducts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary">
                                                #{index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base">{item.nombre}</h4>
                                                <p className="text-sm text-muted-foreground">Catálogo Maestro</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-black text-foreground">{item.cantidadVendida}</span>
                                            <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Unidades</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center text-muted-foreground">
                                <p className="text-4xl mb-4">📈</p>
                                <p className="font-bold">Sin datos de ventas</p>
                                <p className="text-xs">Las estadísticas aparecerán cuando se procesen ventas</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
