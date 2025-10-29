import React from 'react';

interface MetricCardProps {
    label: string;
    value: string | number;
    isCurrency?: boolean;
    valueColor?: string;
}

const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

const MetricCard: React.FC<MetricCardProps> = ({ label, value, isCurrency = false, valueColor = 'text-white' }) => {
    const displayValue = typeof value === 'number' && isCurrency ? formatCurrency(value) : value;

    return (
        <div className="card-base p-4">
            <p className="text-sm text-slate-400 mb-1">{label}</p>
            <p className={`text-2xl lg:text-3xl font-bold ${valueColor}`}>{displayValue}</p>
        </div>
    );
};

export default MetricCard;
