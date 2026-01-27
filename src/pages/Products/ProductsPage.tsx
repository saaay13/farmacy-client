import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { Header, Footer } from "../../components/organisms/"
import { ChevronRight, Loader2 } from "lucide-react";

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
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <section className="bg-gradient-to-br from-primary-600 via-primary-600/95 to-primary-700 text-primary-foreground py-16 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Nuestros Productos
                    </h1>
                    <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                        Descubre nuestra amplia gama de productos farmacéuticos organizados por categoría
                    </p>
                </div>
            </section>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filtros */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-background rounded-xl border border-border p-6 sticky top-24 shadow-sm">
                            {/* Botón Todas las Categorías */}
                            <button
                                onClick={() => handleCategoryChange(null)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-2 transition-all ${!activeCategory
                                    ? "bg-primary text-primary-foreground font-bold shadow-md"
                                    : "hover:bg-primary-50 text-muted-foreground"
                                    }`}
                            >
                                Todas las Categorías
                            </button>

                            {/* Listado de Categorías */}
                            {categoriesLoading ? (
                                <div className="flex flex-col gap-2">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {categories.map((category: Category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryChange(category.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeCategory === category.id
                                                ? "bg-primary text-primary-foreground font-bold shadow-md"
                                                : "hover:bg-primary-50 text-muted-foreground"
                                                }`}
                                        >
                                            {category.nombre}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Listado de Productos */}
                    {/* Listado de Productos */}
                    <div className="flex-grow">
                        {productsError ? (
                            <div className="p-8 text-center text-red-600">
                                Ocurrió un error al cargar los productos.
                            </div>
                        ) : productsLoading ? (
                            <div className="col-span-full flex flex-col items-center py-12 gap-4">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                <p className="text-muted-foreground">Cargando productos...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product: Product) => (
                                    <div
                                        key={product.id}
                                        className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full group"
                                    >
                                        <div className="bg-gradient-to-br from-primary-100/50 to-background h-48 flex items-center justify-center text-6xl relative">
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
                                            <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                                                {product.descripcion || "Sin descripción disponible."}
                                            </p>
                                            <div className="mt-auto flex justify-between items-center bg-muted-background -mx-5 -mb-5 p-5 border-t border-border">
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
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>

    );
}
