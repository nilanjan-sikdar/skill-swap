
-- Create a table for discussion messages/chat
CREATE TABLE public.discussion_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on discussion_messages
ALTER TABLE public.discussion_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for discussion_messages
CREATE POLICY "Anyone can view discussion messages" 
  ON public.discussion_messages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create messages" 
  ON public.discussion_messages 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" 
  ON public.discussion_messages 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages" 
  ON public.discussion_messages 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_discussion_messages_discussion_id ON public.discussion_messages(discussion_id);
CREATE INDEX idx_discussion_messages_created_at ON public.discussion_messages(created_at DESC);

-- Enable realtime for discussion_messages table
ALTER TABLE public.discussion_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.discussion_messages;

-- Update discussions table to track message count
ALTER TABLE public.discussions ADD COLUMN IF NOT EXISTS message_count INTEGER DEFAULT 0;

-- Function to update message count when messages are added/deleted
CREATE OR REPLACE FUNCTION update_message_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.discussions 
    SET message_count = message_count + 1 
    WHERE id = NEW.discussion_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.discussions 
    SET message_count = GREATEST(message_count - 1, 0)
    WHERE id = OLD.discussion_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update message counts
CREATE TRIGGER update_discussion_message_count
  AFTER INSERT OR DELETE ON public.discussion_messages
  FOR EACH ROW EXECUTE FUNCTION update_message_count();
