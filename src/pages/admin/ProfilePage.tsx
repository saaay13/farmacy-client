import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { User, Lock, Save, Loader2, ShieldCheck, Mail } from "lucide-react";
import { Card, Button } from "../../components/atoms";
import { useAuth } from "../../context/AuthContext";
import { updateUserAPI } from "../../services/api";

export default function ProfilePage() {
    const { user, token, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                nombre: user.nombre,
                email: user.email
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !token) return;

        setError(null);
        setSuccess(null);

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (formData.password && formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setLoading(true);
        try {
            const updateData: any = {
                nombre: formData.nombre,
                email: formData.email
            };

            if (formData.password) {
                updateData.password = formData.password;
            }

            const res = await updateUserAPI(user.id, updateData, token);

            if (res.success) {
                setSuccess("Perfil actualizado correctamente");
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
                // Si cambiamos el nombre, idealmente deberíamos actualizar el contexto de auth, 
                // pero por ahora requeriría recargar o modificar useAuth.
                // Podríamos sugerir un relogin si cambió el password.
            } else {
                setError(res.message || "Error al actualizar perfil");
            }
        } catch (err: any) {
            setError(err.message || "Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Mi Perfil">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-foreground mb-1">Mi Cuenta</h1>
                        <p className="text-muted-foreground font-medium">Gestiona tu información personal y seguridad</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna Izquierda: Resumen */}
                    <Card className="p-6 h-fit space-y-6">
                        <div>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-success" />
                                Información de Rol
                            </h3>
                            <div className="p-4 bg-muted/30 rounded-2xl border border-border">
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">ROL ACTUAL</p>
                                <p className="text-xl font-black capitalize text-primary">{user?.rol}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <Button
                                variant="ghost"
                                className="w-full text-error border-error/20 hover:bg-error/10"
                                onClick={logout}
                            >
                                Cerrar Sesión Global
                            </Button>
                        </div>
                    </Card>

                    {/* Columna Derecha: Formulario */}
                    <Card className="lg:col-span-2 p-8">
                        <h2 className="text-2xl font-bold mb-6">Editar Datos</h2>

                        {error && (
                            <div className="bg-error/15 text-error p-4 rounded-xl mb-6 font-medium animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-success/15 text-success p-4 rounded-xl mb-6 font-medium animate-in fade-in slide-in-from-top-2">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-xl focus:ring-2 focus:ring-primary font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground">Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-xl focus:ring-2 focus:ring-primary font-medium"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                                    <Lock className="w-5 h-5 text-primary" />
                                    Cambiar Contraseña
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">Dejar en blanco si no deseas cambiarla.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground">Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 bg-muted/50 border-none rounded-xl focus:ring-2 focus:ring-primary font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground">Confirmar Contraseña</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 bg-muted/50 border-none rounded-xl focus:ring-2 focus:ring-primary font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="md:w-auto w-full rounded-xl shadow-lg shadow-primary/20 text-base py-6 px-8"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Guardando...</>
                                    ) : (
                                        <><Save className="w-5 h-5 mr-2" /> Guardar Cambios</>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
