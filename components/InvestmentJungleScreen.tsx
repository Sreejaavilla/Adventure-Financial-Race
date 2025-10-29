import React, { useState, useMemo } from 'react';
import Card from './shared/Card';
import BackButton from './shared/BackButton';
import SliderInput from './shared/SliderInput';
import { BondsIcon, IndexFundsIcon, StocksIcon } from '../constants';
import type { InvestmentAllocation, InvestmentPath } from '../types';

interface InvestmentJungleScreenProps {
    onSubmit: (allocations: InvestmentAllocation) => void;
    onBack: () => void;
}

const investmentPaths = [
    { id: 'bonds' as InvestmentPath, title: 'Tortoise (Bonds)', description: 'Low risk, slow growth', icon: <BondsIcon /> },
    { id: 'indexFunds' as InvestmentPath, title: 'Rabbit (Index Funds)', description: 'Medium risk, moderate growth', icon: <IndexFundsIcon /> },
    { id: 'stocks' as InvestmentPath, title: 'Lion (Stocks)', description: 'High risk, fast growth', icon: <StocksIcon /> },
];

const InvestmentJungleScreen: React.FC<InvestmentJungleScreenProps> = ({ onSubmit, onBack }) => {
    const [allocations, setAllocations] = useState<InvestmentAllocation>({
        bonds: 0,
        indexFunds: 0,
        stocks: 0,
    });

    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, value) => sum + value, 0);
    }, [allocations]);

    const remaining = 100 - totalAllocated;
    
    const diversifiedCount = useMemo(() => {
        return Object.values(allocations).filter(v => v > 0).length;
    }, [allocations]);

    const handleSliderChange = (pathId: InvestmentPath, value: number) => {
        setAllocations(prev => {
            const currentVal = prev[pathId];
            const diff = value - currentVal;
            
            if (diff > 0 && diff > remaining) {
                return { ...prev, [pathId]: currentVal + remaining };
            }
            return { ...prev, [pathId]: value };
        });
    };
    
    const handleContinue = () => {
        if (totalAllocated === 100) {
            onSubmit(allocations);
        } else {
            alert("You must allocate exactly 100% of your investment funds.");
        }
    };
    
    const isComplete = totalAllocated === 100;

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full">
            <BackButton onClick={onBack} />
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tighter text-white">Investment Jungle</h1>
                <p className="text-lg text-gray-300">Allocate your investment funds to navigate the jungle.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-8">
                {investmentPaths.map((path) => (
                    <Card
                        key={path.id}
                        title={path.title}
                        description={path.description}
                        icon={path.icon}
                    >
                        <div className="w-full mt-4">
                            <SliderInput
                                label={path.id}
                                value={allocations[path.id]}
                                onChange={(e) => handleSliderChange(path.id, parseInt(e.target.value, 10))}
                            />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="w-full max-w-5xl p-4 space-y-4 bg-black/50 backdrop-blur-lg rounded-xl border border-gray-700">
                <div className="flex justify-between items-center text-xl font-bold">
                    <span className={`transition-colors duration-300 ${isComplete ? 'text-green-400' : 'text-amber-300'}`}>
                        Total Allocated: {totalAllocated}%
                    </span>
                    <span className="text-gray-300">
                        Remaining: {remaining}%
                    </span>
                </div>
                 {diversifiedCount >= 2 && isComplete && (
                    <p className="text-center text-green-400 font-semibold animate-pulse">
                        Diversification Bonus Active! (+5% Growth)
                    </p>
                )}
            </div>

            <button
                onClick={handleContinue}
                disabled={!isComplete}
                className="w-full max-w-xs mt-8 py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 transition-all duration-300"
            >
                {isComplete ? 'Continue to Next Stage' : 'Allocate 100% to Continue'}
            </button>
        </div>
    );
};

export default InvestmentJungleScreen;
