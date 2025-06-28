
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Trophy, Star, Award, Zap, ChevronRight, Sparkles, Crown } from "lucide-react";

export const BadgeShowcase = () => {
  const { user } = useAuth();

  const { data: recentBadges } = useQuery({
    queryKey: ["recent-badges", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("skill_badges")
        .select("*")
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'coding':
        return '💻';
      case 'design':
        return '🎨';
      case 'collaboration':
        return '🤝';
      case 'problem_solving':
        return '🧠';
      case 'leadership':
        return '👑';
      default:
        return '⭐';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'from-green-500 to-emerald-600';
      case 'intermediate':
        return 'from-blue-500 to-cyan-600';
      case 'advanced':
        return 'from-purple-500 to-violet-600';
      case 'expert':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  if (!recentBadges || recentBadges.length === 0) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-blue-900/30 backdrop-blur-xl border-2 border-white/20 shadow-2xl shadow-blue-500/10 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg"
            >
              <Trophy className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Badge Collection
            </span>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-center py-12">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🏆
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
            >
              Your Badge Journey Awaits!
            </motion.p>
            <p className="text-gray-600 dark:text-gray-400">Complete challenges to earn your first shiny badge</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white/95 to-yellow-50/80 dark:from-gray-800/95 dark:to-yellow-900/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl shadow-yellow-500/10 rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10"></div>
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg"
            >
              <Crown className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Recent Badges
            </span>
          </CardTitle>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold">
                {recentBadges.length} Earned ✨
              </Badge>
            </motion.div>
            <ChevronRight className="h-5 w-5 text-yellow-600" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="grid grid-cols-2 gap-6">
          {recentBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15, 
                type: "spring", 
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                rotate: [0, -1, 1, 0]
              }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-700/90 dark:to-gray-800/70 rounded-2xl p-6 border-2 border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden">
                
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badge Icon */}
                <div className="text-center mb-4 relative z-10">
                  <motion.div 
                    className="text-4xl mb-3 relative inline-block"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {getBadgeIcon(badge.badge_type)}
                    {badge.is_verified && (
                      <motion.div 
                        className="absolute -top-1 -right-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1 shadow-lg">
                          <Award className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <Badge 
                    className={`bg-gradient-to-r ${getDifficultyColor(badge.difficulty_level)} text-white border-0 text-xs font-bold px-3 py-1 shadow-lg capitalize`}
                  >
                    {badge.difficulty_level}
                  </Badge>
                </div>

                {/* Badge Details */}
                <div className="text-center space-y-2 relative z-10">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug">
                    {badge.skill_name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize font-medium">
                    {badge.badge_type.replace('_', ' ')}
                  </p>
                </div>

                {/* Sparkle Effects */}
                <motion.div
                  className="absolute top-2 right-2 text-yellow-400 opacity-70"
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <Star className="h-3 w-3" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
