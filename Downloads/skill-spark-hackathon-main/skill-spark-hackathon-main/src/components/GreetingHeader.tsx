
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';

const GreetingHeader = () => {
  const { profile, loading } = useProfile();
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (profile?.username) return profile.username;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  if (!user) return null;

  return (
    <div className="mb-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-scale-in">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="animate-slide-in-right">
          <h2 className="text-2xl font-bold text-white">
            {getGreeting()}, {loading ? 'Loading...' : getDisplayName()}! 👋
          </h2>
          <p className="text-slate-300">Welcome back to SkillForge</p>
          {profile?.skills && profile.skills.length > 0 && (
            <div className="flex gap-2 mt-2">
              {profile.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GreetingHeader;
