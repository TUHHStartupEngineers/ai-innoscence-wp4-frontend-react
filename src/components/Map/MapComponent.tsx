import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { type Entity, ECOSYSTEMS } from '../../types';

interface MapComponentProps {
    entities: Entity[];
    ecosystemConfig: typeof ECOSYSTEMS['Hamburg'];
    height?: string;
}

// Component to handle map view updates
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ entities, ecosystemConfig, height = "500px" }) => {
    // Filter entities with valid coordinates
    const markers = entities.filter(e => e.latitude && e.longitude);

    const getRoleColor = (role: string) => {
        // Matching the original colors roughly
        const colors: Record<string, string> = {
            'Industry Partners': '#0080FF',
            'Higher Education Institutions': '#FF8C00',
            'Startups and Entrepreneurs': '#E91E63',
            'Non-Governmental Organizations': '#9B59B6',
            'Research Institutes': '#E74C3C',
            'Researchers': '#F1C40F',
            'Media and Communication Partners': '#1ABC9C',
            'Citizen Associations': '#E67E22',
            'End-Users': '#95A5A6',
            'Public Authorities': '#34495E',
            'Knowledge and Innovation Communities': '#8E44AD',
            'Students': '#FFC107',
            'Policy Makers': '#C0392B',
            'Funding Bodies': '#673AB7',
        };
        return colors[role] || '#888888';
    };

    return (
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0" style={{ height }}>
            <MapContainer
                center={ecosystemConfig.center as [number, number]}
                zoom={ecosystemConfig.zoom}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true} // Enable zoom
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <MapUpdater center={ecosystemConfig.center as [number, number]} zoom={ecosystemConfig.zoom} />

                {markers.map((entity, idx) => (
                    <CircleMarker
                        key={idx}
                        center={[entity.latitude!, entity.longitude!] as [number, number]}
                        radius={8}
                        pathOptions={{
                            color: 'white',
                            weight: 1,
                            fillColor: getRoleColor(entity.ecosystem_role),
                            fillOpacity: 0.8
                        }}
                    >
                        <Popup>
                            <div className="flex flex-col gap-1 min-w-[200px]">
                                <strong className="text-sm font-semibold text-gray-900">{entity.entity_name}</strong>
                                <span className="text-xs font-medium text-primary px-2 py-0.5 bg-primary/10 rounded-full w-fit">
                                    {entity.ecosystem_role}
                                </span>
                                {entity.ce_activities && entity.ce_activities.length > 0 && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                        {entity.ce_activities.join(", ")}
                                    </p>
                                )}
                                {entity.url && (
                                    <a href={entity.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1">
                                        Visit Website
                                    </a>
                                )}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
