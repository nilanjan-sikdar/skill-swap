
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Trophy, 
  Users, 
  User,
  MessageSquare,
  Crown,
  Settings,
  Sparkles,
  Zap
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Challenges",
    url: "/challenges", 
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    title: "Discussions",
    url: "/discussions",
    icon: MessageSquare,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Crown,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    title: "Collaboration",
    url: "/collaboration",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const sidebarVariants = {
    expanded: {
      width: "16rem",
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    collapsed: {
      width: "4rem",
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    })
  };

  return (
    <Sidebar className="border-r border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <SidebarHeader className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
        <motion.div
          animate={isCollapsed ? "collapsed" : "expanded"}
          variants={sidebarVariants}
          className="flex items-center space-x-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSync
              </h2>
            </motion.div>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
            {!isCollapsed ? "Navigation" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <motion.div
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SidebarMenuButton 
                        asChild 
                        className={`
                          relative overflow-hidden rounded-xl transition-all duration-300
                          ${active 
                            ? `${item.bgColor} ${item.color} font-medium shadow-lg` 
                            : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                          }
                        `}
                      >
                        <NavLink to={item.url} className="flex items-center space-x-3 p-3">
                          {active && (
                            <motion.div
                              layoutId="activeBackground"
                              className={`absolute inset-0 ${item.bgColor} rounded-xl`}
                              initial={false}
                              transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                            />
                          )}
                          <motion.div
                            animate={{ 
                              rotate: active ? [0, -10, 10, 0] : 0,
                              scale: active ? [1, 1.1, 1] : 1 
                            }}
                            transition={{ duration: active ? 0.5 : 0 }}
                            className="relative z-10"
                          >
                            <Icon className={`w-5 h-5 ${active ? item.color : ''}`} />
                          </motion.div>
                          {!isCollapsed && (
                            <motion.span 
                              className="relative z-10 font-medium"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              {item.title}
                            </motion.span>
                          )}
                          {active && (
                            <motion.div
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Zap className={`w-3 h-3 ${item.color}`} />
                            </motion.div>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
