import React, { useState, useMemo } from 'react';
import type { Expense } from '../types';
import BackButton from './shared/BackButton';

const initialExpenses: Expense[] = [
    { id: '1', name: 'Professional Development Course', cost: 20000, isDeductible: true },
    { id: '2', name: 'New Work Laptop', cost: 80000, isDeductible: true },
    { id: '3', name: 'Home Office Setup', cost: 50000, isDeductible: true },
    { id: '4', name: 'Client Dinners', cost: 15000, isDeductible: false },
    { id: '5', name: 'Vacation to Goa', cost: 75000, isDeductible: false },
    { id: '6', name: 'Luxury Watch', cost: 120000, isDeductible: false },
    { id: '7', name: 'Grocery Shopping', cost: 60000, isDeductible: false },
    { id: '8', name: 'Netflix Subscription', cost: 2400, isDeductible: false },
];

const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

interface TaxStormArenaScreenProps {
    grossIncome: number;
    onSubmit: (taxSaved: number) => void;
    onBack: () => void;
}

const TaxStormArenaScreen: React.FC<TaxStormArenaScreenProps> = ({ grossIncome, onSubmit, onBack }) => {
    const [availableExpenses, setAvailableExpenses] = useState<Expense[]>(initialExpenses);
    const [deductedExpenses, setDeductedExpenses] = useState<Expense[]>([]);

    const taxData = useMemo(() => {
        const totalDeductions = deductedExpenses.filter(e => e.isDeductible).reduce((sum, item) => sum + item.cost, 0);
        const taxRate = 0.30;
        const taxOwed = Math.max(0, (grossIncome - totalDeductions) * taxRate);
        const initialTax = grossIncome * taxRate;
        const taxSaved = initialTax - taxOwed;
        return { totalDeductions, taxOwed, taxSaved };
    }, [deductedExpenses, grossIncome]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, expenseId: string) => {
        e.dataTransfer.setData("expenseId", expenseId);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const expenseId = e.dataTransfer.getData("expenseId");
        const expense = availableExpenses.find(item => item.id === expenseId);
        if (expense) {
            setDeductedExpenses(prev => [...prev, expense]);
            setAvailableExpenses(prev => prev.filter(item => item.id !== expenseId));
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    
    return (
        <div className="p-4 w-full">
            <BackButton onClick={onBack} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-6 card-base">
                        <h2 className="text-2xl font-bold text-white mb-4">Live Tax Calculation</h2>
                        <div className="space-y-3 text-lg">
                            <div className="flex justify-between"><span>Gross Income:</span> <span className="font-semibold">{formatCurrency(grossIncome)}</span></div>
                            <div className="flex justify-between"><span>Total Deductions:</span> <span className="font-semibold text-yellow-400">{formatCurrency(taxData.totalDeductions)}</span></div>
                            <div className="flex justify-between border-t border-slate-600 pt-3 mt-3"><span>Tax Owed:</span> <span className="font-bold text-red-400 text-xl">{formatCurrency(taxData.taxOwed)}</span></div>
                        </div>
                        <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-lg text-center">
                            <p className="text-lg">Total Tax Saved!</p>
                            <p className="text-3xl font-bold text-green-400">{formatCurrency(taxData.taxSaved)}</p>
                        </div>
                    </div>
                     <div className="p-6 card-base bg-sky-500/10 border-sky-500">
                        <h3 className="text-xl font-bold text-sky-300">Astra's Hint</h3>
                        <p className="mt-2 text-slate-300">"Look for expenses directly related to your job or career growth."</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 card-base">
                        <h2 className="text-2xl font-bold text-white mb-4">Available Expenses</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {availableExpenses.map(item => (
                                <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item.id)}
                                     className="p-3 bg-slate-700/50 rounded-lg text-center cursor-grab active:cursor-grabbing border border-slate-600 hover:border-cyan-400 hover:bg-slate-700 transition-all">
                                    <p className="font-semibold text-white">{item.name}</p>
                                    <p className="text-cyan-300">{formatCurrency(item.cost)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div onDrop={handleDrop} onDragOver={handleDragOver}
                          className="p-6 card-base border-2 border-dashed border-cyan-500 min-h-[200px] flex flex-col items-center justify-center text-center">
                         <h2 className="text-2xl font-bold text-white mb-2">Drop Deductions Here</h2>
                         <p className="text-slate-400">Drag items to claim them.</p>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-full">
                            {deductedExpenses.map(item => (
                                <div key={item.id} className={`p-3 rounded-lg text-center border ${item.isDeductible ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'}`}>
                                    <p className="font-semibold text-white">{item.name}</p>
                                    <p className={item.isDeductible ? 'text-green-300' : 'text-red-300'}>{formatCurrency(item.cost)}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
             <div className="mt-8 flex justify-center">
                 <button onClick={() => onSubmit(taxData.taxSaved)} className="w-full max-w-md py-3 px-4 border border-transparent text-lg rounded-md btn-primary">
                     File Taxes & Continue
                 </button>
            </div>
        </div>
    );
};

export default TaxStormArenaScreen;