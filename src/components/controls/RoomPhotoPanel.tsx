import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useConfigurator } from "@/hooks/ConfiguratorContext";

export function RoomPhotoPanel() {
  const {
    roomPhotoUrl,
    setRoomPhoto,
    roomTransformMode,
    setRoomTransformMode,
    resetRoomTransform,
    roomControlsVisible,
    setRoomControlsVisible,
    mockupModel,
    modelInstances,
    modelInstanceTransforms,
    activeModelInstanceId,
    setActiveModelInstanceId,
    duplicateModelInstance,
    deleteModelInstance,
  } = useConfigurator();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const modelLabel = mockupModel === "curtain" ? "Curtain" : mockupModel === "chair" ? "Chair" : "Sofa";
  const instanceIds = modelInstances[mockupModel];
  const selectedId = activeModelInstanceId && instanceIds.includes(activeModelInstanceId)
    ? activeModelInstanceId
    : null;
  const selectedIndex = selectedId ? instanceIds.indexOf(selectedId) : -1;
  const selectedTransform = selectedId ? modelInstanceTransforms[selectedId] : null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || (target instanceof HTMLElement && target.isContentEditable)) return;
      if (event.key.toLowerCase() === "w") setRoomTransformMode("translate");
      if (event.key.toLowerCase() === "e") setRoomTransformMode("rotate");
      if (event.key.toLowerCase() === "r") setRoomTransformMode("scale");
      if ((event.key === "Delete" || event.key === "Backspace") && selectedId && instanceIds.length > 1) {
        event.preventDefault();
        deleteModelInstance(selectedId);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deleteModelInstance, instanceIds.length, selectedId, setRoomTransformMode]);

  const selectPhoto = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a JPG, PNG, or WebP room photo.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("The room photo must be smaller than 12 MB.");
      return;
    }
    setError("");
    setRoomPhoto(file);
  };

  return (
    <section className="grid gap-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-muted">Room visualization</p>
        <h2 className="mt-1 font-display text-lg text-atelier-ivory">Place {modelLabel} in Your Room</h2>
      </div>
      {roomPhotoUrl && <img src={roomPhotoUrl} alt="Room preview" className="h-28 w-full rounded-sm border border-atelier-line object-cover" />}
      <input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => selectPhoto(event.target.files?.[0])} />
      <button type="button" onClick={() => inputRef.current?.click()} className="rounded-sm border border-atelier-brass bg-atelier-brass px-3 py-2.5 font-mono text-[11px] uppercase tracking-widest2 text-atelier-obsidian">
        {roomPhotoUrl ? "Replace Room Photo" : "Upload Room Photo"}
      </button>
      {roomPhotoUrl && <button type="button" onClick={() => setRoomPhoto(null)} className="rounded-sm border border-atelier-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest2 text-atelier-muted">Remove Photo</button>}
      {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
      <>
        <div className="grid gap-2 rounded-sm border border-atelier-line bg-atelier-obsidian/35 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-ivory">
              {selectedIndex >= 0 ? `${modelLabel} ${selectedIndex + 1}` : `No ${modelLabel} selected`}
            </span>
            <span className="font-mono text-[9px] uppercase text-atelier-muted">{instanceIds.length} total</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {instanceIds.map((id, index) => (
              <button key={id} type="button" aria-pressed={selectedId === id} onClick={() => setActiveModelInstanceId(id)} className={`rounded-sm border px-2 py-1.5 font-mono text-[9px] uppercase ${selectedId === id ? "border-atelier-brass text-atelier-brass" : "border-atelier-line text-atelier-muted"}`}>
                {modelLabel} {index + 1}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button type="button" onClick={() => duplicateModelInstance(selectedId ?? instanceIds[0])} className="rounded-sm border border-atelier-brass bg-atelier-brass px-2 py-2 font-mono text-[9px] uppercase tracking-wider text-atelier-obsidian">Duplicate {modelLabel}</button>
            <button type="button" disabled={!selectedId || instanceIds.length <= 1} onClick={() => selectedId && deleteModelInstance(selectedId)} className="rounded-sm border border-atelier-line px-2 py-2 font-mono text-[9px] uppercase tracking-wider text-red-300 disabled:opacity-35">Delete {modelLabel}</button>
          </div>
          {selectedTransform && (
            <div className="grid grid-cols-2 gap-x-3 font-mono text-[9px] text-atelier-muted">
              <span>Position {selectedTransform.position.map((value) => value.toFixed(2)).join(" · ")}</span>
              <span>Rotation {selectedTransform.rotation.map((value) => THREE.MathUtils.radToDeg(value).toFixed(0)).join("° · ")}°</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1" aria-label="Sofa transform mode">
          {(["translate", "rotate", "scale"] as const).map((mode) => <button key={mode} type="button" aria-pressed={roomControlsVisible && roomTransformMode === mode} onClick={() => { setRoomTransformMode(mode); setRoomControlsVisible(true); }} className={`rounded-sm border px-2 py-2 font-mono text-[9px] uppercase tracking-wider ${roomControlsVisible && roomTransformMode === mode ? "border-atelier-brass bg-atelier-brass text-atelier-obsidian" : "border-atelier-line text-atelier-muted"}`}>{mode === "translate" ? "Move" : mode}</button>)}
        </div>
        <button type="button" onClick={() => setRoomControlsVisible(!roomControlsVisible)} className={`rounded-sm border px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest2 ${roomControlsVisible ? "border-atelier-brass bg-atelier-brass text-atelier-obsidian" : "border-atelier-line text-atelier-ivory"}`}>{roomControlsVisible ? "✓ Done Adjusting" : `Edit ${modelLabel} Placement`}</button>
        <button type="button" disabled={!selectedId} onClick={resetRoomTransform} className="rounded-sm border border-atelier-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest2 text-atelier-muted disabled:opacity-35">Reset Selected</button>
        <div className="grid gap-1 rounded-sm border border-atelier-line bg-atelier-obsidian/40 p-3 text-[11px] leading-relaxed text-atelier-muted">
          <span><b className="text-atelier-ivory">Left-click any model</b> to select it and show controls for that model only.</span>
          <span>Select <b className="text-atelier-ivory">Move, Rotate, or Scale</b>, then drag the colored axis handles directly on the {modelLabel.toLowerCase()}.</span>
          <span><b className="text-red-300">Red</b> = left/right · <b className="text-green-300">Green</b> = up/down · <b className="text-blue-300">Blue</b> = depth</span>
        </div>
      </>
    </section>
  );
}
