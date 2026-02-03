import React, { useContext } from 'react';
import { AppContext } from '../components/Layout/AppShell';
import { ExternalLink, Link2 } from 'lucide-react';

const Partnerships: React.FC = () => {
    const context = useContext(AppContext);

    if (!context || context.loading) return <div className="p-20 text-center">Loading...</div>;

    const [searchTerm, setSearchTerm] = React.useState('');

    const totalPartnerships = context.data.relationships.filter((r: any) => r.relationship_type === 'partnership');

    const partnerships = totalPartnerships.filter((r: any) =>
    (searchTerm === '' ||
        r.source_entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.target_entity.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="pb-20">
            <div className="hero-gradient pt-20 pb-16 px-5 lg:px-0 mb-12 border-b border-gray-100/50">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-4xl font-bold text-brand-secondary mb-4">Verified Partnerships</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mb-8">Collaborations and partnerships identified within the ecosystem.</p>

                    {/* Search Bar - only show if there are partnerships to search */}
                    {totalPartnerships.length > 0 && (
                        <div className="max-w-md bg-white p-2 rounded-full border border-gray-200 shadow-sm flex items-center">
                            <input
                                type="text"
                                placeholder="Search by entity name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 grid gap-8">
                {totalPartnerships.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No partnership data available for this ecosystem yet.</p>
                    </div>
                ) : partnerships.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No partnerships found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    partnerships.map((rel: any, idx: number) => (
                        <div key={idx} className="premium-card p-10 border-l-4 border-brand-primary">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                                <div className="flex-1 flex flex-col md:flex-row items-center gap-6 w-full">
                                    <div className="flex-1 w-full p-6 bg-brand-background rounded-xl text-center font-bold text-xl text-brand-secondary shadow-sm">
                                        {rel.source_entity}
                                    </div>

                                    <div className="bg-white p-3 rounded-full text-brand-primary shadow-sm border border-gray-100">
                                        <Link2 size={24} />
                                    </div>

                                    <div className="flex-1 w-full p-6 bg-brand-background rounded-xl text-center font-bold text-xl text-brand-secondary shadow-sm">
                                        {rel.target_entity}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end min-w-[120px]">
                                    <div className="text-right">
                                        <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Confidence</span>
                                        <span className="text-2xl font-bold text-brand-primary">
                                            {(rel.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {rel.evidence && (
                                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-base text-gray-600 italic leading-relaxed">
                                        "{rel.evidence}"
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end">
                                {(rel.source_url || rel.target_url) && (
                                    <a
                                        href={rel.source_url || rel.target_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#f1f1f1] text-sm font-bold text-gray-600 hover:bg-brand-secondary hover:text-white transition-all"
                                    >
                                        Verify Source <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )))}
            </div>
        </div>
    );
};

export default Partnerships;
