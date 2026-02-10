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

    // Distinct color palette for ecosystem roles
    const roleColors: Record<string, string> = {
        'Industry Partners': '#1f77b4', // Blue
        'Higher Education Institutions': '#ff7f0e', // Orange
        'Startups and Entrepreneurs': '#2ca02c', // Green
        'Non-Governmental Organizations': '#d62728', // Red
        'Research Institutes': '#9467bd', // Purple
        'Researchers': '#8c564b', // Brown
        'Media and Communication Partners': '#e377c2', // Pink
        'Citizen Associations': '#7f7f7f', // Gray
        'Public Authorities': '#bcbd22', // Olive
        'Knowledge and Innovation Communities': '#17becf', // Cyan
        'Policy Makers': '#393b79', // Dark Blue
        'Funding Bodies': '#637939', // Dark Green
        'End-Users': '#8c6d31', // Dark Gold
        'Students': '#843c39' // Dark Red
    };

    const getRoleColor = (role: string) => {
        return roleColors[role] || '#888888';
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

                {Object.entries(
                    markers.reduce((acc, entity) => {
                        const key = `${entity.latitude},${entity.longitude}`;
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(entity);
                        return acc;
                    }, {} as Record<string, Entity[]>)
                ).map(([posKey, group]) => {
                    const mainEntity = group[0];
                    return (
                        <CircleMarker
                            key={posKey}
                            center={[mainEntity.latitude!, mainEntity.longitude!] as [number, number]}
                            radius={8}
                            pathOptions={{
                                color: 'white',
                                weight: 1,
                                fillColor: getRoleColor(mainEntity.ecosystem_role),
                                fillOpacity: 0.8
                            }}
                        >
                            <Popup>
                                <div className="flex flex-col gap-2 min-w-[200px] max-h-[300px] overflow-y-auto">
                                    {group.map((entity, i) => (
                                        <div key={i} className={`flex flex-col gap-1 ${i < group.length - 1 ? 'border-b border-gray-100 pb-2 mb-2' : ''}`}>
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
                                    ))}
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}

                {/* Legend Overlay */}
                <div className="leaflet-bottom leaflet-right" style={{ marginBottom: '20px', marginRight: '20px', pointerEvents: 'auto' }}>
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-xs max-h-[300px] overflow-y-auto">
                        <h4 className="font-bold mb-2 text-gray-700">Ecosystem Roles</h4>
                        <div className="flex flex-col gap-1.5">
                            {Object.entries(roleColors).map(([role, color]) => (
                                <div key={role} className="flex items-center gap-2">
                                    <span
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                    <span className="text-gray-600">{role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
