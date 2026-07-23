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
    }
    setRejections(newRejections);
    setIsUploading(false);
  }, []);

  const selectFabric = useCallback((id: string) => {
    setActiveFabricId(id);
  }, []);

  const importFabric = useCallback((fabric: Fabric) => {
    setFabrics((current) => [fabric, ...current.filter((item) => item.id !== fabric.id)]);
    setActiveFabricId(fabric.id);
    setTransform(DEFAULT_TEXTURE_TRANSFORM);
  }, []);

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
  const resetRoomTransform = useCallback(() => setRoomTransformReset((value) => value + 1), []);

  const activeFabric = useMemo(
    () => fabrics.find((f) => f.id === activeFabricId) ?? null,
    [fabrics, activeFabricId],
  );

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
  };

  return <ConfiguratorCtx.Provider value={value}>{children}</ConfiguratorCtx.Provider>;
}

export function useConfigurator(): ConfiguratorState {
  const ctx = useContext(ConfiguratorCtx);
  if (!ctx) throw new Error("useConfigurator must be used within a ConfiguratorProvider");
  return ctx;
}
