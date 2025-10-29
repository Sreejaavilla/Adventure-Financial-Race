
import React, { useState } from 'react';
import { StudentIcon, WebDevIcon, TeacherIcon, DoctorIcon } from '../constants';
import Card from './shared/Card';

interface OccupationSelectionScreenProps {
    onSelect: (occupation: string) => void;
}

const occupations = [
    { id: 'student', icon: <StudentIcon /> },
    { id: 'web_dev_junior', icon: <WebDevIcon /> },
    { id: 'teacher', icon: <TeacherIcon /> },
    { id: 'doctor', icon: <DoctorIcon /> },
];

const OccupationSelectionScreen: React.FC<OccupationSelectionScreenProps> = ({ onSelect }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (occupation: string) => {
        setSelected(occupation);
    };

    const handleContinue = () => {
        if (selected) {
            onSelect(selected);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Choose Your Path</h1>
            <p className="text-lg text-gray-300 mb-8">Select an occupation to begin your journey.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl mb-8">
                {occupations.map((occ) => (
                    <Card 
                        key={occ.id}
                        title={occ.id}
                        icon={occ.icon}
                        onClick={() => handleSelect(occ.id)}
                        isSelected={selected === occ.id}
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

export default OccupationSelectionScreen;
