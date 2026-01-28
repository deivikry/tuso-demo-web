import { useState, useCallback } from 'react';

export function useApi<T, A extends any[]>(
    apiFunc: (...args: A) => Promise<T>
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(async (...args: A) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunc(...args);
            setData(result);
            return result;
        } catch (err: any) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return { data, loading, error, execute };
}
