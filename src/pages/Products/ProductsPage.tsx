import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";
import { Filter, X, ChevronRight, Pill } from "lucide-react";
import type { Product, Category } from "../../services/api";

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, loading: productsLoading, error: productsError } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();

    const activeCategory = searchParams.get("categoria");

    // Filtrar productos por categoría
    const filteredProducts = activeCategory
        ? products.filter((p) => p.idCategoria === activeCategory)
        : products;

    const handleCategoryChange = (id: string | null) => {
        if (id) {
            setSearchParams({ categoria: id });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 via-primary-600/95 to-primary-700 text-white py-16 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Nuestros Productos
                    </h1>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Descubre nuestra amplia gama de productos farmacéuticos organizados por categoría
                    </p>
                </div>
            </section>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filtros */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl border border-border p-6 sticky top-24 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" />
                                    Filtros
                                </h3>
                                {activeCategory && (
                                    <button
                                        onClick={() => handleCategoryChange(null)}
                                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                                    >
                                        Limpiar <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-4 text-foreground/70 uppercase tracking-wider">
                                    Categorías
                                </h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleCategoryChange(null)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!activeCategory
                                            ? "bg-primary text-primary-foreground font-bold shadow-md"
                                            : "hover:bg-primary-50 text-muted-foreground"
                                            }`}
                                    >
                                        Todas las Categorías
                                    </button>
                                    {categoriesLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="h-9 bg-neutral-100 animate-pulse rounded-lg" />
                                        ))
                                    ) : (
                                        categories.map((category: Category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => handleCategoryChange(category.id)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${activeCategory === category.id
                                                    ? "bg-primary text-primary-foreground font-bold shadow-md"
                                                    : "hover:bg-primary-50 text-foreground"
                                                    }`}
                                            >
                                                {category.nombre}
                                                <ChevronRight className={`w-3 h-3 transition-transform ${activeCategory === category.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Listado de Productos */}
                    <div className="flex-grow">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    {activeCategory
                                        ? categories.find(c => c.id === activeCategory)?.nombre || "Productos"
                                        : "Todos los Productos"}
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Mostrando {filteredProducts.length} productos encontrados
                                </p>
                            </div>
                        </div>

                        {productsLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="animate-pulse bg-white border border-border rounded-xl h-80 shadow-sm" />
                                ))}
                            </div>
                        ) : productsError ? (
                            <div className="bg-error/5 border border-error/20 rounded-xl p-8 text-center">
                                <p className="text-error font-medium">Error al cargar el catálogo: {productsError}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 text-sm font-bold text-error border-b border-error hover:border-b-2"
                                >
                                    Reintentar conexión
                                </button>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product: Product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full group"
                                    >
                                        <div className="bg-gradient-to-br from-primary-100/50 to-white h-48 flex items-center justify-center text-6xl relative">
                                            {product.requiereReceta ? "💊" : "🌿"}
                                            {product.requiereReceta && (
                                                <span className="absolute top-4 right-4 bg-error text-error-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                                                    RECETA MÉDICA
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-5 flex-grow flex flex-col">
                                            <div className="mb-1">
                                                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary-50 rounded-full uppercase tracking-tighter">
                                                    {categories.find(c => c.id === product.idCategoria)?.nombre || "Medicamento"}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                                                {product.nombre}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                                                {product.descripcion || "Sin descripción disponible."}
                                            </p>
                                            <div className="mt-auto flex justify-between items-center bg-neutral-50 -mx-5 -mb-5 p-5 border-t border-border">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-muted-foreground">Precio</span>
                                                    <span className="text-primary font-bold text-xl">
                                                        ${Number(product.precio).toFixed(2)}
                                                    </span>
                                                </div>
                                                <button className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform active:scale-95">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-border rounded-xl p-12 text-center shadow-sm">
                                <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Pill className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron productos</h3>
                                <p className="text-muted-foreground">Prueba seleccionando otra categoría o limpiando los filtros.</p>
                                <button
                                    onClick={() => handleCategoryChange(null)}
                                    className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition-all"
                                >
                                    Ver todo el catálogo
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
