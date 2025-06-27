import { useState, useEffect } from 'react';
import { Badge, Users, Brain, Trophy, MessageSquare, Star, Zap, Target, BookOpen, Video, Code, Palette, FileText, UserCheck, Coins, TrendingUp, Clock, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge as UIBadge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import CollaborativeWorkspace from '@/components/CollaborativeWorkspace';
import AIMatchmaking from '@/components/AIMatchmaking';
import NFTBadges from '@/components/NFTBadges';
import GameStats from '@/components/GameStats';
import CommunityHub from '@/components/CommunityHub';
import GreetingHeader from '@/components/GreetingHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'workspace':
        return <CollaborativeWorkspace />;
      case 'ai-match':
        return <AIMatchmaking />;
      case 'nft-badges':
        return <NFTBadges />;
      case 'community':
        return <CommunityHub />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Multi-layered Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient waves */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-pulse"></div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Moving gradient waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform rotate-12 animate-slide-wave"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent transform -rotate-12 animate-slide-wave-reverse"></div>
        </div>
        
        {/* Animated particle system */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div 
                className={`rounded-full ${
                  i % 4 === 0 ? 'w-2 h-2 bg-purple-400/40' :
                  i % 4 === 1 ? 'w-1 h-1 bg-blue-400/50' :
                  i % 4 === 2 ? 'w-3 h-3 bg-pink-400/30' :
                  'w-1.5 h-1.5 bg-cyan-400/45'
                } animate-twinkle`}
                style={{ animationDelay: `${Math.random() * 3}s` }}
              ></div>
            </div>
          ))}
        </div>
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Code, Brain, Trophy, Star, Zap, Target].map((Icon, i) => (
            <div
              key={i}
              className="absolute animate-float-slow opacity-10"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 8)}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${6 + i}s`
              }}
            >
              <Icon className="w-8 h-8 text-white animate-spin-slow" />
            </div>
          ))}
        </div>
        
        {/* Aurora effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-purple-500/20 via-transparent to-transparent animate-aurora"></div>
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-500/20 via-transparent to-transparent animate-aurora-reverse"></div>
        </div>
      </div>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="relative pt-20 px-6">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <GreetingHeader />
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const DashboardContent = () => {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section with Advanced Animations */}
      <div className="text-center py-16 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-300 group animate-fade-in">
            <Sparkles className="w-5 h-5 text-purple-400 group-hover:animate-spin" />
            <span className="text-purple-300 text-sm font-medium">AI-Powered Learning Revolution</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Skill
            </span>
            <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Forge
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in opacity-90">
            The ultimate collaborative learning platform where AI meets blockchain. Learn, earn, and verify your skills in real-time.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group">
              <Video className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Start Live Session
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm group">
              <Users className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Find Study Partner
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Video, label: "Active Sessions", value: "1,247", color: "blue", delay: "0s" },
          { icon: Brain, label: "AI Matches Today", value: "892", color: "purple", delay: "0.1s" },
          { icon: Badge, label: "NFT Badges Minted", value: "5,643", color: "green", delay: "0.2s" },
          { icon: Trophy, label: "XP Earned Today", value: "28.5K", color: "orange", delay: "0.3s" }
        ].map((stat, index) => (
          <Card 
            key={index}
            className={`bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color === 'blue' ? 'cyan' : stat.color === 'purple' ? 'pink' : stat.color === 'green' ? 'emerald' : 'red'}-500/20 border-${stat.color}-500/30 backdrop-blur-sm hover:bg-${stat.color}-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer`}
            style={{ animationDelay: stat.delay }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm text-${stat.color}-300 group-hover:text-${stat.color}-200 transition-colors`}>{stat.label}</p>
                  <p className={`text-3xl font-bold text-white group-hover:scale-110 transition-transform origin-left ${statsVisible ? 'animate-scale-in' : ''}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-12 w-12 text-${stat.color}-400 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Workspace with Typing Animation */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white group-hover:text-cyan-300 transition-colors">
              <Code className="h-5 w-5 text-cyan-400 group-hover:animate-pulse" />
              Live Collaborative Workspace
            </CardTitle>
            <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors">
              Real-time code, design, and document collaboration with AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">collaborative-session.js</span>
              </div>
              <div className="text-sm font-mono text-green-400 space-y-1">
                <div className="animate-fade-in">{"// AI suggests: \"Consider using async/await here\""}</div>
                <div className="text-cyan-400 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  function <span className="text-yellow-400">processUserInput</span>() {"{"}
                </div>
                <div className="ml-4 text-white animate-fade-in" style={{ animationDelay: '1s' }}>
                  console.log(<span className="text-green-400">"Learning together!"</span>);
                </div>
                <div className="text-cyan-400 animate-fade-in" style={{ animationDelay: '1.5s' }}>{"}"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <div className="flex -space-x-2">
                {['A', 'B', 'C'].map((letter, i) => (
                  <Avatar key={letter} className="w-6 h-6 border-2 border-slate-600 hover:scale-110 transition-transform">
                    <AvatarFallback className={`text-xs ${i === 0 ? 'bg-purple-600' : i === 1 ? 'bg-blue-600' : 'bg-green-600'}`}>
                      {letter}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="group-hover:text-white transition-colors">3 collaborators active</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 group-hover:text-green-300 transition-colors">Live</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Matchmaking with Animated Profile */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white group-hover:text-purple-300 transition-colors">
              <Brain className="h-5 w-5 text-purple-400 group-hover:animate-pulse" />
              AI-Powered Matchmaking
            </CardTitle>
            <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors">
              Smart algorithm matches you with perfect learning partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group/profile">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="group-hover/profile:scale-110 transition-transform">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b44b?w=32&h=32&fit=crop&crop=face" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white group-hover/profile:text-purple-200 transition-colors">Sarah Johnson</p>
                    <p className="text-sm text-purple-300 animate-pulse">98% compatibility match</p>
                  </div>
                  <UIBadge variant="secondary" className="ml-auto bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors">
                    React Expert
                  </UIBadge>
                </div>
                <div className="flex gap-2">
                  <UIBadge variant="outline" className="border-blue-500/50 text-blue-300 text-xs hover:bg-blue-500/10 transition-colors">
                    Same timezone
                  </UIBadge>
                  <UIBadge variant="outline" className="border-green-500/50 text-green-300 text-xs hover:bg-green-500/10 transition-colors">
                    Complementary skills
                  </UIBadge>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 group/btn">
                <UserCheck className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                Connect & Start Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* NFT Badges with 3D Effect */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white group-hover:text-green-300 transition-colors">
              <Badge className="h-5 w-5 text-green-400 group-hover:animate-spin" />
              NFT Skill Verification
            </CardTitle>
            <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors">
              Blockchain-verified achievements on Polygon network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { icon: Code, colors: "from-blue-500 to-purple-600" },
                { icon: Palette, colors: "from-green-500 to-emerald-600" },
                { icon: FileText, colors: "from-orange-500 to-red-600" }
              ].map((badge, i) => (
                <div key={i} className={`bg-gradient-to-br ${badge.colors} rounded-lg aspect-square flex items-center justify-center transform hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group/badge`}>
                  <badge.icon className="h-8 w-8 text-white group-hover/badge:animate-pulse" />
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-300 mb-2 group-hover:text-slate-200 transition-colors">Next achievement:</p>
              <div className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700/70 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-yellow-400 animate-pulse" />
                  <span className="text-white font-medium">React Master</span>
                </div>
                <Progress value={75} className="h-2 group-hover:h-3 transition-all duration-300" />
                <p className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">75% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gaming Stats with Number Animations */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white group-hover:text-yellow-300 transition-colors">
              <Trophy className="h-5 w-5 text-yellow-400 group-hover:animate-bounce" />
              Your Gaming Stats
            </CardTitle>
            <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors">
              Level up your skills and compete with peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between group/stat hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
                <span className="text-slate-300 group-hover/stat:text-white transition-colors">Current Level</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">
                  42
                </span>
              </div>
              <div className="flex items-center justify-between group/stat hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
                <span className="text-slate-300 group-hover/stat:text-white transition-colors">XP This Week</span>
                <span className="text-lg font-medium text-green-400 group-hover/stat:scale-110 transition-transform">2,847</span>
              </div>
              <div className="flex items-center justify-between group/stat hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
                <span className="text-slate-300 group-hover/stat:text-white transition-colors">Global Rank</span>
                <span className="text-lg font-medium text-purple-400 group-hover/stat:scale-110 transition-transform">#156</span>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700/70 transition-all duration-300 group/challenge">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400 group-hover/challenge:animate-pulse" />
                  <span className="text-white font-medium group-hover/challenge:text-green-200 transition-colors">Weekly Challenge</span>
                </div>
                <p className="text-sm text-slate-300 mb-2 group-hover/challenge:text-slate-200 transition-colors">Complete 5 collaborative sessions</p>
                <Progress value={60} className="h-2 group-hover/challenge:h-3 transition-all duration-300" />
                <p className="text-xs text-slate-400 mt-1 group-hover/challenge:text-slate-300 transition-colors">3/5 sessions completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Community Preview */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white group-hover:text-blue-300 transition-colors">
            <MessageSquare className="h-5 w-5 text-blue-400 group-hover:animate-pulse" />
            Community Highlights
            <div className="ml-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardTitle>
          <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors">
            Active discussions and top contributors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 group/section">
              <h4 className="font-medium text-white flex items-center gap-2 group-hover/section:text-orange-300 transition-colors">
                🔥 Trending Topics
                <Sparkles className="w-4 h-4 group-hover/section:animate-spin" />
              </h4>
              <div className="space-y-2">
                {[
                  { title: "Advanced React Patterns", discussions: 127 },
                  { title: "Web3 Development", discussions: 89 }
                ].map((topic, i) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-105 cursor-pointer group/topic">
                    <p className="text-sm text-white font-medium group-hover/topic:text-blue-300 transition-colors">{topic.title}</p>
                    <p className="text-xs text-slate-400 group-hover/topic:text-slate-300 transition-colors">{topic.discussions} active discussions</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 group/section">
              <h4 className="font-medium text-white flex items-center gap-2 group-hover/section:text-yellow-300 transition-colors">
                ⭐ Top Mentors
                <Star className="w-4 h-4 group-hover/section:animate-pulse" />
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Mike Chen", rating: "4.9", reviews: "234", bg: "bg-purple-600" },
                  { name: "Lisa Anderson", rating: "4.8", reviews: "189", bg: "bg-blue-600" }
                ].map((mentor, i) => (
                  <div key={i} className="flex items-center gap-2 hover:bg-slate-700/30 rounded-lg p-2 transition-all duration-300 group/mentor">
                    <Avatar className="w-8 h-8 group-hover/mentor:scale-110 transition-transform">
                      <AvatarFallback className={mentor.bg}>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-white group-hover/mentor:text-yellow-200 transition-colors">{mentor.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current group-hover/mentor:animate-pulse" />
                        <span className="text-xs text-slate-400 group-hover/mentor:text-slate-300 transition-colors">{mentor.rating} ({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 group/section">
              <h4 className="font-medium text-white flex items-center gap-2 group-hover/section:text-green-300 transition-colors">
                📈 Recent Activity
                <TrendingUp className="w-4 h-4 group-hover/section:animate-bounce" />
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                {[
                  { icon: Clock, text: "New study group formed", delay: "0s" },
                  { icon: Globe, text: "Resource shared in React forum", delay: "0.2s" },
                  { icon: Users, text: "125 users online now", delay: "0.4s" }
                ].map((activity, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-2 hover:bg-slate-700/30 rounded-lg p-2 transition-all duration-300 group/activity animate-fade-in"
                    style={{ animationDelay: activity.delay }}
                  >
                    <activity.icon className="h-3 w-3 text-slate-400 group-hover/activity:text-green-400 transition-colors" />
                    <span className="group-hover/activity:text-white transition-colors">{activity.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
