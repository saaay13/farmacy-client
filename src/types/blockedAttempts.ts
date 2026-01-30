// Types for Blocked Attempts API

export interface BlockedAttempt {
    id: string;
    idVendedor: string;
    idCliente: string | null;
    fecha: string;
    motivo: 'PRODUCTO_VENCIDO' | 'REQUIERE_RECETA' | 'STOCK_INSUFICIENTE' | 'PRODUCTO_INACTIVO';
    idProducto: string;
    idLote: string | null;
    cantidadIntento: number;
    mensaje: string;
    motivoLegible?: string;
    esReciente?: boolean;
    resumen?: string;
    vendedor?: {
        nombre: string;
        email: string;
        rol: string;
    };
    cliente?: {
        nombre: string;
        email: string;
    };
    producto?: {
        nombre: string;
        precio: number;
        requiereReceta: boolean;
    };
    lote?: {
        numeroLote: string;
        fechaVencimiento: string;
    };
}

export interface BlockedAttemptsResponse {
    success: boolean;
    title: string;
    count: number;
    data: BlockedAttempt[];
}

export interface BlockedAttemptsStats {
    totalIntentos: number;
    porMotivo: Array<{
        motivo: string;
        cantidad: number;
        porcentaje: string;
    }>;
    topVendedores: Array<{
        vendedor: string;
        email: string;
        rol: string;
        intentos: number;
    }>;
    topProductos: Array<{
        producto: string;
        requiereReceta: boolean;
        intentos: number;
    }>;
}

export interface BlockedAttemptsStatsResponse {
    success: boolean;
    title: string;
    data: BlockedAttemptsStats;
}

export interface BlockedAttemptsFilters {
    motivo?: string;
    idVendedor?: string;
    desde?: string;
    hasta?: string;
}
