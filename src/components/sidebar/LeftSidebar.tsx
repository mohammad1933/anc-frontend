import { UploadDropzone } from "@/components/sidebar/UploadDropzone";
import { SearchInput } from "@/components/sidebar/SearchInput";
import { FabricGallery } from "@/components/sidebar/FabricGallery";
import { RejectionToast } from "@/components/sidebar/RejectionToast";

export function LeftSidebar() {
  return (
    <aside className="relative flex w-full shrink-0 flex-col gap-3 border-atelier-line bg-atelier-charcoal p-4 md:w-72 md:border-r">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-brass">Fabric Library</p>
      <UploadDropzone />
      <SearchInput />
      <FabricGallery />
      <RejectionToast />
    </aside>
  );
}
