import { ShoppingCart, LogIn, Pill, Leaf, ShieldAlert } from "lucide-react";
import type { Product } from "../../../services/api";

interface ProductCardProps {
    product: Product;
    categoryName: string;
    role?: string;
    onAddToCart?: (product: Product) => void;
    onLogin?: () => void;
}

export function ProductCard({ product, categoryName, role, onAddToCart, onLogin }: ProductCardProps) {
    const isClient = role === 'cliente';

    // Descuento
    const activePromo = product.promociones && product.promociones.length > 0 ? product.promociones[0] : null;
    const originalPrice = Number(product.precio);
    const hasDiscount = !!activePromo;
    const finalPrice = hasDiscount
        ? originalPrice * (1 - (Number(activePromo.porcentajeDescuento) / 100))
        : originalPrice;

    // Stock Promocional
    const promoStock = hasDiscount && product.lotes
        ? product.lotes
            .filter(l => {
                const diasRestantes = Math.floor(
                    (new Date(l.fechaVencimiento).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                return diasRestantes <= 60 && diasRestantes >= 0;
            })
            .reduce((sum, l) => sum + l.cantidad, 0)
        : 0;

    return (
        <div className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group relative">
            {/* Badge de Oferta */}
            {hasDiscount && (
                <div className="absolute top-4 right-4 z-20 bg-error text-error-foreground text-xs font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                    -{Number(activePromo.porcentajeDescuento)}% OFF
                </div>
            )}

            {/* Imagen */}
            <div className="bg-gradient-to-br from-primary-100/50 to-background h-48 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.requiereReceta ? <Pill className="w-16 h-16 text-amber-500" /> : <Leaf className="w-16 h-16 text-primary" />}
            </div>

            {/* Contenido */}
            <div className="p-5 flex-grow flex flex-col">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary-50 rounded-full uppercase tracking-tighter border border-primary/10">
                        {categoryName}
                    </span>
                    {product.requiereReceta && (
                        <span className="text-[10px] font-bold text-amber-600 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100 flex items-center gap-1">
                            <Pill className="w-3 h-3" /> Receta
                        </span>
                    )}
                </div>

                <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                    {product.nombre}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {product.descripcion || "Sin descripción disponible por el momento."}
                </p>

                {/* Promoción */}
                {hasDiscount && promoStock > 0 && (
                    <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs font-bold text-amber-700 flex items-center gap-1">
                            ⚡ {promoStock} {promoStock === 1 ? 'unidad' : 'unidades'} con descuento
                        </p>
                        <p className="text-[10px] text-amber-600 mt-0.5">
                            Unidades adicionales a precio regular
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground font-medium">Precio</span>
                        <div className="flex flex-col">
                            {hasDiscount && (
                                <span className="text-xs text-muted-foreground line-through decoration-error/50">
                                    ${originalPrice.toFixed(2)}
                                </span>
                            )}
                            <span className="text-primary font-bold text-2xl tracking-tight">
                                ${finalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div>
                            {/* Acciones */}
                            {product.requiereReceta && isClient ? (
                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                                    <ShieldAlert className="w-4 h-4" />
                                    <span className="text-xs font-bold leading-tight">Venta exclusiva en mostrador</span>
                                </div>
                            ) : isClient ? (
                                <button
                                    onClick={() => onAddToCart?.(product)}
                                    className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg hover:shadow-primary/20 transform active:scale-95 flex items-center gap-2 font-medium"
                                    aria-label="Agregar al carrito"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="hidden sm:inline">Agregar</span>
                                </button>
                            ) : (
                                <button
                                    onClick={onLogin}
                                    className="bg-secondary text-secondary-foreground p-3 rounded-lg hover:bg-secondary-700 transition-all shadow-md hover:shadow-lg transform active:scale-95 flex items-center gap-2 font-medium"
                                    aria-label="Iniciar sesión para comprar"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span className="hidden sm:inline">Acceder</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
