import { Link } from "react-router-dom";
import { useConfigurator } from "@/hooks/ConfiguratorContext";

export function TopBar() {
  const { fabrics } = useConfigurator();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-atelier-line bg-atelier-obsidian px-6">
      <div className="flex items-center gap-3">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="28" height="28" rx="2" stroke="#B8935A" strokeWidth="1" />
          <path d="M9 20V13.5C9 10.46 11.24 8 15 8C18.76 8 21 10.46 21 13.5V20" stroke="#B8935A" strokeWidth="1.3" />
          <path d="M6.5 20H23.5" stroke="#B8935A" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M8 20V22.2C8 22.64 8.36 23 8.8 23H10.6" stroke="#D9B77E" strokeWidth="1.1" />
          <path d="M22 20V22.2C22 22.64 21.64 23 21.2 23H19.4" stroke="#D9B77E" strokeWidth="1.1" />
        </svg>
        <div className="leading-tight">
          <p className="font-display text-xl tracking-wide text-atelier-ivory">Atelier</p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-ivoryMuted">
            Fabric Configurator
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-4 sm:flex">
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-atelier-ivoryMuted">
          {fabrics.length === 0
            ? "No fabrics uploaded"
            : `${fabrics.length} fabric${fabrics.length === 1 ? "" : "s"} in your library`}
        </span>
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-widest2 text-atelier-ivoryMuted hover:text-atelier-ivory transition-colors duration-200 border border-atelier-line hover:border-atelier-ivory px-3 py-1 rounded"
        >
          ← Home
        </Link>
      </div>
    </header>
  );
}
