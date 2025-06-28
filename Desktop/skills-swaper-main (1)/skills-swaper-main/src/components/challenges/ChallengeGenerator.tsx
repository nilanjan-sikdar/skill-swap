
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RefreshCcw, SkipForward, CheckCircle, Star, Code, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'coding' | 'design';
  estimatedTime: string;
  skills: string[];
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Build a Todo App',
    description: 'Create a responsive todo application with add, edit, delete, and filter functionality. Include local storage persistence and smooth animations.',
    difficulty: 'medium',
    type: 'coding',
    estimatedTime: '2-3 hours',
    skills: ['React', 'TypeScript', 'CSS']
  },
  {
    id: '2',
    name: 'Design a Login Screen',
    description: 'Design a modern, accessible login screen with form validation, loading states, and responsive design principles.',
    difficulty: 'easy',
    type: 'design',
    estimatedTime: '1-2 hours',
    skills: ['UI/UX', 'Figma', 'Accessibility']
  },
  {
    id: '3',
    name: 'Build a Real-time Chat',
    description: 'Create a real-time chat application with WebSocket integration, message history, and user presence indicators.',
    difficulty: 'hard',
    type: 'coding',
    estimatedTime: '4-6 hours',
    skills: ['React', 'WebSocket', 'Node.js']
  }
];

export const ChallengeGenerator = () => {
  const { user } = useAuth();
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateChallenge = async () => {
    setIsLoading(true);
    setProgress(0);
    
    // Simulate AI generation with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter challenges by difficulty and randomly select one
    const filteredChallenges = mockChallenges.filter(c => c.difficulty === selectedDifficulty);
    const randomChallenge = filteredChallenges[Math.floor(Math.random() * filteredChallenges.length)];
    
    clearInterval(progressInterval);
    setProgress(100);
    
    setTimeout(() => {
      setCurrentChallenge(randomChallenge);
      setIsLoading(false);
      setProgress(0);
    }, 500);
  };

  const handleAcceptChallenge = () => {
    if (currentChallenge) {
      setShowSuccessModal(true);
      toast.success("Challenge accepted! Good luck!");
    }
  };

  const handleSkipChallenge = () => {
    generateChallenge();
    toast.info("Generating a new challenge for you...");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Daily Challenge</h1>
        <p className="text-muted-foreground">Push your skills with AI-generated challenges</p>
      </div>

      {/* Difficulty Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Choose your difficulty:</h3>
        <RadioGroup
          value={selectedDifficulty}
          onValueChange={(value: 'easy' | 'medium' | 'hard') => setSelectedDifficulty(value)}
          className="flex justify-center space-x-6"
        >
          {['easy', 'medium', 'hard'].map((difficulty) => (
            <div key={difficulty} className="flex items-center space-x-2">
              <RadioGroupItem value={difficulty} id={difficulty} />
              <label
                htmlFor={difficulty}
                className={`capitalize font-medium cursor-pointer ${getDifficultyTextColor(difficulty)}`}
              >
                {difficulty}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Challenge Card */}
      <div className="bg-card border rounded-2xl p-8 shadow-lg mb-8 min-h-[400px] flex flex-col justify-between">
        {isLoading ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Generating your challenge...</p>
            </div>
            <Progress value={progress} className="mb-4" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : currentChallenge ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {currentChallenge.type === 'coding' ? (
                  <Code className="h-6 w-6 text-blue-500" />
                ) : (
                  <Palette className="h-6 w-6 text-purple-500" />
                )}
                <Badge variant="outline" className={`${getDifficultyColor(currentChallenge.difficulty)} text-white border-none`}>
                  {currentChallenge.difficulty}
                </Badge>
              </div>
              <Badge variant="secondary">{currentChallenge.estimatedTime}</Badge>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">{currentChallenge.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{currentChallenge.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills you'll practice:</h4>
              <div className="flex flex-wrap gap-2">
                {currentChallenge.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No challenge available. Try generating a new one!</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleSkipChallenge}
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          <SkipForward className="h-4 w-4" />
          <span>Skip</span>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={generateChallenge}
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          <RefreshCcw className="h-4 w-4" />
          <span>Regenerate</span>
        </Button>
        
        <Button
          size="lg"
          onClick={handleAcceptChallenge}
          disabled={isLoading || !currentChallenge}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Accept Challenge</span>
        </Button>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold">Challenge Accepted!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Great choice! You've accepted the "{currentChallenge?.name}" challenge.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                +10 XP for accepting a {currentChallenge?.difficulty} challenge!
              </p>
            </div>
            <Button onClick={() => setShowSuccessModal(false)} className="w-full">
              Start Coding!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
