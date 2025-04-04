import React, { useState } from 'react';
import BabylonCanvas from './BabylonCanvas';
import SimplifiedBabylonCanvas from './CanvasSimple';
import { Scene } from '@babylonjs/core';

interface CanvasToggleProps {
  animationPath?: string;
  onSceneReady?: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
}

const CanvasToggle: React.FC<CanvasToggleProps> = ({
  animationPath,
  onSceneReady,
  onRender
}) => {
  const [isSimplified, setIsSimplified] = useState(false);

  return (
    <div className="relative w-full h-full">
      {isSimplified ? (
        <SimplifiedBabylonCanvas
          animationPath={animationPath}
          onSceneReady={onSceneReady}
          onRender={onRender}
          className="w-full h-full"
        />
      ) : (
        <BabylonCanvas
          animationPath={animationPath}
          onSceneReady={onSceneReady}
          onRender={onRender}
          className="w-full h-full"
        />
      )}
      
      <button
        onClick={() => setIsSimplified(!isSimplified)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 z-10"
      >
        {isSimplified ? 'Show Full Scene' : 'Isolate Animation'}
      </button>
    </div>
  );
};

export default CanvasToggle;