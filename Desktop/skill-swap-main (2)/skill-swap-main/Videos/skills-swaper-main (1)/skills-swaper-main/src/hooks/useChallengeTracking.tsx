import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface ChallengeCompletion {
  id: string;
  challengeName: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  skills: string[];
  completedAt: string;
  xpEarned: number;
  badge?: {
    name: string;
    color: string;
    type: string;
  };
}

interface ChallengeStats {
  dailyCompleted: number;
  dailyTarget: number;
  weeklyCompleted: number;
  weeklyTarget: number;
  currentStreak: number;
  totalChallenges: number;
  averageScore: number;
  recentCompletions: ChallengeCompletion[];
}

interface UserXpStats {
  totalXp: number;
  dailyXp: number;
  weeklyXp: number;
  level: number;
  xpToNextLevel: number;
  progressToNextLevel: number;
}

export const useChallengeTracking = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ChallengeStats>({
    dailyCompleted: 0,
    dailyTarget: 3,
    weeklyCompleted: 0,
    weeklyTarget: 15,
    currentStreak: 0,
    totalChallenges: 0,
    averageScore: 0,
    recentCompletions: []
  });

  const [xpStats, setXpStats] = useState<UserXpStats>({
    totalXp: 0,
    dailyXp: 0,
    weeklyXp: 0,
    level: 1,
    xpToNextLevel: 1000,
    progressToNextLevel: 0
  });

  useEffect(() => {
    if (user) {
      loadChallengeStats();
      loadXpStats();
    }
  }, [user]);

  const calculateXp = (score: number, difficulty: string): number => {
    let baseXp = 50;
    switch (difficulty) {
      case 'easy': baseXp = 50; break;
      case 'medium': baseXp = 100; break;
      case 'hard': baseXp = 150; break;
      case 'expert': baseXp = 200; break;
      default: baseXp = 50;
    }
    const multiplier = 0.5 + (score / 100);
    return Math.round(baseXp * multiplier);
  };

  const updateXpStats = (xpEarned: number) => {
    if (!user) return;

    const xpStatsKey = `xp_stats_${user.id}`;
    const existingStats = localStorage.getItem(xpStatsKey);
    let currentXpStats = existingStats ? JSON.parse(existingStats) : {
      totalXp: 0,
      dailyXp: 0,
      weeklyXp: 0,
      lastDailyReset: new Date().toDateString(),
      lastWeeklyReset: getWeekStart(new Date()).toISOString()
    };

    const today = new Date().toDateString();
    const weekStart = getWeekStart(new Date()).toISOString();

    // Reset daily XP if it's a new day
    if (currentXpStats.lastDailyReset !== today) {
      currentXpStats.dailyXp = 0;
      currentXpStats.lastDailyReset = today;
    }

    // Reset weekly XP if it's a new week
    if (currentXpStats.lastWeeklyReset !== weekStart) {
      currentXpStats.weeklyXp = 0;
      currentXpStats.lastWeeklyReset = weekStart;
    }

    // Update XP values
    currentXpStats.totalXp += xpEarned;
    currentXpStats.dailyXp += xpEarned;
    currentXpStats.weeklyXp += xpEarned;

    // Calculate level and progress
    const level = Math.floor(currentXpStats.totalXp / 1000) + 1;
    const currentLevelXp = currentXpStats.totalXp % 1000;
    const xpToNextLevel = 1000 - currentLevelXp;
    const progressToNextLevel = (currentLevelXp / 1000) * 100;

    const newXpStats = {
      totalXp: currentXpStats.totalXp,
      dailyXp: currentXpStats.dailyXp,
      weeklyXp: currentXpStats.weeklyXp,
      level,
      xpToNextLevel,
      progressToNextLevel
    };

    setXpStats(newXpStats);
    localStorage.setItem(xpStatsKey, JSON.stringify(currentXpStats));

    // Also create XP activity record
    const activitiesKey = `xp_activities_${user.id}`;
    const existingActivities = localStorage.getItem(activitiesKey);
    const activities = existingActivities ? JSON.parse(existingActivities) : [];
    
    activities.push({
      id: crypto.randomUUID(),
      activity_type: 'challenge_completed',
      xp_earned: xpEarned,
      description: `Challenge completed - earned ${xpEarned} XP`,
      created_at: new Date().toISOString()
    });

    // Keep only last 50 activities
    if (activities.length > 50) {
      activities.splice(0, activities.length - 50);
    }

    localStorage.setItem(activitiesKey, JSON.stringify(activities));
  };

  const loadXpStats = () => {
    if (!user) return;

    const xpStatsKey = `xp_stats_${user.id}`;
    const savedStats = localStorage.getItem(xpStatsKey);
    
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      const today = new Date().toDateString();
      const weekStart = getWeekStart(new Date()).toISOString();

      // Reset daily XP if it's a new day
      if (parsedStats.lastDailyReset !== today) {
        parsedStats.dailyXp = 0;
        parsedStats.lastDailyReset = today;
        localStorage.setItem(xpStatsKey, JSON.stringify(parsedStats));
      }

      // Reset weekly XP if it's a new week
      if (parsedStats.lastWeeklyReset !== weekStart) {
        parsedStats.weeklyXp = 0;
        parsedStats.lastWeeklyReset = weekStart;
        localStorage.setItem(xpStatsKey, JSON.stringify(parsedStats));
      }

      const level = Math.floor(parsedStats.totalXp / 1000) + 1;
      const currentLevelXp = parsedStats.totalXp % 1000;
      const xpToNextLevel = 1000 - currentLevelXp;
      const progressToNextLevel = (currentLevelXp / 1000) * 100;

      setXpStats({
        totalXp: parsedStats.totalXp,
        dailyXp: parsedStats.dailyXp,
        weeklyXp: parsedStats.weeklyXp,
        level,
        xpToNextLevel,
        progressToNextLevel
      });
    }
  };

  const loadChallengeStats = () => {
    if (!user) return;

    const completionsKey = `challenge_completions_${user.id}`;
    const savedCompletions = localStorage.getItem(completionsKey);
    
    if (savedCompletions) {
      const completions: ChallengeCompletion[] = JSON.parse(savedCompletions);
      const today = new Date().toDateString();
      const weekStart = getWeekStart(new Date());
      
      // Calculate daily completions
      const dailyCompletions = completions.filter(c => 
        new Date(c.completedAt).toDateString() === today
      );
      
      // Calculate weekly completions
      const weeklyCompletions = completions.filter(c => 
        new Date(c.completedAt) >= weekStart
      );

      // Calculate average score
      const totalScore = completions.reduce((sum, c) => sum + c.score, 0);
      const averageScore = completions.length > 0 ? Math.round(totalScore / completions.length) : 0;

      // Calculate streak
      const currentStreak = calculateStreak(completions);

      const newStats = {
        dailyCompleted: dailyCompletions.length,
        dailyTarget: 3,
        weeklyCompleted: weeklyCompletions.length,
        weeklyTarget: 15,
        currentStreak,
        totalChallenges: completions.length,
        averageScore,
        recentCompletions: completions.slice(-10).reverse()
      };

      setStats(newStats);
      
      // Also save stats to localStorage for leaderboard access
      const statsKey = `challenge_stats_${user.id}`;
      localStorage.setItem(statsKey, JSON.stringify(newStats));
    }
  };

  const calculateStreak = (completions: ChallengeCompletion[]): number => {
    if (completions.length === 0) return 0;

    const sortedDates = completions
      .map(c => new Date(c.completedAt).toDateString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const uniqueDates = [...new Set(sortedDates)];
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const date = new Date(uniqueDates[i]);
      const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const completeChallenge = (completion: Omit<ChallengeCompletion, 'id' | 'completedAt' | 'xpEarned'>) => {
    if (!user) return;

    // Calculate XP based on score and difficulty
    const xpEarned = calculateXp(completion.score, completion.difficulty);

    const newCompletion: ChallengeCompletion = {
      ...completion,
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
      xpEarned
    };

    const completionsKey = `challenge_completions_${user.id}`;
    const existing = localStorage.getItem(completionsKey);
    const completions = existing ? JSON.parse(existing) : [];
    
    completions.push(newCompletion);
    localStorage.setItem(completionsKey, JSON.stringify(completions));
    
    // Update XP stats
    updateXpStats(xpEarned);
    
    // Reload stats after completion
    loadChallengeStats();
    
    console.log('Challenge completed:', newCompletion);
    console.log('XP earned:', xpEarned);
  };

  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  return {
    stats,
    xpStats,
    completeChallenge,
    refreshStats: () => {
      loadChallengeStats();
      loadXpStats();
    }
  };
};
