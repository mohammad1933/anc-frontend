import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { formatBytes, formatDimensions } from "@/utils/format";

export function FabricInfoPanel() {
  const { activeFabric } = useConfigurator();

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-brass">Current Fabric</p>

      {!activeFabric ? (
        <div className="flex h-24 items-center justify-center rounded-sm border border-dashed border-atelier-line text-center">
          <p className="px-4 font-body text-[12px] text-atelier-ivoryMuted/70">
            Select a fabric from your library to preview it here.
          </p>
        </div>
      ) : (
        <div className="flex gap-3 rounded-sm border border-atelier-line bg-atelier-panel p-3">
          <img
            src={activeFabric.thumbnail}
            alt={activeFabric.name}
            className="h-16 w-16 shrink-0 rounded-sm object-cover"
          />
          <div className="min-w-0 space-y-1">
            <p className="truncate font-body text-[13px] text-atelier-ivory">{activeFabric.name}</p>
            <p className="font-mono text-[10px] text-atelier-ivoryMuted">
              {formatDimensions(activeFabric.width, activeFabric.height)}
            </p>
            <p className="font-mono text-[10px] text-atelier-ivoryMuted">{formatBytes(activeFabric.fileSize)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
