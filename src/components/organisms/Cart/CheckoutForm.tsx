import { useState } from "react";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { CheckoutSummary } from "../../molecules";

interface CheckoutFormProps {
    total: number;
    itemCount: number;
    onCancel: () => void;
    onSubmit: (formData: any) => Promise<void>;
    isProcessing: boolean;
}

export function CheckoutForm({ total, itemCount, onCancel, onSubmit, isProcessing }: CheckoutFormProps) {
    const [formData, setFormData] = useState({
        direccion: "",
        metodoPago: "efectivo",
        notas: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-300 text-foreground">
            {/* Header del Formulario */}
            <div className="flex items-center gap-2 p-6 border-b border-border bg-background">
                <button
                    onClick={onCancel}
                    className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
                    type="button"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold text-foreground">Datos de Entrega</h2>
            </div>

            {/* Contenido Scrollable */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">

                <CheckoutSummary itemCount={itemCount} total={total} />

                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Dirección de Entrega</label>
                        <input
                            type="text"
                            required
                            placeholder="Ej: Av. Principal 123"
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                            value={formData.direccion}
                            onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2 ">
                        <label className="text-sm font-medium text-foreground">Método de Pago</label>
                        <select
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            value={formData.metodoPago}
                            onChange={e => setFormData({ ...formData, metodoPago: e.target.value })}
                        >
                            <option value="efectivo">Efectivo contra entrega</option>
                            <option value="tarjeta">Tarjeta (POS contra entrega)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Notas Adicionales</label>
                        <textarea
                            placeholder="Instrucciones especiales..."
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[80px]"
                            value={formData.notas}
                            onChange={e => setFormData({ ...formData, notas: e.target.value })}
                        />
                    </div>
                </form>
            </div>

            {/* Footer con Acciones */}
            <div className="p-6 border-t border-border bg-muted/10">
                <button
                    type="submit"
                    form="checkout-form"
                    disabled={isProcessing}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-600 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Procesando...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Confirmar Pedido
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
