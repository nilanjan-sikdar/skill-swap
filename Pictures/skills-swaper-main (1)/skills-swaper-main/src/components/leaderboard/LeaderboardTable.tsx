
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award, Zap, Target, Calendar, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useChallengeTracking } from "@/hooks/useChallengeTracking";
import { useAuth } from "@/hooks/useAuth";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface LeaderboardTableProps {
  period: "daily" | "weekly" | "all-time";
}

interface LocalUserStats {
  userId: string;
  name: string;
  dailyCompleted: number;
  dailyTarget: number;
  weeklyCompleted: number;
  weeklyTarget: number;
  totalChallenges: number;
  averageScore: number;
  currentStreak: number;
  totalXp: number;
  recentBadges: Array<{
    name: string;
    color: string;
    type: string;
  }>;
}

export const LeaderboardTable = ({ period }: LeaderboardTableProps) => {
  const { user } = useAuth();
  const { stats } = useChallengeTracking();
  const [leaderboard, setLeaderboard] = useState<LocalUserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLocalLeaderboard();
  }, [user, stats, period]);

  const loadLocalLeaderboard = () => {
    setIsLoading(true);
    
    // Get all users who have completed challenges
    const allUsers: LocalUserStats[] = [];
    
    // Add current user if they have stats
    if (user && stats.totalChallenges > 0) {
      const currentUserStats: LocalUserStats = {
        userId: user.id,
        name: user.email?.split('@')[0] || 'You',
        dailyCompleted: stats.dailyCompleted,
        dailyTarget: stats.dailyTarget,
        weeklyCompleted: stats.weeklyCompleted,
        weeklyTarget: stats.weeklyTarget,
        totalChallenges: stats.totalChallenges,
        averageScore: stats.averageScore,
        currentStreak: stats.currentStreak,
        totalXp: calculateTotalXp(stats.recentCompletions),
        recentBadges: stats.recentCompletions
          .filter(c => c.badge)
          .slice(0, 3)
          .map(c => c.badge!)
      };
      allUsers.push(currentUserStats);
    }

    // Get other users' stats from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('challenge_stats_') && !key.includes(user?.id || '')) {
        try {
          const userId = key.replace('challenge_stats_', '');
          const userData = localStorage.getItem(key);
          if (userData) {
            const parsedData = JSON.parse(userData);
            const userStats: LocalUserStats = {
              userId,
              name: `User${userId.slice(0, 8)}`,
              dailyCompleted: parsedData.dailyCompleted || 0,
              dailyTarget: parsedData.dailyTarget || 3,
              weeklyCompleted: parsedData.weeklyCompleted || 0,
              weeklyTarget: parsedData.weeklyTarget || 15,
              totalChallenges: parsedData.totalChallenges || 0,
              averageScore: parsedData.averageScore || 0,
              currentStreak: parsedData.currentStreak || 0,
              totalXp: calculateTotalXpFromCompletions(userId),
              recentBadges: []
            };
            
            if (userStats.totalChallenges > 0) {
              allUsers.push(userStats);
            }
          }
        } catch (error) {
          console.error('Error parsing user stats:', error);
        }
      }
    }

    // Sort based on period
    const sortedUsers = allUsers.sort((a, b) => {
      switch (period) {
        case "daily":
          return b.dailyCompleted - a.dailyCompleted || b.averageScore - a.averageScore;
        case "weekly":
          return b.weeklyCompleted - a.weeklyCompleted || b.averageScore - a.averageScore;
        default:
          return b.totalChallenges - a.totalChallenges || b.averageScore - a.averageScore;
      }
    });

    setLeaderboard(sortedUsers);
    setIsLoading(false);
  };

  const calculateTotalXp = (completions: any[]) => {
    return completions.reduce((total, completion) => total + (completion.xpEarned || 0), 0);
  };

  const calculateTotalXpFromCompletions = (userId: string) => {
    try {
      const completionsKey = `challenge_completions_${userId}`;
      const completionsData = localStorage.getItem(completionsKey);
      if (completionsData) {
        const completions = JSON.parse(completionsData);
        return completions.reduce((total: number, completion: any) => total + (completion.xpEarned || 0), 0);
      }
    } catch (error) {
      console.error('Error calculating XP:', error);
    }
    return 0;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
            {rank}
          </div>
        );
    }
  };

  const getRankGlow = (rank: number) => {
    if (rank <= 3) {
      return "shadow-lg shadow-yellow-500/20 border-yellow-500/30";
    }
    return "";
  };

  const getScoreForPeriod = (userStats: LocalUserStats) => {
    switch (period) {
      case "daily":
        return userStats.dailyCompleted;
      case "weekly":
        return userStats.weeklyCompleted;
      default:
        return userStats.totalChallenges;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-6 bg-muted rounded w-16" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Challenge Data Yet</h3>
        <p className="text-muted-foreground">
          Complete some challenges to see the leaderboard!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {leaderboard.map((userStats, index) => {
        const rank = index + 1;
        const score = getScoreForPeriod(userStats);
        const dailyProgress = (userStats.dailyCompleted / userStats.dailyTarget) * 100;
        const weeklyProgress = (userStats.weeklyCompleted / userStats.weeklyTarget) * 100;
        const isCurrentUser = userStats.userId === user?.id;
        
        return (
          <motion.div
            key={userStats.userId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-200"
          >
            <Card className={`p-6 border-2 transition-all duration-300 hover:shadow-lg ${getRankGlow(rank)} ${isCurrentUser ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
              <div className="flex items-start space-x-4">
                {/* Rank */}
                <div className="flex-shrink-0 pt-1">
                  {getRankIcon(rank)}
                </div>

                {/* Avatar */}
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userStats.name}`} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
                    {userStats.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xl truncate">
                      {userStats.name}
                      {isCurrentUser && <span className="text-blue-600 ml-2">(You)</span>}
                    </h3>
                    {rank <= 3 && (
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          Top {rank}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Challenge Progress Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-600">Daily Progress</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {userStats.dailyCompleted}/{userStats.dailyTarget}
                        </span>
                      </div>
                      <Progress value={dailyProgress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium text-purple-600">Weekly Progress</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {userStats.weeklyCompleted}/{userStats.weeklyTarget}
                        </span>
                      </div>
                      <Progress value={weeklyProgress} className="h-2" />
                    </div>
                  </div>

                  {/* Challenge Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="text-lg font-bold text-green-700">{userStats.averageScore}%</div>
                          <div className="text-xs text-green-600">Avg Score</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-600" />
                        <div>
                          <div className="text-lg font-bold text-orange-700">{userStats.currentStreak}</div>
                          <div className="text-xs text-orange-600">Day Streak</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="text-lg font-bold text-blue-700">{userStats.totalChallenges}</div>
                          <div className="text-xs text-blue-600">Total</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="text-lg font-bold text-purple-700">{userStats.totalXp.toLocaleString()}</div>
                          <div className="text-xs text-purple-600">XP</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Badges */}
                  {userStats.recentBadges.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Recent Badges</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {userStats.recentBadges.map((badge, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs"
                            style={{ backgroundColor: badge.color + '20', borderColor: badge.color }}
                          >
                            {badge.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rank indicator for top 3 */}
                {rank <= 3 && (
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(234, 179, 8, 0.4)",
                        "0 0 0 10px rgba(234, 179, 8, 0)",
                        "0 0 0 0 rgba(234, 179, 8, 0)"
                      ] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-yellow-500 rounded-full mt-2"
                  />
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
