import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Tags, Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { Card, Button } from "../../components/atoms";
import { CategoryModal } from "../../components/molecules/Admin/CategoryModal";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../services/api";

export default function CategoriesPage() {
    const { categories, loading, deleteCategory, createCategory, updateCategory, refresh } = useCategories();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const filteredCategories = categories.filter((c: Category) =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, nombre: string) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría "${nombre}"?`)) {
            const result = await deleteCategory(id);
            if (!result.success) {
                alert(result.message);
            }
        }
    };

    const handleSave = async (name: string): Promise<{ success: boolean; message?: string }> => {
        try {
            if (selectedCategory) {
                const result = await updateCategory(selectedCategory.id, name);
                return result || { success: false, message: "Error al actualizar" };
            } else {
                const result = await createCategory(name);
                return result || { success: false, message: "Error al crear" };
            }
        } catch (err) {
            return { success: false, message: "Error de conexión" };
        }
    };

    return (
        <AdminLayout title="Gestión de Categorías">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Categorías</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Tags className="w-4 h-4 text-primary" />
                        Organiza tus productos en categorías
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Categoría
                </Button>
            </div>

            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar categorías..."
                        className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="ghost" onClick={refresh} className="rounded-xl border-none bg-muted/50 text-muted-foreground font-bold">
                    Actualizar
                </Button>
            </div>

            <Card className="rounded-3xl overflow-hidden border-border/50">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground font-bold">Cargando categorías...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Nombre</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredCategories.length > 0 ? filteredCategories.map((category: Category) => (
                                    <tr key={category.id} className="group hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                    <Tags className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-foreground">{category.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(category)}
                                                    className="rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(category.id, category.nombre)}
                                                    className="rounded-xl text-muted-foreground hover:text-error hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-20 text-center text-muted-foreground">
                                            No se encontraron categorías que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <CategoryModal
                isOpen={isModalOpen}
                category={selectedCategory}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </AdminLayout>
    );
}
