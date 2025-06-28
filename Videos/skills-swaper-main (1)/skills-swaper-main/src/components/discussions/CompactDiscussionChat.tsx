
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "./ChatMessage";
import { motion, AnimatePresence } from "framer-motion";

interface CompactDiscussionChatProps {
  discussionId: string;
}

export const CompactDiscussionChat = ({ discussionId }: CompactDiscussionChatProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
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
        .order("created_at", { ascending: true })
        .limit(100);

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        throw messagesError;
      }

      if (!messagesData || messagesData.length === 0) return [];

      // Get user profiles for messages
      const userIds = [...new Set(messagesData.map(msg => msg.user_id))];
      console.log('Fetching profiles for users:', userIds);
      
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, name")
        .in("user_id", userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.user_id, profile);
      });

      return messagesData.map(msg => ({
        ...msg,
        profiles: profilesMap.get(msg.user_id) || { name: "Anonymous User" }
      }));
    },
    enabled: !!discussionId && !!user,
    refetchInterval: 5000 // Fallback polling every 5 seconds
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      if (!user) throw new Error("Not authenticated");

      console.log('Sending message:', messageText, 'to discussion:', discussionId);
      
      const { error } = await supabase
        .from("discussion_messages")
        .insert({
          discussion_id: discussionId,
          user_id: user.id,
          message: messageText.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    },
    onSuccess: () => {
      setMessage("");
      toast.success("Message sent!");
      // Immediately refetch messages
      queryClient.invalidateQueries({ queryKey: ["discussion-messages", discussionId] });
    },
    onError: (error) => {
      console.error('Send message error:', error);
      toast.error("Failed to send message. Please try again.");
    }
  });

  // Real-time subscription for messages
  useEffect(() => {
    if (!discussionId || !user) return;

    console.log('Setting up real-time subscription for discussion:', discussionId);

    const channel = supabase
      .channel(`discussion-messages-${discussionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'discussion_messages',
          filter: `discussion_id=eq.${discussionId}`
        },
        (payload) => {
          console.log('Real-time message received:', payload);
          queryClient.invalidateQueries({ queryKey: ["discussion-messages", discussionId] });
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [discussionId, queryClient, user]);

  // Presence tracking for online users
  useEffect(() => {
    if (!user || !discussionId) return;

    console.log('Setting up presence tracking for discussion:', discussionId);

    const presenceChannel = supabase.channel(`presence-discussion-${discussionId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const userCount = Object.keys(state).length;
        console.log('Presence sync - online users:', userCount);
        setOnlineUsers(userCount);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        console.log('Presence subscription status:', status);
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: user.id,
            user_name: user.email,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      console.log('Cleaning up presence tracking');
      supabase.removeChannel(presenceChannel);
    };
  }, [user, discussionId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message);
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-3"
        >
          <div className="text-2xl">🔒</div>
          <p className="text-sm text-muted-foreground">Please sign in to join the chat</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Online users indicator */}
      <div className="p-3 border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <Users className="h-3 w-3 text-green-600" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              {onlineUsers} online
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Live updates</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"
              />
              <p className="text-xs text-muted-foreground mt-2">Loading messages...</p>
            </div>
          ) : messages && messages.length > 0 ? (
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ChatMessage
                    message={msg.message}
                    userName={msg.profiles?.name || "Anonymous User"}
                    timestamp={msg.created_at}
                    isOwnMessage={msg.user_id === user.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="text-4xl mb-3">💬</div>
              <p className="text-sm text-muted-foreground mb-1">No messages yet</p>
              <p className="text-xs text-muted-foreground/70">Start the conversation!</p>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-gray-200/30 dark:border-gray-800/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-sm bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50"
            disabled={sendMessageMutation.isPending}
            maxLength={500}
          />
          <Button 
            type="submit" 
            disabled={!message.trim() || sendMessageMutation.isPending}
            size="sm"
            className="px-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {sendMessageMutation.isPending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border border-white border-t-transparent rounded-full"
              />
            ) : (
              <Send className="h-3 w-3" />
            )}
          </Button>
        </form>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Press Enter to send</span>
          <span>{message.length}/500</span>
        </div>
      </div>
    </div>
  );
};
