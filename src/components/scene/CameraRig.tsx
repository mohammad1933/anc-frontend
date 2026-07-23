import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { MOUSE, TOUCH } from "three";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/**
 * Camera + controls only. Initial framing of the sofa itself is handled by
 * <Bounds> around the model (see SceneCanvas), so this works correctly
 * regardless of a given model's actual scale or proportions instead of
 * relying on hardcoded position/target guesses.
 */
export function CameraRig() {
  const { roomPhotoUrl } = useConfigurator();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const constrainPlacement = () => {
    const controls = controlsRef.current;
    if (!controls || !roomPhotoUrl || controls.target.length() <= 2.6) return;
    const previousTarget = controls.target.clone();
    controls.target.clampLength(0, 2.6);
    controls.object.position.add(controls.target.clone().sub(previousTarget));
    controls.update();
  };

  return (
    <>
      <PerspectiveCamera makeDefault fov={38} position={[3, 2, 4]} near={0.05} far={50} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan
        screenSpacePanning
        panSpeed={0.65}
        onEnd={constrainPlacement}
        mouseButtons={roomPhotoUrl
          ? { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE }
          : { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }}
        touches={roomPhotoUrl
          ? { ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }
          : { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }}
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
