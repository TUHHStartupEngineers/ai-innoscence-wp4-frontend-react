import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../components/Layout/AppShell';
import { Search, MapPin, Globe, Filter } from 'lucide-react';

const Entities: React.FC = () => {
    const context = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All Roles');
    const [visibleCount, setVisibleCount] = useState(50);

    const filteredEntities = useMemo(() => {
        if (!context?.data) return [];

        return context.data.entities.filter((entity: any) => {
            const matchesSearch = entity.entity_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = selectedRole === 'All Roles' || entity.ecosystem_role === selectedRole;
            return matchesSearch && matchesRole;
        });
    }, [context?.data, searchTerm, selectedRole]);

    if (!context || context.loading) return <div className="p-20 text-center text-gray-500 text-lg">Loading entities...</div>;

    const roles = ['All Roles', ...Array.from(new Set(context.data.entities.map((e: any) => e.ecosystem_role))).sort() as string[]];

    return (
        <div className="pb-20">

            {/* Header Section */}
            <div className="hero-gradient pt-20 pb-16 px-5 lg:px-0 mb-12 border-b border-gray-100/50">
                <div className="max-w-[1200px] mx-auto text-center md:text-left md:flex md:justify-between md:items-end">
                    <div>
                        <h1 className="text-4xl font-bold text-brand-secondary mb-4">Entities Registry</h1>
                        <p className="text-gray-600 text-lg max-w-2xl">
                            Explore {filteredEntities.length} organizations and stakeholders in the network.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 lg:px-0">

                {/* Filter Bar */}
                <div className="premium-card p-4 rounded-[20px] shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, activities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-gray-700 font-medium transition-all placeholder-gray-400 text-base"
                        />
                    </div>

                    <div className="h-10 w-[1px] bg-gray-200 hidden md:block"></div>

                    <div className="relative w-full md:w-[300px]">
                        <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full pl-14 pr-10 py-4 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-gray-700 font-medium appearance-none cursor-pointer"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredEntities.slice(0, visibleCount).map((entity: any, idx: number) => (
                        <div key={idx} className="premium-card p-8 flex flex-col h-full group border border-transparent hover:border-brand-primary/10">
                            <div className="flex justify-between items-start mb-6">
                                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-background text-brand-secondary mb-2">
                                    {entity.ecosystem_role}
                                </span>
                                {(entity.latitude && entity.longitude) && (
                                    <div className="p-2 bg-green-50 rounded-full text-green-600" title="Mapped Location">
                                        <MapPin size={16} fill="currentColor" className="opacity-100" />
                                    </div>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-brand-secondary mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                                {entity.entity_name}
                            </h3>

                            <p className="text-base text-gray-500 mb-8 flex-1 leading-relaxed">
                                {entity.brief_description || "No description available."}
                            </p>

                            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {entity.ce_activities && entity.ce_activities.length > 0 && (
                                        <span className="text-sm font-semibold text-brand-primary">
                                            {entity.ce_activities.length} Activities
                                        </span>
                                    )}
                                </div>

                                {entity.url && (
                                    <a
                                        href={entity.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors group-hover:translate-x-1 duration-300"
                                    >
                                        Visit <Globe size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredEntities.length > visibleCount && (
                    <div className="flex justify-center mt-16">
                        <button
                            className="btn-pill"
                            onClick={() => setVisibleCount(prev => prev + 50)}
                        >
                            Load More Entities
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Entities;
