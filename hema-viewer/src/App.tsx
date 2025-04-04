import { useState } from "react";
import SideBar from "./components/SideBar";
import { Scene, FreeCamera, Vector3, HemisphericLight } from "@babylonjs/core";
import TechniquesMenu from "./components/TechniquesMenu";
import CanvasToggle from './components/CanvasToggle';
import {
  Technique,
} from "./components/techniqueData/fioreData"; //Leftover from old techniqueData system, breaks if removed

function App() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentMaster, setCurrentMaster] = useState("meyer");
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(
    null
  );

  const onSceneReady = (scene: Scene) => {
    // Set up a camera for viewing the models
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();
    if (canvas) {
      camera.attachControl(canvas, true);
    }

    new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  };

  const onRender = (_scene: Scene) => {};

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      {/* Hamburger Menu Button */}
      <button
        className="fixed top-4 left-4 z-[100] md:hidden"
        onClick={() => setSideBarOpen(true)}
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
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* SideBar */}
      <SideBar
        isOpen={isSideBarOpen}
        onClose={() => setSideBarOpen(false)}
        setCurrentMaster={setCurrentMaster}
        currentMaster={currentMaster} // Add this line
      />

      {/* Main Content  */}
      <main className="flex-1 flex flex-col md:ml-[280px]">
        <div className="flex-1 relative">
        <CanvasToggle
            onSceneReady={onSceneReady}
            onRender={onRender}
            animationPath={
              selectedTechnique?.animation ||
              "/assets/Oberhaw/NEWoberhaw.glb"
            }
          />
        </div>

        {/* Techniques Menu */}
        <TechniquesMenu
          isOpen={menuOpen}
          currentMaster={currentMaster}
          setCurrentMaster={setCurrentMaster}
          onClose={() => setMenuOpen(false)}
          onOpen={() => setMenuOpen(true)}
          selectedTechnique={selectedTechnique}
          onTechniqueSelect={setSelectedTechnique}
        />
      </main>
    </div>
  );
}

export default App;
