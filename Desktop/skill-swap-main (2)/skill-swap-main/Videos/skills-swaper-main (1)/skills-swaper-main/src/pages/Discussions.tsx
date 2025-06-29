
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { DiscussionHub } from "@/components/discussions/DiscussionHub";
import { motion } from "framer-motion";

const Discussions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/30 dark:from-blue-500/30 dark:to-purple-700/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-gradient-to-tr from-pink-400/20 to-blue-600/30 dark:from-pink-500/30 dark:to-blue-700/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            rotate: [0, 90, -90, 0],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/3 w-80 h-80 bg-gradient-to-bl from-yellow-400/15 to-red-400/20 dark:from-yellow-500/25 dark:to-red-500/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -120, -240, -360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-green-400/15 to-teal-500/20 dark:from-green-500/25 dark:to-teal-600/30 rounded-full blur-3xl"
        />
      </div>

      <SidebarProvider>
        <div className="flex w-full min-h-screen relative z-10">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-800/30 dark:to-purple-800/30 shadow-lg shadow-blue-500/5 dark:shadow-purple-500/10"
            >
              <TopNav />
            </motion.header>
            <main className="flex-1 overflow-auto relative">
              <DiscussionHub />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Discussions;
