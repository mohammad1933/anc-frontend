import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { useViewerRefs } from "@/hooks/ViewerRefsContext";
import { useConfigurator } from "@/hooks/ConfiguratorContext";

export function CenterViewer() {
  const { containerRef, canvasRef } = useViewerRefs();
  const {
    roomPhotoUrl,
    mockupModel,
    modelInstances,
    modelContextMenu,
    closeModelContextMenu,
    duplicateModelInstance,
    deleteModelInstance,
  } = useConfigurator();
  const canDelete = modelInstances[mockupModel].length > 1;

  return (
    <div ref={containerRef} className="relative min-h-[360px] flex-1 overflow-hidden bg-atelier-obsidian" onPointerDown={() => closeModelContextMenu()} onContextMenu={(event) => event.preventDefault()}>
      {roomPhotoUrl && <img className="absolute inset-0 h-full w-full object-cover" src={roomPhotoUrl} alt="Uploaded room" />}
      <SceneCanvas canvasRef={canvasRef} />
      {modelContextMenu && (
        <div
          role="menu"
          aria-label={`${mockupModel} actions`}
          className="absolute z-30 w-40 overflow-hidden rounded-sm border border-atelier-line bg-atelier-charcoal py-1 shadow-2xl"
          style={{ left: modelContextMenu.x, top: modelContextMenu.y }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button type="button" role="menuitem" className="block w-full px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest2 text-atelier-ivory hover:bg-atelier-line" onClick={() => duplicateModelInstance(modelContextMenu.instanceId)}>
            Duplicate
          </button>
          <button type="button" role="menuitem" disabled={!canDelete} className="block w-full px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest2 text-red-300 hover:bg-atelier-line disabled:cursor-not-allowed disabled:opacity-35" onClick={() => deleteModelInstance(modelContextMenu.instanceId)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
