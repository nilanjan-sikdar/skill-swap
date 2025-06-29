
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useChallengeTracking } from "@/hooks/useChallengeTracking";
import { useProfile } from "@/contexts/ProfileContext";
import { motion } from "framer-motion";
import { Zap, Sparkles, Crown, User, Trophy, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ChallengeProgress } from "./ChallengeProgress";

export function TopNav() {
  const { user, signOut } = useAuth();
  const { profileData } = useProfile();
  const { xpStats } = useChallengeTracking();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="md:hidden" />
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Dashboard
            </motion.h1>
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome back, {profileData.name || 'Champion'}! 🚀
            </motion.p>
          </motion.div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Challenge Progress */}
          <div className="hidden lg:block">
            <ChallengeProgress />
          </div>

          {/* Enhanced XP Meter */}
          <motion.div 
            className="hidden sm:flex items-center space-x-4 bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl px-6 py-3 border border-gray-200/30 dark:border-gray-700/30 shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.3)"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="flex items-center space-x-2"
                animate={{ 
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity 
                    }}
                  >
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                </div>
                <motion.span 
                  className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Crown className="h-4 w-4 text-yellow-500" />
                  Level {xpStats.level}
                </motion.span>
              </motion.div>
              
              <div className="relative w-24 h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden border border-gray-300/50 dark:border-gray-600/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpStats.progressToNextLevel}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ 
                      x: [-100, 100],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              
              <motion.span 
                className="text-xs text-gray-600 dark:text-gray-300 font-medium"
                animate={{ 
                  opacity: [0.8, 1, 0.8] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              >
                {xpStats.totalXp % 1000}/{1000} XP
              </motion.span>
            </div>
          </motion.div>

          {/* Enhanced Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button variant="ghost" className="relative h-12 w-12 rounded-2xl hover:ring-2 hover:ring-blue-400/50 transition-all duration-300 bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30">
                  <Avatar className="h-10 w-10 ring-2 ring-gray-200/50 dark:ring-gray-700/50">
                    <AvatarImage src={profileData.avatar_url} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg">
                      {profileData.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 mr-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profileData.avatar_url} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {profileData.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <motion.p 
                      className="text-sm font-bold text-gray-900 dark:text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {profileData.name || 'User'}
                    </motion.p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {profileData.location}
                    </p>
                  </div>
                </div>
                <motion.div 
                  className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {xpStats.level}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {profileData.challenges_completed || 0}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Challenges</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {profileData.collaborations_count || 0}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Collabs</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Sparkles className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {xpStats.totalXp.toLocaleString()} XP Total
                    </span>
                  </div>
                </motion.div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-700/50" />
              <Link to="/profile">
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 m-1 rounded">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-900/20 m-1 rounded">
                <Trophy className="mr-2 h-4 w-4" />
                Achievements
              </DropdownMenuItem>
              <Link to="/settings">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 m-1 rounded">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-700/50" />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 m-1 rounded"
                onClick={signOut}
              >
                <span className="mr-2">🚪</span>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
