import { Trash2, Minus, Plus, ShoppingCart, ShieldAlert, User, Search, Percent, X } from "lucide-react";
import type { User as UserType } from "../../../services/api";
import { type POSCartItem } from "../../../hooks/admin/usePOS";
import { Button, Card, Badge, Input } from "../../atoms";
import { useCustomers } from "../../../hooks/admin/useCustomers";
import { useState } from "react";

interface POSSalePanelProps {
    items: POSCartItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onTogglePrescription: (id: string) => void;
    onCheckout: () => void;
    isProcessing: boolean;
    selectedCustomer: UserType | null;
    onSelectCustomer: (customer: UserType | null) => void;
}

export const POSSalePanel = ({
    items,
    onUpdateQuantity,
    onRemove,
    onTogglePrescription,
    onCheckout,
    isProcessing,
    selectedCustomer,
    onSelectCustomer
}: POSSalePanelProps) => {
    // Cálculo de totales
    const total = items.reduce((sum, item) => sum + (Number(item.precio) * item.cartQuantity), 0);
    // Cálculo de ahorro
    const totalSavings = items.reduce((sum, item) => {
        if (item.originalPrice && item.precio < item.originalPrice) {
            return sum + ((item.originalPrice - item.precio) * item.cartQuantity);
        }
        return sum;
    }, 0);

    const requiresPrescription = items.filter(i => i.requiereReceta);
    const missingPrescriptions = requiresPrescription.filter(i => !i.validatedPrescription);

    // Estado búsqueda
    const { customers } = useCustomers();
    const [customerSearch, setCustomerSearch] = useState("");
    const [showCustomerResults, setShowCustomerResults] = useState(false);

    const filteredCustomers = customerSearch.length > 1
        ? customers.filter(c => c.nombre.toLowerCase().includes(customerSearch.toLowerCase()) || c.email.toLowerCase().includes(customerSearch.toLowerCase()))
        : [];

    return (
        <Card className="h-full flex flex-col shadow-xl border-border/50 overflow-hidden bg-card/50 backdrop-blur-md">
            <div className="p-6 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground tracking-tight">Nueva Venta</h2>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Mostrador Actual</p>
                    </div>
                </div>

                {/* Cliente */}
                <div className="relative z-20">
                    {selectedCustomer ? (
                        <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {selectedCustomer.nombre.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">{selectedCustomer.nombre}</p>
                                    <p className="text-xs text-primary font-medium">Cliente Frecuente</p>
                                </div>
                            </div>
                            <button onClick={() => onSelectCustomer(null)} className="text-muted-foreground hover:text-error">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <Input
                                placeholder="Buscar cliente por nombre..."
                                value={customerSearch}
                                onChange={(e) => {
                                    setCustomerSearch(e.target.value);
                                    setShowCustomerResults(true);
                                }}
                                onFocus={() => setShowCustomerResults(true)}
                                className="pl-9 h-11 bg-background"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                            {showCustomerResults && customerSearch.length > 1 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl max-h-48 overflow-y-auto z-50">
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map(c => (
                                            <button
                                                key={c.id}
                                                className="w-full text-left p-3 hover:bg-muted text-sm flex items-center gap-2"
                                                onClick={() => {
                                                    onSelectCustomer(c);
                                                    setCustomerSearch("");
                                                    setShowCustomerResults(false);
                                                }}
                                            >
                                                <User className="w-3 h-3 text-muted-foreground" />
                                                <span className="font-medium text-foreground">{c.nombre}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-3 text-xs text-muted-foreground text-center">No se encontraron clientes</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3" onClick={() => setShowCustomerResults(false)}>
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
                        <div key={item.id} className={`p-4 bg-card border rounded-2xl transition-all group ${item.discountDetails ? 'border-primary/50 shadow-sm shadow-primary/5' : 'border-border hover:border-primary/30'}`}>
                            {item.discountDetails && (
                                <div className="flex items-center gap-1 mb-2 text-xs font-bold text-primary animate-pulse">
                                    <Percent className="w-3 h-3" />
                                    <span>Oferta Aplicada: -{item.discountDetails.percentage}%</span>
                                </div>
                            )}

                            <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0">
                                    <p className="font-bold text-foreground truncate">{item.nombre}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-xs font-black text-foreground">${Number(item.precio).toFixed(2)}</p>
                                        {item.originalPrice && item.precio < item.originalPrice && (
                                            <p className="text-[10px] text-muted-foreground line-through decoration-error/50">
                                                ${item.originalPrice.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
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

            <div className="p-6 bg-muted/30 border-t border-border space-y-4" onClick={() => setShowCustomerResults(false)}>
                <div className="space-y-2">
                    {totalSavings > 0 && (
                        <div className="flex justify-between text-success font-black text-xs uppercase animate-in slide-in-from-left">
                            <span>Ahorro Promocional</span>
                            <span>-${totalSavings.toFixed(2)}</span>
                        </div>
                    )}
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
