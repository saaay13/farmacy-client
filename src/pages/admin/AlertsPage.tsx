import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import {
    AlertTriangle,
    Clock,
    AlertCircle,
    Trash2,
    RefreshCw,
    Loader2,
    Calendar,
    Search
} from "lucide-react";
import { Card, Badge, Button } from "../../components/atoms";
import { useAdminAlerts } from "../../hooks/admin/useAdminAlerts";
import { useState } from "react";

export default function AlertsPage() {
    const { alerts, loading, refresh, runCheck, deleteAlert } = useAdminAlerts();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAlerts = alerts.filter(alert =>
        alert.mensaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="Alertas de Sistema">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Alertas & Notificaciones</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-error" />
                        Supervisión automática de stock y vencimientos
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="ghost"
                        onClick={runCheck}
                        disabled={loading}
                        className="rounded-2xl border border-border bg-card shadow-sm"
                    >
                        < RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Forzar Chequeo
                    </Button>
                    <Button className="rounded-2xl shadow-lg shadow-primary/20">
                        Marcar todas como leídas
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Filtrar por mensaje o tipo de alerta..."
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary font-medium shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="py-20 text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground font-bold">Sincronizando con el servidor...</p>
                    </div>
                ) : filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                        <Card
                            key={alert.id}
                            className={`p-6 border-l-4 transition-all hover:translate-x-1 hover:shadow-md ${alert.tipo === 'expirado' ? 'border-l-error' : 'border-l-warning'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5 flex-1">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${alert.tipo === 'expirado' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                                        }`}>
                                        {alert.tipo === 'expirado' ? <Clock className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant={alert.tipo === 'expirado' ? 'error' : 'warning'} className="uppercase text-[10px] tracking-widest font-black">
                                                {alert.tipo}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(alert.fecha).toLocaleString()}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-black text-foreground">{alert.mensaje}</h4>
                                        <p className="text-sm text-muted-foreground font-medium mt-1">
                                            ID Producto: <span className="font-mono text-xs">{alert.idProducto}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <Button variant="ghost" size="sm" className="flex-1 md:flex-none h-11 px-6 rounded-xl hover:bg-muted/80">
                                        Ver Producto
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteAlert(alert.id)}
                                        className="h-11 w-11 rounded-xl text-muted-foreground hover:text-error hover:bg-error/10"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="py-20 text-center bg-card border-2 border-dashed border-border rounded-3xl">
                        <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
                            <AlertTriangle className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">No hay alertas activas</h3>
                        <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                            El sistema se encuentra monitoreando el stock y los vencimientos en tiempo real.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
