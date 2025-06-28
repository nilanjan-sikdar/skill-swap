
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ProfileProvider } from "@/contexts/ProfileContext";

const Dashboard = () => {
  return (
    <ProfileProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/30" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large primary orb */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          
          {/* Medium secondary orb */}
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-400/15 to-orange-400/15 rounded-full blur-2xl animate-pulse delay-1000" />
          
          {/* Small accent orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/25 to-blue-500/25 rounded-full blur-xl animate-pulse delay-2000" />
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-l from-violet-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse delay-3000" />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-black/5" />
        
        {/* Animated rings */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-blue-200/30 dark:border-blue-700/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-200/30 dark:border-purple-700/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
        {/* Subtle glow effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        
        <SidebarProvider>
          <div className="flex w-full min-h-screen relative z-10">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <TopNav />
              <main className="flex-1 overflow-auto">
                <DashboardContent />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ProfileProvider>
  );
};

export default Dashboard;
