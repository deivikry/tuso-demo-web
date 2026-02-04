import { Destination } from "@/lib/api/destinations";

interface Visit extends Destination {
    visit_date: string;
}

/**
 * Hook personalizado para calcular estadísticas y filtrar destinos.
 * 
 * Separa la lógica de presentación de la lógica de negocio/cálculo.
 * 
 * @param historial Lista de visitas del usuario
 * @param allDestinations Catálogo completo de destinos
 */
export const useDestinationStats = (
    historial: Visit[],
    allDestinations: Destination[] = []
) => {
    // 1. Contar visitas por destino
    const visitsCount = historial.reduce((acc, visit) => {
        acc[visit.id] = (acc[visit.id] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    // 2. Obtener IDs visitados
    const visitedIds = Object.keys(visitsCount).map(Number);

    // 3. Filtrar lugares nuevos (no visitados)
    const newPlaces = allDestinations.filter(d => !visitedIds.includes(d.id));

    // 4. Obtener lista única de lugares visitados con sus detalles
    // Se usa un Map para asegurar unicidad por ID de forma eficiente
    const uniqueVisitedPlaces = Array.from(
        new Map(historial.map(item => [item.id, item])).values()
    );

    return {
        visitsCount,
        visitedIds,
        newPlaces,
        uniqueVisitedPlaces
    };
};
