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
export interface Banch {
    idSucursal: string;
    nombre: string;
    direccion: string;
    detalles?: string;
}
//
export interface User {
    id: string
    nombre: string
    rol: 'admin' | 'farmaceutico' | 'vendedor' | 'cliente' | 'guest'
    email: string
}

interface LoginResponse {
    token: string
    user: User
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.message || 'Error al iniciar sesión')
    }

    const data: LoginResponse = await response.json()
    return data
}

//
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

export async function fetchBanch(): Promise<Banch[]> {
    const response = await fetch(`${API_BASE_URL}/banch`);
    if (!response.ok) {
        throw new Error('Error al obtener sucursales');
    }

    const result: ApiResponse<Banch[]> = await response.json();
    return result.data;
}

export interface SaleDetail {
    idProducto: string;
    cantidad: number;
}

export interface SaleRequest {
    idCliente?: string | null;
    detalles: SaleDetail[];
}

export async function createSale(saleData: SaleRequest, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/sales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(saleData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al procesar la venta');
    }

    return result;
}
