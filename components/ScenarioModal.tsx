import React from 'react';
import type { Scenario } from '../types';

interface ScenarioModalProps {
    scenario: Scenario;
}

const ScenarioModal: React.FC<ScenarioModalProps> = ({ scenario }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="w-full max-w-lg p-8 space-y-6 card-base border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
                <h2 className="text-3xl font-bold text-center text-cyan-300">{scenario.title}</h2>
                <p className="text-slate-300 text-lg text-center">{scenario.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {scenario.choices.map((choice, index) => (
                        <button 
                            key={index} 
                            onClick={choice.action}
                            className="w-full py-3 px-4 border border-transparent text-md rounded-md btn-primary"
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScenarioModal;