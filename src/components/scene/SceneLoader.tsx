import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-atelier-ivory">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-atelier-brass/30 border-t-atelier-brass" />
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-atelier-ivoryMuted">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}
