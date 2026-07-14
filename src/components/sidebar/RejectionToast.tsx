import { useEffect } from "react";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { rejectionMessage } from "@/utils/fileValidation";
import { CloseIcon } from "@/components/ui/icons";

export function RejectionToast() {
  const { rejections, dismissRejections } = useConfigurator();

  useEffect(() => {
    if (rejections.length === 0) return;
    const timer = setTimeout(dismissRejections, 6000);
    return () => clearTimeout(timer);
  }, [rejections, dismissRejections]);

  if (rejections.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1.5">
      {rejections.map((rejection, i) => (
        <div
          key={`${rejection.fileName}-${i}`}
          className="flex items-start justify-between gap-3 rounded-sm border border-atelier-rust/50 bg-atelier-obsidian/95 px-3 py-2 shadow-panel"
        >
          <p className="font-body text-[12px] text-atelier-ivory">
            <span className="text-atelier-rust">{rejection.fileName}</span> — {rejectionMessage(rejection.reason)}
          </p>
          <button
            type="button"
            onClick={dismissRejections}
            aria-label="Dismiss"
            className="h-3.5 w-3.5 shrink-0 text-atelier-ivoryMuted hover:text-atelier-ivory"
          >
            <CloseIcon />
          </button>
        </div>
      ))}
    </div>
  );
}
