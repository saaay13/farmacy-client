import { useNavigate } from 'react-router-dom';
import { useBanch } from '../../hooks/useBanch';
import { Header, Footer } from '../../components/organisms';
import { Store, ArrowRight, Loader2 } from 'lucide-react';

export default function BanchPage() {
    const { banch, loading, error } = useBanch();
    const navigate = useNavigate();

    const handleSucursalClick = (sucursalId: string) => {
        navigate(`/productos?sucursal=${sucursalId}`);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-600 via-primary-600/95 to-primary-700 text-white py-16 md:py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Nuestras Sucursales
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto">
                            Encuentra la sucursal más cercana y consulta su disponibilidad de productos
                        </p>
                    </div>
                </section>

                {/* Sucursales Grid */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">

                        {loading && (
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="text-muted-foreground text-lg">Cargando sucursales...</p>
                            </div>
                        )}

                        {error && (
                            <div className="max-w-md mx-auto bg-error/5 border border-error/20 rounded-xl p-8 text-center">
                                <p className="text-error font-medium mb-4">❌ {error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-error text-error-foreground px-6 py-2 rounded-lg font-bold hover:bg-error/90 transition-all shadow-md hover:shadow-lg"
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}

                        {!loading && !error && banch.length === 0 && (
                            <div className="max-w-md mx-auto bg-white border border-border rounded-xl p-12 text-center shadow-sm">
                                <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Store className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    No hay sucursales disponibles
                                </h3>
                                <p className="text-muted-foreground">
                                    Por favor, intenta más tarde.
                                </p>
                            </div>
                        )}

                        {!loading && !error && banch.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {banch.map((banch) => (
                                    <div
                                        key={banch.idSucursal}
                                        onClick={() => handleSucursalClick(banch.idSucursal)}
                                        className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                                    >
                                        {/* Icon Header */}
                                        <div className="bg-gradient-to-br from-primary-100/50 to-white h-32 flex items-center justify-center">
                                            <div className="bg-primary-50 group-hover:bg-primary-600 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-110">
                                                <Store className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col text-center">
                                            <h3 className="font-bold text-foreground text-xl mb-2">
                                                {banch.nombre}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                                {banch.direccion}
                                            </p>

                                            <button className="w-full bg-primary-50 group-hover:bg-primary text-primary-900 group-hover:text-primary-foreground py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md">
                                                Ver Productos
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
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
