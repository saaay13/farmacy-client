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
    activo?: boolean;
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
    promociones?: Array<{
        id: string;
        porcentajeDescuento: number;
        fechaInicio: string;
        fechaFin: string;
    }>;
}

export interface Category {
    id: string;
    nombre: string;
    descripcion: string;
    activo?: boolean;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
export interface Branch {
    idSucursal: string;
    nombre: string;
    direccion: string;
    detalles?: string;
}
export interface User {
    id: string
    nombre: string
    rol: 'admin' | 'farmaceutico' | 'vendedor' | 'cliente' | 'guest'
    email: string
    activo?: boolean
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
export async function fetchProducts(token?: string, includeDeactivated: boolean = false): Promise<Product[]> {
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const query = includeDeactivated ? '?includeDeactivated=true' : '';
    const response = await fetch(`${API_BASE_URL}/products${query}`, { headers });
    if (!response.ok) {
        throw new Error('Error al obtener productos');
    }
    const result: ApiResponse<Product[]> = await response.json();
    return result.data;
}

export async function createProductAPI(productData: Partial<Product>, token: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al crear producto');
    }
    return result.data;
}

export async function updateProductAPI(productId: string, productData: Partial<Product>, token: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar producto');
    }
    return result.data;
}

export async function deleteProductAPI(productId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar producto');
    }
    return result;
}

export async function restoreProductAPI(productId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/restore`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al restaurar producto');
    }
    return result;
}

export async function fetchCategories(includeDeactivated: boolean = false): Promise<Category[]> {
    const query = includeDeactivated ? '?includeDeactivated=true' : '';
    const response = await fetch(`${API_BASE_URL}/categories${query}`);
    if (!response.ok) {
        throw new Error('Error al obtener categorías');
    }
    const result: ApiResponse<Category[]> = await response.json();
    return result.data;
}

export async function restoreCategoryAPI(id: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}/restore`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al restaurar categoría');
    return result;
}

export async function createCategoryAPI(name: string, token: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: name })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al crear categoría');
    return result.data;
}

export async function updateCategoryAPI(id: string, name: string, token: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: name })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al actualizar categoría');
    return result.data;
}

export async function deleteCategoryAPI(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al eliminar categoría');
}

export async function fetchBranches(token?: string, includeDeactivated: boolean = false): Promise<Branch[]> {
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const query = includeDeactivated ? '?includeDeactivated=true' : '';
    const response = await fetch(`${API_BASE_URL}/branches${query}`, { headers });
    if (!response.ok) {
        throw new Error('Error al obtener sucursales');
    }

    const result: ApiResponse<Branch[]> = await response.json();
    return result.data;
}

export async function createBranchAPI(branchData: Partial<Branch>, token: string): Promise<Branch> {
    const response = await fetch(`${API_BASE_URL}/branches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(branchData)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al crear sucursal');
    return result.data;
}

export async function updateBranchAPI(id: string, branchData: Partial<Branch>, token: string): Promise<Branch> {
    const response = await fetch(`${API_BASE_URL}/branches/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(branchData)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al actualizar sucursal');
    return result.data;
}

export async function deleteBranchAPI(id: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/branches/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al desactivar sucursal');
    return result;
}

export async function restoreBranchAPI(id: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/branches/${id}/restore`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al reactivar sucursal');
    return result;
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
export async function fetchBatches(productId?: string, token?: string, includeDeactivated: boolean = false): Promise<any[]> {
    let url = productId ? `${API_BASE_URL}/batches?idProducto=${productId}` : `${API_BASE_URL}/batches`;
    if (includeDeactivated) {
        url += (url.includes('?') ? '&' : '?') + 'includeDeactivated=true';
    }
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

export async function restoreBatchAPI(batchId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/batches/${batchId}/restore`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al restaurar el lote');
    }
    return result;
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

export interface ProductSalesData {
    idProducto: string;
    nombre: string;
    categoria: string;
    precioActual: number;
    cantidadTotal: number;
    ingresosTotales: number;
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

export async function fetchSalesByProductReport(token: string): Promise<ProductSalesData[]> {
    const response = await fetch(`${API_BASE_URL}/reports/sales-by-product`, {
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

export async function fetchUsers(token: string, includeDeactivated: boolean = false): Promise<User[]> {
    const query = includeDeactivated ? '?includeDeactivated=true' : '';
    const response = await fetch(`${API_BASE_URL}/users${query}`, {
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

export async function restoreUserAPI(userId: string, token: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/restore`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await response.json();
    if (!response.ok) {
        return { success: false, message: result.message || 'Error al restaurar usuario' };
    }
    return { success: true, message: result.message || 'Usuario restaurado correctamente' };
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

export async function updateUserAPI(userId: string, userData: Partial<User> & { password?: string }, token: string): Promise<ApiResponse<User>> {
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

export async function deleteAlertAPI(alertId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar alerta');
    }
    return result;
}

export async function fetchPromotions(token?: string, aprobada?: boolean): Promise<any[]> {
    const query = aprobada !== undefined ? `?aprobada=${aprobada}` : '';
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/promotions${query}`, { headers });
    const result = await response.json();
    return result.data;
}

export async function createPromotionAPI(promoData: any, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/promotions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(promoData)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al crear promoción');
    return result.data;
}

export async function approvePromotionAPI(promoId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/promotions/${promoId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al aprobar promoción');
    return result.data;
}

export async function deletePromotionAPI(promoId: string, token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/promotions/${promoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al eliminar promoción');
    return result;
}

export async function fetchCustomers(token: string): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users?rol=cliente`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Error al obtener clientes');
    const result: ApiResponse<User[]> = await response.json();
    return result.data;
}
