
import { useState } from 'react';
import { Code, Brain, Badge, Users, MessageSquare, BarChart3, Settings, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'workspace', label: 'Workspace', icon: Code },
    { id: 'ai-match', label: 'AI Match', icon: Brain },
    { id: 'nft-badges', label: 'NFT Badges', icon: Badge },
    { id: 'community', label: 'Community', icon: MessageSquare },
  ];

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (profile?.username) return profile.username;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="text-xl font-bold text-white">SkillForge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            
            {/* User Profile Section */}
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/50">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium text-sm">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm">{getDisplayName()}</span>
                {profile?.skills && profile.skills.length > 0 && (
                  <span className="text-slate-400 text-xs">
                    {profile.skills.slice(0, 2).join(', ')}
                  </span>
                )}
              </div>
            </div>

            {/* Sign Out Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-red-500/50 text-red-300 hover:bg-red-500/10 hover:border-red-400/50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            {/* Mobile User Profile */}
            <div className="mb-4 flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-white font-medium">{getDisplayName()}</span>
                <span className="text-slate-400 text-sm">{user?.email}</span>
                {profile?.skills && profile.skills.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {profile.skills.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full justify-start gap-2 ${
                      activeTab === item.id
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
              
              {/* Mobile Sign Out Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="w-full justify-start gap-2 border-red-500/50 text-red-300 hover:bg-red-500/10 hover:border-red-400/50 mt-4"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
