import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { formatDimensions } from "@/utils/format";

const STATUS_LABEL: Record<string, string> = {
  idle: "Idle",
  "loading-model": "Loading sofa model…",
  "loading-texture": "Applying fabric…",
  ready: "Ready",
  error: "Something went wrong",
};

export function StatusBar() {
  const { status, activeFabric, textureResolution } = useConfigurator();

  const isBusy = status === "loading-model" || status === "loading-texture";

  return (
    <footer className="flex h-10 shrink-0 items-center justify-between border-t border-atelier-line bg-atelier-obsidian px-6 font-mono text-[11px] text-atelier-ivoryMuted">
      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${isBusy ? "animate-pulse bg-atelier-brass" : "bg-atelier-moss"}`}
        />
        <span className="uppercase tracking-widest2">{STATUS_LABEL[status] ?? status}</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="truncate max-w-[240px]">
          {activeFabric ? activeFabric.name : "No fabric applied"}
        </span>
        <span>{textureResolution ? formatDimensions(textureResolution.width, textureResolution.height) : "—"}</span>
      </div>
    </footer>
  );
}
