import { useState } from "react";
import { X, Calendar, Hash, Package, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Button, Card, Badge } from "../../atoms";
import type { Product } from "../../../services/api";
import { useAdminBatches } from "../../../hooks/admin/useAdminBatches";

interface BatchHistoryModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onBatchChange: () => void;
}

export const BatchHistoryModal = ({ product, isOpen, onClose, onBatchChange }: BatchHistoryModalProps) => {
    const { batches, loading, deleteBatch, refreshBatches } = useAdminBatches(isOpen ? product.id : undefined);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (batchId: string) => {
        if (!window.confirm("¿Estás seguro de eliminar este lote? Esto descontará el stock automáticamente.")) return;

        setDeletingId(batchId);
        const success = await deleteBatch(batchId);
        if (success) {
            onBatchChange(); // Update parent inventory
        } else {
            alert("Error al eliminar el lote");
        }
        setDeletingId(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl shadow-2xl border-border/50 relative overflow-hidden flex flex-col max-h-[80vh]">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-foreground tracking-tight">Historial de Lotes</h2>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                            {product.nombre} • {product.id}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6">
                    {loading ? (
                        <div className="py-20 text-center">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                            <p className="text-muted-foreground font-bold">Cargando historial...</p>
                        </div>
                    ) : batches.length > 0 ? (
                        <div className="space-y-4">
                            {batches.map((batch) => {
                                const isExpiring = new Date(batch.fechaVencimiento) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
                                const isExpired = new Date(batch.fechaVencimiento) <= new Date();

                                return (
                                    <div
                                        key={batch.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isExpired ? 'bg-error/5 border-error/20' :
                                            isExpiring ? 'bg-warning/5 border-warning/20' :
                                                'bg-muted/30 border-border/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${isExpired ? 'bg-error/20 text-error' :
                                                isExpiring ? 'bg-warning/20 text-warning' :
                                                    'bg-primary/10 text-primary'
                                                }`}>
                                                <Hash className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-foreground">Lote: {batch.numeroLote}</p>
                                                    {isExpired ? (
                                                        <Badge variant="error" className="animate-pulse">VENCIDO</Badge>
                                                    ) : isExpiring && (
                                                        <Badge variant="warning">PRÓX. VENCER</Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 mt-1 text-xs font-medium text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(batch.fechaVencimiento).toLocaleDateString('es-ES', {
                                                            year: 'numeric', month: 'long', day: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Package className="w-3 h-3" />
                                                        {batch.cantidad} unidades
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(batch.id)}
                                            disabled={deletingId === batch.id}
                                            className="p-2 hover:bg-error/10 text-muted-foreground hover:text-error rounded-xl transition-all"
                                            title="Eliminar lote (Mermas)"
                                        >
                                            {deletingId === batch.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
                                <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Sin lotes registrados</h3>
                            <p className="text-sm text-muted-foreground mt-1 max-w-[250px] mx-auto">
                                Este producto no tiene existencias cargadas actualmente.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-border bg-muted/20">
                    <Button
                        variant="ghost"
                        className="w-full rounded-xl font-bold"
                        onClick={onClose}
                    >
                        Cerrar Historial
                    </Button>
                </div>
            </Card>
        </div>
    );
};
