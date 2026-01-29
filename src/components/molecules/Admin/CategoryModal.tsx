import { useState, useEffect } from "react";
import { X, Save, Tag } from "lucide-react";
import { Button, Input, Card } from "../../atoms";
import type { Category } from "../../../services/api";

interface CategoryModalProps {
    category: Category | null; // Null para crear
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => Promise<{ success: boolean; message?: string }>;
}

export const CategoryModal = ({ category, isOpen, onClose, onSave }: CategoryModalProps) => {
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (category) {
                setNombre(category.nombre);
            } else {
                setNombre("");
            }
            setError(null);
        }
    }, [isOpen, category]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await onSave(nombre);
            if (result.success) {
                onClose();
            } else {
                setError(result.message || "Ocurrió un error inesperado");
            }
        } catch (err: any) {
            setError(err.message || "Error al procesar la solicitud");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-md shadow-2xl border-border/50 relative overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">
                                {category ? "Editar Categoría" : "Nueva Categoría"}
                            </h2>
                            <p className="text-sm text-muted-foreground font-medium mt-1">
                                {category ? "Actualiza el nombre de la categoría" : "Registra una nueva categoría en el sistema"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Tag className="w-3.5 h-3.5" />
                                Nombre de la Categoría
                            </label>
                            <Input
                                placeholder="Ej: Analgésicos"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-medium">
                                {error}
                            </div>
                        )}

                        <div className="pt-4 flex gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1 rounded-xl font-bold"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-2 rounded-xl font-bold shadow-lg shadow-primary/20"
                                isLoading={loading}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {category ? "Guardar Cambios" : "Crear Categoría"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};
