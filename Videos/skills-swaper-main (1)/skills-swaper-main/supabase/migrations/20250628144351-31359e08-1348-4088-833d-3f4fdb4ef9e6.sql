
-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can insert their own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can update their own stats" ON public.user_stats;

-- Add RLS policies for user_stats table
CREATE POLICY "Users can view their own stats" ON public.user_stats 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON public.user_stats 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.user_stats 
FOR UPDATE USING (auth.uid() = user_id);

-- Drop existing policies if they exist and recreate them for other tables
DROP POLICY IF EXISTS "Users can view their own challenge completions" ON public.challenge_completions;
DROP POLICY IF EXISTS "Users can insert their own challenge completions" ON public.challenge_completions;

CREATE POLICY "Users can view their own challenge completions" ON public.challenge_completions 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenge completions" ON public.challenge_completions 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Drop existing policies if they exist and recreate them for skill_badges
DROP POLICY IF EXISTS "Users can view their own skill badges" ON public.skill_badges;
DROP POLICY IF EXISTS "Users can insert their own skill badges" ON public.skill_badges;

CREATE POLICY "Users can view their own skill badges" ON public.skill_badges 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skill badges" ON public.skill_badges 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Drop existing policies if they exist and recreate them for xp_activities
DROP POLICY IF EXISTS "Users can view their own XP activities" ON public.xp_activities;
DROP POLICY IF EXISTS "Users can insert their own XP activities" ON public.xp_activities;

CREATE POLICY "Users can view their own XP activities" ON public.xp_activities 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own XP activities" ON public.xp_activities 
FOR INSERT WITH CHECK (auth.uid() = user_id);
