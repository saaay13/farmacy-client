import { Edit, Trash2, Eye, PlusCircle, ClipboardList, RotateCcw } from "lucide-react";
import type { Product } from "../../../services/api";
import { Badge } from "../../atoms";
import { useAuth } from "../../../context/AuthContext";

interface ProductTableProps {
    products: Product[];
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
    onViewDetail?: (product: Product) => void;
    onRestock?: (product: Product) => void;
    onViewHistory?: (product: Product) => void;
    onRestore?: (product: Product) => void;
}

export const ProductTable = ({ products, onEdit, onDelete, onViewDetail, onRestock, onViewHistory, onRestore }: ProductTableProps) => {
    const { user } = useAuth();
    const isAdmin = user?.rol === 'admin';

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border bg-muted/30">
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Producto</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Categoría</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">Precio</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">Stock</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Estado</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-muted/10 transition-colors group"
                        >
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden flex-shrink-0 border border-border/50">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.nombre} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl">💊</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-foreground truncate">{product.nombre}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {product.requiereReceta && (
                                                <Badge variant="error" className="py-0 px-1.5 text-[10px]">Receta</Badge>
                                            )}
                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <Badge variant="secondary" className="font-medium">
                                    {product.categoria?.nombre || 'General'}
                                </Badge>
                            </td>
                            <td className="p-4 text-center">
                                <span className="font-black text-foreground">
                                    ${Number(product.precio).toFixed(2)}
                                </span>
                            </td>
                            <td className="p-4 text-center">
                                <div className="flex flex-col items-center">
                                    <span className={`text-lg font-black ${(product.inventario?.stockTotal || 0) < 10 ? 'text-error animate-pulse' : 'text-foreground'
                                        }`}>
                                        {product.inventario?.stockTotal ?? 0}
                                    </span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5">unidades</span>
                                </div>
                            </td>
                            <td className="p-4">
                                <Badge variant={product.estado === 'activo' ? 'success' : 'error'} className="capitalize">
                                    {product.estado}
                                </Badge>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <button
                                        onClick={() => onRestock?.(product)}
                                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-success transition-colors"
                                        title="Recargar Stock / Lote"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onViewHistory?.(product)}
                                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-info transition-colors"
                                        title="Ver Historial de Lotes"
                                    >
                                        <ClipboardList className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onViewDetail?.(product)}
                                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                                        title="Ver detalles"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit?.(product)}
                                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-info transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                        title="Editar"
                                        disabled={product.activo === false}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    {isAdmin && (
                                        product.activo === false ? (
                                            <button
                                                onClick={() => onRestore?.(product)}
                                                className="p-2 hover:bg-muted rounded-lg text-success transition-colors"
                                                title="Restaurar"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onDelete?.(product)}
                                                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-error transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
