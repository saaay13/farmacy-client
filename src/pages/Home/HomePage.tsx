import { Link } from "react-router-dom";
import { Heart, Shield, Users, ArrowRight, ShoppingBag, Loader2, LayoutGrid } from "lucide-react";
import { Header, Footer } from "../../components/organisms";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import type { Product, Category } from "../../services/api";

export default function HomePage() {
    const { products, loading: productsLoading } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();

    const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];
    const featuredCategories = Array.isArray(categories) ? categories.slice(0, 6) : [];

    const services = [
        { icon: Heart, title: "Productos Verificados", description: "Garantía de calidad y seguridad." },
        { icon: Shield, title: "Estándares Sanitarios", description: "Cumplimos normativas de salud." },
        { icon: Users, title: "Asesoría Profesional", description: "Te ayudamos a elegir lo mejor." },
    ];

    return (
        <>
            <Header categoryCount={0} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary/95 to-primary text-primary-foreground py-16 md:py-24">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Tu Farmacia de Confianza
                        </h1>
                        <p className="text-lg text-primary-foreground/90 mb-8">
                            Medicamentos y suplementos de calidad, seleccionados cuidadosamente para tu bienestar.
                        </p>
                        <Link
                            to="/productos"
                            className="inline-flex items-center gap-2 bg-card text-primary hover:bg-muted px-8 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
                        >
                            Explorar Productos
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-9xl animate-pulse">💊</div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us / Servicios */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                        ¿Por qué elegirnos?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map(({ icon: Icon, title, description }, i) => (
                            <div key={i} className="text-center p-6 bg-muted rounded-xl shadow-sm">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                                <p className="text-muted-foreground text-sm">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">Explora por Categorías</h2>
                            <p className="text-muted-foreground">Encuentra lo que necesitas</p>
                        </div>
                        <Link to="/categorias" className="text-primary font-semibold hover:underline flex items-center gap-1">
                            Ver todas <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categoriesLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-muted rounded-xl h-32" />
                            ))
                        ) : (
                            featuredCategories.map((category: Category) => (
                                <Link
                                    key={category.id}
                                    to={`/productos?categoria=${category.id}`}
                                    className="group bg-card hover:bg-primary p-6 rounded-xl transition-all text-center border border-border flex flex-col items-center gap-3 shadow-sm hover:shadow-md"
                                >
                                    <div className="bg-muted group-hover:bg-primary-foreground p-3 rounded-full transition-colors">
                                        <LayoutGrid className="w-6 h-6 text-primary group-hover:text-primary" />
                                    </div>
                                    <span className="font-bold text-sm text-foreground group-hover:text-primary-foreground transition-colors">
                                        {category.nombre}
                                    </span>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                        Productos Destacados
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productsLoading ? (
                            <div className="col-span-full flex flex-col items-center py-12 gap-4">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                <p className="text-muted-foreground">Cargando productos...</p>
                            </div>
                        ) : (
                            featuredProducts.map((product: Product) => (
                                <div
                                    key={product.id}
                                    className="bg-card text-card-foreground rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <div className="bg-muted h-24 flex items-center justify-center text-4xl">
                                        {product.requiereReceta ? "💊" : "🌿"}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-sm mb-1">{product.nombre}</h3>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {product.descripcion?.substring(0, 60)}...
                                        </p>
                                        <div className="flex justify-between items-center pt-2 border-t border-border">
                                            <span className="text-primary font-bold text-sm">
                                                ${Number(product.precio).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/productos"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-8 py-3 rounded-lg font-bold shadow-md"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Ver Todos los Productos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
}
