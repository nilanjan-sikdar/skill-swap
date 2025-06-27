
import { useState } from 'react';
import { Brain, Users, Target, Clock, Star, MapPin, Award, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AIMatchmaking = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b44b?w=100&h=100&fit=crop&crop=face',
      compatibility: 98,
      role: 'Frontend Developer',
      level: 'Advanced',
      skills: ['React', 'TypeScript', 'UI/UX'],
      interests: ['Web Development', 'Design Systems'],
      timezone: 'PST (GMT-8)',
      rating: 4.9,
      reviews: 234,
      strengths: ['Teaching', 'Problem Solving', 'Mentoring'],
      availability: 'Available now',
      badge: 'React Expert'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      compatibility: 94,
      role: 'Full Stack Engineer',
      level: 'Senior',
      skills: ['Node.js', 'Python', 'AWS'],
      interests: ['Backend Architecture', 'DevOps'],
      timezone: 'EST (GMT-5)',
      rating: 4.8,
      reviews: 189,
      strengths: ['System Design', 'Code Review', 'Best Practices'],
      availability: 'Available in 2 hours',
      badge: 'Backend Master'
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      compatibility: 91,
      role: 'Product Designer',
      level: 'Mid-level',
      skills: ['Figma', 'Prototyping', 'User Research'],
      interests: ['UX Design', 'Design Thinking'],
      timezone: 'CET (GMT+1)',
      rating: 4.7,
      reviews: 156,
      strengths: ['User Empathy', 'Visual Design', 'Collaboration'],
      availability: 'Available tomorrow',
      badge: 'Design Pro'
    }
  ];

  const aiInsights = [
    {
      icon: Target,
      title: 'Goal Alignment',
      description: 'Your learning objectives match 95% with recommended partners',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      title: 'Schedule Sync',
      description: 'Found 3 partners with overlapping availability this week',
      color: 'text-blue-400'
    },
    {
      icon: Award,
      title: 'Skill Complementarity',
      description: 'Identified opportunities for mutual skill exchange',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">AI-Powered Matchmaking</h1>
        <p className="text-slate-300 mb-6">
          Our AI analyzes your goals, personality, and learning style to find perfect study partners
        </p>
        
        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${insight.color}`} />
                  <h3 className="font-medium text-white mb-1">{insight.title}</h3>
                  <p className="text-sm text-slate-300">{insight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recommended Matches</h2>
            <Button variant="outline" className="border-purple-500/50 text-purple-300">
              <Brain className="h-4 w-4 mr-2" />
              Refine AI Preferences
            </Button>
          </div>

          {matches.map((match) => (
            <Card 
              key={match.id} 
              className={`bg-slate-800/50 border-slate-700/50 backdrop-blur-sm transition-all cursor-pointer hover:border-purple-500/50 ${
                selectedMatch?.id === match.id ? 'border-purple-500/50 bg-purple-500/10' : ''
              }`}
              onClick={() => setSelectedMatch(match)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{match.name}</h3>
                        <p className="text-sm text-slate-300">{match.role} • {match.level}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            {match.compatibility}%
                          </div>
                          <span className="text-sm text-slate-400">match</span>
                        </div>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {match.badge}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {match.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Availability</p>
                        <p className="text-sm text-green-400">{match.availability}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-white">{match.rating}</span>
                          <span className="text-xs text-slate-400">({match.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-300">{match.timezone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Match Details Sidebar */}
        <div className="space-y-6">
          {selectedMatch ? (
            <>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    Match Details
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedMatch(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src={selectedMatch.avatar} alt={selectedMatch.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg">
                        {selectedMatch.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-white">{selectedMatch.name}</h3>
                    <p className="text-sm text-slate-300">{selectedMatch.role}</p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mt-2">
                      {selectedMatch.compatibility}% Match
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Compatibility Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Learning Goals</span>
                        <span className="text-green-400">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Personality</span>
                        <span className="text-blue-400">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Schedule</span>
                        <span className="text-purple-400">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Strengths</h4>
                    <div className="space-y-1">
                      {selectedMatch.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-slate-300">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Common Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMatch.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-500/50 text-purple-300">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Start Learning Together
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-medium text-white mb-2">Select a Match</h3>
                <p className="text-sm text-slate-300">
                  Click on any recommended match to see detailed compatibility analysis
                </p>
              </CardContent>
            </Card>
          )}

          {/* AI Preferences */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <Brain className="h-4 w-4" />
                Your AI Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <span className="text-slate-400">Learning Style:</span>
                <span className="text-white ml-2">Visual & Interactive</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Preferred Time:</span>
                <span className="text-white ml-2">Evenings (PST)</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Session Duration:</span>
                <span className="text-white ml-2">1-2 hours</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Experience Level:</span>
                <span className="text-white ml-2">Intermediate</span>
              </div>
              <Button size="sm" variant="outline" className="w-full border-slate-600 text-slate-300 mt-3">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIMatchmaking;
