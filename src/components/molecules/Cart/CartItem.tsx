import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../../context/CartContext";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, qty: number) => void;
    onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="flex gap-4 py-4 border-b border-border last:border-0 group animate-in fade-in duration-300">
            {/* Imagen pequeña */}
            <div className="w-20 h-20 bg-muted/50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {item.requiereReceta ? "💊" : "🌿"}
            </div>

            {/* Detalles */}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-sm line-clamp-1" title={item.nombre}>
                        {item.nombre}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-foreground font-black text-base">
                            ${(Number(item.precio) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-muted-foreground text-xs font-medium">
                            (${Number(item.precio).toFixed(2)} c/u)
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-1">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background shadow-sm transition-colors text-muted-foreground hover:text-foreground"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background shadow-sm transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                        aria-label="Eliminar producto"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
