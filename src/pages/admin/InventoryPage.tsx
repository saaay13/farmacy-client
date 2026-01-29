import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Package, Search, Plus, Filter, Loader2, Download } from "lucide-react";
import { ProductTable } from "../../components/organisms/Product/ProductTable";
import { Card, Badge, Button } from "../../components/atoms";
import { AddBatchModal, BatchHistoryModal, ProductModal } from "../../components/molecules";
import { useInventory } from "../../hooks/admin/useInventory";

export default function InventoryPage() {
    const {
        products,
        filteredProducts,
        loading,
        searchTerm,
        setSearchTerm,
        selectedProduct,
        modalStates,
        handlers
    } = useInventory();

    return (
        <AdminLayout title="Inventario">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Gestión de Inventario</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        Control total de productos y existencias
                    </p>
                </div>
                <Button
                    onClick={handlers.openCreate}
                    className="rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nuevo Producto
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, categoría o descripción..."
                        className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="ghost" className="rounded-2xl px-6 py-6 border-none bg-muted/50 text-muted-foreground font-bold">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </Button>
                    <Button variant="ghost" className="rounded-2xl px-6 py-6 border-none bg-muted/50 text-muted-foreground font-bold">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Table Area */}
            <Card className="rounded-3xl overflow-hidden border-border/50">
                {loading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground font-bold">Cargando catálogo maestro...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <ProductTable
                        products={filteredProducts}
                        onRestock={handlers.openRestock}
                        onViewHistory={handlers.openHistory}
                        onEdit={handlers.openEdit}
                        onDelete={handlers.handleDeleteProduct}
                    />
                ) : (
                    <div className="p-20 text-center">
                        <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
                            <Search className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">Prueba ajustando tu búsqueda o filtros para encontrar lo que buscas.</p>
                    </div>
                )}
            </Card>

            <div className="mt-6 flex items-center justify-between px-4">
                <p className="text-sm text-muted-foreground font-medium">
                    Mostrando <span className="text-foreground font-bold">{filteredProducts.length}</span> de <span className="text-foreground font-bold">{products.length}</span> productos
                </p>
                <div className="flex items-center gap-2">
                    <Badge variant="success" className="animate-pulse">Sincronizado</Badge>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Base de datos en tiempo real</p>
                </div>
            </div>

            {selectedProduct && (
                <AddBatchModal
                    product={selectedProduct}
                    isOpen={modalStates.isRestockOpen}
                    onClose={() => modalStates.setIsRestockOpen(false)}
                    onSuccess={handlers.refresh}
                />
            )}

            {selectedProduct && (
                <BatchHistoryModal
                    product={selectedProduct}
                    isOpen={modalStates.isHistoryOpen}
                    onClose={() => modalStates.setIsHistoryOpen(false)}
                    onBatchChange={handlers.refresh}
                />
            )}

            <ProductModal
                isOpen={modalStates.isProductModalOpen}
                onClose={() => modalStates.setIsProductModalOpen(false)}
                onSave={handlers.handleSaveProduct}
                product={selectedProduct}
            />
        </AdminLayout>
    );
}
