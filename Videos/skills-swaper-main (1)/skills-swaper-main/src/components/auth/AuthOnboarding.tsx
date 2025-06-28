
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthOnboardingProps {
  userId: string;
  onComplete: () => void;
}

export const AuthOnboarding = ({ userId, onComplete }: AuthOnboardingProps) => {
  const [selectedRole, setSelectedRole] = useState<'learner' | 'mentor' | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: selectedRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Welcome to SkillSync!",
        description: `You're all set up as a ${selectedRole}.`,
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: "Setup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'learner' as const,
      title: 'Learner',
      description: 'I want to learn new skills and collaborate with others',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'mentor' as const,
      title: 'Mentor',
      description: 'I want to share my knowledge and help others grow',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.5, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        >
          <span className="text-white font-bold text-xl">✨</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose your path</h1>
        <p className="text-gray-600 dark:text-gray-400">How would you like to use SkillSync?</p>
      </div>

      <div className="space-y-4 mb-8">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedRole(role.id)}
              className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-200 ${
                selectedRole === role.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white/50 dark:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${role.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{role.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                </div>
                <div className={`transition-all duration-200 ${
                  selectedRole === role.id ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              
              {selectedRole === role.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <Button
        onClick={handleRoleSelection}
        disabled={!selectedRole || loading}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl disabled:opacity-50"
      >
        {loading ? 'Setting up...' : 'Continue to SkillSync'}
      </Button>
    </motion.div>
  );
};
