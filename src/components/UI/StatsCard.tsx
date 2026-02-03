import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    trend?: string;
    color?: 'primary' | 'secondary';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon, color = 'primary' }) => {

    const iconStyles = {
        primary: 'bg-brand-primary/10 text-brand-primary',
        secondary: 'bg-brand-secondary/10 text-brand-secondary',
    };

    return (
        <div className="premium-card flex items-center justify-between p-8">
            <div>
                <h3 className="text-4xl font-bold text-brand-secondary tracking-tight mb-2">{value}</h3>
                <p className="text-base font-medium text-gray-500">{label}</p>
            </div>
            <div className={clsx("p-4 rounded-2xl", iconStyles[color])}>
                <Icon size={28} />
            </div>
        </div>
    );
};

export default StatsCard;
