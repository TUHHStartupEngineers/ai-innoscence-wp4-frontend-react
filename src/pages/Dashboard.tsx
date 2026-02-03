import React, { useContext } from 'react';
import { AppContext } from '../components/Layout/AppShell';
import MapComponent from '../components/Map/MapComponent';
import { ECOSYSTEMS, type EcosystemName } from '../types';
import StatsCard from '../components/UI/StatsCard';
import { Users, Network, Layers, MapPin } from 'lucide-react';

const Dashboard: React.FC = () => {
    const context = useContext(AppContext);

    if (!context || context.loading) return <div className="p-20 text-center text-gray-500 font-medium text-lg">Loading ecosystem data...</div>;
    if (!context.data) return <div className="p-20 text-center text-red-500 font-medium">Error loading data</div>;

    const { data, currentEcosystem } = context;
    const config = ECOSYSTEMS[currentEcosystem as EcosystemName];

    // Stats
    const entityCount = data.entities?.length || 0;
    const mappedCount = data.entities?.filter((e: any) => e.latitude && e.longitude).length || 0;
    const partnershipCount = data.relationships?.filter((r: any) => r.relationship_type === 'partnership').length || 0;
    const clusterCount = data.clusters?.length || 0;

    return (
        <div className="fade-in pb-20">

            {/* Hero Section with Exact Gradient */}
            <section className="hero-gradient pt-24 pb-20 px-5 lg:px-0 text-center mb-16 border-b border-gray-100/50">
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="text-5xl font-bold text-brand-secondary mb-6 leading-tight tracking-tight">
                        {config.name} Ecosystem Map
                    </h1>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                        Explore the innovation landscape, identify circular economy stakeholders, and uncover new collaboration opportunities in {config.country}.
                    </p>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 -mt-32 relative z-10">
                    <StatsCard label="Total Entities" value={entityCount} icon={Users} color="primary" />
                    <StatsCard label="Mapped Entities" value={mappedCount} icon={MapPin} color="secondary" />
                    <StatsCard label="Partnerships" value={partnershipCount} icon={Network} color="primary" />
                    <StatsCard label="Clusters" value={clusterCount} icon={Layers} color="secondary" />
                </div>

                {/* Map Section */}
                <div className="premium-card p-0 overflow-hidden mb-16">
                    <div className="p-10 border-b border-gray-50 bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-brand-secondary mb-2">Geographic Distribution</h2>
                                <p className="text-gray-500">Interactive overview of ecosystem actors</p>
                            </div>
                            <div className="hidden sm:block px-4 py-2 bg-brand-background rounded-full text-brand-secondary text-sm font-semibold">
                                {mappedCount} Locations
                            </div>
                        </div>
                    </div>
                    <div className="h-[600px] w-full">
                        <MapComponent entities={data.entities || []} ecosystemConfig={config} height="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
