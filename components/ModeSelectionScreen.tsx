
import React, { useState } from 'react';
import Card from './shared/Card';
import BackButton from './shared/BackButton';

interface ModeSelectionScreenProps {
    onSelect: (mode: string) => void;
    onBack: () => void;
}

const modes = [
    { id: 'momentum_mode', description: 'Fast paced challenges' },
    { id: 'future_forge', description: 'Strategic long term' },
];

const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onSelect, onBack }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (mode: string) => {
        setSelected(mode);
    };

    const handleContinue = () => {
        if (selected) {
            onSelect(selected);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <BackButton onClick={onBack} />
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Select Game Mode</h1>
            <p className="text-lg text-gray-300 mb-8">Choose how you want to play.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mb-8">
                {modes.map((mode) => (
                    <Card
                        key={mode.id}
                        title={mode.id}
                        description={mode.description}
                        onClick={() => handleSelect(mode.id)}
                        isSelected={selected === mode.id}
                    />
                ))}
            </div>

            <button
                onClick={handleContinue}
                disabled={!selected}
                className="w-full max-w-xs py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 transition-all duration-300"
            >
                Continue
            </button>
        </div>
    );
};

export default ModeSelectionScreen;
