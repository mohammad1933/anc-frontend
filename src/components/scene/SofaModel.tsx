import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TransformControls, useGLTF } from "@react-three/drei";
import { CHAIR_MODEL_PATH, CURTAIN_MODEL_PATH, MODEL_PATH } from "@/constants/config";
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
  const {
    activeFabric,
    transform,
    setStatus,
    setTextureResolution,
    roomPhotoUrl,
    roomTransformMode,
    roomTransformReset,
    roomControlsVisible,
    mockupModel,
    modelInstances,
    modelInstanceTransforms,
    activeModelInstanceId,
    setActiveModelInstanceId,
    setRoomControlsVisible,
    openModelContextMenu,
    updateModelInstanceTransform,
  } = useConfigurator();
  const modelPath = mockupModel === "curtain"
    ? CURTAIN_MODEL_PATH
    : mockupModel === "chair"
      ? CHAIR_MODEL_PATH
      : MODEL_PATH;
  const { scene } = useGLTF(modelPath) as unknown as GLTFResult;
  const instanceIds = modelInstances[mockupModel];

  const currentTextureRef = useRef<THREE.Texture | null>(null);
  const placementRefs = useRef(new Map<string, THREE.Group>());

  // Clone the scene once so hot-reloads / multiple mounts don't share state.
  // Meshes are intentionally traversed from this committed clone in effects;
  // caching them in a ref during render can point at Strict Mode's discarded
  // render and leave the visible clone unchanged.
  const instanceScenes = useMemo(() => {
    return instanceIds.map((id) => {
      const clone = scene.clone(true);
      clone.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      return { id, scene: clone };
    });
  }, [instanceIds, scene]);

  const forEachModelMesh = (callback: (mesh: THREE.Mesh) => void) => {
    instanceScenes.forEach((instance) => {
      instance.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) callback(child as THREE.Mesh);
      });
    });
  };

  // Frame the sofa on load.
  useEffect(() => {
    setStatus("ready");
  }, [instanceScenes, setStatus]);

  // Apply / swap the texture whenever the active fabric changes.
  useEffect(() => {
    let cancelled = false;

    if (!activeFabric) {
      forEachModelMesh((mesh) => {
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

        forEachModelMesh((mesh) => {
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
  }, [activeFabric?.id, activeFabric?.objectUrl, instanceScenes]);

  // Apply live transform updates directly to the texture without reloading it.
  useEffect(() => {
    const texture = currentTextureRef.current;
    if (!texture) return;

    applyTextureTransform(texture, transform);
  }, [transform]);

  const modelScale = mockupModel === "chair" ? 100 : 1;

  useLayoutEffect(() => {
    instanceScenes.forEach((instance) => {
      const placement = placementRefs.current.get(instance.id);
      const saved = modelInstanceTransforms[instance.id];
      if (!placement || !saved) return;
      placement.position.fromArray(saved.position);
      placement.rotation.set(...saved.rotation);
      placement.scale.fromArray(saved.scale);
    });
    // Live transforms remain owned by Three.js. Reapply saved values only
    // when instances mount/change or the user explicitly resets placement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceScenes, roomTransformReset]);

  return (
    <group>
      {instanceScenes.map((instance) => {
        const instanceTransform = modelInstanceTransforms[instance.id];
        const model = (
          <group
            key={instance.id}
            ref={(node) => {
              if (node) placementRefs.current.set(instance.id, node);
              else placementRefs.current.delete(instance.id);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              setActiveModelInstanceId(instance.id);
              setRoomControlsVisible(true);
            }}
            onContextMenu={(event) => {
              event.stopPropagation();
              event.nativeEvent.preventDefault();
              openModelContextMenu({
                instanceId: instance.id,
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
              });
            }}
          >
            <group scale={modelScale}>
              <primitive object={instance.scene} position={[0, 0, 0]} />
            </group>
          </group>
        );

        return roomPhotoUrl && activeModelInstanceId === instance.id
          ? <TransformControls
              key={instance.id}
              enabled={roomControlsVisible}
              showX={roomControlsVisible}
              showY={roomControlsVisible}
              showZ={roomControlsVisible}
              mode={roomTransformMode}
              space={roomTransformMode === "translate" ? "world" : "local"}
              size={0.75}
              onMouseUp={() => {
                const placement = placementRefs.current.get(instance.id);
                if (!placement || !instanceTransform) return;
                updateModelInstanceTransform(instance.id, {
                  position: placement.position.toArray(),
                  rotation: [placement.rotation.x, placement.rotation.y, placement.rotation.z],
                  scale: placement.scale.toArray(),
                  homePosition: instanceTransform.homePosition,
                });
              }}
            >{model}</TransformControls>
          : model;
      })}
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
useGLTF.preload(CURTAIN_MODEL_PATH);
useGLTF.preload(CHAIR_MODEL_PATH);
