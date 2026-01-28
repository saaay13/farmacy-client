import { useState, useEffect } from "react";
import { X, Save, User, Mail, Shield, Key } from "lucide-react";
import { Button, Input, Card } from "../../atoms";
import type { User as UserType } from "../../../services/api";

interface UserModalProps {
    user: UserType | null; // Null if creating
    isOpen: boolean;
    onClose: () => void;
    onSave: (userData: any) => Promise<{ success: boolean; message?: string }>;
}

export const UserModal = ({ user, isOpen, onClose, onSave }: UserModalProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        rol: "vendedor",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (user) {
                setFormData({
                    nombre: user.nombre,
                    email: user.email,
                    rol: user.rol,
                    password: "" // No mostramos el password actual
                });
            } else {
                setFormData({
                    nombre: "",
                    email: "",
                    rol: "vendedor",
                    password: ""
                });
            }
            setError(null);
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const dataToSave = { ...formData };
            if (!dataToSave.password) delete (dataToSave as any).password;

            const result = await onSave(dataToSave);
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
                                {user ? "Editar Perfil" : "Nuevo Colaborador"}
                            </h2>
                            <p className="text-sm text-muted-foreground font-medium mt-1">
                                {user ? "Actualiza los datos del usuario" : "Registra un nuevo miembro del equipo"}
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
                                <User className="w-3.5 h-3.5" />
                                Nombre Completo
                            </label>
                            <Input
                                placeholder="Ej: Juan Pérez"
                                required
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" />
                                Correo Electrónico
                            </label>
                            <Input
                                type="email"
                                placeholder="usuario@farmacia.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5" />
                                Rol asignado
                            </label>
                            <select
                                className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                                value={formData.rol}
                                onChange={(e) => setFormData({ ...formData, rol: e.target.value as any })}
                                required
                            >
                                <option value="admin">Administrador</option>
                                <option value="farmaceutico">Farmacéutico</option>
                                <option value="vendedor">Vendedor</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>

                        {!user && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Key className="w-3.5 h-3.5" />
                                    Contraseña
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    required={!user}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                                />
                            </div>
                        )}

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
                                {user ? "Guardar Cambios" : "Crear Usuario"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};
