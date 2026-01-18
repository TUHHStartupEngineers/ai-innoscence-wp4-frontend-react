import { useState, useEffect } from 'react';
import { type EcosystemData, type EcosystemName, ECOSYSTEMS } from '../types';

interface UseEcosystemDataResult {
    data: EcosystemData | null;
    loading: boolean;
    error: string | null;
    currentEcosystem: EcosystemName;
    setEcosystem: (name: EcosystemName) => void;
}

export const useEcosystemData = (initialEcosystem: EcosystemName = 'Hamburg'): UseEcosystemDataResult => {
    const [currentEcosystem, setEcosystemState] = useState<EcosystemName>(initialEcosystem);
    const [data, setData] = useState<EcosystemData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const config = ECOSYSTEMS[currentEcosystem];
                // Handle GitHub Pages base path
                const baseUrl = import.meta.env.BASE_URL.endsWith('/')
                    ? import.meta.env.BASE_URL.slice(0, -1)
                    : import.meta.env.BASE_URL;
                const response = await fetch(`${baseUrl}${config.jsonPath}`);
                if (!response.ok) {
                    throw new Error(`Failed to load data for ${currentEcosystem}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentEcosystem]);

    return {
        data,
        loading,
        error,
        currentEcosystem,
        setEcosystem: setEcosystemState
    };
};
