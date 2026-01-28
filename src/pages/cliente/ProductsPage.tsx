import { useSearchParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { Header, Footer } from "../../components/organisms/";
import { ProductCard } from "../../components/molecules/Product/ProductCard";
import { Loader2, PackageX } from "lucide-react";
import type { Category } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { products, loading: productsLoading, error: productsError } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();
    const { user } = useAuth();
    const { addToCart } = useCart();

    const activeCategory = searchParams.get("categoria");

    // Lógica de filtrado STRICTO para clientes y guests
    // 1. Filtrar por categoría activa (si existe)
    // 2. EXCLUIR productos vencidos (estado === 'vencido')
    // 3. EXCLUIR productos con receta (requiereReceta === true)
    const filteredProducts = products.filter((p) => {
        const matchesCategory = activeCategory ? p.idCategoria === activeCategory : true;
        const isNotExpired = p.estado !== 'vencido';
        const isNotPrescription = !p.requiereReceta;

        return matchesCategory && isNotExpired && isNotPrescription;
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
        <div className="min-h-screen bg-muted/30 flex flex-col relative overflow-hidden">
            {/* Background Decor - The "Green Box" */}
            <div className="absolute top-0 left-0 w-full h-[35vh] bg-primary shadow-lg shadow-primary/20 transform -skew-y-2 origin-top-right scale-110 z-0" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <section className="text-primary-foreground py-12 md:py-16">
                    <div className="container mx-auto px-4 text-left">
                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-sm">
                                Nuestros Productos
                            </h1>
                            <p className="text-lg text-primary-foreground/90 max-w-2xl font-medium opacity-90">
                                Descubre nuestra selección de productos de venta libre para tu bienestar diario.
                            </p>
                        </div>
                    </div>
                </section>

                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Sidebar Filtros */}
                        <aside className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-card rounded-xl border border-border p-6 sticky top-24 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 text-foreground">Categorías</h3>
                                <button
                                    onClick={() => handleCategoryChange(null)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-2 transition-all flex items-center justify-between ${!activeCategory
                                        ? "bg-primary text-primary-foreground font-bold shadow-md"
                                        : "hover:bg-accent text-muted-foreground"
                                        }`}
                                >
                                    Todas
                                </button>

                                {categoriesLoading ? (
                                    <div className="flex flex-col gap-2">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        {categories.map((category: Category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => handleCategoryChange(category.id)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeCategory === category.id
                                                    ? "bg-primary text-primary-foreground font-bold shadow-md"
                                                    : "hover:bg-accent text-muted-foreground"
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
                        <div className="flex-grow">
                            {productsError ? (
                                <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
                                    <p className="font-bold">Error al cargar productos</p>
                                    <p className="text-sm mt-2">{productsError}</p>
                                </div>
                            ) : productsLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
                                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                    <p>Cargando catálogo...</p>
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/30 rounded-xl border border-dashed border-border">
                                    <PackageX className="w-16 h-16 mb-4 opacity-50" />
                                    <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
                                    <p>Intenta seleccionar otra categoría o revisa más tarde.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </main>

                <Footer />
            </div>
        </div>
    );
}

