/**
 * Ejemplos de uso del módulo de API de Destinos
 * 
 * Este archivo muestra cómo usar las funciones de la API de destinos
 * con el hook useApi para manejar estados de carga y errores.
 */

import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import {
    getAllDestinations,
    getDestinationById,
    getDestinationsByCategory,
    visitDestination,
    type Destination
} from "@/lib/api/destinations";
import { useEffect } from "react";

// ========== EJEMPLO 1: Listar todos los destinos ==========
export function DestinationsList() {
    const { data, loading, error, execute } = useApi(getAllDestinations);

    // Cargar destinos al montar el componente
    useEffect(() => {
        execute();
    }, []);

    if (loading) return <div>Cargando destinos...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Total de destinos: {data?.total}</h2>
            {data?.destinos.map((destino) => (
                <div key={destino.id}>
                    <h3>{destino.nombre}</h3>
                    <p>{destino.descripcion}</p>
                    <span>Categoría: {destino.categoria}</span>
                    <span>Puntos: {destino.puntos_otorgados}</span>
                </div>
            ))}
        </div>
    );
}

// ========== EJEMPLO 2: Ver detalle de un destino ==========
export function DestinationDetail({ destinoId }: { destinoId: number }) {
    const { data, loading, error, execute } = useApi(getDestinationById);

    useEffect(() => {
        execute(destinoId);
    }, [destinoId]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Destino no encontrado</div>;

    return (
        <div>
            <h1>{data?.destino.nombre}</h1>
            <img src={data?.destino.imagen_url} alt={data?.destino.nombre} />
            <p>{data?.destino.descripcion}</p>
        </div>
    );
}

// ========== EJEMPLO 3: Filtrar por categoría ==========
export function DestinationsByCategory({ categoria }: { categoria: string }) {
    const { data, loading, execute } = useApi(getDestinationsByCategory);

    useEffect(() => {
        execute(categoria);
    }, [categoria]);

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Categoría: {data?.categoria}</h2>
            <p>Encontrados: {data?.total} destinos</p>
            {/* Renderizar destinos... */}
        </div>
    );
}

// ========== EJEMPLO 4: Marcar destino como visitado ==========
export function VisitButton({ destinoId }: { destinoId: number }) {
    const { loading, error, execute } = useApi(visitDestination);
    const { toast } = useToast();

    const handleVisit = async () => {
        try {
            const result = await execute(destinoId);
            toast({
                title: "¡Felicitaciones!",
                description: `Has ganado ${result.puntos_ganados} puntos. Nivel: ${result.nuevo_nivel}`,
            });
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.error || "No se pudo registrar la visita",
                variant: "destructive",
            });
        }
    };

    return (
        <button onClick={handleVisit} disabled={loading}>
            {loading ? "Registrando..." : "Marcar como visitado"}
        </button>
    );
}

// ========== EJEMPLO 5: Uso directo sin hook (para casos específicos) ==========
async function fetchDestinationsDirectly() {
    try {
        const response = await getAllDestinations();
        console.log("Destinos:", response.destinos);
        console.log("Total:", response.total);
    } catch (error) {
        console.error("Error al obtener destinos:", error);
    }
}
