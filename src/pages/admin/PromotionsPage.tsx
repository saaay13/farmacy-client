import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Tag, CheckCircle2, XCircle, Loader2, Calendar, Percent } from "lucide-react";
import { Card, Badge, Button } from "../../components/atoms";
import { usePromotions } from "../../hooks/admin/usePromotions";
import { useAuth } from "../../context/AuthContext";

export default function PromotionsPage() {
    const { promotions, loading, approvePromotion, removePromotion, refresh } = usePromotions();
    const { user } = useAuth();
    const isAdmin = user?.rol === 'admin';

    const handleApprove = async (id: string) => {
        if (window.confirm("¿Estás seguro de que deseas aprobar esta promoción? Esto cambiará el precio de venta del producto.")) {
            await approvePromotion(id);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Deseas eliminar esta promoción? Si está aprobada, el producto volverá a su precio normal.")) {
            await removePromotion(id);
        }
    };

    return (
        <AdminLayout title="Marketing & Promociones">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Gestión de Ofertas</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        Control de descuentos y campañas vigentes
                    </p>
                </div>
                {/* Gestión */}
                <div className="flex gap-3">
                    <Button variant="ghost" onClick={refresh} className="rounded-xl border border-border bg-card">
                        Sincronizar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center bg-card rounded-3xl border border-border">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground font-bold">Consultando historial de promociones...</p>
                    </div>
                ) : promotions.length > 0 ? (
                    promotions.map((promo) => (
                        <Card key={promo.id} className={`p-6 border-l-4 transition-all hover:shadow-md ${promo.aprobada ? 'border-l-success' : 'border-l-warning'}`}>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${promo.aprobada ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                        <Percent className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={promo.aprobada ? 'success' : 'warning'} className="uppercase text-[9px] font-black tracking-tighter">
                                                {promo.aprobada ? 'Activa' : 'Pendiente de Aprobación'}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(promo.fechaInicio).toLocaleDateString()} - {new Date(promo.fechaFin).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                                            {promo.porcentajeDescuento}% de Descuento
                                            <span className="text-muted-foreground text-sm font-medium">en</span>
                                            {promo.producto.nombre}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="text-sm font-bold text-muted-foreground line-through decoration-error/30">
                                                Normal: ${promo.producto.precio}
                                            </div>
                                            <div className="text-lg font-black text-primary">
                                                Oferta: ${(promo.producto.precio * (1 - promo.porcentajeDescuento / 100)).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    {!promo.aprobada && isAdmin && (
                                        <Button
                                            onClick={() => handleApprove(promo.id)}
                                            className="flex-1 md:flex-none rounded-xl bg-success hover:bg-success/90 shadow-lg shadow-success/20 font-bold"
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Aprobar
                                        </Button>
                                    )}
                                    {isAdmin && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleDelete(promo.id)}
                                            className="flex-1 md:flex-none rounded-xl text-muted-foreground hover:text-error hover:bg-error/10 font-bold"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Eliminar
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="py-20 text-center bg-card border-2 border-dashed border-border rounded-3xl">
                        <Tag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                        <h3 className="text-xl font-black mb-1">No hay promociones activas</h3>
                        <p className="text-muted-foreground font-medium">
                            Las sugerencias aparecerán automáticamente para productos próximos a vencer.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
