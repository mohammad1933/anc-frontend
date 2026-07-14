import { ConfiguratorProvider } from "@/hooks/ConfiguratorContext";
import { ViewerRefsProvider } from "@/hooks/ViewerRefsContext";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBar } from "@/components/layout/StatusBar";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { CenterViewer } from "@/components/viewer/CenterViewer";
import { RightSidebar } from "@/components/controls/RightSidebar";

export function ConfiguratorPage() {
  return (
    <ConfiguratorProvider>
      <ViewerRefsProvider>
        <div className="flex h-screen w-screen flex-col overflow-hidden bg-atelier-obsidian text-atelier-ivory">
          <TopBar />
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

