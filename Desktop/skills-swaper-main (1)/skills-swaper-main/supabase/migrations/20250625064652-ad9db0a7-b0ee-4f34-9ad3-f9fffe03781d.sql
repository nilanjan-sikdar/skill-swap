
-- Create skill badges table
CREATE TABLE public.skill_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  skill_name TEXT NOT NULL,
  badge_type TEXT NOT NULL CHECK (badge_type IN ('coding', 'design', 'collaboration', 'problem_solving', 'leadership')),
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_verified BOOLEAN DEFAULT true,
  proof_description TEXT,
  badge_color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skill_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for skill_badges
CREATE POLICY "Users can view their own badges" 
  ON public.skill_badges 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" 
  ON public.skill_badges 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own badges" 
  ON public.skill_badges 
  FOR UPDATE 
  USING (auth.uid() = user_id);
