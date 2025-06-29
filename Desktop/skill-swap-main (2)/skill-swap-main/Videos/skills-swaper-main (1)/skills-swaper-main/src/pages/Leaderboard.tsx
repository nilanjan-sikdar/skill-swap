
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { LeaderboardHub } from "@/components/leaderboard/LeaderboardHub";

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <TopNav />
            <main className="flex-1 overflow-auto">
              <LeaderboardHub />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Leaderboard;
