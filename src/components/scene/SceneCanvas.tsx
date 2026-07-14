import { Suspense, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";
import { SofaModel } from "@/components/scene/SofaModel";
import { ShowroomLighting } from "@/components/scene/ShowroomLighting";
import { CameraRig } from "@/components/scene/CameraRig";
import { RendererBridge } from "@/components/scene/RendererBridge";
import { Floor } from "@/components/scene/Floor";
import { SceneLoader } from "@/components/scene/SceneLoader";

interface SceneCanvasProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export function SceneCanvas({ canvasRef }: SceneCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => {
        canvasRef.current = gl.domElement;
      }}
    >
      <color attach="background" args={["#161310"]} />
      <fog attach="fog" args={["#161310", 9, 16]} />
      <RendererBridge />
      <CameraRig />
      <ShowroomLighting />
      <Suspense fallback={<SceneLoader />}>
        <Floor />
        {/*
          Bounds measures only its own children and fits the active camera
          (and OrbitControls target) to them on mount and whenever they
          change shape. This guarantees the sofa is correctly framed no
          matter its actual scale, proportions, or origin offset — instead
          of relying on a hardcoded camera position tuned for one model.
        */}
        <Bounds fit observe margin={1.35}>
          <SofaModel />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
