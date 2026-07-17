import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ConfiguratorProvider } from "@/hooks/ConfiguratorContext";
import { useConfigurator } from "@/hooks/ConfiguratorContext";
import type { Fabric } from "@/types/fabric";
import { ViewerRefsProvider } from "@/hooks/ViewerRefsContext";
import { StatusBar } from "@/components/layout/StatusBar";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { CenterViewer } from "@/components/viewer/CenterViewer";
import { RightSidebar } from "@/components/controls/RightSidebar";

function SelectedFabricInitializer() {
  const location = useLocation();
  const { importFabric } = useConfigurator();

  useEffect(() => {
    const selectedFabric = (location.state as { selectedFabric?: Fabric } | null)?.selectedFabric;
    if (selectedFabric) importFabric(selectedFabric);
  }, [importFabric, location.state]);

  return null;
}

export function ConfiguratorPage() {
  return (
    <ConfiguratorProvider>
      <SelectedFabricInitializer />
      <ViewerRefsProvider>
        <div className="flex h-[calc(100vh-72px)] w-full flex-col overflow-hidden bg-atelier-obsidian text-atelier-ivory">
          <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
            <LeftSidebar />
            <CenterViewer />
            <RightSidebar />
          </div>
          <StatusBar />
        </div>
      </ViewerRefsProvider>
    </ConfiguratorProvider>
  );
}
