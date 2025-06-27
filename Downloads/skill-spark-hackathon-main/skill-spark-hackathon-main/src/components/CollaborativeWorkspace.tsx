
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Palette, FileText, Video, Users, MessageSquare, Share2, Play, Pause, Volume2, Sparkles, Zap, Eye, Heart, Download } from 'lucide-react';

const CollaborativeWorkspace = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeUsers, setActiveUsers] = useState(3);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Enhanced Header with Floating Elements */}
      <div className="text-center py-8 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm hover:bg-cyan-500/30 transition-all duration-500 group animate-float">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 font-medium">Live Collaboration Active</span>
            <div className="flex -space-x-1">
              {[...Array(activeUsers)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full animate-pulse ${i === 0 ? 'bg-purple-500' : i === 1 ? 'bg-blue-500' : 'bg-green-500'}`} style={{ animationDelay: `${i * 0.3}s` }}></div>
              ))}
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Collaborative</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Workspace</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Real-time collaboration with AI assistance for code, design, and documentation
          </p>
        </div>
      </div>

      {/* Enhanced Workspace Controls */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-white group-hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                Active Session: React Advanced Patterns
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors">
                Collaborative learning session with {activeUsers} participants
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 animate-glow">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
              <Button 
                onClick={() => setIsRecording(!isRecording)}
                className={`${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} transform hover:scale-105 transition-all duration-300 group/btn`}
              >
                {isRecording ? <Pause className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" /> : <Play className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area with Advanced Animations */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="code" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 backdrop-blur-sm">
              <TabsTrigger value="code" className="flex items-center gap-2 hover:bg-slate-700/50 transition-all duration-300 group">
                <Code className="w-4 h-4 group-hover:animate-pulse" />
                Code
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2 hover:bg-slate-700/50 transition-all duration-300 group">
                <Palette className="w-4 h-4 group-hover:animate-spin" />
                Design
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex items-center gap-2 hover:bg-slate-700/50 transition-all duration-300 group">
                <FileText className="w-4 h-4 group-hover:animate-bounce" />
                Docs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="animate-fade-in">
              <Card className="bg-slate-900/50 border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 group">
                <CardContent className="p-0">
                  <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                      <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">useAdvancedPattern.js</span>
                      <Badge variant="outline" className="ml-auto text-xs border-purple-500/50 text-purple-300 animate-glow">
                        <Zap className="w-3 h-3 mr-1 animate-pulse" />
                        AI Assisted
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 font-mono text-sm space-y-2 overflow-hidden">
                    <div className="text-green-400 animate-fade-in">{"// AI suggests: Consider using useCallback for optimization"}</div>
                    <div className="text-blue-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>import {"{"} useState, useCallback {"}"} from 'react';</div>
                    <div className="text-white animate-fade-in" style={{ animationDelay: '0.4s' }}>const useAdvancedPattern = () =&gt; {"{"}</div>
                    <div className="ml-4 text-white animate-fade-in" style={{ animationDelay: '0.6s' }}>const [state, setState] = useState(null);</div>
                    <div className="ml-4 text-purple-400 animate-fade-in" style={{ animationDelay: '0.8s' }}>const memoizedCallback = useCallback(() =&gt; {"{"}</div>
                    <div className="ml-8 text-slate-300 animate-fade-in" style={{ animationDelay: '1s' }}>{"// Your optimized logic here"}</div>
                    <div className="ml-4 text-purple-400 animate-fade-in" style={{ animationDelay: '1.2s' }}>{"}"}, [dependencies]);</div>
                    <div className="text-white animate-fade-in" style={{ animationDelay: '1.4s' }}>{"}"};</div>
                    
                    {/* Typing indicator */}
                    <div className="flex items-center gap-2 mt-4 animate-fade-in" style={{ animationDelay: '1.6s' }}>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-blue-600 text-xs">SK</AvatarFallback>
                      </Avatar>
                      <div className="bg-blue-500/20 rounded-lg px-3 py-1 flex items-center gap-1">
                        <span className="text-xs text-blue-300">Sarah is typing</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="animate-fade-in">
              <Card className="bg-slate-900/50 border-slate-700/50 hover:border-pink-500/30 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Palette className="w-24 h-24 mx-auto mb-6 text-pink-400 animate-float group-hover:animate-spin transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">Design Canvas</h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">Collaborative design tools coming soon...</p>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {['Figma', 'Sketch', 'Adobe XD'].map((tool, i) => (
                        <div key={tool} className={`bg-gradient-to-r ${i === 0 ? 'from-purple-500/20 to-pink-500/20' : i === 1 ? 'from-blue-500/20 to-cyan-500/20' : 'from-green-500/20 to-emerald-500/20'} rounded-lg p-3 hover:scale-105 transition-transform duration-300`}>
                          <p className="text-sm text-white">{tool}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="animate-fade-in">
              <Card className="bg-slate-900/50 border-slate-700/50 hover:border-green-500/30 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <FileText className="w-24 h-24 mx-auto mb-6 text-green-400 animate-float group-hover:animate-bounce transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">Documentation</h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">Real-time documentation editor coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Participants with Enhanced Animations */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-purple-300 transition-colors">
                <Users className="w-5 h-5 text-purple-400 group-hover:animate-bounce" />
                Participants ({activeUsers})
                <div className="ml-auto flex items-center gap-1">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">12 watching</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Alex Chen", status: "active", avatar: "AC", typing: false, color: "purple" },
                { name: "Sarah Kim", status: "typing", avatar: "SK", typing: true, color: "blue" },
                { name: "Mike Johnson", status: "away", avatar: "MJ", typing: false, color: "green" }
              ].map((participant, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-all duration-300 group/participant animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative">
                    <Avatar className="w-10 h-10 group-hover/participant:scale-110 transition-transform duration-300">
                      <AvatarFallback className={`text-xs ${i === 0 ? 'bg-purple-600' : i === 1 ? 'bg-blue-600' : 'bg-green-600'}`}>
                        {participant.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${participant.status === 'active' ? 'bg-green-500' : participant.status === 'typing' ? 'bg-blue-500 animate-pulse' : 'bg-slate-500'}`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white group-hover/participant:text-purple-200 transition-colors">{participant.name}</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-xs ${participant.status === 'active' ? 'text-green-400' : participant.status === 'typing' ? 'text-blue-400' : 'text-slate-400'}`}>
                        {participant.status}
                      </p>
                      {participant.typing && (
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-slate-400 hover:text-red-400 transition-colors cursor-pointer" />
                    <Share2 className="w-4 h-4 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Chat */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-cyan-300 transition-colors">
                <MessageSquare className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
                Live Chat
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[
                  { user: "Alex Chen", message: "Let's focus on the useCallback optimization", type: "user", time: "2m ago" },
                  { user: "AI Assistant", message: "I suggest adding dependency array for better performance", type: "ai", time: "1m ago" },
                  { user: "Sarah Kim", message: "Great point! I'll update the code", type: "user", time: "30s ago" }
                ].map((chat, i) => (
                  <div key={i} className={`${chat.type === 'ai' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-slate-700/30'} rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300 animate-fade-in group/chat`} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-xs ${chat.type === 'ai' ? 'text-blue-300' : 'text-slate-400'} group-hover/chat:text-white transition-colors`}>
                        {chat.user}
                      </p>
                      <span className="text-xs text-slate-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-white group-hover/chat:text-slate-100 transition-colors">{chat.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced AI Assistant */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 group animate-glow animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-white text-sm flex items-center gap-2 group-hover:text-purple-300 transition-colors">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                AI Assistant
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-spin" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-3 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group/ai">
                <p className="text-sm text-purple-200 group-hover/ai:text-white transition-colors">
                  I notice you're working on performance optimization. Would you like me to suggest some advanced patterns?
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs border-purple-500/50 text-purple-300 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105">
                  Yes, help me
                </Button>
                <Button size="sm" variant="ghost" className="text-xs hover:bg-slate-700/50 transition-all duration-300">
                  Not now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeWorkspace;
