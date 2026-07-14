import type { Fabric } from "@/types/fabric";
import { TrashIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";
import { truncateName } from "@/utils/format";

interface FabricThumbnailCardProps {
  fabric: Fabric;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

export function FabricThumbnailCard({ fabric, isActive, onSelect, onRemove }: FabricThumbnailCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-sm border transition-all duration-200 ease-atelier",
        isActive
          ? "border-atelier-brass shadow-[0_0_0_1px_rgba(184,147,90,0.5)]"
          : "border-atelier-line hover:border-atelier-brass/50",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="h-full w-full"
        aria-label={`Apply ${fabric.name}`}
        aria-pressed={isActive}
      >
        <img src={fabric.thumbnail} alt={fabric.name} className="h-full w-full object-cover" draggable={false} />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1 pt-3">
        <p className="truncate font-mono text-[9px] uppercase tracking-wider text-atelier-ivory">
          {truncateName(fabric.name, 16)}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${fabric.name}`}
        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-sm bg-atelier-obsidian/70 text-atelier-ivoryMuted opacity-0 transition-opacity duration-150 hover:text-atelier-rust group-hover:opacity-100"
      >
        <span className="h-3 w-3">
          <TrashIcon />
        </span>
      </button>
    </div>
  );
}
