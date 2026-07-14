import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { registerRenderer } from "@/utils/textureCache";

/** Invisible helper that hands the live WebGLRenderer to the texture cache. */
export function RendererBridge() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    registerRenderer(gl);
  }, [gl]);

  return null;
}
