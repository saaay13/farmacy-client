import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { ShieldAlert, Calendar, TrendingUp, Loader2, Package, User, AlertCircle } from "lucide-react";
import { Card, Badge, Button } from "../../components/atoms";
import { useBlockedAttempts, useBlockedAttemptsStats } from "../../hooks/admin/useBlockedAttempts";
import { useState } from "react";
import type { BlockedAttempt } from "../../types/blockedAttempts";

export default function BlockedAttemptsPage() {
    const [showStats, setShowStats] = useState(false);
    const [motivo, setMotivo] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [statsDays, setStatsDays] = useState(30);

    const { data: attemptsData, loading: attemptsLoading, error: attemptsError } = useBlockedAttempts({ motivo, desde, hasta });
    const { data: statsData, loading: statsLoading } = useBlockedAttemptsStats(statsDays);

    const motivoOptions = [
        { value: '', label: 'Todos los motivos' },
        { value: 'PRODUCTO_VENCIDO', label: 'Producto Vencido' },
        { value: 'REQUIERE_RECETA', label: 'Requiere Receta' },
        { value: 'STOCK_INSUFICIENTE', label: 'Stock Insuficiente' },
        { value: 'PRODUCTO_INACTIVO', label: 'Producto Inactivo' },
    ];

    const getMotivoVariant = (motivoStr: string): "default" | "success" | "warning" | "error" => {
        switch (motivoStr) {
            case 'PRODUCTO_VENCIDO': return 'error';
            case 'REQUIERE_RECETA': return 'warning';
            case 'STOCK_INSUFICIENTE': return 'warning';
            case 'PRODUCTO_INACTIVO': return 'default';
            default: return 'default';
        }
    };

    const getMotivoLabel = (motivoStr: string) => {
        switch (motivoStr) {
            case 'PRODUCTO_VENCIDO': return 'Producto Vencido';
            case 'REQUIERE_RECETA': return 'Requiere Receta';
            case 'STOCK_INSUFICIENTE': return 'Stock Insuficiente';
            case 'PRODUCTO_INACTIVO': return 'Producto Inactivo';
            default: return motivoStr;
        }
    };

    return (
        <AdminLayout title="Intentos Bloqueados">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Intentos Bloqueados</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-primary" />
                        Auditoría de intentos de venta bloqueados
                    </p>
                </div>
            </div>

            {/* Toggle View */}
            <div className="flex gap-2 mb-6">
                <Button
                    variant={!showStats ? "primary" : "secondary"}
                    onClick={() => setShowStats(false)}
                    className="rounded-2xl px-6 py-3 font-bold"
                >
                    📋 Lista de Intentos
                </Button>
                <Button
                    variant={showStats ? "primary" : "secondary"}
                    onClick={() => setShowStats(true)}
                    className="rounded-2xl px-6 py-3 font-bold"
                >
                    📊 Estadísticas
                </Button>
            </div>

            {!showStats ? (
                <>
                    {/* Filters */}
                    <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">
                                    Motivo
                                </label>
                                <select
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    className="w-full px-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                                >
                                    {motivoOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">
                                    Desde
                                </label>
                                <input
                                    type="date"
                                    value={desde}
                                    onChange={(e) => setDesde(e.target.value)}
                                    className="w-full px-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">
                                    Hasta
                                </label>
                                <input
                                    type="date"
                                    value={hasta}
                                    onChange={(e) => setHasta(e.target.value)}
                                    className="w-full px-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <Card className="rounded-3xl overflow-hidden border-border/50">
                        {attemptsLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center">
                                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                <p className="text-muted-foreground font-bold">Cargando intentos bloqueados...</p>
                            </div>
                        ) : attemptsError ? (
                            <div className="py-20 text-center">
                                <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
                                <p className="text-error font-bold">{attemptsError}</p>
                            </div>
                        ) : attemptsData && attemptsData.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-muted/30 border-b border-border">
                                            <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Fecha</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Motivo</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Producto</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Vendedor</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-center">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {attemptsData.data.map((attempt: BlockedAttempt) => (
                                            <tr key={attempt.id} className="group hover:bg-muted/10 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="w-3 h-3 text-muted-foreground" />
                                                        <span className="font-bold text-foreground">
                                                            {new Date(attempt.fecha).toLocaleDateString('es-ES')}
                                                        </span>
                                                        <span className="text-muted-foreground text-xs">
                                                            {new Date(attempt.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <Badge variant={getMotivoVariant(attempt.motivo)} className="text-[9px] uppercase font-black">
                                                        {getMotivoLabel(attempt.motivo)}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                            <Package className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-foreground">
                                                                {attempt.producto?.nombre || 'Producto Desconocido'}
                                                            </p>
                                                            {attempt.lote && (
                                                                <p className="text-[10px] uppercase font-bold text-muted-foreground">
                                                                    Lote: {attempt.lote.numeroLote}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-muted-foreground" />
                                                        <div>
                                                            <p className="font-bold text-foreground text-sm">
                                                                {attempt.vendedor?.nombre || 'Desconocido'}
                                                            </p>
                                                            {attempt.cliente && (
                                                                <p className="text-[10px] text-muted-foreground">
                                                                    Cliente: {attempt.cliente.nombre}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-lg font-black text-foreground">{attempt.cantidadIntento}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 text-center text-muted-foreground">
                                No se encontraron intentos bloqueados con los filtros seleccionados.
                            </div>
                        )}
                    </Card>
                </>
            ) : (
                <>
                    {/* Stats Period Selector */}
                    <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6">
                        <label className="block text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-2">
                            Período de análisis
                        </label>
                        <select
                            value={statsDays}
                            onChange={(e) => setStatsDays(Number(e.target.value))}
                            className="px-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                        >
                            <option value={7}>Últimos 7 días</option>
                            <option value={30}>Últimos 30 días</option>
                            <option value={60}>Últimos 60 días</option>
                            <option value={90}>Últimos 90 días</option>
                        </select>
                    </div>

                    {statsLoading ? (
                        <Card className="rounded-3xl overflow-hidden border-border/50">
                            <div className="py-20 flex flex-col items-center justify-center">
                                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                <p className="text-muted-foreground font-bold">Cargando estadísticas...</p>
                            </div>
                        </Card>
                    ) : statsData ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Total Card */}
                            <Card className="rounded-3xl p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                        <ShieldAlert className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Total Intentos</p>
                                        <p className="text-4xl font-black text-foreground">{statsData.data.totalIntentos}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground font-medium">En los últimos {statsDays} días</p>
                            </Card>

                            {/* By Reason */}
                            <Card className="rounded-3xl p-6 border-border/50">
                                <h3 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Por Motivo
                                </h3>
                                <div className="space-y-3">
                                    {statsData.data.porMotivo.map((item) => (
                                        <div key={item.motivo} className="flex items-center justify-between">
                                            <Badge variant={getMotivoVariant(item.motivo)} className="text-[9px] uppercase font-black">
                                                {getMotivoLabel(item.motivo)}
                                            </Badge>
                                            <div className="flex items-center gap-3 flex-1 ml-4">
                                                <div className="flex-1 bg-muted/30 rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all"
                                                        style={{ width: `${item.porcentaje}%` }}
                                                    />
                                                </div>
                                                <span className="font-black text-foreground text-sm w-20 text-right">
                                                    {item.cantidad} ({item.porcentaje}%)
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Top Sellers */}
                            <Card className="rounded-3xl p-6 border-border/50">
                                <h3 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Top Vendedores
                                </h3>
                                <div className="space-y-2">
                                    {statsData.data.topVendedores.map((vendedor, index) => (
                                        <div key={vendedor.email} className="flex items-center justify-between p-3 bg-muted/10 rounded-2xl hover:bg-muted/20 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary font-black text-sm">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-bold text-foreground text-sm">{vendedor.vendedor}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{vendedor.rol}</p>
                                                </div>
                                            </div>
                                            <span className="font-black text-primary text-lg">{vendedor.intentos}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Top Products */}
                            <Card className="rounded-3xl p-6 border-border/50">
                                <h3 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-primary" />
                                    Top Productos
                                </h3>
                                <div className="space-y-2">
                                    {statsData.data.topProductos.map((producto, index) => (
                                        <div key={producto.producto} className="flex items-center justify-between p-3 bg-muted/10 rounded-2xl hover:bg-muted/20 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary font-black text-sm">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-bold text-foreground text-sm">{producto.producto}</p>
                                                    {producto.requiereReceta && (
                                                        <Badge variant="warning" className="text-[8px] uppercase font-black mt-1">
                                                            Requiere Receta
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="font-black text-primary text-lg">{producto.intentos}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ) : null}
                </>
            )}
        </AdminLayout>
    );
}
