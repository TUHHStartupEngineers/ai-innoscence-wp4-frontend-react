import React, { useContext } from 'react';
import { AppContext } from '../components/Layout/AppShell';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

const Insights: React.FC = () => {
    const context = useContext(AppContext);

    if (!context || context.loading) return <div className="p-20 text-center">Loading...</div>;

    const getStyle = (type: string) => {
        switch (type.toLowerCase()) {
            case 'gap': return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' };
            case 'synergy': return { icon: TrendingUp, color: 'text-brand-primary', bg: 'bg-brand-background' };
            case 'recommendation': return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' };
            default: return { icon: Lightbulb, color: 'text-orange-500', bg: 'bg-orange-50' };
        }
    };

    const [filter, setFilter] = React.useState<string>('all');

    const filteredInsights = context.data.insights.filter((insight: any) =>
        filter === 'all' || insight.insight_type.toLowerCase() === filter
    );

    const tabs = [
        { id: 'all', label: 'All Insights' },
        { id: 'gap', label: 'Gaps' },
        { id: 'synergy', label: 'Synergies' },
        { id: 'recommendation', label: 'Recommendations' },
    ];

    return (
        <div className="pb-20">
            <div className="hero-gradient pt-20 pb-16 px-5 lg:px-0 mb-12 border-b border-gray-100/50">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-4xl font-bold text-brand-secondary mb-4">Ecosystem Insights</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mb-8">AI-generated analysis of the ecosystem's strengths, gaps, and opportunities.</p>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setFilter(tab.id)}
                                className={clsx(
                                    "px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm border",
                                    filter === tab.id
                                        ? "bg-brand-primary text-white border-brand-primary"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 grid gap-8">
                {filteredInsights.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No insights found for this category.</p>
                    </div>
                ) : (
                    filteredInsights.map((insight: any, idx: number) => {
                        const style = getStyle(insight.insight_type);
                        const Icon = style.icon;

                        return (
                            <div key={idx} className="premium-card flex flex-col md:flex-row gap-8 items-start p-10">
                                <div className={clsx("p-6 rounded-2xl flex-shrink-0 shadow-sm", style.bg)}>
                                    <Icon className={style.color} size={40} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-brand-secondary">{insight.title}</h3>
                                        <span className={clsx("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest", style.bg, style.color)}>
                                            {insight.insight_type}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        {insight.description}
                                    </p>

                                    {insight.entities_involved && insight.entities_involved.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Entities Involved</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {insight.entities_involved.map((e: string, i: number) => (
                                                    <span key={i} className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg hover:bg-brand-background hover:text-brand-secondary transition-colors cursor-default border border-gray-100">
                                                        {e}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }))}
            </div>
        </div>
    );
};

export default Insights;
