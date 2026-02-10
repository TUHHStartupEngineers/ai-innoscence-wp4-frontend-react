import React, { useContext, useState } from 'react';
import { AppContext } from '../components/Layout/AppShell';
import { CollaborationGuide } from '../components/CollaborationGuide';
import { CE_ACTIVITIES_TAXONOMY, mapToTaxonomyCategory } from '../types/taxonomy';
import { Zap, Target, Activity as ActivityIcon } from 'lucide-react';
import { clsx } from 'clsx';

const Collaboration: React.FC = () => {
    const context = useContext(AppContext);
    const [activeTab, setActiveTab] = useState<'activities' | 'capabilities' | 'needs'>('activities');

    if (!context || context.loading) return <div className="p-20 text-center">Loading...</div>;

    const { data } = context;

    return (
        <div className="pb-20">
            <div className="hero-gradient pt-20 pb-16 px-5 lg:px-0 mb-12 border-b border-gray-100/50">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-4xl font-bold text-brand-secondary mb-4">Collaboration Finder</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mb-8">
                        Find opportunities by browsing activities, capabilities or needs.
                    </p>

                    {/* Main Tabs */}
                    <div className="flex flex-wrap gap-2">
                        <TabButton
                            label="Activities"
                            icon={ActivityIcon}
                            active={activeTab === 'activities'}
                            onClick={() => setActiveTab('activities')}
                        />
                        <TabButton
                            label="Capabilities"
                            icon={Zap}
                            active={activeTab === 'capabilities'}
                            onClick={() => setActiveTab('capabilities')}
                        />
                        <TabButton
                            label="Needs"
                            icon={Target}
                            active={activeTab === 'needs'}
                            onClick={() => setActiveTab('needs')}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
                <CollaborationGuide />
                {activeTab === 'activities' && <ActivitiesBrowser entities={data.entities} />}
                {activeTab === 'capabilities' && <CapabilitiesBrowser entities={data.entities} />}
                {activeTab === 'needs' && <NeedsBrowser entities={data.entities} />}
            </div>
        </div>
    );
};

