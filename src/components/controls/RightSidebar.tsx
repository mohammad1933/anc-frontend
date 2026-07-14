import { TextureControlsPanel } from "@/components/controls/TextureControlsPanel";
import { FabricInfoPanel } from "@/components/controls/FabricInfoPanel";
import { ActionButtons } from "@/components/controls/ActionButtons";

export function RightSidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 overflow-y-auto border-atelier-line bg-atelier-charcoal p-4 md:w-80 md:border-l">
      <FabricInfoPanel />
      <div className="h-px bg-atelier-line" />
      <TextureControlsPanel />
      <div className="h-px bg-atelier-line" />
      <ActionButtons />
    </aside>
  );
}
