
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { SettingsHub } from "@/components/settings/SettingsHub";
import { ProfileProvider } from "@/contexts/ProfileContext";

const Settings = () => {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-background">
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <TopNav />
              <main className="flex-1 overflow-auto">
                <SettingsHub />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ProfileProvider>
  );
};

export default Settings;
