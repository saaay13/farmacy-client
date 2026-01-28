const API_BASE_URL = 'http://localhost:3001/api';

export interface Product {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    requiereReceta: boolean;
    idCategoria: string;
    imageUrl?: string;
    estado: string;
    categoria?: {
        nombre: string;
    };
    inventario?: {
        stockTotal: number;
        fechaRevision: string;
    };
    lotes?: Array<{
        id: string;
        numeroLote: string;
        fechaVencimiento: string;
        cantidad: number;
    }>;
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

export async function registerUser(nombre: string, email: string, password: string, avatarUrl?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, avatarUrl }),
    })

    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Error al registrar usuario')
    }
    return result
}

//
export async function fetchProducts(token?: string): Promise<Product[]> {
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/products`, { headers });
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

export interface BatchRequest {
    idProducto: string;
    fechaVencimiento: string;
    cantidad: number;
    numeroLote: string;
    idSucursal: string;
}

export async function createBatch(batchData: BatchRequest, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/batches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(batchData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al registrar el lote');
    }

    return result;
}
export async function fetchBatches(productId?: string, token?: string): Promise<any[]> {
    const url = productId ? `${API_BASE_URL}/batches?idProducto=${productId}` : `${API_BASE_URL}/batches`;
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error('Error al obtener lotes');
    }
    const result = await response.json();
    return result.data;
}

export async function deleteBatch(batchId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/batches/${batchId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar el lote');
    }

    return result;
}
// --- Reports & Stats ---

export interface SalesReport {
    summary: {
        totalVendido: number;
        cantidadTransacciones: number;
        promedioVenta: number;
    };
    topProducts: Array<{
        nombre: string;
        cantidadVendida: number;
    }>;
}

export interface Alert {
    id: string;
    tipo: 'expirado' | 'stock_bajo' | 'otro';
    mensaje: string;
    fecha: string;
    idProducto: string;
    producto?: Product;
}

export async function fetchSalesReport(token: string, days: number = 30): Promise<SalesReport> {
    const response = await fetch(`${API_BASE_URL}/reports/sales-summary?days=${days}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return result;
}

export async function fetchStockReport(token: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/reports/stock`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return result.data;
}

export async function fetchExpiringReport(token: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/reports/expiring`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return result.data;
}

export async function fetchExpiredReport(token: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/reports/expired`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return result.data;
}

export async function fetchAlerts(token: string): Promise<Alert[]> {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return result.data;
}

export async function triggerAlertCheck(token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/alerts/check`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
}

export async function fetchUsers(token: string): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
        throw new Error('Error al obtener usuarios');
    }
    const result: ApiResponse<User[]> = await response.json();
    return result.data;
}

export async function deleteUserAPI(userId: string, token: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await response.json();
    if (!response.ok) {
        return { success: false, message: result.message || 'Error al eliminar usuario' };
    }
    return { success: true, message: result.message || 'Usuario eliminado correctamente' };
}

export async function createUserAPI(userData: Partial<User> & { password?: string }, token: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al crear usuario');
    }
    return result;
}

export async function updateUserAPI(userId: string, userData: Partial<User>, token: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar usuario');
    }
    return result;
}
