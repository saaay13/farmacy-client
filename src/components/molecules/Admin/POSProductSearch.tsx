import { useState, useEffect } from "react";
import { Search, Loader2, Thermometer, ShieldCheck, AlertCircle } from "lucide-react";
import { fetchProducts, type Product } from "../../../services/api";
import { Badge, Card } from "../../atoms";
import { useAdminProducts } from "../../../hooks/admin/useAdminProducts";

interface POSProductSearchProps {
    onSelect: (product: Product) => void;
}

export const POSProductSearch = ({ onSelect }: POSProductSearchProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const { products } = useAdminProducts();

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const filtered = products.filter(p =>
            p.nombre.toLowerCase().includes(query.toLowerCase()) ||
            p.id.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
    }, [query, products]);

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscador rápido (Nombre o ID)..."
                    className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl shadow-sm focus:ring-2 focus:ring-primary outline-none font-bold text-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />}
            </div>

            {results.length > 0 && (
                <Card className="absolute top-full left-0 w-full mt-2 z-50 p-2 shadow-2xl border-border/50 max-h-[400px] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                        {results.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => {
                                    onSelect(product);
                                    setQuery("");
                                    setResults([]);
                                }}
                                className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-all group text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl overflow-hidden">
                                        {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" /> : "💊"}
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{product.nombre}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge variant="secondary" className="text-[10px] py-0">{product.categoria?.nombre || 'General'}</Badge>
                                            {product.requiereReceta && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-error uppercase">
                                                    <ShieldCheck className="w-3 h-3" /> Receta
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-foreground">${Number(product.precio).toFixed(2)}</p>
                                    <p className={`text-[10px] font-bold uppercase ${(product.inventario?.stockTotal || 0) > 0 ? 'text-success' : 'text-error'
                                        }`}>
                                        Stock: {product.inventario?.stockTotal || 0}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};
