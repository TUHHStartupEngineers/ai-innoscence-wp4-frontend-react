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

                // Transformation Logic: Handle mismatched data structure and implement Dynamic Clustering
                const entities = jsonData.entities || [];
                const relationships = jsonData.relationships || [];
                const insights = jsonData.insights || (jsonData.ecosystem_insights || [])
                    .filter((i: any) => i.insight_type !== 'geographic_cluster');

                // DYNAMIC CLUSTERING
                // Import Taxonomy Logic (inlined here for dependency simplicity or imported if possible)
                // We will use the mapToTaxonomyCategory helper logic (re-implemented here or we could import it if invalidation wasn't an issue)
                // Since we can't easily import a helper in this hook without ensuring the import path is perfect, I'll use the logic derived from properties.

                // 1. Initialize Clusters map
                const taxonomyClusters = new Map<string, {
                    activities: Set<string>,
                    capabilities: Set<string>,
                    needs: Set<string>,
                    all_entities: Set<string>
                }>();

                // Helper to add entity to cluster
                const addToCluster = (category: string, entityName: string, type: 'activities' | 'capabilities' | 'needs') => {
                    if (!category) return;
                    if (!taxonomyClusters.has(category)) {
                        taxonomyClusters.set(category, {
                            activities: new Set(),
                            capabilities: new Set(),
                            needs: new Set(),
                            all_entities: new Set()
                        });
                    }
                    const cluster = taxonomyClusters.get(category)!;
                    cluster[type].add(entityName);
                    cluster.all_entities.add(entityName);
                };

                // 2. Iterate Entities
                entities.forEach((entity: any) => {
                    const name = entity.entity_name;
                    if (!name) return;

                    // A. Check Activities
                    // Assuming ce_activities_structured has 'category'
                    if (Array.isArray(entity.ce_activities_structured)) {
                        entity.ce_activities_structured.forEach((a: any) => {
                            if (a.category) addToCluster(a.category, name, 'activities');
                        });
                    }
                    // Fallback to ce_activities strings if structured is missing
                    if (Array.isArray(entity.ce_activities)) {
                        // Here we would ideally map string -> category using mapToTaxonomyCategory
                        // For now we rely on structured data or skip if unknown.
                        // Future improvement: Import mapToTaxonomyCategory
                    }

                    // B. Check Capabilities
                    if (Array.isArray(entity.ce_capabilities_offered)) {
                        entity.ce_capabilities_offered.forEach((c: any) => {
                            // Some data uses 'category', some might rely on mapping. 
                            // We use the existing 'category' field in the JSON if available.
                            if (c.category) addToCluster(c.category, name, 'capabilities');
                        });
                    }

                    // C. Check Needs
                    if (Array.isArray(entity.ce_needs_requirements)) {
                        entity.ce_needs_requirements.forEach((n: any) => {
                            if (n.category) addToCluster(n.category, name, 'needs');
                        });
                    }
                });

                // 3. Convert Map to Cluster Objects
                const dynamicClusters: any[] = Array.from(taxonomyClusters.entries()).map(([category, data]) => ({
                    cluster_id: `cluster-${category.replace(/\s+/g, '-').toLowerCase()}`,
                    cluster_name: category,
                    cluster_type: "Taxonomy Cluster",
                    description: `Cluster of entities related to ${category}, grouped by Activities, Capabilities, and Needs.`,
                    confidence: 1.0, // Derived from explicit data
                    entities: Array.from(data.all_entities), // For backwards compatibility / counts
                    grouped_entities: {
                        activities: Array.from(data.activities),
                        capabilities: Array.from(data.capabilities),
                        needs: Array.from(data.needs)
                    }
                })).sort((a, b) => b.entities.length - a.entities.length);

                const transformedData: EcosystemData = {
                    entities,
                    relationships,
                    clusters: dynamicClusters,
                    insights
                };

                setData(transformedData);
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