// Helper Components
const TabButton = ({ label, icon: Icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={clsx(
            "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm border",
            active
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
        )}
    >
        <Icon size={18} />
        {label}
    </button>
);

const ActivitiesBrowser = ({ entities }: { entities: any[] }) => {
    const categories = Object.keys(CE_ACTIVITIES_TAXONOMY);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedActivity, setSelectedActivity] = useState<string>('');

    const availableActivities = selectedCategory ? CE_ACTIVITIES_TAXONOMY[selectedCategory] : [];

    const filteredEntities = entities.filter(e => {
        if (!selectedCategory && !selectedActivity) return false;

        // FIX: Use ce_activities (array of strings) instead of ce_activities_parsed
        const activities = e.ce_activities;
        if (!activities || !Array.isArray(activities)) return false;

        if (selectedActivity) {
            return activities.includes(selectedActivity);
        }

        // Match any in category
        return activities.some((a: string) => availableActivities.includes(a));
    });

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-secondary mb-6">Browse CE Activities Taxonomy</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                        <select
                            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-brand-primary transition-colors"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setSelectedActivity('');
                            }}
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Activity</label>
                        <select
                            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-brand-primary transition-colors"
                            value={selectedActivity}
                            onChange={(e) => setSelectedActivity(e.target.value)}
                            disabled={!selectedCategory}
                        >
                            <option value="">-- All activities in category --</option>
                            {availableActivities.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            {selectedCategory && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-brand-secondary">Matching Entities</h3>
                        <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                            {filteredEntities.length}
                        </span>
                    </div>

                    <div className="grid gap-6">
                        {filteredEntities.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium">No entities found matching selection.</p>
                            </div>
                        ) : (
                            filteredEntities.slice(0, 50).map((entity: any, idx: number) => {
                                // Filter cached activities for display to only show relevant ones
                                const matched = entity.ce_activities?.filter((a: string) =>
                                    selectedActivity ? a === selectedActivity : availableActivities.includes(a)
                                ) || [];

                                return (
                                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-brand-secondary">{entity.entity_name}</h4>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                                                {entity.ecosystem_role}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{entity.brief_description}</p>

                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Matching Activities</span>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {matched.map((m: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 bg-brand-background text-brand-primary text-xs font-semibold rounded-md">
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        {filteredEntities.length > 50 && (
                            <div className="text-center text-gray-500 text-sm py-4">
                                Showing first 50 entities. Refine selection to see more.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const CapabilitiesBrowser = ({ entities }: { entities: any[] }) => {
    // 1. Map all capabilities to STRICT Taxonomy Categories
    const allCapabilities = React.useMemo(() => {
        return entities.flatMap(e => {
            const caps = Array.isArray(e.ce_capabilities_offered) ? e.ce_capabilities_offered : [];
            return caps.map((c: any) => {
                // Try to map existing category or capability name to Taxonomy
                const mappedCategory = mapToTaxonomyCategory(c.category) || mapToTaxonomyCategory(c.capability_name);

                return {
                    ...c,
                    entity_name: e.entity_name,
                    ecosystem_role: e.ecosystem_role,
                    // Use mapped category if found, otherwise mark as undefined to filter out later
                    taxonomy_category: mappedCategory
                };
            }).filter((c: any) => c.taxonomy_category !== undefined); // STRICT FILTER: remove if not in taxonomy
        });
    }, [entities]);

    // Use strict Taxonomy Categories for dropdown
    const categories = Object.keys(CE_ACTIVITIES_TAXONOMY);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const filtered = selectedCategory
        ? allCapabilities.filter((c: any) => c.taxonomy_category === selectedCategory)
        : allCapabilities;

    // Group by entity for display
    const groupedByEntity = filtered.reduce((acc: any, cap: any) => {
        if (!acc[cap.entity_name]) {
            acc[cap.entity_name] = {
                role: cap.ecosystem_role,
                caps: []
            };
        }
        acc[cap.entity_name].caps.push(cap);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-secondary mb-6">Browse Capabilities (Taxonomy Aligned)</h3>
                <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                    <select
                        className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-brand-primary transition-colors"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">-- All Taxonomy Categories --</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {Object.keys(groupedByEntity).length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No capabilities found matching selected taxonomy category.</p>
                    </div>
                ) : (
                    Object.entries(groupedByEntity).slice(0, 50).map(([name, data]: [string, any]) => (
                        <div key={name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-bold text-brand-secondary">{name}</h4>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                                    {data.role}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {data.caps.map((cap: any, i: number) => (
                                    <div key={i} className="pl-4 border-l-2 border-brand-primary/20">
                                        <p className="font-semibold text-sm text-gray-800">{cap.capability_name}</p>
                                        {cap.description && <p className="text-sm text-gray-500 mt-1">{cap.description}</p>}
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Original: {cap.category}</span>
                                            <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded">Taxonomy: {cap.taxonomy_category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const NeedsBrowser = ({ entities }: { entities: any[] }) => {
    // 1. Map all needs to STRICT Taxonomy Categories
    const allNeeds = React.useMemo(() => {
        return entities.flatMap(e => {
            const needs = Array.isArray(e.ce_needs_requirements) ? e.ce_needs_requirements : [];
            return needs.map((n: any) => {
                // Try to map existing category or need name to Taxonomy
                const mappedCategory = mapToTaxonomyCategory(n.category) || mapToTaxonomyCategory(n.need_name);

                return {
                    ...n,
                    entity_name: e.entity_name,
                    ecosystem_role: e.ecosystem_role,
                    // Use mapped category if found, otherwise mark as undefined to filter out later
                    taxonomy_category: mappedCategory
                };
            }).filter((n: any) => n.taxonomy_category !== undefined); // STRICT FILTER
        });
    }, [entities]);

    // Use strict Taxonomy Categories for dropdown
    const categories = Object.keys(CE_ACTIVITIES_TAXONOMY);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const filtered = selectedCategory
        ? allNeeds.filter((n: any) => n.taxonomy_category === selectedCategory)
        : allNeeds;

    // Group
    const groupedByEntity = filtered.reduce((acc: any, need: any) => {
        if (!acc[need.entity_name]) {
            acc[need.entity_name] = {
                role: need.ecosystem_role,
                needs: []
            };
        }
        acc[need.entity_name].needs.push(need);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-secondary mb-6">Browse Needs (Taxonomy Aligned)</h3>
                <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                    <select
                        className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-brand-primary transition-colors"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">-- All Taxonomy Categories --</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {Object.keys(groupedByEntity).length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No needs found matching selected taxonomy category.</p>
                    </div>
                ) : (
                    Object.entries(groupedByEntity).slice(0, 50).map(([name, data]: [string, any]) => (
                        <div key={name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-bold text-brand-secondary">{name}</h4>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                                    {data.role}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {data.needs.map((need: any, i: number) => (
                                    <div key={i} className="pl-4 border-l-2 border-red-200">
                                        <p className="font-semibold text-sm text-gray-800">{need.need_name}</p>
                                        {need.description && <p className="text-sm text-gray-500 mt-1">{need.description}</p>}
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Original: {need.category}</span>
                                            <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded">Taxonomy: {need.taxonomy_category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};



export default Collaboration;
