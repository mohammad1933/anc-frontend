import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { LockIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export function RepeatLockToggle() {
  const { transform, updateTransform } = useConfigurator();

  return (
    <button
      type="button"
      onClick={() => updateTransform({ repeatLocked: !transform.repeatLocked })}
      className={cn(
        "flex w-full items-center justify-between rounded-sm border px-3 py-2 transition-colors duration-200 ease-atelier",
        transform.repeatLocked
          ? "border-atelier-brass/60 bg-atelier-brass/10 text-atelier-brassLight"
          : "border-atelier-line text-atelier-ivoryMuted hover:border-atelier-brass/40",
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest2">
        {transform.repeatLocked ? "Scale locked" : "Scale unlocked"}
      </span>
      <span className="h-4 w-4">
        <LockIcon locked={transform.repeatLocked} />
      </span>
    </button>
  );
}
