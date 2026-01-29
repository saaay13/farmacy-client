import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { ClipboardList, Search, Trash2, Calendar, Package, Hash, Loader2, Filter, RotateCcw } from "lucide-react";
import { Card, Badge, Button } from "../../components/atoms";
import { useAdminBatches } from "../../hooks/admin/useAdminBatches";
import { useState } from "react";

export default function BatchesPage() {
    const { batches, loading, deleteBatch, restoreBatch, showDeactivated, setShowDeactivated, refreshBatches } = useAdminBatches();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBatches = batches.filter(b =>
        b.numeroLote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.producto?.nombre || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string, numero: string) => {
        if (window.confirm(`¿Estás seguro de desactivar el lote ${numero}?`)) {
            await deleteBatch(id);
        }
    };

    const handleRestore = async (id: string, numero: string) => {
        if (window.confirm(`¿Estás seguro de reactivar el lote ${numero}?`)) {
            await restoreBatch(id);
        }
    };

    return (
        <AdminLayout title="Historial de Lotes">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Historial de Lotes</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-primary" />
                        Trazabilidad completa de ingresos de stock
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por lote o producto..."
                        className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeactivated(!showDeactivated)}
                        className={`rounded-2xl px-6 py-4 border-none font-bold transition-all shadow-sm ${showDeactivated ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {showDeactivated ? 'Ocultar Inactivos' : 'Ver Desactivados'}
                    </Button>
                    <Button variant="ghost" onClick={refreshBatches} className="rounded-xl border-none bg-muted/50 text-muted-foreground font-bold">
                        Actualizar
                    </Button>
                </div>
            </div>

            {/* Table */}
            <Card className="rounded-3xl overflow-hidden border-border/50">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground font-bold">Cargando trazabilidad de lotes...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Producto</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-center">Nº Lote</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-center">Vencimiento</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-center">Stock</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredBatches.length > 0 ? filteredBatches.map((batch) => (
                                    <tr key={batch.id} className={`group hover:bg-muted/10 transition-colors ${batch.activo === false ? 'opacity-60 bg-muted/5' : ''}`}>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{batch.producto?.nombre || 'Producto Desconocido'}</p>
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground">
                                                        {batch.activo === false ? 'LOTE INACTIVO' : 'Catálogo Maestro'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Hash className="w-3 h-3 text-muted-foreground" />
                                                <span className="font-mono font-bold text-sm">{batch.numeroLote}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                                                    <Calendar className="w-3 h-3 text-muted-foreground" />
                                                    {new Date(batch.fechaVencimiento).toLocaleDateString()}
                                                </div>
                                                {new Date(batch.fechaVencimiento) < new Date() ? (
                                                    <Badge variant="error" className="py-0 px-2 text-[9px] uppercase font-black animate-pulse">Vencido</Badge>
                                                ) : (
                                                    <Badge variant="success" className="py-0 px-2 text-[9px] uppercase font-black">Válido</Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-lg font-black text-foreground">{batch.cantidad}</span>
                                        </td>
                                        <td className="px-6 py-5 text-right flex justify-end gap-2">
                                            {batch.activo === false ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRestore(batch.id, batch.numeroLote)}
                                                    className="rounded-xl text-success hover:bg-success/10 transition-colors"
                                                    title="Reactivar"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(batch.id, batch.numeroLote)}
                                                    className="rounded-xl text-muted-foreground hover:text-error hover:bg-error/10 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground">
                                            No se encontraron lotes registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </AdminLayout>
    );
}
