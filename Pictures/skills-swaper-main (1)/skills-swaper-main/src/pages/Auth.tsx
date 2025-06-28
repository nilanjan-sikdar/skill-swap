
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AuthLogin } from '@/components/auth/AuthLogin';
import { AuthSignup } from '@/components/auth/AuthSignup';
import { AuthOnboarding } from '@/components/auth/AuthOnboarding';
import { ThemeToggle } from '@/components/ThemeToggle';

type AuthStep = 'login' | 'signup' | 'onboarding';

const Auth = () => {
  const [step, setStep] = useState<AuthStep>('login');
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  console.log('Auth component - user:', user, 'loading:', loading, 'step:', step);

  useEffect(() => {
    console.log('Auth useEffect - user:', user, 'loading:', loading);
    if (!loading && user) {
      // Check if user needs onboarding
      checkUserProfile();
    }
  }, [user, loading]);

  const checkUserProfile = async () => {
    if (!user) return;
    
    console.log('Checking user profile for user:', user.id);
    
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      console.log('Profile data:', profile, 'error:', error);
      
      if (profile && profile.role) {
        console.log('User has profile with role, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('User needs onboarding');
        setStep('onboarding');
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      setStep('onboarding');
    }
  };

  const handleSignupSuccess = (userId: string) => {
    console.log('Signup success for user:', userId);
    setNewUserId(userId);
    setStep('onboarding');
  };

  const handleOnboardingComplete = () => {
    console.log('Onboarding complete, navigating to dashboard');
    navigate('/dashboard');
  };

  if (loading) {
    console.log('Auth component loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  console.log('Rendering auth step:', step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {step === 'login' && (
              <AuthLogin key="login" onSwitchToSignup={() => setStep('signup')} />
            )}
            {step === 'signup' && (
              <AuthSignup 
                key="signup" 
                onSwitchToLogin={() => setStep('login')}
                onSignupSuccess={handleSignupSuccess}
              />
            )}
            {step === 'onboarding' && (
              <AuthOnboarding 
                key="onboarding" 
                userId={newUserId || user?.id || ''}
                onComplete={handleOnboardingComplete}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
