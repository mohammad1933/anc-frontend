import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { SearchIcon } from "@/components/ui/icons";

export function SearchInput() {
  const { searchQuery, setSearchQuery, fabrics } = useConfigurator();

  if (fabrics.length === 0) return null;

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-atelier-ivoryMuted">
        <SearchIcon />
      </span>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search fabrics"
        className="w-full rounded-sm border border-atelier-line bg-atelier-panel py-2 pl-9 pr-3 font-body text-[13px] text-atelier-ivory placeholder:text-atelier-ivoryMuted/70 focus:border-atelier-brass/70 focus:outline-none"
      />
    </div>
  );
}
