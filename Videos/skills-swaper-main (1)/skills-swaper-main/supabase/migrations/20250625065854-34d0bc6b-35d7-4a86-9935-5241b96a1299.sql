
-- Create XP activities tracking table
CREATE TABLE public.xp_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('challenge_completed', 'collaboration_session', 'feedback_given', 'discussion_created', 'reply_posted', 'upvote_received')),
  xp_earned INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user stats table for leaderboard caching
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  total_xp INTEGER DEFAULT 0,
  daily_xp INTEGER DEFAULT 0,
  weekly_xp INTEGER DEFAULT 0,
  primary_skill TEXT,
  rank_position INTEGER,
  last_rank_update TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.xp_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- RLS policies for xp_activities
CREATE POLICY "Anyone can view XP activities" ON public.xp_activities FOR SELECT USING (true);
CREATE POLICY "Users can create their own XP activities" ON public.xp_activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_stats
CREATE POLICY "Anyone can view user stats" ON public.user_stats FOR SELECT USING (true);
CREATE POLICY "Users can update their own stats" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_xp_activities_user_id ON public.xp_activities(user_id);
CREATE INDEX idx_xp_activities_created_at ON public.xp_activities(created_at DESC);
CREATE INDEX idx_user_stats_total_xp ON public.user_stats(total_xp DESC);
CREATE INDEX idx_user_stats_daily_xp ON public.user_stats(daily_xp DESC);
CREATE INDEX idx_user_stats_weekly_xp ON public.user_stats(weekly_xp DESC);

-- Function to update user stats when XP activities are added
CREATE OR REPLACE FUNCTION update_user_xp_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update user stats
  INSERT INTO public.user_stats (user_id, total_xp, daily_xp, weekly_xp, updated_at)
  VALUES (
    NEW.user_id,
    NEW.xp_earned,
    CASE WHEN NEW.created_at >= CURRENT_DATE THEN NEW.xp_earned ELSE 0 END,
    CASE WHEN NEW.created_at >= DATE_TRUNC('week', CURRENT_DATE) THEN NEW.xp_earned ELSE 0 END,
    now()
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    total_xp = user_stats.total_xp + NEW.xp_earned,
    daily_xp = CASE 
      WHEN NEW.created_at >= CURRENT_DATE 
      THEN user_stats.daily_xp + NEW.xp_earned 
      ELSE user_stats.daily_xp 
    END,
    weekly_xp = CASE 
      WHEN NEW.created_at >= DATE_TRUNC('week', CURRENT_DATE) 
      THEN user_stats.weekly_xp + NEW.xp_earned 
      ELSE user_stats.weekly_xp 
    END,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update user stats
CREATE TRIGGER update_user_xp_stats_trigger
  AFTER INSERT ON public.xp_activities
  FOR EACH ROW EXECUTE FUNCTION update_user_xp_stats();

-- Function to reset daily/weekly XP (to be called by a scheduled job)
CREATE OR REPLACE FUNCTION reset_periodic_xp()
RETURNS void AS $$
BEGIN
  -- Reset daily XP at midnight
  UPDATE public.user_stats 
  SET daily_xp = 0, updated_at = now()
  WHERE last_rank_update < CURRENT_DATE;
  
  -- Reset weekly XP at start of week
  UPDATE public.user_stats 
  SET weekly_xp = 0, updated_at = now()
  WHERE last_rank_update < DATE_TRUNC('week', CURRENT_DATE);
  
  -- Update last_rank_update timestamp
  UPDATE public.user_stats 
  SET last_rank_update = now();
END;
$$ LANGUAGE plpgsql;
