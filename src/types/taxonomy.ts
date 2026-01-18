export const CE_ACTIVITIES_TAXONOMY: Record<string, string[]> = {
    "Design & Production": [
        "Eco-design and design for circularity",
        "Design for disassembly and modularity",
        "Design for longevity and durability",
        "Design for repair and maintenance",
        "Design for recyclability",
        "Sustainable materials selection",
        "Biomimicry and bio-based design",
        "Cradle-to-cradle product design",
        "Lightweighting and material optimization",
        "Additive manufacturing and 3D printing",
        "Remanufacturing process development",
        "Circular product certification",
    ],
    "Use & Consumption": [
        "Product-as-a-Service models",
        "Sharing platforms and services",
        "Rental and leasing services",
        "Repair services and workshops",
        "Maintenance and servicing",
        "Product life extension services",
        "Second-hand and resale platforms",
        "Refurbishment services",
        "Upcycling and creative reuse",
        "Collaborative consumption platforms",
        "Tool and equipment libraries",
        "Subscription-based product access",
    ],
    "Collection & Logistics": [
        "Waste collection and sorting",
        "Separate collection systems",
        "Take-back schemes and programs",
        "Reverse logistics operations",
        "Collection point management",
        "Door-to-door collection services",
        "Commercial waste collection",
        "Hazardous waste collection",
        "E-waste collection programs",
        "Textile collection services",
        "Packaging return systems",
        "Deposit-return schemes",
    ],
    "Recycling & Processing": [
        "Mechanical recycling",
        "Chemical recycling",
        "Plastic recycling and processing",
        "Metal recycling and recovery",
        "Paper and cardboard recycling",
        "Glass recycling",
        "Textile recycling",
        "E-waste recycling and processing",
        "Construction waste recycling",
        "Battery recycling",
        "Composite material recycling",
        "Advanced sorting technologies",
    ],
    "Resource Recovery": [
        "Material recovery and extraction",
        "Energy recovery from waste",
        "Biogas production",
        "Composting and organic processing",
        "Anaerobic digestion",
        "Precious metal recovery",
        "Rare earth element recovery",
        "Water recovery and reuse",
        "Heat recovery systems",
        "Nutrient recovery",
        "Solvent recovery and recycling",
        "Industrial byproduct recovery",
    ],
    "Industrial Symbiosis": [
        "Industrial symbiosis networks",
        "Waste-to-resource exchanges",
        "Byproduct synergy programs",
        "Eco-industrial park development",
        "Cross-sector material flows",
        "Energy sharing between industries",
        "Water sharing and cascading",
        "Shared infrastructure development",
        "Industrial ecosystem mapping",
        "Symbiosis matchmaking platforms",
        "Circular supply chain development",
        "Regional material flow optimization",
    ],
    "Digital & Technology": [
        "Digital product passports",
        "Material tracking and traceability",
        "IoT for resource monitoring",
        "AI-powered waste sorting",
        "Blockchain for supply chain transparency",
        "Digital twins for product lifecycle",
        "Predictive maintenance systems",
        "Online marketplaces for secondary materials",
        "Circular economy data platforms",
        "Smart waste management systems",
        "Resource efficiency software",
        "Life cycle assessment tools",
    ],
    "Policy & Governance": [
        "Circular economy policy development",
        "Extended producer responsibility",
        "Waste management regulation",
        "Green public procurement",
        "Circular economy standards development",
        "Environmental certification programs",
        "Regulatory compliance services",
        "Policy advocacy and lobbying",
        "Municipal circular economy programs",
        "Regional circular economy strategies",
        "International CE cooperation",
        "Circular economy impact assessment",
    ],
    "Education & Research": [
        "Circular economy research",
        "Sustainability education programs",
        "Professional training and upskilling",
        "Circular design education",
        "Waste management training",
        "Consumer awareness campaigns",
        "Academic CE programs",
        "Innovation labs and incubators",
        "Circular economy consultancy",
        "Knowledge transfer programs",
        "Best practice documentation",
        "Circular economy publications",
    ],
    "Finance & Business Models": [
        "Circular economy investment",
        "Green financing and bonds",
        "Impact investing for circularity",
        "Circular business model development",
        "Performance-based contracts",
        "Leasing and rental business models",
        "Pay-per-use business models",
        "Circular startup funding",
        "ESG reporting and metrics",
        "Circular economy valuation",
        "Risk assessment for circular projects",
        "Circular economy venture capital",
    ],
};

