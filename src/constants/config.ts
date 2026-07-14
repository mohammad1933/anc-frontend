export const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export const SUPPORTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export const THUMBNAIL_SIZE = 160;

export const MODEL_PATH = "/models/sofa.glb";

export const TEXTURE_SCALE_MIN = 0.25;
export const TEXTURE_SCALE_MAX = 20;
export const TEXTURE_ROTATION_MIN = 0;
export const TEXTURE_ROTATION_MAX = 360;
export const TEXTURE_OFFSET_MIN = -1;
export const TEXTURE_OFFSET_MAX = 1;

export const MAX_ANISOTROPY = 16;
