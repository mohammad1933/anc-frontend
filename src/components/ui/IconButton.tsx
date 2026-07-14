import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: "ghost" | "solid";
}

export function IconButton({ icon, label, variant = "ghost", className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={cn(
        "group flex items-center justify-center gap-2 rounded-sm border px-3 py-2 text-[11px] font-mono uppercase tracking-widest2 transition-colors duration-200 ease-atelier",
        variant === "solid"
          ? "border-atelier-brass bg-atelier-brass/90 text-atelier-obsidian hover:bg-atelier-brassLight"
          : "border-atelier-line bg-atelier-panel text-atelier-ivoryMuted hover:border-atelier-brass/60 hover:text-atelier-ivory",
        className,
      )}
      {...rest}
    >
      <span className="h-4 w-4 shrink-0">{icon}</span>
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