// Keywords mapped to taxonomy activities for extraction
export const ACTIVITY_KEYWORDS: Record<string, string> = {
    // Design & Production
    "eco-design": "Eco-design and design for circularity",
    "ecodesign": "Eco-design and design for circularity",
    "circular design": "Eco-design and design for circularity",
    "design for disassembly": "Design for disassembly and modularity",
    "modular design": "Design for disassembly and modularity",
    "durable": "Design for longevity and durability",
    "durability": "Design for longevity and durability",
    "longevity": "Design for longevity and durability",
    "repairable": "Design for repair and maintenance",
    "recyclable": "Design for recyclability",
    "sustainable materials": "Sustainable materials selection",
    "bio-based": "Biomimicry and bio-based design",
    "biobased": "Biomimicry and bio-based design",
    "cradle to cradle": "Cradle-to-cradle product design",
    "c2c": "Cradle-to-cradle product design",
    "lightweighting": "Lightweighting and material optimization",
    "3d printing": "Additive manufacturing and 3D printing",
    "additive manufacturing": "Additive manufacturing and 3D printing",
    "remanufacturing": "Remanufacturing process development",

    // Use & Consumption
    "product as a service": "Product-as-a-Service models",
    "paas": "Product-as-a-Service models",
    "servitization": "Product-as-a-Service models",
    "sharing platform": "Sharing platforms and services",
    "sharing economy": "Sharing platforms and services",
    "rental": "Rental and leasing services",
    "leasing": "Rental and leasing services",
    "repair": "Repair services and workshops",
    "repair cafe": "Repair services and workshops",
    "maintenance": "Maintenance and servicing",
    "refurbishment": "Refurbishment services",
    "refurbish": "Refurbishment services",
    "second-hand": "Second-hand and resale platforms",
    "secondhand": "Second-hand and resale platforms",
    "resale": "Second-hand and resale platforms",
    "upcycling": "Upcycling and creative reuse",
    "upcycle": "Upcycling and creative reuse",
    "tool library": "Tool and equipment libraries",
    "subscription": "Subscription-based product access",

    // Collection & Logistics
    "waste collection": "Waste collection and sorting",
    "sorting": "Waste collection and sorting",
    "separate collection": "Separate collection systems",
    "take-back": "Take-back schemes and programs",
    "takeback": "Take-back schemes and programs",
    "reverse logistics": "Reverse logistics operations",
    "collection point": "Collection point management",
    "e-waste collection": "E-waste collection programs",
    "ewaste collection": "E-waste collection programs",
    "textile collection": "Textile collection services",
    "deposit return": "Deposit-return schemes",
    "deposit-return": "Deposit-return schemes",

    // Recycling & Processing
    "mechanical recycling": "Mechanical recycling",
    "chemical recycling": "Chemical recycling",
    "plastic recycling": "Plastic recycling and processing",
    "metal recycling": "Metal recycling and recovery",
    "paper recycling": "Paper and cardboard recycling",
    "cardboard recycling": "Paper and cardboard recycling",
    "glass recycling": "Glass recycling",
    "textile recycling": "Textile recycling",
    "e-waste recycling": "E-waste recycling and processing",
    "electronics recycling": "E-waste recycling and processing",
    "construction waste": "Construction waste recycling",
    "demolition waste": "Construction waste recycling",
    "battery recycling": "Battery recycling",

    // Resource Recovery
    "material recovery": "Material recovery and extraction",
    "energy recovery": "Energy recovery from waste",
    "waste to energy": "Energy recovery from waste",
    "biogas": "Biogas production",
    "composting": "Composting and organic processing",
    "compost": "Composting and organic processing",
    "anaerobic digestion": "Anaerobic digestion",
    "precious metal": "Precious metal recovery",
    "rare earth": "Rare earth element recovery",
    "water reuse": "Water recovery and reuse",
    "water recycling": "Water recovery and reuse",
    "heat recovery": "Heat recovery systems",
    "nutrient recovery": "Nutrient recovery",

    // Industrial Symbiosis
    "industrial symbiosis": "Industrial symbiosis networks",
    "eco-industrial": "Eco-industrial park development",
    "eco industrial": "Eco-industrial park development",
    "byproduct": "Byproduct synergy programs",
    "by-product": "Byproduct synergy programs",
    "material exchange": "Waste-to-resource exchanges",
    "waste exchange": "Waste-to-resource exchanges",
    "circular supply chain": "Circular supply chain development",

    // Digital & Technology
    "digital passport": "Digital product passports",
    "product passport": "Digital product passports",
    "traceability": "Material tracking and traceability",
    "tracking": "Material tracking and traceability",
    "iot": "IoT for resource monitoring",
    "smart waste": "Smart waste management systems",
    "ai sorting": "AI-powered waste sorting",
    "blockchain": "Blockchain for supply chain transparency",
    "digital twin": "Digital twins for product lifecycle",
    "predictive maintenance": "Predictive maintenance systems",
    "secondary materials marketplace": "Online marketplaces for secondary materials",
    "lca": "Life cycle assessment tools",
    "life cycle assessment": "Life cycle assessment tools",

    // Policy & Governance
    "circular economy policy": "Circular economy policy development",
    "ce policy": "Circular economy policy development",
    "epr": "Extended producer responsibility",
    "extended producer responsibility": "Extended producer responsibility",
    "green procurement": "Green public procurement",
    "public procurement": "Green public procurement",
    "certification": "Environmental certification programs",
    "compliance": "Regulatory compliance services",
    "advocacy": "Policy advocacy and lobbying",

    // Education & Research
    "research": "Circular economy research",
    "sustainability education": "Sustainability education programs",
    "training": "Professional training and upskilling",
    "awareness": "Consumer awareness campaigns",
    "incubator": "Innovation labs and incubators",
    "accelerator": "Innovation labs and incubators",
    "consultancy": "Circular economy consultancy",
    "consulting": "Circular economy consultancy",

    // Finance & Business Models
    "investment": "Circular economy investment",
    "green finance": "Green financing and bonds",
    "green bond": "Green financing and bonds",
    "impact investing": "Impact investing for circularity",
    "circular business model": "Circular business model development",
    "performance contract": "Performance-based contracts",
    "pay per use": "Pay-per-use business models",
    "pay-per-use": "Pay-per-use business models",
    "esg": "ESG reporting and metrics",
    "venture capital": "Circular economy venture capital",
};

/**
 * Finds the strict Taxonomy Category for a given input string (activity or category).
 * Returns undefined if no match is found in the taxonomy.
 */
export const mapToTaxonomyCategory = (input: string): string | undefined => {
    if (!input) return undefined;
    const normalized = input.trim();
    const lower = normalized.toLowerCase();

    // 1. Check if it IS a taxonomy category
    if (CE_ACTIVITIES_TAXONOMY[normalized]) {
        return normalized;
    }

    // 2. Check if it is a specific activity in the taxonomy
    for (const [category, activities] of Object.entries(CE_ACTIVITIES_TAXONOMY)) {
        if (activities.includes(normalized)) {
            return category;
        }
        // Case-insensitive check
        if (activities.some(a => a.toLowerCase() === lower)) {
            return category;
        }
    }

    // 3. Check keywords
    for (const [keyword, activityName] of Object.entries(ACTIVITY_KEYWORDS)) {
        if (lower.includes(keyword)) {
            // Find category for this activity
            for (const [category, activities] of Object.entries(CE_ACTIVITIES_TAXONOMY)) {
                if (activities.includes(activityName)) {
                    return category;
                }
            }
        }
    }

    return undefined;
};
