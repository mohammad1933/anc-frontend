import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { TransformControls, useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { TransformControls as TransformControlsImpl } from "three-stdlib";
import { CHAIR_MODEL_PATH, CURTAIN_MODEL_PATH, MODEL_PATH } from "@/constants/config";
import { useConfigurator, type ModelInstanceTransform } from "@/hooks/ConfiguratorContext";
import { loadFabricTexture } from "@/utils/textureCache";
import type { Fabric, TextureTransform } from "@/types/fabric";

interface GLTFResult {
  scene: THREE.Group;
}

interface ModelInstanceProps {
  id: string;
  source: THREE.Group;
  fabric: Fabric | null;
  textureTransform: TextureTransform;
  selected: boolean;
  modelScale: number;
  placementRef: (id: string, node: THREE.Group | null) => void;
  onSelect: (id: string) => void;
  onContextMenu: (id: string, x: number, y: number) => void;
}

function applyTextureTransform(texture: THREE.Texture, transform: TextureTransform): void {
  texture.repeat.set(transform.scaleX, transform.scaleY);
  texture.offset.set(transform.offsetX, transform.offsetY);
  texture.rotation = THREE.MathUtils.degToRad(transform.rotation);
  texture.center.set(0.5, 0.5);
  texture.needsUpdate = true;
}

const ModelInstance = memo(function ModelInstance({
  id,
  source,
  fabric,
  textureTransform,
  selected,
  modelScale,
  placementRef,
  onSelect,
  onContextMenu,
}: ModelInstanceProps) {
  const instanceScene = useMemo(() => {
    const scene = clone(source);
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = Array.isArray(child.material)
        ? child.material.map((material) => material.clone())
        : child.material.clone();
    });
    return scene;
  }, [source]);

  useEffect(() => {
    let cancelled = false;

    const applyMaterial = async () => {
      const texture = fabric ? await loadFabricTexture(fabric.id, fabric.objectUrl) : null;
      if (cancelled) return;
      if (texture) applyTextureTransform(texture, textureTransform);

      instanceScene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const previous = child.material;
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: texture,
          roughness: 0.85,
          metalness: 0.02,
          envMapIntensity: 0.6,
        });
        if (Array.isArray(previous)) previous.forEach((material) => material.dispose());
        else previous.dispose();
      });
    };

    void applyMaterial();
    return () => {
      cancelled = true;
    };
  }, [fabric, instanceScene, textureTransform]);

  useEffect(() => () => {
    instanceScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
      else child.material.dispose();
    });
  }, [instanceScene]);

  return (
    <group
      ref={(node) => placementRef(id, node)}
      onPointerDown={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
      onContextMenu={(event) => {
        event.stopPropagation();
        event.nativeEvent.preventDefault();
        onContextMenu(id, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }}
    >
      <group scale={modelScale}>
        <primitive object={instanceScene} />
      </group>
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} raycast={() => null}>
          <ringGeometry args={[1.15, 1.22, 64]} />
          <meshBasicMaterial color="#c7a86d" transparent opacity={0.85} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
});

export function SofaModel() {
  const {
    fabrics,
    transform,
    setStatus,
    setTextureResolution,
    roomTransformMode,
    roomTransformReset,
    roomControlsVisible,
    mockupModel,
    modelInstances,
    modelInstanceTransforms,
    modelInstanceFabricIds,
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
  const placementRefs = useRef(new Map<string, THREE.Group>());
  const controlsRef = useRef<TransformControlsImpl>(null);
  const [isDragging, setIsDragging] = useState(false);
  const modelScale = mockupModel === "chair" ? 100 : 1;
  const selectedObject = activeModelInstanceId
    ? placementRefs.current.get(activeModelInstanceId)
    : undefined;

  useEffect(() => {
    setStatus("ready");
  }, [scene, setStatus]);

  useEffect(() => {
    const fabricId = activeModelInstanceId ? modelInstanceFabricIds[activeModelInstanceId] : null;
    const fabric = fabrics.find((item) => item.id === fabricId);
    setTextureResolution(fabric ? { width: fabric.width, height: fabric.height } : null);
  }, [activeModelInstanceId, fabrics, modelInstanceFabricIds, setTextureResolution]);

  useLayoutEffect(() => {
    instanceIds.forEach((id) => {
      const placement = placementRefs.current.get(id);
      const saved = modelInstanceTransforms[id];
      if (!placement || !saved) return;
      placement.position.fromArray(saved.position);
      placement.rotation.set(...saved.rotation);
      placement.scale.fromArray(saved.scale);
    });
  }, [instanceIds, modelInstanceTransforms, roomTransformReset]);

  const saveTransform = (id: string, placement: THREE.Group, previous: ModelInstanceTransform): void => {
    const x = THREE.MathUtils.clamp(placement.position.x, -5, 5);
    const z = THREE.MathUtils.clamp(placement.position.z, -4, 4);
    const y = Math.max(previous.homePosition[1], placement.position.y);
    placement.position.set(x, y, z);
    updateModelInstanceTransform(id, {
      position: [x, y, z],
      rotation: [placement.rotation.x, placement.rotation.y, placement.rotation.z],
      scale: placement.scale.toArray(),
      homePosition: previous.homePosition,
    });
  };

  return (
    <group>
      {instanceIds.map((id) => (
        <ModelInstance
          key={id}
          id={id}
          source={scene}
          fabric={fabrics.find((fabric) => fabric.id === modelInstanceFabricIds[id]) ?? null}
          textureTransform={transform}
          selected={activeModelInstanceId === id}
          modelScale={modelScale}
          placementRef={(instanceId, node) => {
            if (node) placementRefs.current.set(instanceId, node);
            else placementRefs.current.delete(instanceId);
          }}
          onSelect={(instanceId) => {
            setActiveModelInstanceId(instanceId);
            setRoomControlsVisible(true);
          }}
          onContextMenu={(instanceId, x, y) => openModelContextMenu({ instanceId, x, y })}
        />
      ))}
      {selectedObject && activeModelInstanceId && roomControlsVisible && (
        <TransformControls
          ref={controlsRef}
          object={selectedObject}
          mode={roomTransformMode}
          space={roomTransformMode === "translate" ? "world" : "local"}
          size={0.75}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => {
            setIsDragging(false);
            const previous = modelInstanceTransforms[activeModelInstanceId];
            if (previous) saveTransform(activeModelInstanceId, selectedObject, previous);
          }}
        />
      )}
      <OrbitDragState active={isDragging} />
    </group>
  );
}

function OrbitDragState({ active }: { active: boolean }) {
  const { setTransforming } = useConfigurator();
  useEffect(() => {
    setTransforming(active);
    return () => setTransforming(false);
  }, [active, setTransforming]);
  return null;
}

useGLTF.preload(MODEL_PATH);
useGLTF.preload(CURTAIN_MODEL_PATH);
useGLTF.preload(CHAIR_MODEL_PATH);
