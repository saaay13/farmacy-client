import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../context/AuthContext";
import { createSale } from "../../services/api";
import { Header, Footer, CheckoutForm } from "../../components/organisms";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);



    const handleCheckoutSubmit = async () => {
        if (!user || !token) {
            setError("Debes iniciar sesión para completar la compra.");
            // Opcional: Redirigir al login
            navigate("/login");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Construir payload para backend
            const saleRequest = {
                idCliente: user.rol === 'cliente' ? user.id : null,
                detalles: cart.map(item => ({
                    idProducto: item.id,
                    cantidad: item.quantity
                }))
            };

            const saleResult = await createSale(saleRequest, token);

            // Éxito
            clearCart();
            // Pasar el resultado real de la venta (con descuentos aplicados) a la página de éxito
            navigate("/success", {
                state: {
                    total: saleResult.data.total,
                    orderId: saleResult.data.id
                }
            });
        } catch (err: any) {
            setError(err.message || "Error al procesar la venta");
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) return null; // Evitar flash mientras redirige

    return (
        <div className="min-h-screen bg-muted/30 flex flex-col relative overflow-hidden">
            {/* Background Decor - The "Green Box" */}
            <div className="absolute top-0 left-0 w-full h-[45vh] bg-primary shadow-lg shadow-primary/20 transform -skew-y-2 origin-top-right scale-110 z-0" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">

                        {/* Header Content on Green */}
                        <div className="text-primary-foreground mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-primary-foreground/80 hover:text-white mb-6 transition-colors font-medium group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                Volver al catálogo
                            </button>

                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-4">
                                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-xl">
                                            <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                        </div>
                                        Finalizar Compra
                                    </h1>
                                    <p className="mt-4 text-primary-foreground/80 text-lg max-w-lg font-medium">
                                        Completa los detalles a continuación para procesar tu pedido de medicamentos de forma segura.
                                    </p>
                                </div>

                                {/* Status Steps - Decorative */}
                                <div className="hidden lg:flex items-center gap-8 mb-4">
                                    <div className="flex flex-col items-center gap-2 opacity-50">
                                        <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center font-bold">1</div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Carrito</span>
                                    </div>
                                    <div className="w-12 h-0.5 bg-white/20" />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center font-extrabold shadow-xl">2</div>
                                        <span className="text-xs font-black uppercase tracking-wider">Pago</span>
                                    </div>
                                    <div className="w-12 h-0.5 bg-white/20" />
                                    <div className="flex flex-col items-center gap-2 opacity-50">
                                        <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center font-bold">3</div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Listo</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-white border-l-4 border-error text-error p-6 rounded-2xl mb-8 flex items-center gap-4 shadow-2xl animate-in shake">
                                <div className="bg-error/10 p-2 rounded-full">
                                    <span className="text-xl">⚠️</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg leading-none">Atención</p>
                                    <p className="font-medium mt-1 opacity-80">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-background rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-border/50 overflow-hidden backdrop-blur-sm animate-in slide-in-from-bottom-8 duration-1000">
                            <div className="h-full md:h-auto">
                                <CheckoutForm
                                    total={total}
                                    itemCount={cart.length}
                                    onCancel={() => navigate(-1)}
                                    onSubmit={handleCheckoutSubmit}
                                    isProcessing={isProcessing}
                                />
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <span className="p-1 px-2 border-2 border-muted-foreground rounded italic">SSL</span>
                                Secure Transaction
                            </div>
                            <div className="h-4 w-px bg-border" />
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                🛡️ Verified Pharmacy
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
