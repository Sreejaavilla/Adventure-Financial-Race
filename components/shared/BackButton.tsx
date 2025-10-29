
import React from 'react';
import { BackArrowIcon } from '../../constants';

interface BackButtonProps {
    onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 text-amber-200 hover:text-white transition-colors duration-300"
            aria-label="Go back"
        >
            <BackArrowIcon />
            <span className="hidden sm:inline">Back</span>
        </button>
    );
};

export default BackButton;
