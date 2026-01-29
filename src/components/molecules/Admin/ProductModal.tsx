import React, { useState, useEffect } from "react";
import { X, Save, Loader2, Package, Tag, DollarSign, Eye, Type } from "lucide-react";
import { Card, Button } from "../../atoms";
import { useCategories } from "../../../hooks/useCategories";
import type { Product } from "../../../services/api";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: any) => Promise<{ success: boolean; message?: string }>;
    product?: Product | null;
}

export const ProductModal = ({ isOpen, onClose, onSave, product }: ProductModalProps) => {
    const { categories } = useCategories();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        requiereReceta: false,
        estado: "activo",
        idCategoria: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (product) {
            setFormData({
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: Number(product.precio),
                requiereReceta: product.requiereReceta,
                estado: product.estado,
                idCategoria: product.idCategoria,
                imageUrl: product.imageUrl || ""
            });
        } else {
            setFormData({
                nombre: "",
                descripcion: "",
                precio: 0,
                requiereReceta: false,
                estado: "activo",
                idCategoria: "",
                imageUrl: ""
            });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const result = await onSave(formData);
        setIsSaving(false);
        if (result.success) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

            <Card className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-border shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-primary p-6 text-primary-foreground">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">
                                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                                </h2>
                                <p className="text-sm opacity-80 font-medium">Catálogo Maestro de Farmacia</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Nombre Comercial</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    required
                                    type="text"
                                    className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                                    placeholder="Ej: Paracetamol 500mg"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Precio */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Precio Unitario</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                                    value={formData.precio}
                                    onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                                />
                            </div>
                        </div>

                        {/* Categoría */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Categoría</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <select
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold appearance-none"
                                    value={formData.idCategoria}
                                    onChange={(e) => setFormData({ ...formData, idCategoria: e.target.value })}
                                >
                                    <option value="">Seleccionar...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Descripción</label>
                            <textarea
                                className="w-full p-4 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium min-h-[100px]"
                                placeholder="Detalles, indicaciones o composición..."
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            />
                        </div>

                        {/* URL Imagen */}
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">URL de Imagen (opcional)</label>
                            <div className="relative">
                                <Eye className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="url"
                                    className="w-full pl-12 pr-4 py-3 bg-muted/50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium"
                                    placeholder="https://..."
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Toggles y Estado */}
                        <div className="flex items-center gap-6 col-span-2 p-4 bg-muted/30 rounded-2xl border border-border/50">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.requiereReceta}
                                        onChange={(e) => setFormData({ ...formData, requiereReceta: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-muted-foreground/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                                <span className="text-sm font-bold group-hover:text-primary transition-colors">Requiere Receta</span>
                            </label>

                            <div className="h-6 w-px bg-border" />

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold">Estado:</span>
                                <div className="flex gap-2">
                                    {['activo', 'inactivo'].map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, estado: s })}
                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${formData.estado === s
                                                ? (s === 'activo' ? 'bg-success text-success-foreground' : 'bg-error text-error-foreground')
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-2xl font-bold"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-2xl font-bold px-8 shadow-lg shadow-primary/20"
                        >
                            {isSaving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    {product ? 'Guardar Cambios' : 'Crear Producto'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
