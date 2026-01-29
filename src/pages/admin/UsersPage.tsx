import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Users, UserPlus, Search, Mail, Loader2, Trash2, Filter, RotateCcw } from "lucide-react";
import { Card, Badge, Button } from "../../components/atoms";
import { UserModal } from "../../components/molecules";
import { useState } from "react";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";
import type { User } from "../../services/api";

export default function UsersPage() {
    const { users, loading, deleteUser, restoreUser, createUser, updateUser, refresh, showDeactivated, setShowDeactivated } = useAdminUsers();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users.filter((u: User) =>
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.rol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, nombre: string) => {
        if (window.confirm(`¿Estás seguro de que deseas desactivar a ${nombre}?`)) {
            await deleteUser(id);
        }
    };

    const handleRestore = async (id: string, nombre: string) => {
        if (window.confirm(`¿Estás seguro de que deseas reactivar a ${nombre}?`)) {
            await restoreUser(id);
        }
    };

    const handleSave = async (userData: any): Promise<{ success: boolean; message?: string }> => {
        try {
            if (selectedUser) {
                const result = await updateUser(selectedUser.id, userData);
                return result || { success: false, message: "Error al actualizar" };
            } else {
                const result = await createUser(userData);
                return result || { success: false, message: "Error al crear" };
            }
        } catch (err) {
            return { success: false, message: "Error de conexión" };
        }
    };

    return (
        <AdminLayout title="Gestión de Personal">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Personal & Usuarios</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Administra el acceso y roles de tu equipo
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Nuevo Usuario
                </Button>
            </div>

            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, correo o rol..."
                        className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button
                        variant="ghost"
                        onClick={() => setShowDeactivated(!showDeactivated)}
                        className={`rounded-2xl px-6 py-4 border-none font-bold transition-all ${showDeactivated ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {showDeactivated ? 'Viendo Todos' : 'Ver Desactivados'}
                    </Button>
                    <Button variant="ghost" onClick={refresh} className="rounded-xl border-none bg-muted/50 text-muted-foreground font-bold">
                        Actualizar
                    </Button>
                </div>
            </div>

            <Card className="rounded-3xl overflow-hidden border-border/50">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground font-bold">Cargando base de datos de personal...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Usuario</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Rol</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredUsers.length > 0 ? filteredUsers.map((user: User) => (
                                    <tr key={user.id} className={`group hover:bg-muted/10 transition-colors ${user.activo === false ? 'opacity-60 bg-muted/5' : ''}`}>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                    {user.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{user.nombre}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                        {user.activo === false && <Badge variant="secondary" className="ml-2 text-[8px]">Inactivo</Badge>}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <Badge variant={
                                                user.rol === 'admin' ? 'error' :
                                                    user.rol === 'farmaceutico' ? 'warning' :
                                                        user.rol === 'vendedor' ? 'success' : 'info'
                                            } className="uppercase text-[9px] font-black tracking-widest">
                                                {user.rol}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(user)}
                                                    className="rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity disabled:pointer-events-none"
                                                    disabled={user.activo === false}
                                                >
                                                    Editar
                                                </Button>
                                                {user.activo === false ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRestore(user.id, user.nombre)}
                                                        className="rounded-xl text-success hover:bg-success/10 transition-colors"
                                                        title="Reactivar"
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(user.id, user.nombre)}
                                                        className="rounded-xl text-muted-foreground hover:text-error hover:bg-error/10 transition-colors"
                                                        title="Desactivar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-20 text-center text-muted-foreground">
                                            No se encontraron usuarios que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <UserModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </AdminLayout>
    );
}
