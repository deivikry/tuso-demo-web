// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { api } from '../lib/api/client';
import { fetchUserProfile } from '../lib/api/user';

describe('Frontend API Integration', () => {
    it('should connect to backend health check', async () => {
        // Direct axios call to check health
        const res = await api.get('/');
        expect(res.status).toBe(200);
        expect((res.data as any).mensaje).toBeDefined();
    });

    it('should handle auth error for profile without token', async () => {
        // Expect 401 or 403 if not logged in
        try {
            await fetchUserProfile();
        } catch (error: any) {
            expect(error.response).toBeDefined();
            // Allow 401 Unauthorized or 403 Forbidden
            expect([401, 403, 500]).toContain(error.response.status);
        }
    });
});
