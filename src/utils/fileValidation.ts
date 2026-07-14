import { MAX_UPLOAD_SIZE_BYTES, SUPPORTED_MIME_TYPES } from "@/constants/config";
import type { UploadRejectionReason } from "@/types/fabric";

export interface ValidationResult {
  valid: boolean;
  reason?: UploadRejectionReason;
}

export function validateFile(file: File): ValidationResult {
  const mime = file.type.toLowerCase();
  const isSupportedMime = (SUPPORTED_MIME_TYPES as readonly string[]).includes(mime);
  const hasSupportedExtension = /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isSupportedMime && !hasSupportedExtension) {
    return { valid: false, reason: "unsupported-format" };
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return { valid: false, reason: "too-large" };
  }

  return { valid: true };
}

export function rejectionMessage(reason: UploadRejectionReason): string {
  switch (reason) {
    case "unsupported-format":
      return "Unsupported format. Use JPG, PNG or WEBP.";
    case "too-large":
      return "File exceeds the 20 MB limit.";
    case "read-error":
      return "The file could not be read.";
    default:
      return "The file was rejected.";
  }
}
