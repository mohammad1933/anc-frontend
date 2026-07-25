import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_TEXTURE_TRANSFORM,
  type Fabric,
  type LoadingStatus,
  type TextureTransform,
  type UploadRejection,
} from "@/types/fabric";
import { validateFile } from "@/utils/fileValidation";
import { createThumbnail } from "@/utils/thumbnail";
import { generateId } from "@/utils/id";
import { disposeFabricTexture } from "@/utils/textureCache";

export type MockupModelType = "sofa" | "curtain" | "chair";
type ModelInstances = Record<MockupModelType, string[]>;

export interface ModelInstanceTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  homePosition: [number, number, number];
}

interface ModelContextMenu {
  instanceId: string;
  x: number;
  y: number;
}

interface ConfiguratorState {
  fabrics: Fabric[];
  activeFabricId: string | null;
  activeFabric: Fabric | null;
  transform: TextureTransform;
  status: LoadingStatus;
  searchQuery: string;
  rejections: UploadRejection[];
  isUploading: boolean;
  textureResolution: { width: number; height: number } | null;
  roomPhotoUrl: string | null;
  roomTransformMode: "translate" | "rotate" | "scale";
  roomTransformReset: number;
  roomControlsVisible: boolean;
  isTransforming: boolean;
  mockupModel: MockupModelType;
  modelInstances: ModelInstances;
  modelInstanceTransforms: Record<string, ModelInstanceTransform>;
  modelInstanceFabricIds: Record<string, string | null>;
  activeModelInstanceId: string | null;
  modelContextMenu: ModelContextMenu | null;

  setSearchQuery: (query: string) => void;
  uploadFiles: (files: FileList | File[]) => Promise<void>;
  importFabric: (fabric: Fabric) => void;
  selectFabric: (id: string) => void;
  removeFabric: (id: string) => void;
  updateTransform: (patch: Partial<TextureTransform>) => void;
  resetTransform: () => void;
  setStatus: (status: LoadingStatus) => void;
  dismissRejections: () => void;
  setTextureResolution: (dims: { width: number; height: number } | null) => void;
  setRoomPhoto: (file: File | null) => void;
  setRoomTransformMode: (mode: "translate" | "rotate" | "scale") => void;
  resetRoomTransform: () => void;
  setRoomControlsVisible: (visible: boolean) => void;
  setTransforming: (transforming: boolean) => void;
  setMockupModel: (model: MockupModelType) => void;
  setActiveModelInstanceId: (id: string | null) => void;
  openModelContextMenu: (menu: ModelContextMenu) => void;
  closeModelContextMenu: () => void;
  duplicateModelInstance: (id: string) => void;
  deleteModelInstance: (id: string) => void;
  updateModelInstanceTransform: (id: string, transform: ModelInstanceTransform) => void;
}

