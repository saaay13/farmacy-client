import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { Header, Footer } from '../../components/organisms';
import { LayoutGrid, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { Button, Badge } from '../../components/atoms';

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories();
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId: string) => {
        navigate(`/productos?categoria=${categoryId}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="relative py-20 bg-primary/5 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="default" className="mb-4 py-1.5 px-4 font-bold uppercase tracking-wider">Especialidades</Badge>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 text-foreground leading-[1.1] tracking-tight">
                                Explora Nuestras <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600">Categorías</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic">
                                Encuentra exactamente lo que buscas navegando por nuestras especialidades farmacéuticas y de bienestar.
                                Calidad garantizada en cada selección.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categorías */}
                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-32 gap-6">
                                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                <p className="text-muted-foreground font-black tracking-widest text-xs uppercase">Clasificando especialidades...</p>
                            </div>
                        )}

                        {error && (
                            <div className="max-w-md mx-auto bg-error/5 border border-error/20 rounded-3xl p-12 text-center shadow-2xl">
                                <div className="bg-error/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-10 h-10 text-error" />
                                </div>
                                <p className="text-error font-black text-xl mb-4">No pudimos cargar el catálogo</p>
                                <p className="text-muted-foreground mb-8 text-sm">{error}</p>
                                <Button variant="error" size="lg" className="rounded-2xl w-full" onClick={() => window.location.reload()}>
                                    Intentar de nuevo
                                </Button>
                            </div>
                        )}

                        {!loading && !error && categories.length === 0 && (
                            <div className="max-w-xl mx-auto bg-card border border-border/50 rounded-[3rem] p-24 text-center shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <LayoutGrid className="w-32 h-32" />
                                </div>
                                <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <LayoutGrid className="w-12 h-12 text-muted-foreground/40" />
                                </div>
                                <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Casi Listos</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed">Estamos actualizando nuestro catálogo para ofrecerte lo mejor.</p>
                            </div>
                        )}

                        {!loading && !error && categories.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="group bg-card rounded-[2.5rem] border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:translate-y-[-10px] cursor-pointer flex flex-col h-full"
                                    >
                                        <div className="bg-gradient-to-br from-primary/10 via-background to-background h-48 flex items-center justify-center relative transition-all duration-500 group-hover:h-40">
                                            <div className="bg-white dark:bg-muted/30 group-hover:bg-primary w-28 h-28 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-xl group-hover:shadow-primary/40 group-hover:scale-110 group-hover:rotate-6">
                                                <LayoutGrid className="w-12 h-12 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                                            </div>
                                            <div className="absolute top-6 right-6 bg-primary/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>

                                        <div className="p-10 flex-grow flex flex-col">
                                            <h3 className="font-black text-foreground text-2xl mb-4 text-center group-hover:text-primary transition-colors tracking-tight">
                                                {category.nombre}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-10 text-center font-medium line-clamp-2 flex-grow italic leading-relaxed">
                                                {category.descripcion || "Explora las mejores soluciones farmacéuticas en esta especialidad."}
                                            </p>

                                            <button className="w-full bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-4 border border-primary/10 group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-primary/30">
                                                <span className="text-sm uppercase tracking-widest">Ver Catálogo</span>
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
