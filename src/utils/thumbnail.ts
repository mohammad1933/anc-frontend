import { THUMBNAIL_SIZE } from "@/constants/config";

export interface ProcessedImage {
  thumbnail: string;
  width: number;
  height: number;
}

/**
 * Loads an image from an object URL, reads its natural dimensions, and
 * renders a square, cropped thumbnail for the fabric gallery.
 */
export function createThumbnail(objectUrl: string): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const canvas = document.createElement("canvas");
      canvas.width = THUMBNAIL_SIZE;
      canvas.height = THUMBNAIL_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      const side = Math.min(width, height);
      const sx = (width - side) / 2;
      const sy = (height - side) / 2;

      ctx.drawImage(img, sx, sy, side, side, 0, 0, THUMBNAIL_SIZE, THUMBNAIL_SIZE);

      resolve({
        thumbnail: canvas.toDataURL("image/jpeg", 0.85),
        width,
        height,
      });
    };
    img.onerror = () => reject(new Error("Failed to decode image"));
    img.src = objectUrl;
  });
}
