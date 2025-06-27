
import { useState } from 'react';
import { Badge, Award, Star, ExternalLink, Download, Share, Lock, Unlock, CheckCircle, Sparkles, Zap, TrendingUp, Crown, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge as UIBadge } from '@/components/ui/badge';

const NFTBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const badges = [
    {
      id: 1,
      name: 'React Master',
      description: 'Complete mastery of React development',
      category: 'frontend',
      rarity: 'legendary',
      earned: true,
      mintDate: '2024-01-15',
      skills: ['React', 'JSX', 'Hooks', 'State Management'],
      requirements: ['Build 5 React apps', 'Pass advanced assessment', 'Mentor 3 students'],
      nftId: 'RCT-001-MASTER',
      polygonAddress: '0x1234...5678',
      image: '/placeholder.svg',
      bgGradient: 'from-blue-500 via-purple-600 to-pink-500',
      value: '0.15 ETH'
    },
    {
      id: 2,
      name: 'TypeScript Expert',
      description: 'Advanced TypeScript proficiency',
      category: 'languages',
      rarity: 'epic',
      earned: true,
      mintDate: '2024-02-20',
      skills: ['TypeScript', 'Type Safety', 'Generics', 'Advanced Types'],
      requirements: ['Complete TS course', 'Build typed application', 'Code review sessions'],
      nftId: 'TS-002-EXPERT',
      polygonAddress: '0x2345...6789',
      image: '/placeholder.svg',
      bgGradient: 'from-indigo-500 via-blue-600 to-cyan-500',
      value: '0.08 ETH'
    },
    {
      id: 3,
      name: 'UI/UX Virtuoso',
      description: 'Exceptional design and user experience skills',
      category: 'design',
      rarity: 'rare',
      earned: false,
      progress: 75,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      requirements: ['Design 3 interfaces', 'User testing sessions', 'Present design case study'],
      nftId: 'UX-003-VIRTUOSO',
      image: '/placeholder.svg',
      bgGradient: 'from-pink-500 via-purple-600 to-violet-500'
    },
    {
      id: 4,
      name: 'Blockchain Pioneer',
      description: 'Web3 development and blockchain understanding',
      category: 'blockchain',
      rarity: 'legendary',
      earned: false,
      progress: 45,
      skills: ['Solidity', 'Smart Contracts', 'DApps', 'Web3.js'],
      requirements: ['Deploy smart contract', 'Build DApp', 'Security audit'],
      nftId: 'BC-004-PIONEER',
      image: '/placeholder.svg',
      bgGradient: 'from-orange-500 via-red-600 to-pink-500'
    },
    {
      id: 5,
      name: 'Community Leader',
      description: 'Outstanding contribution to learning community',
      category: 'community',
      rarity: 'epic',
      earned: true,
      mintDate: '2024-03-10',
      skills: ['Mentoring', 'Community Building', 'Knowledge Sharing', 'Leadership'],
      requirements: ['Mentor 10 students', 'Organize study groups', 'High community rating'],
      nftId: 'CL-005-LEADER',
      polygonAddress: '0x3456...7890',
      image: '/placeholder.svg',
      bgGradient: 'from-green-500 via-emerald-600 to-teal-500',
      value: '0.12 ETH'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Badges', count: badges.length, icon: Award },
    { id: 'frontend', label: 'Frontend', count: badges.filter(b => b.category === 'frontend').length, icon: Badge },
    { id: 'languages', label: 'Languages', count: badges.filter(b => b.category === 'languages').length, icon: Star },
    { id: 'design', label: 'Design', count: badges.filter(b => b.category === 'design').length, icon: Sparkles },
    { id: 'blockchain', label: 'Blockchain', count: badges.filter(b => b.category === 'blockchain').length, icon: Gem },
    { id: 'community', label: 'Community', count: badges.filter(b => b.category === 'community').length, icon: Crown }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'text-orange-400 border-orange-400 bg-orange-500/10';
      case 'epic': return 'text-purple-400 border-purple-400 bg-purple-500/10';
      case 'rare': return 'text-blue-400 border-blue-400 bg-blue-500/10';
      default: return 'text-green-400 border-green-400 bg-green-500/10';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'legendary': return Crown;
      case 'epic': return Gem;
      case 'rare': return Star;
      default: return Award;
    }
  };

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const earnedBadges = badges.filter(badge => badge.earned).length;
  const totalValue = earnedBadges * 0.05;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 py-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm animate-float">
            <Gem className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">Blockchain Verified Skills</span>
            <Sparkles className="w-5 h-5 text-pink-400 animate-spin" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NFT Skill</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Verification</span>
          </h1>
          <p className="text-slate-300 mb-8 text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Tamper-proof blockchain badges that unlock real opportunities
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm hover:bg-green-500/30 transition-all duration-500 transform hover:scale-105 group animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-3 group-hover:animate-bounce">
                  <CheckCircle className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                </div>
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">{earnedBadges}</div>
                <p className="text-sm text-green-300 group-hover:text-green-200 transition-colors">Badges Earned</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-500 transform hover:scale-105 group animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-3 group-hover:animate-spin">
                  <Gem className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">{totalValue.toFixed(2)} ETH</div>
                <p className="text-sm text-purple-300 group-hover:text-purple-200 transition-colors">Portfolio Value</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 backdrop-blur-sm hover:bg-blue-500/30 transition-all duration-500 transform hover:scale-105 group animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-3 group-hover:animate-pulse">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">12</div>
                <p className="text-sm text-blue-300 group-hover:text-blue-200 transition-colors">Job Opportunities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center animate-slide-up">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform scale-105'
                  : 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-purple-500/50'
              } transition-all duration-300 group`}
            >
              <IconComponent className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              {category.label} ({category.count})
            </Button>
          );
        })}
      </div>

      {/* Enhanced Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBadges.map((badge, index) => {
          const RarityIcon = getRarityIcon(badge.rarity);
          return (
            <Card 
              key={badge.id} 
              className={`bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
                badge.earned ? 'ring-1 ring-green-500/30 hover:ring-green-400/50' : ''
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-white text-lg group-hover:text-purple-200 transition-colors">
                      {badge.earned ? (
                        <CheckCircle className="h-5 w-5 text-green-400 animate-pulse" />
                      ) : (
                        <Lock className="h-5 w-5 text-slate-400 group-hover:animate-pulse" />
                      )}
                      {badge.name}
                    </CardTitle>
                    <p className="text-sm text-slate-300 mt-1 group-hover:text-slate-200 transition-colors">{badge.description}</p>
                  </div>
                  <UIBadge 
                    variant="outline" 
                    className={`${getRarityColor(badge.rarity)} text-xs capitalize font-semibold`}
                  >
                    <RarityIcon className="w-3 h-3 mr-1" />
                    {badge.rarity}
                  </UIBadge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Enhanced Badge Visual */}
                <div className={`aspect-square rounded-xl bg-gradient-to-br ${badge.bgGradient} p-8 flex items-center justify-center relative overflow-hidden group/badge cursor-pointer`}>
                  <div className="absolute inset-0 bg-black/10 group-hover/badge:bg-black/5 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="relative">
                      <Award className="h-20 w-20 text-white mx-auto mb-3 group-hover/badge:animate-pulse" />
                      {badge.earned && (
                        <div className="absolute -top-2 -right-2">
                          <CheckCircle className="h-8 w-8 text-green-400 animate-bounce" />
                        </div>
                      )}
                    </div>
                    <p className="text-white font-bold text-lg group-hover/badge:scale-110 transition-transform">{badge.name}</p>
                    {badge.earned && badge.value && (
                      <UIBadge className="mt-2 bg-green-500/20 text-green-300 border-green-500/30 animate-glow">
                        <Zap className="w-3 h-3 mr-1" />
                        {badge.value}
                      </UIBadge>
                    )}
                  </div>
                  
                  {!badge.earned && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover/badge:bg-black/40 transition-all duration-300">
                      <div className="text-center">
                        <Lock className="h-12 w-12 text-slate-300 mx-auto mb-2 group-hover/badge:animate-bounce" />
                        <p className="text-slate-300 text-sm font-medium">Locked</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress for unearned badges */}
                {!badge.earned && badge.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-purple-400 font-medium">{badge.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={badge.progress} className="h-3" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Skills Verified
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {badge.skills.map((skill, index) => (
                      <UIBadge key={index} variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 transition-colors">
                        {skill}
                      </UIBadge>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-2">Requirements</p>
                  <div className="space-y-1">
                    {badge.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        {badge.earned ? (
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        ) : (
                          <div className="h-3 w-3 border border-slate-500 rounded-full"></div>
                        )}
                        <span className={badge.earned ? 'text-green-300' : 'text-slate-400'}>
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {badge.earned ? (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 bg-slate-700/30 rounded-lg p-3 space-y-1">
                      <p className="flex items-center gap-2">
                        <Gem className="w-3 h-3 text-purple-400" />
                        NFT ID: {badge.nftId}
                      </p>
                      <p>Minted: {badge.mintDate}</p>
                      {badge.polygonAddress && (
                        <p>Polygon: {badge.polygonAddress}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:border-purple-500/50 hover:text-purple-300 transition-all duration-300 group/btn">
                        <ExternalLink className="h-3 w-3 mr-1 group-hover/btn:animate-pulse" />
                        View on OpenSea
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300">
                        <Share className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:border-green-500/50 hover:text-green-300 transition-all duration-300">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 group/unlock">
                    <Unlock className="h-4 w-4 mr-2 group-hover/unlock:animate-bounce" />
                    Start Challenge
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Partner Companies */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-white text-center flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
            Partner Companies
            <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
          </CardTitle>
          <p className="text-center text-slate-300">
            These companies recognize and value our NFT skill badges
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['TechCorp', 'InnovateLabs', 'DevStudio', 'FutureWorks'].map((company, index) => (
              <div key={index} className="bg-slate-700/30 rounded-xl p-6 text-center hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:animate-pulse">
                  <span className="text-white font-bold text-xl">{company[0]}</span>
                </div>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{company}</p>
                <div className="flex justify-center mt-2">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-purple-500'} animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 group">
              <TrendingUp className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              View All Job Opportunities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NFTBadges;
