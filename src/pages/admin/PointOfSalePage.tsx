import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { POSProductSearch } from "../../components/molecules";
import { POSSalePanel } from "../../components/organisms";
import { usePOS } from "../../hooks/admin/usePOS";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function PointOfSalePage() {
    const { cart, error, success, loading, handlers, selectedCustomer } = usePOS();

    return (
        <AdminLayout title="Punto de Venta">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
                {/* Catálogo */}
                <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
                    <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h3 className="text-lg font-black text-primary mb-4 uppercase tracking-widest">Búsqueda de Productos</h3>
                        <POSProductSearch onSelect={handlers.addToCart} />
                    </div>

                    {error && (
                        <div className="p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-3 text-error animate-in fade-in zoom-in duration-200">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="p-12 bg-success/5 border border-success/20 rounded-3xl flex flex-col items-center justify-center gap-4 text-success animate-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div className="text-center">
                                <h4 className="text-2xl font-black">¡Venta Exitosa!</h4>
                                <p className="font-medium opacity-80 mt-1">El stock se ha actualizado correctamente.</p>
                            </div>
                        </div>
                    )}

                    {!success && cart.length === 0 && (
                        <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground/40 border-2 border-dashed border-muted rounded-3xl">
                            <p className="text-6xl mb-4">🛒</p>
                            <p className="font-black text-xl">Listo para vender</p>
                            <p className="text-sm font-medium">Usa el buscador para añadir productos</p>
                        </div>
                    )}
                </div>

                {/* Panel */}
                <div className="lg:col-span-1 h-full">
                    <POSSalePanel
                        items={cart}
                        onUpdateQuantity={handlers.updateQuantity}
                        onRemove={handlers.removeFromCart}
                        onTogglePrescription={handlers.togglePrescription}
                        onCheckout={handlers.checkout}
                        isProcessing={loading}
                        selectedCustomer={selectedCustomer}
                        onSelectCustomer={handlers.setCustomer}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
