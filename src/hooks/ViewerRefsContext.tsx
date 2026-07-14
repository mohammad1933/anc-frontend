import { createContext, useContext, useRef, type ReactNode, type MutableRefObject } from "react";

interface ViewerRefs {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

const ViewerRefsCtx = createContext<ViewerRefs | null>(null);

export function ViewerRefsProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return <ViewerRefsCtx.Provider value={{ containerRef, canvasRef }}>{children}</ViewerRefsCtx.Provider>;
}

export function useViewerRefs(): ViewerRefs {
  const ctx = useContext(ViewerRefsCtx);
  if (!ctx) throw new Error("useViewerRefs must be used within a ViewerRefsProvider");
  return ctx;
}
