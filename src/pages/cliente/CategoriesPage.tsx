import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { Header, Footer } from '../../components/organisms';
import { LayoutGrid, ArrowRight, Loader2 } from 'lucide-react';

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories();
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId: string) => {
        navigate(`/productos?categoria=${categoryId}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary via-primary/95 to-primary text-primary-foreground py-16 md:py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Nuestras Categorías
                        </h1>
                        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                            Explora nuestra amplia gama de productos farmacéuticos organizados por categoría
                        </p>
                    </div>
                </section>

                {/* Categories Grid Section */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="text-muted-foreground text-lg">Cargando categorías...</p>
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

                        {!loading && !error && categories.length === 0 && (
                            <div className="max-w-md mx-auto bg-card border border-border rounded-xl p-12 text-center shadow-sm">
                                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <LayoutGrid className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">No hay categorías disponibles</h3>
                                <p className="text-muted-foreground">Por favor, intenta más tarde.</p>
                            </div>
                        )}

                        {!loading && !error && categories.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                                    >
                                        {/* Icon Header */}
                                        <div className="bg-gradient-to-br from-primary/50 to-card h-32 flex items-center justify-center relative">
                                            <div className="bg-primary-50 group-hover:bg-primary w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-110">
                                                <LayoutGrid className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="font-bold text-foreground text-xl mb-2 text-center">
                                                {category.nombre}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 text-center line-clamp-2 flex-grow">
                                                {category.descripcion || "Explora productos de esta categoría"}
                                            </p>

                                            {/* Button */}
                                            <button className="relative flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg font-medium transition-colors">
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
