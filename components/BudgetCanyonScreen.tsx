import React, { useState, useMemo } from 'react';
import type { Budget } from '../types';
import BackButton from './shared/BackButton';
import SliderInput from './shared/SliderInput';

interface BudgetCanyonScreenProps {
    onSubmit: (budget: Budget) => void;
    onBack: () => void;
}

const categories: (keyof Budget)[] = ["savings", "rent", "groceries", "entertainment", "investments"];

const BudgetCanyonScreen: React.FC<BudgetCanyonScreenProps> = ({ onSubmit, onBack }) => {
    const [allocations, setAllocations] = useState<Budget>({
        savings: 0,
        rent: 0,
        groceries: 0,
        entertainment: 0,
        investments: 0,
    });

    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, value) => sum + value, 0);
    }, [allocations]);

    const remaining = 100 - totalAllocated;

    const handleSliderChange = (category: keyof Budget, value: number) => {
        setAllocations(prev => {
            const currentVal = prev[category];
            const diff = value - currentVal;
            
            if (diff > 0 && diff > remaining) {
                return { ...prev, [category]: currentVal + remaining };
            }
            return { ...prev, [category]: value };
        });
    };
    
    const handleContinue = () => {
        if (totalAllocated === 100) {
            onSubmit(allocations);
        } else {
            alert("You must allocate exactly 100% of your budget.");
        }
    };

    const isComplete = totalAllocated === 100;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <BackButton onClick={onBack} />
            <div className="w-full max-w-2xl p-8 space-y-8 card-base">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tighter text-white">Budget Canyon</h1>
                    <p className="mt-2 text-lg text-slate-400">Allocate your monthly budget. You have full freedom.</p>
                </div>

                <div className="space-y-6">
                    {categories.map(cat => (
                         <SliderInput
                            key={cat}
                            label={cat === 'rent' ? 'Rent/EMI' : cat}
                            value={allocations[cat]}
                            onChange={(e) => handleSliderChange(cat, parseInt(e.target.value, 10))}
                         />
                    ))}
                </div>

                <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center text-xl font-bold">
                    <span className={`transition-colors duration-300 ${isComplete ? 'text-green-400' : 'text-cyan-300'}`}>
                        Total Allocated: {totalAllocated}%
                    </span>
                    <span className="text-slate-400">
                        Remaining: {remaining}%
                    </span>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!isComplete}
                    className="w-full py-3 px-4 border border-transparent text-lg rounded-md btn-primary"
                >
                    {isComplete ? 'Unlock Next Stage' : 'Allocate 100% to Continue'}
                </button>
            </div>
        </div>
    );
};

export default BudgetCanyonScreen;