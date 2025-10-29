import React, { useState } from 'react';
import BackButton from './shared/BackButton';
import Card from './shared/Card';
import { HealthShieldIcon, VehicleShieldIcon, LifeShieldIcon } from '../constants';

interface InsuranceFortressScreenProps {
    onSubmit: (policies: string[]) => void;
    onBack: () => void;
}

const insurancePolicies = [
    {
        id: "health_insurance",
        display_name: "Health Shield",
        monthly_premium: 200,
        effect: "Reduces damage from Medical Emergencies by 70%",
        icon: <HealthShieldIcon />
    },
    {
        id: "vehicle_insurance",
        display_name: "Vehicle Shield",
        monthly_premium: 100,
        effect: "Protects against accident & maintenance emergencies",
        icon: <VehicleShieldIcon />
    },
    {
        id: "term_life_insurance",
        display_name: "Life Force Shield",
        monthly_premium: 120,
        effect: "Triggers survival bonus & family wealth if income drops",
        icon: <LifeShieldIcon />
    }
];

const InsuranceFortressScreen: React.FC<InsuranceFortressScreenProps> = ({ onSubmit, onBack }) => {
    const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

    const togglePolicy = (policyId: string) => {
        setSelectedPolicies(prev => 
            prev.includes(policyId)
                ? prev.filter(id => id !== policyId)
                : [...prev, policyId]
        );
    };
    
    const handleContinue = () => {
        onSubmit(selectedPolicies);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full">
            <BackButton onClick={onBack} />
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tighter text-white">Insurance Fortress</h1>
                <p className="text-lg text-slate-400">Each shield represents a choice. Choose wisely, for storms are coming!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-8">
                {insurancePolicies.map((policy) => (
                    <Card
                        key={policy.id}
                        title={policy.display_name}
                        icon={policy.icon}
                        onClick={() => togglePolicy(policy.id)}
                        isSelected={selectedPolicies.includes(policy.id)}
                    >
                       <div className="text-left w-full mt-4 space-y-2">
                            <p className="text-sm text-slate-300"><span className="font-semibold text-white">Effect:</span> {policy.effect}</p>
                            <p className="text-lg font-bold text-cyan-300 text-center">₹{policy.monthly_premium} / month</p>
                       </div>
                    </Card>
                ))}
            </div>

            <button
                onClick={handleContinue}
                className="w-full max-w-xs mt-4 py-3 px-4 border border-transparent text-sm rounded-md btn-primary"
            >
                Equip Shields & Continue
            </button>
        </div>
    );
};

export default InsuranceFortressScreen;