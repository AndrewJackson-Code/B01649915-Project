import { useEffect, useRef, useLayoutEffect } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  SceneLoader,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Texture,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

interface BabylonCanvasProps {
  onSceneReady?: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  className?: string;
  animationPath?: string;
  cubeWidth?: number;
  cubeHeight?: number;
  cubeDepth?: number;
}

const BabylonCanvas = ({
  onSceneReady,
  onRender,
  className = "", // just leaving this empty but could be useful later
  animationPath = "", // empty for value from app.tsx
  cubeWidth = 1000,
  cubeHeight = 0.1,
  cubeDepth = 1000,
}: BabylonCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  // Handle canvas resize
  useLayoutEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        if (engineRef.current) {
          engineRef.current.resize();
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial size update
    updateCanvasSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Function to load model
  const loadModel = (
    scene: Scene,
    path: string,
    position?: Vector3,
    scale?: Vector3,
    rotation?: Vector3
  ) => {
    const lastSlashIndex = path.lastIndexOf("/");
    const rootUrl = path.substring(0, lastSlashIndex + 1);
    const filename = path.substring(lastSlashIndex + 1);

    SceneLoader.ImportMesh(
      "",
      rootUrl,
      filename,
      scene,
      function (meshes) {
        meshes.forEach((mesh) => {
          mesh.scaling = scale || new Vector3(1, 1, 1);
          mesh.position = position || Vector3.Zero();
          if (rotation) {
            mesh.rotation = rotation;
          }
        });

        if (!position) {
          const camera = scene.getCameraByName("camera") as ArcRotateCamera;
          if (camera && meshes.length > 0) {
            camera.setTarget(meshes[0].position);
          }
        }
      },
      null,
      function (message) {
        console.error("Error loading GLTF:", message);
      }
    );
  };

  // Initial scene setup
  useEffect(() => {
    if (!canvasRef.current) return;

    engineRef.current = new Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
    });

    const scene = new Scene(engineRef.current);
    sceneRef.current = scene;

    // Setup camera
    const camera = new ArcRotateCamera(
      "camera",
      0,
      Math.PI / 3,
      10,
      Vector3.Zero(),
      scene
    );

    camera.attachControl(canvasRef.current, true);

    // Set rotation limit of camera
    const rotationRange = Math.PI / 12;
    camera.lowerAlphaLimit = -rotationRange;
    camera.upperAlphaLimit = rotationRange;

    const initialBeta = Math.PI / 3;
    camera.lowerBetaLimit = initialBeta - rotationRange;
    camera.upperBetaLimit = initialBeta + rotationRange;
    
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 15;
    camera.panningSensibility = 0;

    // Setup lighting
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Create ground and skybox(sphere)
    const skyTexture = new Texture("/assets/textures/sky.jpg", scene);
    skyTexture.invertY;

    const groundTexture = new Texture("/assets/textures/ground.jpg", scene);
    groundTexture.uScale = 190;
    groundTexture.vScale = 190;

    const cube = MeshBuilder.CreateBox(
      "ground",
      {
        width: cubeWidth,
        height: cubeHeight,
        depth: cubeDepth,
      },
      scene
    );
    cube.position = new Vector3(0, -0.1, 0);

    const cubeMaterial = new StandardMaterial("cube-material", scene);
    cubeMaterial.diffuseTexture = groundTexture;
    cubeMaterial.specularColor = new Color3(0.2, 0.2, 0.2);
    cube.material = cubeMaterial;

    // Create sky sphere
    const sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 5000 },
      scene
    );
    sphere.rotation = new Vector3(Math.PI, 0, 0);
    sphere.position = new Vector3(0, 0, 0);

    const sphereMaterial = new StandardMaterial("sphere-material", scene);
    sphereMaterial.diffuseTexture = skyTexture;
    sphereMaterial.specularColor = new Color3(0, 0, 0);
    sphereMaterial.backFaceCulling = false;
    sphere.material = sphereMaterial;

    // Load main model
    loadModel(scene, animationPath);

    loadModel(
      scene,
      "/assets/buildings/medieval_town.glb",
      new Vector3(-7, 0, 2),
      new Vector3(1.2, 1.0, 1.2),
      new Vector3(0, Math.PI/2.1, 0)
    );

    if (onSceneReady) {
      onSceneReady(scene);
    }

    // Start render loop
    engineRef.current.runRenderLoop(() => {
      if (scene && onRender) {
        onRender(scene);
      }
      scene.render();
    });

    // Cleanup
    return () => {
      scene.dispose();
      if (engineRef.current) {
        engineRef.current.dispose();
      }
    };
  }, [onSceneReady, onRender]);

  // Watch for animation path changes
  useEffect(() => {
    if (sceneRef.current) {
      loadModel(sceneRef.current, animationPath);
    }
  }, [animationPath]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="touch-none"
        style={{
          display: "block",
          outline: "none",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default BabylonCanvas;