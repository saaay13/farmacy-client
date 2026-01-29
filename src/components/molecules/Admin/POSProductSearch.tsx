import { useState, useEffect } from "react";
import { Search, ShieldCheck } from "lucide-react";
import { type Product } from "../../../services/api";
import { Badge, Card } from "../../atoms";
import { useAdminProducts } from "../../../hooks/admin/useAdminProducts";

interface POSProductSearchProps {
    onSelect: (product: Product) => void;
}

export const POSProductSearch = ({ onSelect }: POSProductSearchProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { products } = useAdminProducts();

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            setSelectedIndex(-1);
            return;
        }

        const filtered = products.filter(p =>
            p.nombre.toLowerCase().includes(query.toLowerCase()) ||
            p.id.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
        setSelectedIndex(filtered.length > 0 ? 0 : -1);
    }, [query, products]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (results.length === 0) return;

        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            onSelect(results[selectedIndex]);
            setQuery("");
            setResults([]);
        } else if (e.key === "Escape") {
            setResults([]);
        }
    };

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
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>

            {results.length > 0 && (
                <Card className="absolute top-full left-0 w-full mt-2 z-50 p-2 shadow-2xl border-border/50 max-h-[400px] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                        {results.map((product, index) => (
                            <button
                                key={product.id}
                                onClick={() => {
                                    onSelect(product);
                                    setQuery("");
                                    setResults([]);
                                }}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group text-left ${index === selectedIndex ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-muted'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl overflow-hidden ${index === selectedIndex ? 'bg-white/20' : 'bg-muted'
                                        }`}>
                                        {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" /> : "💊"}
                                    </div>
                                    <div>
                                        <p className={`font-bold transition-colors ${index === selectedIndex ? 'text-white' : 'text-foreground group-hover:text-primary'
                                            }`}>{product.nombre}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge variant={index === selectedIndex ? 'outline' : 'secondary'} className={`text-[10px] py-0 ${index === selectedIndex ? 'border-white/40 text-white' : ''
                                                }`}>{product.categoria?.nombre || 'General'}</Badge>
                                            {product.requiereReceta && (
                                                <span className={`flex items-center gap-1 text-[10px] font-bold uppercase ${index === selectedIndex ? 'text-white' : 'text-error'
                                                    }`}>
                                                    <ShieldCheck className="w-3 h-3" /> Receta
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black ${index === selectedIndex ? 'text-white' : 'text-foreground'}`}>${Number(product.precio).toFixed(2)}</p>
                                    <p className={`text-[10px] font-bold uppercase ${(product.inventario?.stockTotal || 0) > 0
                                        ? (index === selectedIndex ? 'text-white/80' : 'text-success')
                                        : 'text-error animate-pulse'
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
