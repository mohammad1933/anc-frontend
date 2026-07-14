import * as THREE from "three";
import { MAX_ANISOTROPY } from "@/constants/config";
import type { CachedTexture } from "@/types/fabric";

const loader = new THREE.TextureLoader();
const cache = new Map<string, CachedTexture>();

let maxAnisotropy = 1;

/** Call once a WebGLRenderer exists so future textures use the real GPU cap. */
export function registerRenderer(renderer: THREE.WebGLRenderer): void {
  maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), MAX_ANISOTROPY);
  // Retroactively upgrade any textures already loaded before the renderer existed.
  cache.forEach((entry) => {
    entry.texture.anisotropy = maxAnisotropy;
    entry.texture.needsUpdate = true;
  });
}

/**
 * Loads (or returns a cached) texture for a fabric's object URL. Textures are
 * configured for tiling upholstery use: sRGB color space, repeat wrapping,
 * mipmaps and maximum anisotropic filtering.
 */
export async function loadFabricTexture(fabricId: string, objectUrl: string): Promise<THREE.Texture> {
  const cached = cache.get(fabricId);
  if (cached) {
    cached.lastUsed = Date.now();
    return cached.texture;
  }

  const texture = await loader.loadAsync(objectUrl);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;

  cache.set(fabricId, {
    texture,
    width: texture.image?.width ?? 0,
    height: texture.image?.height ?? 0,
    lastUsed: Date.now(),
  });

  return texture;
}

export function getCachedDimensions(fabricId: string): { width: number; height: number } | null {
  const cached = cache.get(fabricId);
  return cached ? { width: cached.width, height: cached.height } : null;
}

/** Frees GPU memory for a texture that is no longer referenced anywhere. */
export function disposeFabricTexture(fabricId: string): void {
  const cached = cache.get(fabricId);
  if (!cached) return;
  cached.texture.dispose();
  cache.delete(fabricId);
}

/** Evicts every cached texture except the ids passed in — used after bulk deletes. */
export function pruneTexturesExcept(keepIds: Set<string>): void {
  cache.forEach((entry, id) => {
    if (!keepIds.has(id)) {
      entry.texture.dispose();
      cache.delete(id);
    }
  });
}

export function disposeAllTextures(): void {
  cache.forEach((entry) => entry.texture.dispose());
  cache.clear();
}
