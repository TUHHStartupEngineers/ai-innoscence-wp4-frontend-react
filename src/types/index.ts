export interface Entity {
    id?: number;
    entity_name: string;
    ecosystem_role: string;
    brief_description?: string;
    ce_activities?: string[];
    ce_activities_structured?: any;
    capabilities_offered?: any;
    needs_requirements?: any;
    partners?: string[];
    latitude?: number;
    longitude?: number;
    url?: string;
    address?: string;
    extraction_confidence?: number;
}

export interface Relationship {
    source_entity: string;
    target_entity: string;
    relationship_type: string;
    evidence?: string;
    confidence: number;
    source_url?: string;
    target_url?: string;
}

export interface Cluster {
    cluster_id: string;
    cluster_name: string;
    cluster_type: string;
    description: string;
    entities: string[];
    // Dynamic subgroups
    grouped_entities?: {
        activities: string[];
        capabilities: string[];
        needs: string[];
    };
    items?: string[];
}

export interface Insight {
    insight_type: string;
    title: string;
    description: string;
    entities_involved: string[];
    confidence: number;
    priority: string;
}

export interface EcosystemData {
    entities: Entity[];
    relationships: Relationship[];
    clusters: Cluster[];
    insights: Insight[];
}

export type EcosystemName = 'Hamburg' | 'Novi Sad' | 'Cahul';

export const ECOSYSTEMS: Record<EcosystemName, { name: string; country: string; jsonPath: string; center: [number, number]; zoom: number }> = {
    "Hamburg": {
        name: "Hamburg",
        country: "Germany",
        jsonPath: "/data/hamburg.json",
        center: [53.5511, 9.9937],
        zoom: 11
    },
    "Novi Sad": {
        name: "Novi Sad",
        country: "Serbia",
        jsonPath: "/data/novi_sad.json",
        center: [45.2671, 19.8335],
        zoom: 12
    },
    "Cahul": {
        name: "Cahul",
        country: "Moldova",
        jsonPath: "/data/cahul.json",
        center: [45.9042, 28.1994],
        zoom: 13
    }
};
