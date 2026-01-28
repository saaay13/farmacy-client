import { Trash2, Minus, Plus, ShoppingCart, ShieldAlert } from "lucide-react";
import type { Product } from "../../../services/api";
import { Button, Card, Badge } from "../../atoms";

interface POSCartItem extends Product {
    cartQuantity: number;
    validatedPrescription: boolean;
}

interface POSSalePanelProps {
    items: POSCartItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onTogglePrescription: (id: string) => void;
    onCheckout: () => void;
    isProcessing: boolean;
}

export const POSSalePanel = ({
    items,
    onUpdateQuantity,
    onRemove,
    onTogglePrescription,
    onCheckout,
    isProcessing
}: POSSalePanelProps) => {
    const total = items.reduce((sum, item) => sum + (Number(item.precio) * item.cartQuantity), 0);
    const requiresPrescription = items.filter(i => i.requiereReceta);
    const missingPrescriptions = requiresPrescription.filter(i => !i.validatedPrescription);

    return (
        <Card className="h-full flex flex-col shadow-xl border-border/50 overflow-hidden bg-card/50 backdrop-blur-md">
            <div className="p-6 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground tracking-tight">Nueva Venta</h2>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Mostrador Actual</p>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <ShoppingCart className="w-8 h-8" />
                        </div>
                        <p className="font-bold text-lg">Carrito Vacío</p>
                        <p className="text-sm">Busca productos para comenzar la venta</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all group">
                            <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0">
                                    <p className="font-bold text-foreground truncate">{item.nombre}</p>
                                    <p className="text-xs font-black text-primary mt-0.5">${Number(item.precio).toFixed(2)} c/u</p>
                                </div>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="p-1.5 text-muted-foreground hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {item.requiereReceta && (
                                <div
                                    onClick={() => onTogglePrescription(item.id)}
                                    className={`mt-3 p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${item.validatedPrescription
                                        ? 'bg-success/10 border-success/30 text-success'
                                        : 'bg-error/5 border-error/20 text-error animate-pulse'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase">¿Receta Validada?</span>
                                    </div>
                                    <Badge variant={item.validatedPrescription ? 'success' : 'error'} className="py-0.5">
                                        {item.validatedPrescription ? 'SÍ' : 'PENDIENTE'}
                                    </Badge>
                                </div>
                            )}

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="p-1.5 hover:bg-card rounded-lg transition-colors text-muted-foreground"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center font-black text-sm">{item.cartQuantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="p-1.5 hover:bg-card rounded-lg transition-colors text-primary"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="font-black text-foreground text-lg">
                                    ${(Number(item.precio) * item.cartQuantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 bg-muted/30 border-t border-border space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground font-bold text-xs uppercase">
                        <span>Subtotal</span>
                        <span>${(total / 1.15).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold text-xs uppercase">
                        <span>IVA (15%)</span>
                        <span>${(total - (total / 1.15)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground font-black text-2xl pt-2 border-t border-border/50">
                        <span>TOTAL</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>

                <Button
                    variant="primary"
                    className="w-full h-14 rounded-2xl text-lg font-black shadow-lg shadow-primary/20"
                    disabled={items.length === 0 || missingPrescriptions.length > 0 || isProcessing}
                    onClick={onCheckout}
                >
                    {isProcessing ? (
                        <span className="flex items-center gap-2">
                            <Plus className="w-5 h-5 animate-spin" /> Procesando...
                        </span>
                    ) : (
                        'FINALIZAR VENTA'
                    )}
                </Button>

                {missingPrescriptions.length > 0 && (
                    <p className="text-[10px] text-error font-bold text-center animate-bounce">
                        ⚠️ FALTAN RECETAS POR VALIDAR
                    </p>
                )}
            </div>
        </Card>
    );
};
