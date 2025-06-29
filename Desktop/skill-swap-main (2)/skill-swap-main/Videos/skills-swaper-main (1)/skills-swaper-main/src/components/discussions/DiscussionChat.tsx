
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "./ChatMessage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DiscussionChatProps {
  discussionId: string;
}

export const DiscussionChat = ({ discussionId }: DiscussionChatProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages with real-time updates
  const { data: messages, isLoading } = useQuery({
    queryKey: ["discussion-messages", discussionId],
    queryFn: async () => {
      console.log('Fetching messages for discussion:', discussionId);
      
      const { data: messagesData, error: messagesError } = await supabase
        .from("discussion_messages")
        .select("*")
        .eq("discussion_id", discussionId)
        .order("created_at", { ascending: true });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        throw messagesError;
      }

      if (!messagesData || messagesData.length === 0) {
        return [];
      }

      // Get user profiles for messages
      const userIds = [...new Set(messagesData.map(msg => msg.user_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, name")
        .in("user_id", userIds);

      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.user_id, profile);
      });

      return messagesData.map(msg => ({
        ...msg,
        profiles: profilesMap.get(msg.user_id) || { name: "Anonymous" }
      }));
    },
    enabled: !!discussionId && !!user
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("discussion_messages")
        .insert({
          discussion_id: discussionId,
          user_id: user.id,
          message: messageText.trim()
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
      toast.success("Message sent!");
    },
    onError: (error) => {
      console.error('Send message error:', error);
      toast.error("Failed to send message");
    }
  });

  // Real-time subscription
  useEffect(() => {
    if (!discussionId || !user) return;

    const channel = supabase
      .channel(`discussion-${discussionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'discussion_messages',
          filter: `discussion_id=eq.${discussionId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["discussion-messages", discussionId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [discussionId, queryClient, user]);

  // Presence tracking
  useEffect(() => {
    if (!user || !discussionId) return;

    const presenceChannel = supabase.channel(`presence-discussion-${discussionId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        setOnlineUsers(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: user.id,
            user_name: user.email,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(presenceChannel);
    };
  }, [user, discussionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    sendMessageMutation.mutate(message);
  };

  if (!user) {
    return (
      <Card className="h-full">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Please sign in to join the discussion</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-4 px-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Live Discussion</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {onlineUsers} online
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Loading messages...</p>
              </div>
            ) : messages && messages.length > 0 ? (
              <>
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg.message}
                    userName={msg.profiles?.name || "Anonymous"}
                    timestamp={msg.created_at}
                    isOwnMessage={msg.user_id === user.id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-2">Start the conversation!</p>
                <p className="text-sm text-muted-foreground">Be the first to share your thoughts on this topic.</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 bg-white dark:bg-gray-800"
                disabled={sendMessageMutation.isPending}
                maxLength={500}
              />
              <Button 
                type="submit" 
                disabled={!message.trim() || sendMessageMutation.isPending}
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {sendMessageMutation.isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Press Enter to send</span>
              <span>{message.length}/500 characters</span>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
