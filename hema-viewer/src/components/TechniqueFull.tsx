import React from 'react';

interface Technique {
    id: number;
    name: string;
    master: string;
    type: string;
    info: string;
    source: string;
}

interface TechniqueFullProps {
    technique: Technique;
    onClose?: () => void;
    isCompact?: boolean;
}

const TechniqueFull: React.FC<TechniqueFullProps> = ({ technique, onClose, isCompact = false }) => {
    if (isCompact) {
        return (
            <div className="h-full overflow-y-auto text-sm">
                <h2 className="text-lg font-bold mb-2">{technique.name}</h2>
                <div className="space-y-2">
                    <p><b>Master:</b> {technique.master}</p> {/* b makes text more readable */}
                    <p><b>Type:</b> {technique.type}</p>
                    <p className="text-xs"><b>Description:</b> {technique.info}</p>
                    <p className="text-xs"><b>Source:</b> {technique.source}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-black">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>

                {/* Technique data here */}
                <h2 className="text-2xl font-bold mb-4">{technique.name}</h2>
                <div className="space-y-4">
                    <p><b>Master:</b> {technique.master}</p>
                    <p><b>Type:</b> {technique.type}</p>
                    <p><b>Description:</b> {technique.info}</p>
                    <p><b>Source:</b> {technique.source}</p>
                </div>
            </div>
        </div>
    );
};

export default TechniqueFull;