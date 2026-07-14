import { useCallback, useEffect, useState, type RefObject } from "react";

export function useFullscreen(targetRef: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(document.fullscreenElement === targetRef.current);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, [targetRef]);

  const toggleFullscreen = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch(() => {
        /* Fullscreen may be denied by the browser; fail silently. */
      });
    }
  }, [targetRef]);

  return { isFullscreen, toggleFullscreen };
}
