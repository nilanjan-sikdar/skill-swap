
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Award, CheckCircle, Clock, Trophy } from 'lucide-react';
import { format } from 'date-fns';

interface SkillBadge {
  id: string;
  skill_name: string;
  badge_type: string;
  difficulty_level: string;
  earned_at: string;
  is_verified: boolean;
  proof_description: string | null;
  badge_color: string;
}

export const SkillBadges = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<SkillBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('skill_badges')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false });

        if (error) throw error;
        setBadges(data || []);
      } catch (error) {
        console.error('Error fetching skill badges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [user]);

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'coding':
        return '💻';
      case 'design':
        return '🎨';
      case 'collaboration':
        return '🎖️';
      case 'problem_solving':
        return '🧩';
      case 'leadership':
        return '👑';
      default:
        return '⭐';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'from-green-400 to-green-600';
      case 'intermediate':
        return 'from-blue-400 to-blue-600';
      case 'advanced':
        return 'from-purple-400 to-purple-600';
      case 'expert':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            All Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (badges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            All Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No badges earned yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Complete challenges to start earning badges!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            All Badges ({badges.length})
          </CardTitle>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300">
            {badges.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                
                {/* Badge Icon */}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">
                    {getBadgeIcon(badge.badge_type)}
                  </div>
                  <div className="flex items-center space-x-1">
                    {badge.is_verified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    <Badge 
                      className={`bg-gradient-to-r ${getDifficultyColor(badge.difficulty_level)} text-white border-0 text-xs capitalize`}
                    >
                      {badge.difficulty_level}
                    </Badge>
                  </div>
                </div>

                {/* Badge Title */}
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                  {badge.skill_name}
                </h3>

                {/* Badge Type */}
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 capitalize">
                  {badge.badge_type.replace('_', ' ')}
                </p>

                {/* Earned Date */}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {format(new Date(badge.earned_at), 'MMM dd')}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
