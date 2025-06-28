
-- Create challenge completions table to track user progress
CREATE TABLE public.challenge_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  challenge_name TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  questions_total INTEGER NOT NULL,
  questions_correct INTEGER NOT NULL,
  time_spent INTEGER NOT NULL, -- in seconds
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('easy', 'medium', 'hard', 'expert')),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  xp_earned INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.challenge_completions ENABLE ROW LEVEL SECURITY;

-- RLS policies for challenge_completions
CREATE POLICY "Users can view their own challenge completions" 
  ON public.challenge_completions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenge completions" 
  ON public.challenge_completions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Function to calculate XP based on score and difficulty
CREATE OR REPLACE FUNCTION calculate_challenge_xp(score INTEGER, difficulty TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  base_xp INTEGER;
  multiplier NUMERIC;
BEGIN
  -- Base XP by difficulty
  CASE difficulty
    WHEN 'easy' THEN base_xp := 50;
    WHEN 'medium' THEN base_xp := 100;
    WHEN 'hard' THEN base_xp := 150;
    WHEN 'expert' THEN base_xp := 200;
    ELSE base_xp := 50;
  END CASE;
  
  -- Score multiplier (0.5 to 1.5 based on score)
  multiplier := 0.5 + (score::NUMERIC / 100.0);
  
  RETURN ROUND(base_xp * multiplier);
END;
$$;

-- Function to award badges based on challenge completion
CREATE OR REPLACE FUNCTION award_challenge_badges(p_user_id UUID, p_skills TEXT[], p_score INTEGER, p_difficulty TEXT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  skill TEXT;
  completion_count INTEGER;
  high_score_count INTEGER;
BEGIN
  -- Award skill-specific badges
  FOREACH skill IN ARRAY p_skills
  LOOP
    -- Count completions for this skill
    SELECT COUNT(*) INTO completion_count
    FROM public.challenge_completions cc
    WHERE cc.user_id = p_user_id 
    AND skill = ANY(cc.skills);
    
    -- Count high scores (80%+) for this skill
    SELECT COUNT(*) INTO high_score_count
    FROM public.challenge_completions cc
    WHERE cc.user_id = p_user_id 
    AND skill = ANY(cc.skills)
    AND cc.score >= 80;
    
    -- Award beginner badge (first completion)
    IF completion_count = 1 THEN
      INSERT INTO public.skill_badges (user_id, skill_name, badge_type, difficulty_level, proof_description, badge_color)
      VALUES (p_user_id, skill, 'coding', 'beginner', 'Completed first ' || skill || ' challenge', '#10b981')
      ON CONFLICT DO NOTHING;
    END IF;
    
    -- Award intermediate badge (5 completions)
    IF completion_count = 5 THEN
      INSERT INTO public.skill_badges (user_id, skill_name, badge_type, difficulty_level, proof_description, badge_color)
      VALUES (p_user_id, skill, 'coding', 'intermediate', 'Completed 5 ' || skill || ' challenges', '#3b82f6')
      ON CONFLICT DO NOTHING;
    END IF;
    
    -- Award advanced badge (10 high scores)
    IF high_score_count = 10 THEN
      INSERT INTO public.skill_badges (user_id, skill_name, badge_type, difficulty_level, proof_description, badge_color)
      VALUES (p_user_id, skill, 'problem_solving', 'advanced', 'Achieved 80%+ score in 10 ' || skill || ' challenges', '#8b5cf6')
      ON CONFLICT DO NOTHING;
    END IF;
    
    -- Award expert badge (25 completions)
    IF completion_count = 25 THEN
      INSERT INTO public.skill_badges (user_id, skill_name, badge_type, difficulty_level, proof_description, badge_color)
      VALUES (p_user_id, skill, 'coding', 'expert', 'Completed 25 ' || skill || ' challenges', '#ef4444')
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
  
  -- Award perfect score badge
  IF p_score = 100 THEN
    INSERT INTO public.skill_badges (user_id, skill_name, badge_type, difficulty_level, proof_description, badge_color)
    VALUES (p_user_id, 'Perfect Score', 'problem_solving', p_difficulty, 'Achieved 100% score in a ' || p_difficulty || ' challenge', '#f59e0b')
    ON CONFLICT DO NOTHING;
  END IF;
END;
$$;

-- Trigger to automatically calculate XP and award badges when challenge is completed
CREATE OR REPLACE FUNCTION handle_challenge_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  calculated_xp INTEGER;
BEGIN
  -- Calculate XP based on score and difficulty
  calculated_xp := calculate_challenge_xp(NEW.score, NEW.difficulty_level);
  NEW.xp_earned := calculated_xp;
  
  -- Insert XP activity record
  INSERT INTO public.xp_activities (user_id, activity_type, xp_earned, description)
  VALUES (NEW.user_id, 'challenge_completed', calculated_xp, 
    'Completed "' || NEW.challenge_name || '" with ' || NEW.score || '% score');
  
  -- Award badges
  PERFORM award_challenge_badges(NEW.user_id, NEW.skills, NEW.score, NEW.difficulty_level);
  
  RETURN NEW;
END;
$$;

-- Create trigger for challenge completion
CREATE TRIGGER challenge_completion_trigger
  BEFORE INSERT ON public.challenge_completions
  FOR EACH ROW EXECUTE FUNCTION handle_challenge_completion();

-- Create indexes for better performance
CREATE INDEX idx_challenge_completions_user_id ON public.challenge_completions(user_id);
CREATE INDEX idx_challenge_completions_skills ON public.challenge_completions USING GIN(skills);
CREATE INDEX idx_challenge_completions_completed_at ON public.challenge_completions(completed_at DESC);
