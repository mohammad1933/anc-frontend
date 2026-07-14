import { useRef, type ChangeEvent } from "react";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { UploadIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export function UploadDropzone() {
  const { uploadFiles, isUploading } = useConfigurator();
  const inputRef = useRef<HTMLInputElement>(null);

  const { isDragActive, dragHandlers } = useDragAndDrop({
    onDrop: (files) => uploadFiles(files),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadFiles(event.target.files);
      event.target.value = "";
    }
  };

  return (
    <div
      {...dragHandlers}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed px-4 py-7 text-center transition-colors duration-200 ease-atelier",
        isDragActive
          ? "border-atelier-brass bg-atelier-brass/10"
          : "border-atelier-line bg-atelier-panel hover:border-atelier-brass/50",
      )}
    >
      <span className="h-6 w-6 text-atelier-brass">
        <UploadIcon />
      </span>
      <p className="font-body text-[13px] text-atelier-ivory">
        {isUploading ? "Reading fabrics…" : "Drop fabric images here"}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-ivoryMuted">
        JPG · PNG · WEBP — up to 20MB
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
