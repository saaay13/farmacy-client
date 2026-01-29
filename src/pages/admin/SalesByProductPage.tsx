import { useState } from 'react';
import { AdminLayout } from "../../components/templates/Admin/AdminLayout";
import { ShoppingBag, Search, Loader2, TrendingUp, DollarSign, Package } from "lucide-react";
import { Card, Badge, Button } from "../../components/atoms";
import { useAdminProductSales } from "../../hooks/admin/useAdminProductSales";

export default function SalesByProductPage() {
    const { sales, loading, error } = useAdminProductSales();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSales = sales.filter(s =>
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalIngresos = sales.reduce((acc, curr) => acc + Number(curr.ingresosTotales), 0);
    const totalProductos = sales.reduce((acc, curr) => acc + curr.cantidadTotal, 0);

    return (
        <AdminLayout title="Ventas por Producto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground mb-1 tracking-tight">Historial por Producto</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-primary" />
                        Análisis detallado de ventas y rendimiento
                    </p>
                </div>
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 rounded-3xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <DollarSign className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Ingresos Totales</p>
                            <h3 className="text-2xl font-black">${totalIngresos.toLocaleString('es-CL')}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 rounded-3xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Package className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Unidades Vendidas</p>
                            <h3 className="text-2xl font-black">{totalProductos} uds.</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 rounded-3xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <TrendingUp className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Productos Activos</p>
                            <h3 className="text-2xl font-black">{sales.length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filtros */}
            <div className="bg-card border border-border rounded-3xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Filtrar por nombre o categoría..."
                        className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla */}
            <Card className="rounded-3xl overflow-hidden border-border/50">
                {loading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground font-bold">Analizando historial de ventas...</p>
                    </div>
                ) : error ? (
                    <div className="p-20 text-center">
                        <p className="text-destructive font-bold">{error}</p>
                        <Button variant="ghost" className="mt-4" onClick={() => window.location.reload()}>Reintentar</Button>
                    </div>
                ) : filteredSales.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Categoría</th>
                                    <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Precio Actual</th>
                                    <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider text-center">Cant. Vendida</th>
                                    <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider text-right">Total Ingresos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {filteredSales.map((item) => (
                                    <tr key={item.idProducto} className="hover:bg-accent/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground">{item.nombre}</span>
                                                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{item.idProducto}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary" className="bg-muted text-muted-foreground font-bold">
                                                {item.categoria}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            ${Number(item.precioActual).toLocaleString('es-CL')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-black">
                                                {item.cantidadTotal}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-black text-lg text-emerald-600">
                                                ${Number(item.ingresosTotales).toLocaleString('es-CL')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center">
                        <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
                            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Sin datos de ventas</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">No se encontraron registros de ventas para los criterios seleccionados.</p>
                    </div>
                )}
            </Card>

            <div className="mt-6 flex items-center justify-between px-4">
                <p className="text-sm text-muted-foreground font-medium">
                    Mostrando <span className="text-foreground font-bold">{filteredSales.length}</span> productos con ventas
                </p>
                <div className="flex items-center gap-2">
                    <Badge variant="success" className="animate-pulse">Actualizado</Badge>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Corte de caja real</p>
                </div>
            </div>
        </AdminLayout>
    );
}
