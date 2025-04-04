import React from "react";
import { Technique, techniquesFiore } from "./techniqueData/fioreData";
import { techniquesMeyer } from "./techniqueData/meyerData";
import { techniquesBasic } from "./techniqueData/fundamentalsData";
import TechniqueFull from "./TechniqueFull";

interface TechniquesMenuProps {
  isOpen: boolean;
  currentMaster: string;
  setCurrentMaster: (master: string) => void;
  onClose: () => void;
  onOpen: () => void;
  onTechniqueSelect: (technique: Technique | null) => void;
  selectedTechnique: Technique | null;
}

const TechniquesMenu: React.FC<TechniquesMenuProps> = ({
  isOpen,
  currentMaster,
  onClose,
  onOpen,
  onTechniqueSelect,
  selectedTechnique,
}) => {
  const getCurrentTechniques = () => {
    switch (currentMaster) {
      case "basics":
        return techniquesBasic;
      case "meyer":
        return techniquesMeyer;
      case "fiore":
      default:
        return techniquesFiore;
    }
  };

  const getThemeColors = () => {
    switch (currentMaster) {
      case 'basics':
        return 'bg-white text-black border border-gray-200';
      case 'meyer':
        return 'bg-gray-600 text-white'; 
      case 'fiore':
        return 'bg-amber-100 text-black';
      default:
        return 'bg-white text-black';
    }
  };

  const handleTechniqueClick = (technique: Technique) => {
    onTechniqueSelect(technique);
    onClose();
  };

  const getMasterFullName = () => {
    switch (currentMaster) {
      case "basics":
        return "Key Fundamentals";
      case "meyer":
        return "Joachim Meyer";
      case "fiore":
      default:
        return "Fiore dei Liberi";
    }
  };

  return (
    <>
      {/*Techniques Menu Button*/}
      <button
        className="fixed rounded top-4 right-8 px-3.5 z-50 py-1.5 opacity-30 hover:opacity-100 md:opacity-100 bg-black text-white"
        onClick={onOpen}
      >
        Techniques Menu
      </button>

      {/* Technique Info Panel */}
      <div className={`fixed rounded top-3 right-7 px-3.5 py-2.5 opacity-15 hover:opacity-100 md:opacity-100 
        ${getThemeColors()} w-80 min-h-24 h-auto shadow-lg`}>
        {selectedTechnique ? (
          <TechniqueFull technique={selectedTechnique} isCompact={true} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <br /><br /><br />
            Select a technique to view details. Mobile users tap me!
          </div>
        )}
      </div>

      {/* Main Menu */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-5/6 h-4/6 md:w-3/5 md:ml-36 xmd:ml-0 bg-white rounded-lg p-6 shadow-xl transition-all duration-1000 overflow-y-auto ${
            isOpen
              ? "translate-y-[-50%] opacity-100"
              : "translate-y-[-150%] opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={`p-2 text-xl text-bold mb-4 ${currentMaster === 'meyer' ? 'bg-slate-800' : currentMaster === 'fiore' ? 'bg-amber-100 text-black' : 'bg-white text-black border border-gray-200'} rounded`}>
            {getMasterFullName()}'s Techniques
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
            {getCurrentTechniques().map((technique) => (
              <div
                key={technique.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border border-gray-200"
                onClick={() => handleTechniqueClick(technique)}
              >
                <div className="w-full aspect-square bg-gray-200 text-black rounded-md mb-3">
                  ANIM IMAGE HERE
                </div>
                <h3 className="font-semibold text-gray-800 text-xl">
                  {technique.name}
                </h3>
                <span className={`inline-block mt-2 px-2 py-1 text-sm ${currentMaster === 'meyer' ? 'bg-slate-800' : currentMaster === 'fiore' ? 'bg-amber-100 text-black' : 'bg-white text-black border border-gray-200'} rounded-full`}>
                  {technique.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechniquesMenu;