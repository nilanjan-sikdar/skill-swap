
-- Create collaboration sessions table
CREATE TABLE public.collaboration_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  code_content TEXT DEFAULT '',
  notes_content TEXT DEFAULT '',
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create session participants table
CREATE TABLE public.session_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.collaboration_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_host BOOLEAN DEFAULT false,
  UNIQUE(session_id, user_id)
);

-- Enable RLS
ALTER TABLE public.collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_participants ENABLE ROW LEVEL SECURITY;

-- Policies for collaboration_sessions
CREATE POLICY "Users can view sessions they participate in" 
  ON public.collaboration_sessions 
  FOR SELECT 
  USING (
    id IN (
      SELECT session_id FROM public.session_participants 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create sessions" 
  ON public.collaboration_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Participants can update session content" 
  ON public.collaboration_sessions 
  FOR UPDATE 
  USING (
    id IN (
      SELECT session_id FROM public.session_participants 
      WHERE user_id = auth.uid()
    )
  );

-- Policies for session_participants
CREATE POLICY "Users can view participants in their sessions" 
  ON public.session_participants 
  FOR SELECT 
  USING (
    session_id IN (
      SELECT session_id FROM public.session_participants 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join sessions" 
  ON public.session_participants 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for collaboration
ALTER TABLE public.collaboration_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.session_participants REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.collaboration_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_participants;
