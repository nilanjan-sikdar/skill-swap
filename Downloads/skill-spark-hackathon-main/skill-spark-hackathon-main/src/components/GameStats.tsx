import { Trophy, Target, Users, Zap, TrendingUp, Calendar, Award, Star, Crown, Gem, Sparkles, Flame, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const GameStats = () => {
  const achievements = [
    { name: 'Code Warrior', description: '100 coding sessions completed', progress: 85, icon: '⚔️', color: 'red' },
    { name: 'Mentor Master', description: 'Helped 50 students', progress: 60, icon: '🎓', color: 'blue' },
    { name: 'Speed Learner', description: '10 skills in 30 days', progress: 40, icon: '⚡', color: 'yellow' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', xp: 15420, avatar: 'AC', trend: 'up', streak: 12 },
    { rank: 2, name: 'Sarah Kim', xp: 14890, avatar: 'SK', trend: 'up', streak: 8 },
    { rank: 3, name: 'Mike Ross', xp: 14650, avatar: 'MR', trend: 'down', streak: 5 },
    { rank: 4, name: 'You', xp: 14200, avatar: 'YO', trend: 'up', isUser: true, streak: 7 },
    { rank: 5, name: 'Lisa Wang', xp: 13980, avatar: 'LW', trend: 'up', streak: 15 },
  ];

  const recentActivity = [
    { icon: Award, text: 'Earned "React Master" badge', time: '2 hours ago', xp: 500, color: 'green' },
    { icon: Users, text: 'Completed collaborative session', time: '5 hours ago', xp: 200, color: 'blue' },
    { icon: Star, text: 'Received 5-star review', time: '1 day ago', xp: 100, color: 'purple' },
    { icon: Flame, text: 'Achieved 7-day streak', time: '2 days ago', xp: 150, color: 'orange' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-96 h-96 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 py-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm animate-float">
            <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-yellow-300 font-medium">Gaming Dashboard</span>
            <Sparkles className="w-5 h-5 text-orange-400 animate-spin" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Level Up</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Your Skills</span>
          </h1>
          <p className="text-slate-300 text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Compete with peers and track your learning journey
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Player Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* XP and Level with Animations */}
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-500 group animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-purple-200 transition-colors">
                <div className="relative">
                  <Trophy className="h-6 w-6 text-yellow-400 group-hover:animate-bounce" />
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                Player Stats
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    Level 42
                  </div>
                  <p className="text-slate-300 group-hover:text-slate-200 transition-colors flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    Senior Developer
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">14,200 XP</div>
                  <p className="text-sm text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    +2,847 this week
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    Progress to Level 43
                  </span>
                  <span className="text-purple-400 font-medium">2,800 / 3,500 XP</span>
                </div>
                <div className="relative">
                  <Progress value={80} className="h-4" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>700 XP to next level</span>
                  <span>80% complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Weekly Challenges */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-green-300 transition-colors">
                <Target className="h-5 w-5 text-green-400 group-hover:animate-pulse" />
                Weekly Challenges
                <Badge variant="outline" className="ml-auto border-green-500/50 text-green-300 text-xs">
                  <Gift className="w-3 h-3 mr-1" />
                  Bonus XP Available
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group/achievement animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl group-hover/achievement:animate-bounce">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover/achievement:text-green-200 transition-colors">{achievement.name}</h4>
                      <p className="text-sm text-slate-400 group-hover/achievement:text-slate-300 transition-colors">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`border-${achievement.color}-500/50 text-${achievement.color}-300`}>
                        {achievement.progress}%
                      </Badge>
                      <p className="text-xs text-slate-400 mt-1">+{achievement.progress * 10} XP</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={achievement.progress} className="h-3" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-full"></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Recent Activity */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-blue-300 transition-colors">
                <Calendar className="h-5 w-5 text-blue-400 group-hover:animate-pulse" />
                Recent Activity
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-400">Live Updates</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 group/activity animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`w-10 h-10 bg-${activity.color}-500/20 rounded-full flex items-center justify-center group-hover/activity:scale-110 transition-transform`}>
                      <activity.icon className={`h-5 w-5 text-${activity.color}-400 group-hover/activity:animate-pulse`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white group-hover/activity:text-slate-100 transition-colors">{activity.text}</p>
                      <p className="text-xs text-slate-400 group-hover/activity:text-slate-300 transition-colors">{activity.time} • +{activity.xp} XP</p>
                    </div>
                    <div className={`text-${activity.color}-400 font-bold text-sm group-hover/activity:scale-110 transition-transform`}>
                      +{activity.xp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-8">
          {/* Enhanced Leaderboard */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-orange-300 transition-colors">
                <TrendingUp className="h-5 w-5 text-orange-400 group-hover:animate-bounce" />
                Global Leaderboard
                <div className="ml-auto">
                  <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((player, index) => (
                <div 
                  key={player.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    player.isUser ? 'bg-purple-500/20 border border-purple-500/30 animate-glow' : 'bg-slate-700/30 hover:bg-slate-700/50'
                  } animate-fade-in group/player`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative ${
                    player.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' :
                    player.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-black' :
                    player.rank === 3 ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' :
                    'bg-slate-600 text-white'
                  } group-hover/player:scale-110 transition-transform`}>
                    {player.rank}
                    {player.rank <= 3 && (
                      <Crown className="absolute -top-2 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover/player:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">{player.avatar}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium truncate ${player.isUser ? 'text-purple-300' : 'text-white'} group-hover/player:text-orange-200 transition-colors`}>
                        {player.name}
                      </p>
                      {player.streak > 5 && (
                        <Flame className="w-3 h-3 text-orange-400 animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{player.xp.toLocaleString()} XP</span>
                      {player.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-400 group-hover/player:animate-bounce" />
                      ) : (
                        <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />
                      )}
                      <span className="text-xs text-orange-400">{player.streak}🔥</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-3 border-t border-slate-600">
                <p className="text-xs text-slate-400">Your global rank: #156 of 50,000</p>
                <div className="flex justify-center gap-2 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-purple-500'} animate-pulse`} style={{ animationDelay: `${i * 0.3}s` }}></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Streak Counter */}
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 backdrop-blur-sm hover:bg-orange-500/30 transition-all duration-500 group animate-glow">
            <CardContent className="p-6 text-center">
              <div className="relative">
                <Zap className="h-16 w-16 text-orange-400 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-orange-400/10 rounded-full blur-2xl animate-pulse"></div>
              </div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform">7</div>
              <p className="text-orange-300 font-medium flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 animate-pulse" />
                Day Streak
              </p>
              <p className="text-xs text-slate-400 mt-2">Keep it up! 3 more days for bonus XP</p>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < 7 ? 'bg-orange-500' : 'bg-slate-600'} ${i < 7 ? 'animate-pulse' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Monthly Goal */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-white text-sm flex items-center gap-2 group-hover:text-green-300 transition-colors">
                <Target className="w-4 h-4 text-green-400 group-hover:animate-pulse" />
                Monthly Goal
                <Gem className="w-4 h-4 text-purple-400 ml-auto animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4 space-y-2">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">12,500</div>
                <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  XP Target
                </p>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <Progress value={68} className="h-4" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>8,500 XP earned</span>
                  <span className="text-green-400 font-medium">68% complete</span>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    4,000 XP remaining
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
