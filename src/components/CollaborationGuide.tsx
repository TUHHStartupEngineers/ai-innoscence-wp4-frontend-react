import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, BookOpen, Target, Zap, Activity } from 'lucide-react';

export const CollaborationGuide: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const definitions = [
        {
            term: "Activity",
            icon: Activity,
            description: "What an entity is currently doing. These are ongoing processes or actions related to the circular economy (e.g., 'Eco-design', 'Waste collection')."
        },
        {
            term: "Capability",
            icon: Zap,
            description: "Skills, technologies, infrastructure, or services an entity offers to others. These are assets they can contribute to a partnership (e.g., 'Consulting expertise', 'Recycling facility')."
        },
        {
            term: "Need",
            icon: Target,
            description: "Resources, partners, or knowledge an entity is looking for. These represent gaps or requirements for their circular initiatives (e.g., 'Funding', 'Pilot partners')."
        }
    ];

    const taxonomy = [
        { name: "Design & Production", desc: "Creating products that are durable, modular, repairable, and recyclable using sustainable materials." },
        { name: "Use & Consumption", desc: "Models that extend product lifespan through sharing, repair, reuse, and product-as-a-service." },
        { name: "Collection & Logistics", desc: "systems for gathering, sorting, and transporting waste or used products for processing." },
        { name: "Recycling & Processing", desc: "Transforming waste materials into secondary raw materials through mechanical or chemical processes." },
        { name: "Resource Recovery", desc: "Extracting energy, water, nutrients, or minerals from waste streams." },
        { name: "Industrial Symbiosis", desc: "Sharing resources (materials, energy, water) and by-products between different industries." },
        { name: "Digital & Technology", desc: " leveraging digital tools (AI, Blockchain, IoT) to enable tracking and efficiency in circular systems." },
        { name: "Policy & Governance", desc: "Creating frameworks, laws, standards, and strategies to support the circular economy transition." },
        { name: "Education & Research", desc: "Building knowledge, skills, and awareness through research, training, and academic programs." },
        { name: "Finance & Business Models", desc: "Funding mechanisms and economic structures that incentivize circular practices." }
    ];

    return (
        <div className="mb-12 border border-blue-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-blue-50/50 hover:bg-blue-50 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                        <Info size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">How it works & Definitions</h3>
                        <p className="text-sm text-gray-500">Learn about our terminology and the CE Taxonomy</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </button>

            {isOpen && (
                <div className="p-6 border-t border-blue-100 bg-white">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Definitions */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen size={18} className="text-brand-primary" />
                                Key Terminology
                            </h4>
                            <div className="space-y-4">
                                {definitions.map((def, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <div className="mt-1 flex-shrink-0">
                                            <def.icon size={16} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-800 block text-sm">{def.term}</span>
                                            <p className="text-sm text-gray-600 leading-relaxed">{def.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Taxonomy */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity size={18} className="text-brand-primary" />
                                CE Taxonomy Categories
                            </h4>
                            <div className="grid gap-3">
                                {taxonomy.map((cat, idx) => (
                                    <div key={idx} className="text-sm">
                                        <span className="font-bold text-cyan-700">{cat.name}: </span>
                                        <span className="text-gray-600">{cat.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
