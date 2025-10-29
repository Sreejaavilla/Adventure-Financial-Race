import React, { useState, useEffect } from 'react';
import MetricCard from './shared/MetricCard';
import NetWorthChart from './shared/NetWorthChart';

interface DashboardScreenProps {
    data: {
        yearlyIncome: number;
        yearlyExpenses: number;
        investedAssets: number;
        emergencyFund: number;
        liabilities: number;
        creditScore: number;
        happiness: number;
        netWorthHistory: number[];
    };
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const metrics = [
        { label: "Yearly Income", value: data.yearlyIncome, isCurrency: true },
        { label: "Yearly Expenses", value: data.yearlyExpenses, isCurrency: true, color: "text-red-400" },
        { label: "Invested Assets", value: data.investedAssets, isCurrency: true, color: "text-green-400" },
        { label: "Emergency Fund", value: data.emergencyFund, isCurrency: true, color: "text-yellow-400" },
        { label: "Liabilities", value: data.liabilities, isCurrency: true },
        { label: "Credit Score", value: data.creditScore, color: "text-purple-400" },
        { label: "Happiness", value: `😊 (${data.happiness}%)`, color: "text-orange-400" },
    ];
    
    const actions = ["Manage Insurance", "Invest", "Skill Tree", "Presenter Tools"];

    return (
        <div className="p-4 w-full animate-fade-in">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Level 1</h1>
                    <div className="w-64 h-2 bg-slate-700 rounded-full mt-2">
                        <div className="h-2 bg-cyan-400 rounded-full" style={{width: '10%'}}></div>
                    </div>
                </div>
                <div className="text-slate-400">100 / 1000 XP</div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {metrics.map(m => <MetricCard key={m.label} label={m.label} value={m.value} isCurrency={m.isCurrency} valueColor={m.color} />)}
                    
                    <div className="md:col-span-2 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="card-base p-6 flex flex-col items-center justify-center min-h-[250px] text-center">
                            {isLoading ? (
                                <>
                                    <div className="fate-spinner"></div>
                                    <p className="mt-4 text-cyan-300 text-lg font-semibold animate-pulse">Consulting the Fates...</p>
                                </>
                            ) : (
                                <>
                                 <h3 className="text-xl font-bold text-white mb-2">Astra's Insight</h3>
                                 <p className="text-slate-300">Your tax savings have boosted your emergency fund. A wise move! Consider allocating some of this new capital to your investments to accelerate growth.</p>
                                </>
                            )}
                        </div>
                        <div className="card-base p-6">
                             <h3 className="text-xl font-bold text-white mb-4">Net Worth Journey</h3>
                             <NetWorthChart data={data.netWorthHistory} />
                        </div>
                    </div>
                </div>

                {/* Actions Sidebar */}
                <div className="lg:col-span-1 card-base p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Actions</h3>
                    <div className="space-y-4">
                        {actions.map(action => (
                            <button key={action} className="w-full text-left p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400 transition-all font-semibold">
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;