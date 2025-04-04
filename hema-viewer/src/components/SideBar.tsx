import React from "react";
import TreeView from "./TreeView";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentMaster: (master: string) => void;
  currentMaster: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  setCurrentMaster,
  currentMaster,
}) => {
  const handleSelect = (id: string) => {
    console.log(`Selected master: ${id}`);
    setCurrentMaster(id.toLowerCase());
  };

 //change background depending on selected category
  const getBackgroundColour = () => {
    switch (currentMaster) {
      case 'basics':
        return 'bg-white text-black'; // White background with black text
      case 'meyer':
        return 'bg-gray-600 text-white'; // Cool slate grey with white text etc.
      case 'fiore':
        return 'bg-amber-100 text-black'; // Warm wheat color with black text
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-white/60 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-[280px] h-full transform transition-all duration-1000 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 pt-16 px-4 shadow-lg md:shadow-none md:translate-x-0 overflow-y-auto ${getBackgroundColour()}`}
      >
        <h1 className="text-3xl font-bold">HEMA VIEWER</h1>

        {/* Hamburger Menu Button */}
        <button
          className={`absolute top-4 right-4 md:hidden`}
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <TreeView onSelect={handleSelect} />
      </aside>
    </>
  );
};

export default Sidebar;