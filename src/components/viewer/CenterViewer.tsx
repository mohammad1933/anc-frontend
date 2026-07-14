import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { useViewerRefs } from "@/hooks/ViewerRefsContext";

export function CenterViewer() {
  const { containerRef, canvasRef } = useViewerRefs();

  return (
    <div ref={containerRef} className="relative min-h-[360px] flex-1 bg-atelier-obsidian">
      <SceneCanvas canvasRef={canvasRef} />
    </div>
  );
}
