
import { motion } from "framer-motion";
import { Trophy, Target, Flame, Calendar } from "lucide-react";
import { useChallengeTracking } from "@/hooks/useChallengeTracking";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const ChallengeProgress = () => {
  const { stats } = useChallengeTracking();

  const dailyProgress = (stats.dailyCompleted / stats.dailyTarget) * 100;
  const weeklyProgress = (stats.weeklyCompleted / stats.weeklyTarget) * 100;

  return (
    <div className="flex items-center space-x-4">
      {/* Daily Progress */}
      <motion.div 
        className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <Calendar className="h-4 w-4 text-blue-600" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-blue-600">Daily</span>
            <Badge variant="secondary" className="text-xs">
              {stats.dailyCompleted}/{stats.dailyTarget}
            </Badge>
          </div>
          <Progress value={dailyProgress} className="w-16 h-1" />
        </div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div 
        className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <Target className="h-4 w-4 text-purple-600" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-purple-600">Weekly</span>
            <Badge variant="secondary" className="text-xs">
              {stats.weeklyCompleted}/{stats.weeklyTarget}
            </Badge>
          </div>
          <Progress value={weeklyProgress} className="w-16 h-1" />
        </div>
      </motion.div>

      {/* Streak */}
      <motion.div 
        className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg"
        whileHover={{ scale: 1.02 }}
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className="h-4 w-4 text-orange-600" />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-orange-600">Streak</span>
          <span className="text-sm font-bold text-orange-700">{stats.currentStreak}</span>
        </div>
      </motion.div>

      {/* Average Score */}
      <motion.div 
        className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <Trophy className="h-4 w-4 text-green-600" />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-green-600">Avg Score</span>
          <span className="text-sm font-bold text-green-700">{stats.averageScore}%</span>
        </div>
      </motion.div>
    </div>
  );
};
