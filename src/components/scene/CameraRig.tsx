import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

/**
 * Camera + controls only. Initial framing of the sofa itself is handled by
 * <Bounds> around the model (see SceneCanvas), so this works correctly
 * regardless of a given model's actual scale or proportions instead of
 * relying on hardcoded position/target guesses.
 */
export function CameraRig() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={38} position={[3, 2, 4]} near={0.05} far={50} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={0.5}
        maxDistance={12}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.53}
      />
    </>
  );
}
