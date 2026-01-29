import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../../../hooks/useCart";
import { CartItem } from "../../molecules/Cart/CartItem";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import at the top
export function CartDrawer() {
    const { cart, isOpen, toggleCart, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    // Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end text-foreground">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-border">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-muted/10">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <ShoppingBag className="w-5 h-5 text-foreground" />
                        </div>
                        <h2 className="text-xl font-bold">Tu Carrito</h2>
                        <span className="bg-primary text-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                            {cart.length}
                        </span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-grow overflow-y-auto p-6 text-foreground">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-foreground text-center space-y-4">
                            <ShoppingBag className="w-16 h-16 opacity-20" />
                            <div>
                                <p className="font-medium text-lg">Tu carrito está vacío</p>
                                <p className="text-sm mt-1">¡Agrega algunos productos para comenzar!</p>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="text-primary font-bold hover:underline"
                            >
                                Volver al catálogo
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Resumen */}
                {cart.length > 0 && (
                    <div className="p-6 bg-muted/10 border-t border-border space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium">Productos ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                                <span className="font-bold">${total.toFixed(2)}</span>
                            </div>

                            {/* Promociones */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <p className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                                    ⚡ Descuentos promocionales
                                </p>
                                <p className="text-[10px] text-amber-600 mt-1 leading-relaxed">
                                    Los descuentos se aplicarán automáticamente al finalizar la compra según disponibilidad de stock promocional
                                </p>
                            </div>

                            <div className="flex justify-between items-center bg-primary/5 p-3 rounded-xl border border-primary/10">
                                <span className="text-lg font-extrabold text-foreground">Total Estimado</span>
                                <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>



                        <button
                            onClick={handleCheckout}
                            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Proceder al Pago
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
