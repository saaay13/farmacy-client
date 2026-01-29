import { useSearchParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { Header, Footer } from "../../components/organisms/";
import { ProductCard } from "../../components/molecules/Product/ProductCard";
import { Loader2, PackageX, Filter, LayoutGrid, ListFilter, ArrowLeft, Sparkles } from "lucide-react";
import type { Category } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { Badge, Button } from "../../components/atoms";

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { products, loading: productsLoading, error: productsError } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();
    const { user } = useAuth();
    const { addToCart } = useCart();

    const activeCategory = searchParams.get("categoria");

    // Filtrado
    const filteredProducts = products.filter((p) => {
        const matchesCategory = activeCategory ? p.idCategoria === activeCategory : true;
        const isNotExpired = p.estado !== 'vencido';
        return matchesCategory && isNotExpired;
    });

    const handleCategoryChange = (id: string | null) => {
        if (id) {
            setSearchParams({ categoria: id });
        } else {
            setSearchParams({});
        }
    };

    const handleAddToCart = (product: any) => {
        addToCart(product);
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const role = user?.rol || 'guest';

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <Header />

            <main className="flex-grow">
                {/* Encabezado */}
                <section className="bg-primary/5 py-16 border-b border-border/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate('/categorias')}
                                    className="rounded-xl border border-border bg-background/50 backdrop-blur-sm"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Categorías
                                </Button>
                                <Badge variant="default" className="py-1 px-3">Catálogo Premium</Badge>
                                {activeCategory && (
                                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary py-1 px-3">
                                        {categories.find(c => c.id === activeCategory)?.nombre}
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                                Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600">Productos</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed italic">
                                Explora nuestra selección de productos seleccionados para tu salud.
                                Calidad y confianza en cada compra.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Filtros */}
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <div className="bg-card/50 backdrop-blur-md rounded-[2.5rem] border border-border/50 p-8 sticky top-28 shadow-2xl shadow-primary/5">
                                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/50">
                                    <ListFilter className="w-6 h-6 text-primary" strokeWidth={2.5} />
                                    <h3 className="font-black text-xl text-foreground tracking-tight">Filtrar</h3>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-6 px-2">Especialidades</p>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleCategoryChange(null)}
                                                className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between group ${!activeCategory
                                                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                                                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                                                    }`}
                                            >
                                                <span>Todas</span>
                                                <LayoutGrid className={`w-4 h-4 transition-transform group-hover:scale-110 ${!activeCategory ? "opacity-100" : "opacity-30"}`} />
                                            </button>

                                            {categoriesLoading ? (
                                                <div className="flex flex-col gap-3 pt-2">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <div key={i} className="h-12 bg-muted/40 rounded-2xl animate-pulse"></div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-2">
                                                    {categories.map((category: Category) => (
                                                        <button
                                                            key={category.id}
                                                            onClick={() => handleCategoryChange(category.id)}
                                                            className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group flex items-center justify-between ${activeCategory === category.id
                                                                ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                                                                : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                                                                }`}
                                                        >
                                                            <span className="truncate">{category.nombre}</span>
                                                            <Filter className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${activeCategory === category.id ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Productos */}
                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-10 px-4">
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.15em]">
                                    Cátalogo / <span className="text-foreground">{filteredProducts.length} Resultados</span>
                                </p>
                            </div>

                            {productsError ? (
                                <div className="rounded-[3rem] border border-error/20 bg-error/5 p-16 text-center text-error shadow-2xl">
                                    <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-40" />
                                    <p className="font-black text-2xl mb-4 tracking-tight">Ocurrió un inconveniente</p>
                                    <p className="font-medium opacity-80 mb-8">{productsError}</p>
                                    <Button variant="error" className="rounded-2xl px-10 py-6 font-bold" onClick={() => window.location.reload()}>Reintentar Carga</Button>
                                </div>
                            ) : productsLoading ? (
                                <div className="flex flex-col items-center justify-center py-32 gap-6 text-muted-foreground">
                                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                    <p className="font-black tracking-widest text-xs uppercase italic">Actualizando inventario premium...</p>
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-32 text-muted-foreground bg-muted/5 rounded-[4rem] border-2 border-dashed border-border/50 transition-all">
                                    <div className="bg-muted/50 w-28 h-28 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                        <PackageX className="w-14 h-14 opacity-30" />
                                    </div>
                                    <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Sin Stock Disponible</h3>
                                    <p className="font-medium text-muted-foreground/60 max-w-sm text-center italic">No encontramos productos en esta especialidad en este momento.</p>
                                    <Button variant="ghost" className="mt-10 rounded-2xl border border-border px-8 py-6 font-bold hover:bg-muted" onClick={() => handleCategoryChange(null)}>
                                        Explorar Todo el Catálogo
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-700">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            categoryName={categories.find(c => c.id === product.idCategoria)?.nombre || "General"}
                                            role={role}
                                            onAddToCart={handleAddToCart}
                                            onLogin={handleLoginRedirect}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

