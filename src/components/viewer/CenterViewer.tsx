import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { useViewerRefs } from "@/hooks/ViewerRefsContext";
import { useConfigurator } from "@/hooks/ConfiguratorContext";

export function CenterViewer() {
  const { containerRef, canvasRef } = useViewerRefs();
  const { roomPhotoUrl } = useConfigurator();

  return (
    <div ref={containerRef} className="relative min-h-[360px] flex-1 overflow-hidden bg-atelier-obsidian">
      {roomPhotoUrl && <img className="absolute inset-0 h-full w-full object-cover" src={roomPhotoUrl} alt="Uploaded room" />}
      <SceneCanvas canvasRef={canvasRef} />
    </div>
  );
}
