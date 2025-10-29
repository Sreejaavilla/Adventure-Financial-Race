import React from 'react';

interface CardProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isSelected?: boolean;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon, onClick, isSelected, children }) => {
    const isInteractive = onClick !== undefined;
    return (
        <div
            onClick={onClick}
            className={`
                p-6 rounded-lg border-2 transition-all duration-300 ease-in-out
                bg-slate-800/60 backdrop-blur-md
                ${isInteractive ? 'cursor-pointer transform hover:-translate-y-1' : ''}
                ${isSelected ? 'border-cyan-400 scale-105 shadow-2xl shadow-cyan-500/20' : 'border-slate-700'}
                ${isInteractive && !isSelected ? 'hover:border-cyan-500' : ''}
            `}
        >
            <div className="flex flex-col items-center text-center gap-4">
                {icon && <div className="text-cyan-400">{icon}</div>}
                <h3 className="text-xl font-bold tracking-wide text-white capitalize">{title.replace(/_/g, ' ')}</h3>
                {description && <p className="text-sm text-slate-400">{description}</p>}
                {children}
            </div>
        </div>
    );
};

export default Card;