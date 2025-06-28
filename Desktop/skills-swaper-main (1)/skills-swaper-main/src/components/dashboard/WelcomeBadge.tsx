
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, Trophy, Star } from 'lucide-react';

export const WelcomeBadge = () => {
  const { user } = useAuth();
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);

  useEffect(() => {
    const checkAndCreateWelcomeBadge = async () => {
      if (!user) return;

      try {
        // Check if user has any badges
        const { data: existingBadges, error: checkError } = await supabase
          .from('skill_badges')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);

        if (checkError) {
          console.error('Error checking existing badges:', checkError);
          return;
        }

        // If no badges exist, create welcome badge and show welcome message
        if (!existingBadges || existingBadges.length === 0) {
          const { error: insertError } = await supabase
            .from('skill_badges')
            .insert({
              user_id: user.id,
              skill_name: 'Welcome',
              badge_type: 'collaboration',
              difficulty_level: 'beginner',
              proof_description: 'Welcome to the platform! Ready to win more cool badges?',
              badge_color: '#22c55e',
              is_verified: true
            });

          if (insertError) {
            console.error('Error creating welcome badge:', insertError);
          } else {
            setShouldShowWelcome(true);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              setShouldShowWelcome(false);
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Error in welcome badge logic:', error);
      }
    };

    checkAndCreateWelcomeBadge();
  }, [user]);

  if (!shouldShowWelcome) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      className="fixed top-20 right-6 z-50 max-w-sm"
    >
      <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300/50 shadow-xl">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-green-600" />
              <Trophy className="h-8 w-8 text-green-600" />
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200">
                🎉 Welcome Badge Earned!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                You've received your first badge! Complete challenges to win more cool badges.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-green-200/50">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎖️</div>
                <div className="text-left">
                  <div className="font-semibold text-green-800 dark:text-green-200">Welcome Badge</div>
                  <Badge className="bg-green-500 text-white text-xs mt-1">
                    Beginner
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-green-600 dark:text-green-400">
                Ready to win more?
              </span>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
