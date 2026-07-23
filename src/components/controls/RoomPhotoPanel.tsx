import { useRef, useState } from "react";
import { useConfigurator } from "@/hooks/ConfiguratorContext";

export function RoomPhotoPanel() {
  const { roomPhotoUrl, setRoomPhoto, roomTransformMode, setRoomTransformMode, resetRoomTransform, roomControlsVisible, setRoomControlsVisible } = useConfigurator();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

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
        <h2 className="mt-1 font-display text-lg text-atelier-ivory">Place Sofa in Your Room</h2>
      </div>
      {roomPhotoUrl && <img src={roomPhotoUrl} alt="Room preview" className="h-28 w-full rounded-sm border border-atelier-line object-cover" />}
      <input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => selectPhoto(event.target.files?.[0])} />
      <button type="button" onClick={() => inputRef.current?.click()} className="rounded-sm border border-atelier-brass bg-atelier-brass px-3 py-2.5 font-mono text-[11px] uppercase tracking-widest2 text-atelier-obsidian">
        {roomPhotoUrl ? "Replace Room Photo" : "Upload Room Photo"}
      </button>
      {roomPhotoUrl && <button type="button" onClick={() => setRoomPhoto(null)} className="rounded-sm border border-atelier-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest2 text-atelier-muted">Remove Photo</button>}
      {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
      {roomPhotoUrl && <>
        <div className="grid grid-cols-3 gap-1" aria-label="Sofa transform mode">
          {(["translate", "rotate", "scale"] as const).map((mode) => <button key={mode} type="button" aria-pressed={roomControlsVisible && roomTransformMode === mode} onClick={() => { setRoomTransformMode(mode); setRoomControlsVisible(true); }} className={`rounded-sm border px-2 py-2 font-mono text-[9px] uppercase tracking-wider ${roomControlsVisible && roomTransformMode === mode ? "border-atelier-brass bg-atelier-brass text-atelier-obsidian" : "border-atelier-line text-atelier-muted"}`}>{mode === "translate" ? "Move" : mode}</button>)}
        </div>
        <button type="button" onClick={() => setRoomControlsVisible(!roomControlsVisible)} className={`rounded-sm border px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest2 ${roomControlsVisible ? "border-atelier-brass bg-atelier-brass text-atelier-obsidian" : "border-atelier-line text-atelier-ivory"}`}>{roomControlsVisible ? "✓ Done Adjusting" : "Edit Sofa Placement"}</button>
        <button type="button" onClick={resetRoomTransform} className="rounded-sm border border-atelier-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest2 text-atelier-muted">Reset Sofa Placement</button>
        <div className="grid gap-1 rounded-sm border border-atelier-line bg-atelier-obsidian/40 p-3 text-[11px] leading-relaxed text-atelier-muted">
          <span>Select <b className="text-atelier-ivory">Move, Rotate, or Scale</b>, then drag the colored axis handles directly on the sofa.</span>
          <span><b className="text-red-300">Red</b> = left/right · <b className="text-green-300">Green</b> = up/down · <b className="text-blue-300">Blue</b> = depth</span>
        </div>
      </>}
    </section>
  );
}
