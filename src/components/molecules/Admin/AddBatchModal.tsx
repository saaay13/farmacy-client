import { useState, useEffect } from "react";
import { X, Save, Calendar, Hash, Package, Loader2 } from "lucide-react";
import { Button, Input, Card, Badge } from "../../atoms";
import { createBatch, fetchBanch, type Product, type Banch } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

interface AddBatchModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AddBatchModal = ({ product, isOpen, onClose, onSuccess }: AddBatchModalProps) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState<Banch[]>([]);
    const [formData, setFormData] = useState({
        numeroLote: "",
        fechaVencimiento: "",
        cantidad: 0,
        idSucursal: ""
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            const loadBranches = async () => {
                try {
                    const data = await fetchBanch();
                    setBranches(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, idSucursal: data[0].idSucursal }));
                    }
                } catch (err) {
                    console.error("Error loading branches:", err);
                }
            };
            loadBranches();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            await createBatch({
                idProducto: product.id,
                ...formData,
                cantidad: Number(formData.cantidad)
            }, token);
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Error al registrar el lote");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-md shadow-2xl border-border/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20">
                    <div className="h-full bg-primary animate-in slide-in-from-left duration-500" style={{ width: '100%' }}></div>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">Cargar Stock / Lote</h2>
                            <p className="text-sm text-muted-foreground font-medium mt-1">
                                {product.nombre}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Hash className="w-3.5 h-3.5" />
                                Número de Lote
                            </label>
                            <Input
                                placeholder="Ej: LT-2024-001"
                                required
                                value={formData.numeroLote}
                                onChange={(e) => setFormData({ ...formData, numeroLote: e.target.value })}
                                className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Vencimiento
                                </label>
                                <Input
                                    type="date"
                                    required
                                    value={formData.fechaVencimiento}
                                    onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                                    className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Package className="w-3.5 h-3.5" />
                                    Cantidad
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    required
                                    value={formData.cantidad || ""}
                                    onChange={(e) => setFormData({ ...formData, cantidad: Number(e.target.value) })}
                                    className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sucursal</label>
                            <select
                                className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                                value={formData.idSucursal}
                                onChange={(e) => setFormData({ ...formData, idSucursal: e.target.value })}
                                required
                            >
                                {branches.map(b => (
                                    <option key={b.idSucursal} value={b.idSucursal}>{b.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-medium">
                                {error}
                            </div>
                        )}

                        <div className="pt-4 flex gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1 rounded-xl font-bold"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-2 rounded-xl font-bold shadow-lg shadow-primary/20"
                                isLoading={loading}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Confirmar Ingreso
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};
