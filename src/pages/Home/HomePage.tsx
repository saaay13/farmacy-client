import { Header, Footer } from '../../components/organisms';
import { Link } from "react-router-dom";
import { Heart, Shield, Users, ArrowRight, Pill, ShoppingBag, Loader2, LayoutGrid } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import type { Product, Category } from "../../services/api";

export default function HomePage() {
    const { products, loading: productsLoading, error: productsError } = useProducts();
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

    // Tomar solo los primeros 4 para la sección destacados
    const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];
    const featuredCategories = Array.isArray(categories) ? categories.slice(0, 6) : [];

    return (
        <>
            <Header categoryCount={0} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 via-primary-600/95 to-primary-700 text-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Tu Farmacia de Confianza
                            </h1>
                            <p className="text-lg text-white/90 mb-8">
                                Medicamentos y suplementos de calidad, seleccionados cuidadosamente para tu bienestar. Siempre frescos, siempre seguros.
                            </p>
                            <Link
                                to="/productos"
                                className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-neutral-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
                            >
                                Explorar Productos
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="text-9xl animate-pulse">💊</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                        ¿Por qué elegirnos?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Productos Verificados
                            </h3>
                            <p className="text-muted-foreground">
                                Solo comercializamos medicamentos dentro de su fecha de vencimiento, nunca vencidos ni próximos a vencer.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Estándares Sanitarios
                            </h3>
                            <p className="text-muted-foreground">
                                Todos nuestros productos cumplen con los más altos estándares de calidad y regulaciones sanitarias.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Asesoría Profesional
                            </h3>
                            <p className="text-muted-foreground">
                                Nuestro equipo de farmacéuticos está disponible para brindarte asesoramiento experto.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">Explora por Categorías</h2>
                            <p className="text-muted-foreground">Encuentra lo que necesitas por tipo de producto</p>
                        </div>
                        <Link to="/categorias" className="text-primary font-semibold hover:underline flex items-center gap-1">
                            Ver todas <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categoriesLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-neutral-100 rounded-xl h-32" />
                            ))
                        ) : categoriesError ? (
                            <div className="col-span-full text-center py-4 text-error">{categoriesError}</div>
                        ) : featuredCategories.map((category: Category) => (
                            <Link
                                key={category.id}
                                to={`/productos?categoria=${category.id}`}
                                className="group bg-primary-50 hover:bg-primary-600 p-6 rounded-xl transition-all text-center border border-primary-100 hover:border-primary-600 flex flex-col items-center gap-3 shadow-sm hover:shadow-md"
                            >
                                <div className="bg-white group-hover:bg-primary-500 p-3 rounded-full transition-colors">
                                    <LayoutGrid className="w-6 h-6 text-primary group-hover:text-white" />
                                </div>
                                <span className="font-bold text-sm text-primary-900 group-hover:text-white transition-colors">
                                    {category.nombre}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gradient-to-br from-neutral-50 to-primary-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                        Productos Destacados
                    </h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Nuestros medicamentos y suplementos más solicitados, seleccionados para tu comodidad.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {productsLoading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 gap-4">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                <p className="text-muted-foreground">Cargando productos...</p>
                            </div>
                        ) : productsError ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-error font-medium">Error al cargar productos: {productsError}</p>
                            </div>
                        ) : (Array.isArray(featuredProducts) && featuredProducts.length > 0) ? (
                            featuredProducts.map((product: Product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                                >
                                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 h-24 flex items-center justify-center text-4xl">
                                        {product.requiereReceta ? "💊" : "🌿"}
                                    </div>
                                    <div className="p-4 flex-grow">
                                        <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">
                                            {product.nombre}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {product.descripcion?.substring(0, 60)}...
                                        </p>
                                        <div className="mt-auto flex justify-between items-center pt-2 border-t border-neutral-50">
                                            <span className="text-primary font-bold text-sm">
                                                ${Number(product.precio).toFixed(2)}
                                            </span>
                                            {product.requiereReceta && (
                                                <span className="text-[10px] bg-error/10 text-error px-1.5 py-0.5 rounded font-bold">
                                                    RECETA
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">No hay productos destacados en este momento.</p>
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/productos"
                            className="inline-flex items-center gap-2 bg-primary-600 text-primary-foreground hover:bg-primary-700 px-8 py-3 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Ver Todos los Productos
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                        Cómo Comprar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="bg-primary-600 text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="font-bold text-foreground mb-2">Explora</h3>
                            <p className="text-muted-foreground">
                                Navega nuestro catálogo de medicamentos y suplementos disponibles
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-600 text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="font-bold text-foreground mb-2">Selecciona</h3>
                            <p className="text-muted-foreground">
                                Elige los productos que necesitas y agrega al carrito
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-600 text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="font-bold text-foreground mb-2">Retira</h3>
                            <p className="text-muted-foreground">
                                Completa tu compra y retira en nuestra farmacia
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prescription Info Banner */}
            <section className="bg-primary-50 border-t border-b border-primary-200 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-start gap-4">
                        <Pill className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-primary-900 mb-2">
                                Medicamentos con Receta
                            </h3>
                            <p className="text-primary-800 text-sm mb-2">
                                Contamos con una amplia variedad de medicamentos que requieren receta médica. Pueden ver los disponibles en nuestro catálogo, pero el retiro debe realizarse en farmacia presentando una receta válida.
                            </p>
                            <Link
                                to="/productos"
                                className="inline-block text-primary-700 font-semibold hover:text-primary-900 underline text-sm"
                            >
                                Ver medicamentos con receta →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-primary-600/95 to-primary-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Listo para tu compra?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Encuentra todos los medicamentos y suplementos que necesitas en nuestro catálogo.
                    </p>
                    <Link
                        to="/productos"
                        className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-neutral-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
                    >
                        Ir a Productos
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
