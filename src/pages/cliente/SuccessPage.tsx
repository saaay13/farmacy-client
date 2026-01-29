import { useNavigate, useLocation } from "react-router-dom";
import { Header, Footer } from "../../components/organisms";
import { CheckCircle2, ArrowRight, Package, Home, Receipt } from "lucide-react";

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener datos pasados desde el checkout
    const { total, orderId } = location.state || {};

    // Fallback por si alguien accede directamente
    const displayId = orderId ? `#${orderId.slice(-6).toUpperCase()}` : `#ORD-${Math.floor(Math.random() * 90000) + 10000}`;

    return (
        <div className="min-h-screen bg-muted/30 flex flex-col relative overflow-hidden">
            {/* Fondo */}
            <div className="absolute top-0 left-0 w-full h-[45vh] bg-primary shadow-lg shadow-primary/20 transform -skew-y-2 origin-top-right scale-110 z-0" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow container mx-auto px-4 py-20 flex items-center justify-center">
                    <div className="max-w-xl w-full text-center">
                        <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-border/50 p-10 md:p-16 animate-in zoom-in duration-700">

                            {/* Éxito */}
                            <div className="mb-8 flex justify-center">
                                <div className="bg-primary/10 p-5 rounded-full relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-25" />
                                    <CheckCircle2 className="w-16 h-16 text-primary relative z-10" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-extrabold text-primary mb-4">
                                ¡Pedido Confirmado!
                            </h1>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">
                                Tu orden ha sido procesada con éxito y el equipo de farmacia ya está preparando tus medicamentos.
                            </p>

                            {/* Total Pagado */}
                            {total !== undefined && (
                                <div className="mb-8 bg-muted/20 p-4 rounded-2xl border border-dashed border-primary/20 flex flex-col items-center justify-center">
                                    <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest mb-1">Total Pagado</span>
                                    <div className="text-4xl font-black text-foreground flex items-center gap-2">
                                        <Receipt className="w-6 h-6 text-primary opacity-50" />
                                        ${Number(total).toFixed(2)}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate("/productos")}
                                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 px-6 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                    Seguir Comprando
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center justify-center gap-2 bg-muted text-foreground py-4 px-6 rounded-2xl font-bold hover:bg-muted/80 transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                    <Home className="w-5 h-5" />
                                    Ir al Inicio
                                </button>
                            </div>

                            <div className="mt-12 pt-8 border-t border-dashed border-border flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Package className="w-4 h-4" />
                                    Entrega estimada: 30-60 min
                                </div>
                                <div className="h-1 w-1 rounded-full bg-border hidden md:block" />
                                <div className="text-muted-foreground font-medium">
                                    ID de pedido: <span className="text-foreground font-mono">{displayId}</span>
                                </div>
                            </div>
                        </div>

                        {/* Información */}
                        <p className="mt-8 text-primary-foreground/60 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                            Recibirás un correo electrónico con el resumen de tu compra en breve.
                        </p>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
