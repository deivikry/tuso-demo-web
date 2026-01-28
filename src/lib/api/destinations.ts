import { api } from "./client";

// ========== INTERFACES ==========
export interface Destination {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    puntos_otorgados: number;
    imagen_url: string;
}

export interface DestinationsResponse {
    destinos: Destination[];
    total: number;
}

export interface DestinationDetailResponse {
    destino: Destination;
}

export interface CategoryResponse {
    categoria: string;
    destinos: Destination[];
    total: number;
}

export interface VisitResponse {
    mensaje: string;
    destino_visitado: string;
    puntos_ganados: number;
    nuevo_total: number;
    nuevo_nivel: number;
}

// ========== API FUNCTIONS ==========

/**
 * Obtener todos los destinos disponibles
 */
export const getAllDestinations = async (): Promise<DestinationsResponse> => {
    const response = await api.get<DestinationsResponse>("/api/destinations");
    return response.data;
};

/**
 * Obtener un destino específico por ID
 */
export const getDestinationById = async (id: number | string): Promise<DestinationDetailResponse> => {
    const response = await api.get<DestinationDetailResponse>(`/api/destinations/${id}`);
    return response.data;
};

/**
 * Obtener destinos filtrados por categoría
 */
export const getDestinationsByCategory = async (categoria: string): Promise<CategoryResponse> => {
    const response = await api.get<CategoryResponse>(`/api/destinations/categoria/${categoria}`);
    return response.data;
};

/**
 * Marcar un destino como visitado (requiere autenticación)
 */
export const visitDestination = async (destinationId: number | string): Promise<VisitResponse> => {
    const response = await api.post<VisitResponse>(`/api/destinations/${destinationId}/visit`);
    return response.data;
};
