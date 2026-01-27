const API_BASE_URL = 'http://localhost:3001/api';

export interface Product {
    id: string; // Prisma usa strings para IDs
    nombre: string;
    descripcion: string;
    precio: number;
    requiereReceta: boolean; // Camelcase en Prisma
    idCategoria: string;
    imageUrl?: string;
    estado: string;
}

export interface Category {
    id: string;
    nombre: string;
    descripcion: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Error al obtener productos');
    }
    const result: ApiResponse<Product[]> = await response.json();
    return result.data;
}

export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error('Error al obtener categorías');
    }
    const result: ApiResponse<Category[]> = await response.json();
    return result.data;
}
