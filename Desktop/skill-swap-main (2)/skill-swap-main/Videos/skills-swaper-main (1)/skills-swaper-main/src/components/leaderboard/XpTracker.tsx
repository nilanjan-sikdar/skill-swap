
import { useAuth } from "@/hooks/useAuth";
import { useChallengeTracking } from "@/hooks/useChallengeTracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp, Calendar, Clock, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const XpTracker = () => {
  const { user } = useAuth();
  const { xpStats } = useChallengeTracking();
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  const loadRecentActivities = () => {
    if (!user) return;
    
    const activitiesKey = `xp_activities_${user.id}`;
    const savedActivities = localStorage.getItem(activitiesKey);
    
    if (savedActivities) {
      const activities = JSON.parse(savedActivities);
      setRecentActivities(activities.slice(-5).reverse());
    }
  };

  useEffect(() => {
    loadRecentActivities();
  }, [user, xpStats]);

  if (!user) return null;

  return (
    <div className="space-y-4">
      {/* Level Progress */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="h-5 w-5 text-yellow-500" />
            </motion.div>
            Level {xpStats.level}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-purple-500" />
                {xpStats.totalXp.toLocaleString()} XP
              </span>
              <span>{xpStats.xpToNextLevel} XP to next level</span>
            </div>
            <div className="relative">
              <Progress value={xpStats.progressToNextLevel} className="h-3" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
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
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-semibold text-blue-700">{xpStats.dailyXp}</div>
                <div className="text-xs text-blue-600">Today</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-semibold text-green-700">{xpStats.weeklyXp}</div>
                <div className="text-xs text-green-600">This Week</div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      {recentActivities && recentActivities.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Recent XP Gains
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 bg-muted/30 rounded-lg"
              >
                <div>
                  <div className="font-medium text-sm capitalize">
                    {activity.activity_type.replace('_', ' ')}
                  </div>
                  {activity.description && (
                    <div className="text-xs text-muted-foreground">
                      {activity.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <span>+{activity.xp_earned}</span>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Zap className="h-3 w-3" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
