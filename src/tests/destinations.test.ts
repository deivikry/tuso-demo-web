// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
    getAllDestinations,
    getDestinationById,
    getDestinationsByCategory
} from '../lib/api/destinations';

describe('Destinations API Integration', () => {
    it('should fetch all destinations', async () => {
        const response = await getAllDestinations();
        expect(response).toHaveProperty('destinos');
        expect(response).toHaveProperty('total');
        expect(Array.isArray(response.destinos)).toBe(true);
    });

    it('should fetch destination by id', async () => {
        // Assuming destination with id 1 exists
        try {
            const response = await getDestinationById(1);
            expect(response).toHaveProperty('destino');
            expect(response.destino).toHaveProperty('id');
            expect(response.destino).toHaveProperty('nombre');
        } catch (error: any) {
            // If no destinations exist, expect 404
            expect([404, 500]).toContain(error.response?.status);
        }
    });

    it('should fetch destinations by category', async () => {
        try {
            const response = await getDestinationsByCategory('naturaleza');
            expect(response).toHaveProperty('categoria');
            expect(response).toHaveProperty('destinos');
            expect(response.categoria).toBe('naturaleza');
        } catch (error: any) {
            // Allow errors if category doesn't exist
            expect(error.response).toBeDefined();
        }
    });
});
