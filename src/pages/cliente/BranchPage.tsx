import { useNavigate } from 'react-router-dom';
import { useBranch } from '../../hooks/useBranch';
import { Header, Footer } from '../../components/organisms';
import { Store, ArrowRight, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button, Badge } from "../../components/atoms";

export default function BanchPage() {
    const { branches, loading, error } = useBranch();
    const navigate = useNavigate();

    const handleSucursalClick = (sucursalId: string) => {
        navigate(`/productos?sucursal=${sucursalId}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 bg-primary/5 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
                        <div className="max-w-3xl">
                            <Badge variant="default" className="mb-4">Red de Farmacias</Badge>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 text-foreground leading-tight">
                                Encuentra tu Sucursal <br />
                                <span className="text-primary">Más Cercana</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                                Estamos ubicados estratégicamente para estar siempre cerca de ti.
                                Consulta disponibilidad de productos y horarios de atención en tiempo real.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sucursales List */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                                <p className="text-muted-foreground font-medium">Localizando sucursales...</p>
                            </div>
                        )}

                        {error && (
                            <div className="max-w-md mx-auto bg-error/5 border border-error/20 rounded-2xl p-8 text-center">
                                <p className="text-error font-bold mb-4">No pudimos cargar las sucursales</p>
                                <Button variant="error" size="sm" onClick={() => window.location.reload()}>
                                    Reintentar conexión
                                </Button>
                            </div>
                        )}

                        {!loading && !error && branches.length > 0 && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                {branches.map((sucursal) => (
                                    <div
                                        key={sucursal.idSucursal}
                                        className="group bg-card rounded-3xl border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col md:flex-row"
                                    >
                                        {/* Image Placeholder / Map */}
                                        <div className="bg-muted w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                                                <Store className="w-16 h-16 text-primary/40" />
                                            </div>
                                            {/* Mock Map Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-xl text-center">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Ver en Mapa</p>
                                            </div>
                                        </div>

                                        {/* Info Content */}
                                        <div className="p-8 md:w-2/3 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-foreground mb-1">{sucursal.nombre}</h3>
                                                    <Badge variant="default" className="py-1">Abierto Ahora</Badge>
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-8 flex-grow">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                    <p className="font-medium leading-snug">{sucursal.direccion}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                                    <p className="font-medium hover:text-foreground transition-colors cursor-pointer">+591 600-0000</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                                    <p className="font-medium hover:text-foreground transition-colors cursor-pointer">contacto@{sucursal.nombre.toLowerCase().replace(/\s+/g, '')}.com</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Clock className="w-5 h-5 text-primary shrink-0" />
                                                    <p className="text-sm">Lun - Dom: 08:00 - 22:00</p>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-border flex gap-4">
                                                <Button
                                                    onClick={() => handleSucursalClick(sucursal.idSucursal)}
                                                    className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/20 group-hover:translate-y-[-2px] transition-transform"
                                                >
                                                    Ver Productos
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                                <Button variant="ghost" className="rounded-xl border border-border bg-transparent hover:bg-muted">
                                                    Cómo llegar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
