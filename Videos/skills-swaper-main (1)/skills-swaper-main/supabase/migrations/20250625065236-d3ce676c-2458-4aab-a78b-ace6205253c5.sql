
-- Create discussions table
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  upvotes INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false
);

-- Create replies table for nested comments
CREATE TABLE public.replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  parent_reply_id UUID REFERENCES public.replies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  upvotes INTEGER DEFAULT 0
);

-- Create votes table for upvote tracking
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.replies(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')) DEFAULT 'upvote',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, discussion_id),
  UNIQUE(user_id, reply_id),
  CHECK ((discussion_id IS NOT NULL AND reply_id IS NULL) OR (discussion_id IS NULL AND reply_id IS NOT NULL))
);

-- Create user karma/XP table
CREATE TABLE public.user_karma (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  total_xp INTEGER DEFAULT 0,
  discussion_karma INTEGER DEFAULT 0,
  reply_karma INTEGER DEFAULT 0,
  mentor_rating DECIMAL(3,2) DEFAULT 0.0,
  mentor_rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor ratings table for fraud resistance
CREATE TABLE public.mentor_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES auth.users NOT NULL,
  rater_id UUID REFERENCES auth.users NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(mentor_id, rater_id)
);

-- Enable RLS on all tables
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_karma ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_ratings ENABLE ROW LEVEL SECURITY;

-- RLS policies for discussions
CREATE POLICY "Anyone can view discussions" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create discussions" ON public.discussions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own discussions" ON public.discussions FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for replies
CREATE POLICY "Anyone can view replies" ON public.replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON public.replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own replies" ON public.replies FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for votes
CREATE POLICY "Users can view all votes" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Users can create their own votes" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own votes" ON public.votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON public.votes FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for user karma
CREATE POLICY "Anyone can view user karma" ON public.user_karma FOR SELECT USING (true);
CREATE POLICY "Users can update their own karma" ON public.user_karma FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for mentor ratings
CREATE POLICY "Anyone can view mentor ratings" ON public.mentor_ratings FOR SELECT USING (true);
CREATE POLICY "Users can create ratings" ON public.mentor_ratings FOR INSERT WITH CHECK (auth.uid() = rater_id);
CREATE POLICY "Users can update their own ratings" ON public.mentor_ratings FOR UPDATE USING (auth.uid() = rater_id);

-- Create indexes for performance
CREATE INDEX idx_discussions_created_at ON public.discussions(created_at DESC);
CREATE INDEX idx_discussions_tags ON public.discussions USING GIN(tags);
CREATE INDEX idx_replies_discussion_id ON public.replies(discussion_id);
CREATE INDEX idx_replies_parent_id ON public.replies(parent_reply_id);
CREATE INDEX idx_votes_discussion_id ON public.votes(discussion_id);
CREATE INDEX idx_votes_reply_id ON public.votes(reply_id);

-- Function to update reply count when replies are added/deleted
CREATE OR REPLACE FUNCTION update_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.discussions 
    SET reply_count = reply_count + 1 
    WHERE id = NEW.discussion_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.discussions 
    SET reply_count = reply_count - 1 
    WHERE id = OLD.discussion_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update reply counts
CREATE TRIGGER update_discussion_reply_count
  AFTER INSERT OR DELETE ON public.replies
  FOR EACH ROW EXECUTE FUNCTION update_reply_count();
