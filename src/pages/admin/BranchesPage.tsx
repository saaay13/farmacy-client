import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Store, MapPin, Plus, Edit, Trash2, RotateCcw, Filter, Loader2, X, Save } from "lucide-react";
import { Card, Badge, Button, Input } from "../../components/atoms";
import { useBranch } from "../../hooks/useBranch";
import { useState } from "react";
import type { Branch } from "../../services/api";

export default function AdminBranchesPage() {
    const [showDeactivated, setShowDeactivated] = useState(false);
    const { branches, loading, addBranch, updateBranch, deleteBranch, restoreBranch } = useBranch(showDeactivated);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
    const [formData, setFormData] = useState({ nombre: "", direccion: "" });
    const [formError, setFormError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleOpenModal = (branch?: Branch) => {
        if (branch) {
            setEditingBranch(branch);
            setFormData({ nombre: branch.nombre, direccion: branch.direccion });
        } else {
            setEditingBranch(null);
            setFormData({ nombre: "", direccion: "" });
        }
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBranch(null);
        setFormData({ nombre: "", direccion: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setFormError(null);
        try {
            if (editingBranch) {
                await updateBranch(editingBranch.idSucursal, formData);
            } else {
                await addBranch(formData);
            }
            handleCloseModal();
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, nombre: string) => {
        if (window.confirm(`¿Estás seguro de desactivar la sucursal "${nombre}"?`)) {
            try {
                await deleteBranch(id);
            } catch (err: any) {
                alert(err.message);
            }
        }
    };

    const handleRestore = async (id: string, nombre: string) => {
        if (window.confirm(`¿Estás seguro de reactivar la sucursal "${nombre}"?`)) {
            try {
                await restoreBranch(id);
            } catch (err: any) {
                alert(err.message);
            }
        }
    };

    return (
        <AdminLayout title="Gestión de Sucursales">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Sucursales</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Store className="w-4 h-4 text-primary" />
                        Administra la red de farmacias y puntos de venta
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeactivated(!showDeactivated)}
                        className={`rounded-2xl px-6 py-4 border-none font-bold transition-all shadow-sm ${showDeactivated ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {showDeactivated ? 'Ocultar Inactivas' : 'Ver Desactivadas'}
                    </Button>
                    <Button onClick={() => handleOpenModal()} className="rounded-2xl px-6 py-4 font-black shadow-lg shadow-primary/20">
                        <Plus className="w-5 h-5 mr-2" />
                        Nueva Sucursal
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground font-bold">Cargando sucursales...</p>
                    </div>
                ) : branches.length > 0 ? (
                    branches.map((branch: any) => (
                        <Card
                            key={branch.idSucursal}
                            className={`rounded-3xl p-6 border-border/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${branch.activo === false ? 'opacity-60 grayscale-[0.5]' : ''}`}
                        >
                            {branch.activo === false && (
                                <div className="absolute top-4 right-4 animate-in fade-in zoom-in">
                                    <Badge variant="error" className="py-1 px-3 text-[10px] uppercase font-black">Inactiva</Badge>
                                </div>
                            )}

                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Store className="w-6 h-6" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-xl font-bold text-foreground mb-1 truncate">{branch.nombre}</h3>
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{branch.direccion}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                                    {branch.idSucursal}
                                </div>
                                <div className="flex gap-2">
                                    {branch.activo === false ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRestore(branch.idSucursal, branch.nombre)}
                                            className="rounded-xl text-success hover:bg-success/10"
                                            title="Reactivar"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenModal(branch)}
                                                className="rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(branch.idSucursal, branch.nombre)}
                                                className="rounded-xl text-muted-foreground hover:text-error hover:bg-error/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-muted-foreground font-bold">No se encontraron sucursales.</p>
                    </div>
                )}
            </div>

            {/* Modal de Creación/Edición */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-md shadow-2xl border-border/50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20">
                            <div className="h-full bg-primary animate-in slide-in-from-left duration-500" style={{ width: '100%' }}></div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-foreground tracking-tight">
                                    {editingBranch ? "Editar Sucursal" : "Nueva Sucursal"}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre de Sucursal</label>
                                    <Input
                                        placeholder="Ej: Central - Casco Viejo"
                                        required
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dirección</label>
                                    <Input
                                        placeholder="Calle Falsa 123"
                                        required
                                        value={formData.direccion}
                                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                        className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                                    />
                                </div>

                                {formError && (
                                    <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-medium">
                                        {formError}
                                    </div>
                                )}

                                <div className="pt-4 flex gap-3">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="flex-1 rounded-xl font-bold"
                                        onClick={handleCloseModal}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-2 rounded-xl font-bold shadow-lg shadow-primary/20"
                                        isLoading={isSaving}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {editingBranch ? "Guardar Cambios" : "Crear Sucursal"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
}
