import { useMemo } from "react";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { FabricThumbnailCard } from "@/components/sidebar/FabricThumbnailCard";

export function FabricGallery() {
  const { fabrics, activeFabricId, searchQuery, selectFabric, removeFabric } = useConfigurator();

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return fabrics;
    return fabrics.filter((f) => f.name.toLowerCase().includes(query));
  }, [fabrics, searchQuery]);

  if (fabrics.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-sm border border-atelier-line/60 px-4 py-10 text-center">
        <p className="font-display text-lg text-atelier-ivoryMuted">Your library is empty</p>
        <p className="font-body text-[12px] text-atelier-ivoryMuted/70">
          Upload a fabric image above to begin dressing the sofa.
        </p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-10 text-center">
        <p className="font-body text-[12px] text-atelier-ivoryMuted/70">No fabrics match “{searchQuery}”.</p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 auto-rows-min grid-cols-2 gap-2 overflow-y-auto pr-1">
      {filtered.map((fabric) => (
        <FabricThumbnailCard
          key={fabric.id}
          fabric={fabric}
          isActive={fabric.id === activeFabricId}
          onSelect={() => selectFabric(fabric.id)}
          onRemove={() => removeFabric(fabric.id)}
        />
      ))}
    </div>
  );
}
