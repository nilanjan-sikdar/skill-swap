import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Star, TrendingUp, RotateCcw, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChallengeTracking } from '@/hooks/useChallengeTracking';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
}

interface QuizResultsProps {
  questions: Question[];
  userAnswers: number[];
  timeSpent: number;
  userName: string;
  onRetakeQuiz: () => void;
}

interface EarnedBadge {
  id: string;
  skill_name: string;
  badge_type: string;
  difficulty_level: string;
  badge_color: string;
  description: string;
}

export const QuizResults = ({ questions, userAnswers, timeSpent, userName, onRetakeQuiz }: QuizResultsProps) => {
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const { completeChallenge } = useChallengeTracking();
  
  const correctAnswers = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  const score = Math.round((correctAnswers / questions.length) * 100);
  
  // Calculate XP based on score and difficulty
  const calculateXP = (score: number, difficulty: string) => {
    let baseXP = 50;
    switch (difficulty) {
      case 'easy': baseXP = 50; break;
      case 'medium': baseXP = 100; break;
      case 'hard': baseXP = 150; break;
      default: baseXP = 50;
    }
    const multiplier = 0.5 + (score / 100);
    return Math.round(baseXP * multiplier);
  };

  // Track the challenge completion when component mounts
  useEffect(() => {
    // Extract unique skills from questions
    const skills = [...new Set(questions.map(q => q.skill))];
    
    // Determine overall difficulty
    const difficultyCount = questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    let overallDifficulty: 'easy' | 'medium' | 'hard' = 'easy';
    if (difficultyCount.hard >= 3) overallDifficulty = 'hard';
    else if (difficultyCount.medium >= 4) overallDifficulty = 'medium';

    const xpEarned = calculateXP(score, overallDifficulty);

    // Get the first earned badge (if any) for the challenge completion
    const primaryBadge = earnedBadges.length > 0 ? {
      name: earnedBadges[0].skill_name,
      color: earnedBadges[0].badge_color,
      type: earnedBadges[0].badge_type
    } : undefined;

    // Track the challenge completion - removed xpEarned since it's calculated internally
    completeChallenge({
      challengeName: `${skills.join(', ')} Challenge`,
      score,
      difficulty: overallDifficulty,
      skills,
      badge: primaryBadge
    });

    console.log('Challenge tracked:', {
      challengeName: `${skills.join(', ')} Challenge`,
      score,
      difficulty: overallDifficulty,
      skills,
      xpEarned,
      badge: primaryBadge
    });

    toast.success(`Challenge completed! Earned ${xpEarned} XP`, {
      description: `Score: ${score}% | Difficulty: ${overallDifficulty}`
    });
  }, [questions, score, completeChallenge, earnedBadges]);

  // Award badges based on performance
  useEffect(() => {
    const awardBadges = () => {
      const badges: EarnedBadge[] = [];
      
      // Extract unique skills from questions
      const skills = [...new Set(questions.map(q => q.skill))];
      
      // Determine overall difficulty
      const difficultyCount = questions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      let overallDifficulty = 'easy';
      if (difficultyCount.hard >= 3) overallDifficulty = 'hard';
      else if (difficultyCount.medium >= 4) overallDifficulty = 'medium';

      // Award perfect score badge
      if (score === 100) {
        badges.push({
          id: 'perfect-score',
          skill_name: 'Perfect Score',
          badge_type: 'achievement',
          difficulty_level: overallDifficulty,
          badge_color: '#f59e0b',
          description: `Achieved 100% score in a ${overallDifficulty} challenge`
        });
      }

      // Award high score badge (90%+)
      if (score >= 90 && score < 100) {
        badges.push({
          id: 'high-score',
          skill_name: 'High Achiever',
          badge_type: 'achievement',
          difficulty_level: overallDifficulty,
          badge_color: '#10b981',
          description: `Scored ${score}% in a ${overallDifficulty} challenge`
        });
      }

      // Award good score badge (80%+)
      if (score >= 80 && score < 90) {
        badges.push({
          id: 'good-score',
          skill_name: 'Good Performance',
          badge_type: 'achievement',
          difficulty_level: overallDifficulty,
          badge_color: '#3b82f6',
          description: `Scored ${score}% in a ${overallDifficulty} challenge`
        });
      }

      // Award skill-specific badges for first completion
      skills.forEach(skill => {
        badges.push({
          id: `skill-${skill}`,
          skill_name: skill,
          badge_type: 'skill',
          difficulty_level: 'beginner',
          badge_color: '#8b5cf6',
          description: `Completed first ${skill} challenge`
        });
      });

      // Award speed badge if completed quickly
      const avgTimePerQuestion = timeSpent / questions.length;
      if (avgTimePerQuestion < 30 && score >= 80) {
        badges.push({
          id: 'speed-demon',
          skill_name: 'Speed Demon',
          badge_type: 'achievement',
          difficulty_level: 'special',
          badge_color: '#ef4444',
          description: `Completed challenge quickly with high accuracy`
        });
      }

      setEarnedBadges(badges);
    };

    awardBadges();
  }, [questions, score, timeSpent]);

  const skillBreakdown = questions.reduce((acc, question, index) => {
    const skill = question.skill;
    if (!acc[skill]) {
      acc[skill] = { total: 0, correct: 0 };
    }
    acc[skill].total++;
    if (userAnswers[index] === question.correctAnswer) {
      acc[skill].correct++;
    }
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  const difficultyBreakdown = questions.reduce((acc, question, index) => {
    const difficulty = question.difficulty;
    if (!acc[difficulty]) {
      acc[difficulty] = { total: 0, correct: 0 };
    }
    acc[difficulty].total++;
    if (userAnswers[index] === question.correctAnswer) {
      acc[difficulty].correct++;
    }
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMotivationalMessage = (score: number) => {
    if (score >= 90) return "Outstanding performance! You're a true expert! 🌟";
    if (score >= 80) return "Excellent work! You've mastered these concepts! 🎉";
    if (score >= 70) return "Great job! You're on the right track! 👍";
    if (score >= 60) return "Good effort! Keep practicing to improve! 💪";
    return "Don't give up! Every expert was once a beginner! 🚀";
  };

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'skill':
        return '💻';
      case 'achievement':
        return '🏆';
      case 'speed':
        return '⚡';
      default:
        return '⭐';
    }
  };

  // Calculate total XP earned
  const overallDifficulty = questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  let finalDifficulty = 'easy';
  if (overallDifficulty.hard >= 3) finalDifficulty = 'hard';
  else if (overallDifficulty.medium >= 4) finalDifficulty = 'medium';

  const xpEarned = calculateXP(score, finalDifficulty);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Challenge Complete!
          </h1>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-xl text-muted-foreground">
          Great job, {userName}! Here's how you performed.
        </p>
      </motion.div>

      {/* New Badges Section */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                <Trophy className="h-5 w-5" />
                🎉 Badges Earned!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
                  >
                    <div className="text-3xl mb-2">{getBadgeIcon(badge.badge_type)}</div>
                    <h3 className="font-bold text-sm mb-1">{badge.skill_name}</h3>
                    <Badge 
                      className="text-xs capitalize mb-2"
                      style={{ backgroundColor: badge.badge_color, color: 'white' }}
                    >
                      {badge.difficulty_level}
                    </Badge>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Score Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200/50">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className="text-2xl font-semibold">
                {correctAnswers} out of {questions.length} correct
              </div>
              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Time: {formatTime(timeSpent)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Accuracy: {score}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>XP Earned: {xpEarned}</span>
                </div>
              </div>
              <div className="max-w-md mx-auto">
                <Badge variant="secondary" className="text-lg py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  {getMotivationalMessage(score)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Skills Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(skillBreakdown).map(([skill, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill}</span>
                      <span className="text-sm text-muted-foreground">
                        {data.correct}/{data.total} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Difficulty Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(difficultyBreakdown).map(([difficulty, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100);
                const color = difficulty === 'easy' ? 'bg-green-500' : difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
                return (
                  <div key={difficulty} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className={`${color} text-white capitalize`}>
                          {difficulty}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {data.correct}/{data.total} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-4"
      >
        <Button
          onClick={onRetakeQuiz}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Take Another Challenge
        </Button>
      </motion.div>
    </div>
  );
};
