import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { useViewerRefs } from "@/hooks/ViewerRefsContext";
import { useFullscreen } from "@/hooks/useFullscreen";
import { IconButton } from "@/components/ui/IconButton";
import { ResetIcon, FullscreenIcon, CameraIcon } from "@/components/ui/icons";
import { downloadCanvasScreenshot } from "@/utils/screenshot";

export function ActionButtons() {
  const { resetTransform, activeFabric } = useConfigurator();
  const { containerRef, canvasRef } = useViewerRefs();
  const { toggleFullscreen } = useFullscreen(containerRef);

  const handleScreenshot = () => {
    if (canvasRef.current) {
      downloadCanvasScreenshot(canvasRef.current, activeFabric?.name ?? "atelier-sofa");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <IconButton icon={<ResetIcon />} label="Reset Texture" onClick={resetTransform} />
      <IconButton icon={<FullscreenIcon />} label="Fullscreen" onClick={toggleFullscreen} />
      <IconButton icon={<CameraIcon />} label="Take Screenshot" variant="solid" onClick={handleScreenshot} />
    </div>
  );
}
