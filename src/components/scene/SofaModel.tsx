import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TransformControls, useGLTF } from "@react-three/drei";
import { MODEL_PATH } from "@/constants/config";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { loadFabricTexture } from "@/utils/textureCache";
import type { TextureTransform } from "@/types/fabric";

interface GLTFResult {
  scene: THREE.Group;
}

function applyTextureTransform(texture: THREE.Texture, transform: TextureTransform) {
  texture.repeat.set(transform.scaleX, transform.scaleY);
  texture.offset.set(transform.offsetX, transform.offsetY);
  texture.rotation = THREE.MathUtils.degToRad(transform.rotation);
  texture.center.set(0.5, 0.5);
  texture.needsUpdate = true;
}

/**
 * Loads the sofa GLB once, then re-applies the active fabric's texture to
 * every upholstery mesh whenever the fabric or its transform changes. The
 * base geometry and UVs are never touched — only the material's map.
 */
export function SofaModel() {
  const { scene } = useGLTF(MODEL_PATH) as unknown as GLTFResult;
  const { activeFabric, transform, setStatus, setTextureResolution, roomPhotoUrl, roomTransformMode, roomTransformReset, roomControlsVisible } = useConfigurator();

  const currentTextureRef = useRef<THREE.Texture | null>(null);
  const placementRef = useRef<THREE.Group>(null);

  // Clone the scene once so hot-reloads / multiple mounts don't share state.
  // Meshes are intentionally traversed from this committed clone in effects;
  // caching them in a ref during render can point at Strict Mode's discarded
  // render and leave the visible clone unchanged.
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const forEachSofaMesh = (callback: (mesh: THREE.Mesh) => void) => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) callback(child as THREE.Mesh);
    });
  };

  // Frame the sofa on load.
  useEffect(() => {
    setStatus("ready");
  }, [clonedScene, setStatus]);

  // Apply / swap the texture whenever the active fabric changes.
  useEffect(() => {
    let cancelled = false;

    if (!activeFabric) {
      forEachSofaMesh((mesh) => {
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.map = null;
          material.needsUpdate = true;
        }
      });
      setTextureResolution(null);
      return;
    }

    setStatus("loading-texture");
    loadFabricTexture(activeFabric.id, activeFabric.objectUrl)
      .then((texture) => {
        if (cancelled) return;
        currentTextureRef.current = texture;
        applyTextureTransform(texture, transform);
        setTextureResolution({ width: activeFabric.width, height: activeFabric.height });

        forEachSofaMesh((mesh) => {
          // Do not clone the GLB's embedded brown material. Besides its base
          // map, imported materials can retain shader defines and auxiliary
          // maps that continue to influence the result. A clean upholstery
          // material guarantees that the selected swatch is the base color.
          const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: texture,
            roughness: 0.85,
            metalness: 0.02,
            envMapIntensity: 0.6,
          });
          mesh.material = material;
        });

        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFabric?.id, activeFabric?.objectUrl, clonedScene]);

  // Apply live transform updates directly to the texture without reloading it.
  useEffect(() => {
    const texture = currentTextureRef.current;
    if (!texture) return;

    applyTextureTransform(texture, transform);
  }, [transform]);

  useEffect(() => {
    if (!placementRef.current) return;
    placementRef.current.position.set(0, 0, 0);
    placementRef.current.rotation.set(0, 0, 0);
    placementRef.current.scale.setScalar(1);
  }, [roomTransformReset]);

  const sofa = <group ref={placementRef}><primitive object={clonedScene} position={[0, 0, 0]} /></group>;

  return roomPhotoUrl
    ? <TransformControls enabled={roomControlsVisible} showX={roomControlsVisible} showY={roomControlsVisible} showZ={roomControlsVisible} mode={roomTransformMode} space={roomTransformMode === "translate" ? "world" : "local"} size={0.75}>{sofa}</TransformControls>
    : sofa;
}

useGLTF.preload(MODEL_PATH);
