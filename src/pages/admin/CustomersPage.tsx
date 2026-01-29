import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { Users, UserPlus, Search, Mail, Loader2, Trash2, CreditCard } from "lucide-react";
import { Card, Button } from "../../components/atoms";
import { UserModal } from "../../components/molecules";
import { useState } from "react";
import { useCustomers } from "../../hooks/admin/useCustomers";
import type { User } from "../../services/api";

export default function CustomersPage() {
    const { customers, loading, removeCustomer, addCustomer, editCustomer, refresh } = useCustomers();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

    const filteredCustomers = customers.filter((c: User) =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setSelectedCustomer(null);
        setIsModalOpen(true);
    };

    const handleEdit = (customer: User) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, nombre: string) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al cliente ${nombre}?`)) {
            await removeCustomer(id);
        }
    };

    const handleSave = async (customerData: any): Promise<{ success: boolean; message?: string }> => {
        if (selectedCustomer) {
            const res = await editCustomer(selectedCustomer.id, customerData);
            return res || { success: false, message: "Error desconocido" };
        } else {
            const res = await addCustomer(customerData);
            return res || { success: false, message: "Error desconocido" };
        }
    };

    return (
        <AdminLayout title="Base de Datos de Clientes">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Directorio de Clientes</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Historial y fidelización de compradores
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Nuevo Cliente
                </Button>
            </div>

            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo del cliente..."
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
                        <p className="text-muted-foreground font-bold">Cargando base de datos de clientes...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Información del Cliente</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest">Identificación</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredCustomers.length > 0 ? filteredCustomers.map((customer: User) => (
                                    <tr key={customer.id} className="group hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                    {customer.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{customer.nombre}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                                        <Mail className="w-3 h-3" />
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-foreground flex items-center gap-1">
                                                    <CreditCard className="w-3 h-3 text-muted-foreground" />
                                                    ID: {customer.id}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">Registrado en la sucursal actual</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(customer)}
                                                    className="rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(customer.id, customer.nombre)}
                                                    className="rounded-xl text-muted-foreground hover:text-error hover:bg-error/10 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-20 text-center text-muted-foreground">
                                            No se encontraron clientes que coincidan con la búsqueda.
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
                user={selectedCustomer}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                label="Cliente"
            />
        </AdminLayout>
    );
}
