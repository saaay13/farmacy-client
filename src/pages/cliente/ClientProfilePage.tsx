import { useState, useEffect } from "react";
import { User, Lock, Save, Loader2, ShieldCheck, Mail, LogOut, Receipt } from "lucide-react";
import { Card, Button } from "../../components/atoms";
import { useAuth } from "../../context/AuthContext";
import { updateUserAPI } from "../../services/api";
import { Header } from "../../components/organisms/Header/Header";

export default function ClientProfilePage() {
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
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-4xl font-black text-foreground mb-2">Mi Perfil</h1>
                    <p className="text-muted-foreground font-medium">Administra tu cuenta y preferencias</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Resumen */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-background rounded-full p-1 shadow-lg mb-4">
                                    <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                        <User className="w-10 h-10" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-foreground">{user?.nombre}</h2>
                                <p className="text-sm text-muted-foreground font-medium mb-4">{user?.email}</p>
                                <div className="px-4 py-1.5 bg-background/50 rounded-full border border-border">
                                    <p className="text-xs uppercase font-black tracking-widest text-primary">Cliente VIP</p>
                                </div>
                            </div>
                        </Card>

                        <nav className="space-y-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-foreground bg-card hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                            >
                                <User className="w-5 h-5 mr-3" />
                                Datos Personales
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
                                disabled
                            >
                                <Receipt className="w-5 h-5 mr-3" />
                                Mis Compras (Próximamente)
                            </Button>
                        </nav>

                        <Button
                            variant="error"
                            className="w-full justify-start bg-error/10 text-error hover:bg-error hover:text-error-foreground border-none font-bold"
                            onClick={logout}
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Cerrar Sesión
                        </Button>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 border-border/50 shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                                Seguridad y Datos
                            </h3>

                            {error && (
                                <div className="bg-error/15 text-error p-4 rounded-xl mb-6 font-medium animate-in fade-in slide-in-from-top-2 border border-error/20">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-success/15 text-success p-4 rounded-xl mb-6 font-medium animate-in fade-in slide-in-from-top-2 border border-success/20">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="group space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground group-focus-within:text-primary transition-colors">Nombre Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-transparent rounded-2xl focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="group space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground group-focus-within:text-primary transition-colors">Correo Electrónico</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-transparent rounded-2xl focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium outline-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 mt-4 border-t border-border">
                                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                                        <Lock className="w-5 h-5 text-primary" />
                                        Cambiar Contraseña
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border border-border/50">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">Confirmar</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto rounded-xl shadow-lg shadow-primary/30 text-base py-4 px-10 hover:translate-y-[-2px] hover:shadow-primary/40 transition-all duration-300"
                                    >
                                        {loading ? (
                                            <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Actualizando...</>
                                        ) : (
                                            <><Save className="w-5 h-5 mr-2" /> Guardar Cambios</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
