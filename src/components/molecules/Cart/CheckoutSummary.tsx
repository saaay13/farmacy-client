import { ShoppingBag, Banknote } from "lucide-react";

interface CheckoutSummaryProps {
    itemCount: number;
    total: number;
}

export function CheckoutSummary({ itemCount, total }: CheckoutSummaryProps) {
    return (
        <div className="bg-muted/30 p-4 rounded-xl border border-border space-y-3">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                Resumen de Compra
            </h3>

            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Cantidad de productos:</span>
                <span className="font-medium text-foreground">{itemCount}</span>
            </div>

            <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="font-bold text-foreground">Total a Pagar:</span>
                <div className="flex items-center gap-1 text-primary font-bold text-xl">
                    <Banknote className="w-5 h-5" />
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
