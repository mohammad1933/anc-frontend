import type * as THREE from "three";

/**
 * A single fabric uploaded by the user.
 * The `texture` is created lazily and cached once the fabric is first applied.
 */
export interface Fabric {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  /** Object URL pointing at the original uploaded image blob. */
  objectUrl: string;
  /** Small base64 thumbnail for the gallery grid. */
  thumbnail: string;
  /** Natural pixel dimensions of the source image. */
  width: number;
  height: number;
  createdAt: number;
}

export interface TextureTransform {
  scaleX: number;
  scaleY: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  /** When true, changing scaleX also updates scaleY (and vice versa). */
  repeatLocked: boolean;
}

export const DEFAULT_TEXTURE_TRANSFORM: TextureTransform = {
  scaleX: 4,
  scaleY: 4,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  repeatLocked: true,
};

export interface CachedTexture {
  texture: THREE.Texture;
  width: number;
  height: number;
  lastUsed: number;
}

export type UploadRejectionReason = "unsupported-format" | "too-large" | "read-error";

export interface UploadRejection {
  fileName: string;
  reason: UploadRejectionReason;
}

export type LoadingStatus = "idle" | "loading-model" | "loading-texture" | "ready" | "error";
