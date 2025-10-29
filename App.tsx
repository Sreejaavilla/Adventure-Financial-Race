import React, { useState } from 'react';
import type { Budget, Screen, InvestmentAllocation, Scenario } from './types';
import LoginScreen from './components/LoginScreen';
import OccupationSelectionScreen from './components/OccupationSelectionScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import BudgetCanyonScreen from './components/BudgetCanyonScreen';
import InvestmentJungleScreen from './components/InvestmentJungleScreen';
import InsuranceFortressScreen from './components/InsuranceFortressScreen';
import TaxStormArenaScreen from './components/TaxStormArenaScreen';
import DashboardScreen from './components/DashboardScreen';
import ScenarioModal from './components/ScenarioModal';

const App: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('login');
    const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
    const [userData, setUserData] = useState({
        occupation: '',
        mode: '',
        budget: {} as Budget,
        investmentAllocation: {} as InvestmentAllocation,
        insurance: [] as string[],
    });
     const [dashboardData, setDashboardData] = useState({
        yearlyIncome: 600000,
        yearlyExpenses: 420000,
        investedAssets: 120000,
        emergencyFund: 330000,
        liabilities: 0,
        creditScore: 650,
        happiness: 75,
        netWorthHistory: [280000, 320000, 350000, 380000, 410000, 450000],
    });

    const handleLogin = () => setCurrentScreen('occupation');
    const handleOccupationSelect = (occupation: string) => { setUserData(p => ({...p, occupation})); setCurrentScreen('mode'); };
    const handleModeSelect = (mode: string) => { setUserData(p => ({...p, mode})); setCurrentScreen('budget'); };
    const handleBudgetSubmit = (budget: Budget) => { setUserData(p => ({...p, budget})); setCurrentScreen('investment'); };
    const handleInvestmentSubmit = (inv: InvestmentAllocation) => { setUserData(p => ({...p, investmentAllocation: inv})); setCurrentScreen('insurance'); };
    const handleInsuranceSubmit = (policies: string[]) => { setUserData(p => ({...p, insurance: policies})); setCurrentScreen('tax'); };
    
    const handleTaxSubmit = (taxSaved: number) => {
        setDashboardData(prev => ({
            ...prev,
            emergencyFund: prev.emergencyFund + taxSaved,
            netWorthHistory: [...prev.netWorthHistory, prev.netWorthHistory[prev.netWorthHistory.length - 1] + taxSaved],
        }));

        // Trigger a scenario popup
        setCurrentScenario({
            title: "Unexpected Opportunity",
            description: "A friend offers you a chance to invest in their startup. It's risky, but could have a high reward. They need ₹20,000.",
            choices: [
                { text: "Invest ₹20,000", action: () => handleScenarioChoice('invest') },
                { text: "Decline politely", action: () => handleScenarioChoice('decline') }
            ]
        });
    };

    const handleScenarioChoice = (choice: 'invest' | 'decline') => {
        if (choice === 'invest') {
             setDashboardData(prev => ({
                ...prev,
                investedAssets: prev.investedAssets + 20000,
                emergencyFund: prev.emergencyFund - 20000,
             }));
        }
        setCurrentScenario(null);
        setCurrentScreen('dashboard');
    }

    const goBack = () => {
        if (currentScreen === 'dashboard') setCurrentScreen('tax');
        if (currentScreen === 'tax') setCurrentScreen('insurance');
        if (currentScreen === 'insurance') setCurrentScreen('investment');
        if (currentScreen === 'investment') setCurrentScreen('budget');
        if (currentScreen === 'budget') setCurrentScreen('mode');
        if (currentScreen === 'mode') setCurrentScreen('occupation');
        if (currentScreen === 'occupation') setCurrentScreen('login');
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'login': return <LoginScreen onLogin={handleLogin} />;
            case 'occupation': return <OccupationSelectionScreen onSelect={handleOccupationSelect} />;
            case 'mode': return <ModeSelectionScreen onSelect={handleModeSelect} onBack={goBack} />;
            case 'budget': return <BudgetCanyonScreen onSubmit={handleBudgetSubmit} onBack={goBack} />;
            case 'investment': return <InvestmentJungleScreen onSubmit={handleInvestmentSubmit} onBack={goBack} />;
            case 'insurance': return <InsuranceFortressScreen onSubmit={handleInsuranceSubmit} onBack={goBack} />;
            case 'tax': return <TaxStormArenaScreen grossIncome={dashboardData.yearlyIncome} onSubmit={handleTaxSubmit} onBack={goBack} />;
            case 'dashboard': return <DashboardScreen data={dashboardData} />;
            default: return <LoginScreen onLogin={handleLogin} />;
        }
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center font-sans text-slate-200 p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a102a] to-[#1a2035] -z-10"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {renderScreen()}
                {currentScenario && <ScenarioModal scenario={currentScenario} />}
            </div>
        </main>
    );
};

export default App;
