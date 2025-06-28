
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Code, Users, Plus, Sparkles, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const CollaborationPreview = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    if (!sessionTitle.trim() || !user) return;

    setIsCreating(true);
    try {
      const { data: session, error: sessionError } = await supabase
        .from('collaboration_sessions')
        .insert({
          title: sessionTitle,
          created_by: user.id,
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      const { error: participantError } = await supabase
        .from('session_participants')
        .insert({
          session_id: session.id,
          user_id: user.id,
          is_host: true,
        });

      if (participantError) throw participantError;

      toast.success('Collaboration session created!');
      navigate(`/collaboration/${session.id}`);
    } catch (error) {
      toast.error('Failed to create session');
    } finally {
      setIsCreating(false);
      setIsCreateDialogOpen(false);
      setSessionTitle('');
    }
  };

  const features = [
    {
      title: "Code Together",
      description: "Real-time collaborative code editing with syntax highlighting and live updates.",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "Video Chat",
      description: "Built-in video calling with screen sharing and collaborative features.",
      icon: Video,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10"
    },
    {
      title: "AI Copilot",
      description: "Get instant help with coding, debugging, and best practices from AI assistant.",
      icon: Users,
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-500/10 to-violet-500/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-purple-500" />
            </motion.div>
            Collaboration Workspace
          </h2>
          <p className="text-muted-foreground">Build together in real-time</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.div
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2"
                >
                  <Plus size={16} />
                </motion.div>
                New Session
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Collaboration Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  placeholder="Enter session title..."
                />
              </div>
              <Button 
                onClick={handleCreateSession} 
                disabled={!sessionTitle.trim() || isCreating}
                className="w-full"
              >
                {isCreating ? 'Creating...' : 'Create Session'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <Card className="h-full bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-50`} />
                
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg"></div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center space-x-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 0.5 
                      }}
                      className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent font-bold`}>
                      {feature.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-sm text-muted-foreground mb-4 leading-relaxed"
                  >
                    {feature.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-2 text-xs font-medium"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Zap className="w-3 h-3 text-yellow-500" />
                    </motion.div>
                    <span className="text-muted-foreground">
                      {index === 0 && "VS Code-like interface"}
                      {index === 1 && "Google Meet experience"}
                      {index === 2 && "Always available"}
                    </span>
                  </motion.div>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
