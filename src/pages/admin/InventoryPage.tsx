import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Package, Search, Plus, Filter } from "lucide-react";

export default function InventoryPage() {
    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-2">Gestión de Inventario</h1>
                    <p className="text-muted-foreground font-medium">Control total de productos, stock y lotes por sucursal.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                    Nuevo Producto
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, código o lote..."
                        className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-grow md:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-muted/50 rounded-2xl font-bold text-muted-foreground hover:bg-muted transition-colors">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                    <button className="flex-grow md:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-muted/50 rounded-2xl font-bold text-muted-foreground hover:bg-muted transition-colors">
                        Exportar
                    </button>
                </div>
            </div>

            {/* Table Area Placeholder */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="p-20 text-center">
                    <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-10 h-10 text-muted-foreground opacity-20" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Preparando inventario...</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">Pronto verás aquí la lista completa de productos con sus estados y lotes correspondientes.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