const ConfiguratorCtx = createContext<ConfiguratorState | null>(null);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [activeFabricId, setActiveFabricId] = useState<string | null>(null);
  const [transform, setTransform] = useState<TextureTransform>(DEFAULT_TEXTURE_TRANSFORM);
  const [status, setStatus] = useState<LoadingStatus>("loading-model");
  const [searchQuery, setSearchQuery] = useState("");
  const [rejections, setRejections] = useState<UploadRejection[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [textureResolution, setTextureResolution] = useState<{ width: number; height: number } | null>(null);
  const [roomPhotoUrl, setRoomPhotoUrl] = useState<string | null>(null);
  const [roomTransformMode, setRoomTransformMode] = useState<"translate" | "rotate" | "scale">("translate");
  const [roomTransformReset, setRoomTransformReset] = useState(0);
  const [roomControlsVisible, setRoomControlsVisible] = useState(true);
  const [isTransforming, setTransforming] = useState(false);
  const [mockupModel, setMockupModelState] = useState<MockupModelType>("sofa");
  const [modelInstances, setModelInstances] = useState<ModelInstances>({
    sofa: ["sofa-1"],
    curtain: ["curtain-1"],
    chair: ["chair-1"],
  });
  const [activeModelInstanceId, setActiveModelInstanceId] = useState<string | null>("sofa-1");
  const [modelInstanceTransforms, setModelInstanceTransforms] = useState<Record<string, ModelInstanceTransform>>({
    "sofa-1": { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], homePosition: [0, 0, 0] },
    "curtain-1": { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], homePosition: [0, 0, 0] },
    "chair-1": { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], homePosition: [0, 0, 0] },
  });
  const [modelInstanceFabricIds, setModelInstanceFabricIds] = useState<Record<string, string | null>>({
    "sofa-1": null,
    "curtain-1": null,
    "chair-1": null,
  });
  const [modelContextMenu, setModelContextMenu] = useState<ModelContextMenu | null>(null);
  const roomPhotoRef = useRef<string | null>(null);

  // Guards against setting state after unmount during async thumbnail work.
  const mountedRef = useRef(true);

  const uploadFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setIsUploading(true);
    const accepted: Fabric[] = [];
    const newRejections: UploadRejection[] = [];

    for (const file of files) {
      const result = validateFile(file);
      if (!result.valid) {
        newRejections.push({ fileName: file.name, reason: result.reason ?? "read-error" });
        continue;
      }

      try {
        const objectUrl = URL.createObjectURL(file);
        const { thumbnail, width, height } = await createThumbnail(objectUrl);
        accepted.push({
          id: generateId(),
          name: file.name.replace(/\.[^.]+$/, ""),
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || "image/*",
          objectUrl,
          thumbnail,
          width,
          height,
          createdAt: Date.now(),
        });
      } catch {
        newRejections.push({ fileName: file.name, reason: "read-error" });
      }
    }

    if (!mountedRef.current) return;

    if (accepted.length > 0) {
      setFabrics((prev) => [...accepted, ...prev]);
      setActiveFabricId(accepted[0].id);
      if (activeModelInstanceId) {
        setModelInstanceFabricIds((current) => ({ ...current, [activeModelInstanceId]: accepted[0].id }));
      }
    }
    setRejections(newRejections);
    setIsUploading(false);
  }, [activeModelInstanceId]);

  const selectFabric = useCallback((id: string) => {
    setActiveFabricId(id);
    if (activeModelInstanceId) {
      setModelInstanceFabricIds((current) => ({ ...current, [activeModelInstanceId]: id }));
    }
  }, [activeModelInstanceId]);

  const importFabric = useCallback((fabric: Fabric) => {
    setFabrics((current) => [fabric, ...current.filter((item) => item.id !== fabric.id)]);
    setActiveFabricId(fabric.id);
    if (activeModelInstanceId) {
      setModelInstanceFabricIds((current) => ({ ...current, [activeModelInstanceId]: fabric.id }));
    }
    setTransform(DEFAULT_TEXTURE_TRANSFORM);
  }, [activeModelInstanceId]);

  const removeFabric = useCallback((id: string) => {
    setFabrics((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) {
        URL.revokeObjectURL(target.objectUrl);
      }
      disposeFabricTexture(id);
      return prev.filter((f) => f.id !== id);
    });
    setActiveFabricId((current) => (current === id ? null : current));
    setModelInstanceFabricIds((current) => Object.fromEntries(
      Object.entries(current).map(([instanceId, fabricId]) => [instanceId, fabricId === id ? null : fabricId]),
    ));
  }, []);

  const updateTransform = useCallback((patch: Partial<TextureTransform>) => {
    setTransform((prev) => {
      const next = { ...prev, ...patch };
      if (next.repeatLocked) {
        if (patch.scaleX !== undefined) next.scaleY = patch.scaleX;
        else if (patch.scaleY !== undefined) next.scaleX = patch.scaleY;
      }
      return next;
    });
  }, []);

  const resetTransform = useCallback(() => {
    setTransform(DEFAULT_TEXTURE_TRANSFORM);
  }, []);

  const dismissRejections = useCallback(() => setRejections([]), []);

  const setRoomPhoto = useCallback((file: File | null) => {
    if (roomPhotoRef.current) URL.revokeObjectURL(roomPhotoRef.current);
    const nextUrl = file ? URL.createObjectURL(file) : null;
    roomPhotoRef.current = nextUrl;
    setRoomPhotoUrl(nextUrl);
    if (file) setRoomControlsVisible(true);
  }, []);
  const resetRoomTransform = useCallback(() => {
    setModelInstanceTransforms((current) => {
      if (!activeModelInstanceId) return current;
      const transform = current[activeModelInstanceId];
      if (!transform) return current;
      return {
        ...current,
        [activeModelInstanceId]: {
          ...transform,
          position: [...transform.homePosition],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        },
      };
    });
    setRoomTransformReset((value) => value + 1);
  }, [activeModelInstanceId]);
  const setMockupModel = useCallback((model: MockupModelType) => {
    setMockupModelState(model);
    setModelContextMenu(null);
    const firstId = modelInstances[model][0] ?? null;
    setActiveModelInstanceId(firstId);
    setActiveFabricId(firstId ? modelInstanceFabricIds[firstId] ?? null : null);
    setStatus("loading-model");
    setRoomTransformReset((value) => value + 1);
  }, [modelInstanceFabricIds, modelInstances]);
  const openModelContextMenu = useCallback((menu: ModelContextMenu) => {
    setActiveModelInstanceId(menu.instanceId);
    setActiveFabricId(modelInstanceFabricIds[menu.instanceId] ?? null);
    setModelContextMenu(menu);
  }, [modelInstanceFabricIds]);
  const closeModelContextMenu = useCallback(() => setModelContextMenu(null), []);
  const duplicateModelInstance = useCallback((id: string) => {
    const sourceIndex = modelInstances[mockupModel].indexOf(id);
    if (sourceIndex < 0) return;
    const duplicateId = generateId();
    const next = [...modelInstances[mockupModel]];
    next.splice(sourceIndex + 1, 0, duplicateId);
    const sourceTransform = modelInstanceTransforms[id];
    const spacing = mockupModel === "sofa" ? 2.8 : mockupModel === "curtain" ? 1.8 : 1.3;
    const furthestX = Math.max(...modelInstances[mockupModel].map((instanceId) => modelInstanceTransforms[instanceId]?.position[0] ?? 0));
    const duplicatePosition: [number, number, number] = [
      furthestX + spacing,
      sourceTransform?.position[1] ?? 0,
      sourceTransform?.position[2] ?? 0,
    ];
    setModelInstances({ ...modelInstances, [mockupModel]: next });
    setModelInstanceTransforms({
      ...modelInstanceTransforms,
      [duplicateId]: {
        position: duplicatePosition,
        rotation: sourceTransform ? [...sourceTransform.rotation] : [0, 0, 0],
        scale: sourceTransform ? [...sourceTransform.scale] : [1, 1, 1],
        homePosition: [...duplicatePosition],
      },
    });
    const duplicateFabricId = modelInstanceFabricIds[id] ?? null;
    setModelInstanceFabricIds((current) => ({ ...current, [duplicateId]: duplicateFabricId }));
    setActiveFabricId(duplicateFabricId);
    setActiveModelInstanceId(duplicateId);
    setModelContextMenu(null);
  }, [mockupModel, modelInstanceFabricIds, modelInstances, modelInstanceTransforms]);
  const deleteModelInstance = useCallback((id: string) => {
    if (modelInstances[mockupModel].length <= 1) return;
    const next = modelInstances[mockupModel].filter((instanceId) => instanceId !== id);
    setModelInstances({ ...modelInstances, [mockupModel]: next });
    setModelInstanceTransforms((current) => {
      const remaining = { ...current };
      delete remaining[id];
      return remaining;
    });
    setModelInstanceFabricIds((current) => {
      const remaining = { ...current };
      delete remaining[id];
      return remaining;
    });
    setActiveModelInstanceId(next[0] ?? null);
    setActiveFabricId(next[0] ? modelInstanceFabricIds[next[0]] ?? null : null);
    setModelContextMenu(null);
  }, [mockupModel, modelInstanceFabricIds, modelInstances]);
  const updateModelInstanceTransform = useCallback((id: string, transform: ModelInstanceTransform) => {
    setModelInstanceTransforms((current) => ({ ...current, [id]: transform }));
  }, []);

  const activeFabric = useMemo(
    () => fabrics.find((f) => f.id === activeFabricId) ?? null,
    [fabrics, activeFabricId],
  );

  const selectModelInstance = useCallback((id: string | null) => {
    setActiveModelInstanceId(id);
    setActiveFabricId(id ? modelInstanceFabricIds[id] ?? null : null);
    setModelContextMenu(null);
  }, [modelInstanceFabricIds]);

  const value: ConfiguratorState = {
    fabrics,
    activeFabricId,
    activeFabric,
    transform,
    status,
    searchQuery,
    rejections,
    isUploading,
    textureResolution,
    roomPhotoUrl,
    roomTransformMode,
    roomTransformReset,
    roomControlsVisible,
    isTransforming,
    mockupModel,
    modelInstances,
    modelInstanceTransforms,
    modelInstanceFabricIds,
    activeModelInstanceId,
    modelContextMenu,
    setSearchQuery,
    uploadFiles,
    importFabric,
    selectFabric,
    removeFabric,
    updateTransform,
    resetTransform,
    setStatus,
    dismissRejections,
    setTextureResolution,
    setRoomPhoto,
    setRoomTransformMode,
    resetRoomTransform,
    setRoomControlsVisible,
    setTransforming,
    setMockupModel,
    setActiveModelInstanceId: selectModelInstance,
    openModelContextMenu,
    closeModelContextMenu,
    duplicateModelInstance,
    deleteModelInstance,
    updateModelInstanceTransform,
  };

  return <ConfiguratorCtx.Provider value={value}>{children}</ConfiguratorCtx.Provider>;
}

export function useConfigurator(): ConfiguratorState {
  const ctx = useContext(ConfiguratorCtx);
  if (!ctx) throw new Error("useConfigurator must be used within a ConfiguratorProvider");
  return ctx;
}
