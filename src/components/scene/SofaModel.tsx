import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { MODEL_PATH } from "@/constants/config";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { loadFabricTexture } from "@/utils/textureCache";

interface GLTFResult {
  scene: THREE.Group;
}

/**
 * Loads the sofa GLB once, then re-applies the active fabric's texture to
 * every upholstery mesh whenever the fabric or its transform changes. The
 * base geometry and UVs are never touched — only the material's map.
 */
export function SofaModel() {
  const { scene } = useGLTF(MODEL_PATH) as unknown as GLTFResult;
  const { activeFabric, transform, setStatus, setTextureResolution } = useConfigurator();

  const meshesRef = useRef<THREE.Mesh[]>([]);
  const currentTextureRef = useRef<THREE.Texture | null>(null);

  // Clone the scene once so hot-reloads / multiple mounts don't share state,
  // and collect every mesh that should receive the fabric material.
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const meshes: THREE.Mesh[] = [];
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        meshes.push(mesh);
      }
    });
    meshesRef.current = meshes;
    return clone;
  }, [scene]);

  // Frame the sofa on load.
  useEffect(() => {
    setStatus("ready");
  }, [clonedScene, setStatus]);

  // Apply / swap the texture whenever the active fabric changes.
  useEffect(() => {
    let cancelled = false;

    if (!activeFabric) {
      meshesRef.current.forEach((mesh) => {
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
    loadFabricTexture(activeFabric.id, activeFabric.objectUrl).then((texture) => {
      if (cancelled) return;
      currentTextureRef.current = texture;
      setTextureResolution({ width: activeFabric.width, height: activeFabric.height });

      meshesRef.current.forEach((mesh) => {
        const existing = mesh.material as THREE.MeshStandardMaterial;
        const material = existing?.isMeshStandardMaterial
          ? existing
          : new THREE.MeshStandardMaterial();

        material.map = texture;
        material.roughness = 0.85;
        material.metalness = 0.02;
        material.envMapIntensity = 0.6;
        material.needsUpdate = true;
        mesh.material = material;
      });

      setStatus("ready");
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFabric?.id, activeFabric?.objectUrl]);

  // Apply live transform updates directly to the texture without reloading it.
  useEffect(() => {
    const texture = currentTextureRef.current;
    if (!texture) return;

    texture.repeat.set(transform.scaleX, transform.scaleY);
    texture.offset.set(transform.offsetX, transform.offsetY);
    texture.rotation = THREE.MathUtils.degToRad(transform.rotation);
    texture.center.set(0.5, 0.5);
    texture.needsUpdate = true;
  }, [transform]);

  return <primitive object={clonedScene} position={[0, 0, 0]} />;
}

useGLTF.preload(MODEL_PATH);
