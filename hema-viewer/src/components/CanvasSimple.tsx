import { useEffect, useRef } from "react";
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

interface SimplifiedBabylonCanvasProps {
  onSceneReady?: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  className?: string;
  animationPath?: string;
  cubeWidth?: number;
  cubeHeight?: number;
  cubeDepth?: number;
}

const SimplifiedBabylonCanvas = ({
  onSceneReady,
  onRender,
  className = "",
  animationPath = "/assets/blooming_hibiscus/scene.gltf",
  cubeWidth = 5,
  cubeHeight = 0.2,
  cubeDepth = 5,
}: SimplifiedBabylonCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  // Function to load model
  const loadModel = (scene: Scene, path: string) => {
    const lastSlashIndex = path.lastIndexOf("/");
    const rootUrl = path.substring(0, lastSlashIndex + 1);
    const filename = path.substring(lastSlashIndex + 1);

    SceneLoader.ImportMesh(
      "",
      rootUrl,
      filename,
      scene,
      function (meshes) {
        // Update camera target
        const camera = scene.getCameraByName("camera") as ArcRotateCamera;
        if (camera && meshes.length > 0) {
          camera.setTarget(meshes[0].position);
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
      stencil: true,
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

    // Camera limits
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 10;

    // Setup lighting
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Setup textures
    const groundTexture = new Texture("/assets/textures/ground.jpg", scene);
    groundTexture.uScale = 2.5;
    groundTexture.vScale = 2.5;

    const skyTexture = new Texture("/assets/textures/sky.jpg", scene);
    skyTexture.invertY;

    // Create ground
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

    if (onSceneReady) {
      onSceneReady(scene);
    }

    // Handle window resize
    const handleResize = () => {
      if (engineRef.current) {
        engineRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    // Start rendering
    engineRef.current.runRenderLoop(() => {
      if (scene && onRender) {
        onRender(scene);
      }
      scene.render();
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
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
    <canvas
      ref={canvasRef}
      className={`w-full h-full touch-none ${className}`}
      style={{
        display: "block",
        outline: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default SimplifiedBabylonCanvas;