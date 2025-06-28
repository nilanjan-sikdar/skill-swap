
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { localStorageUtils } from "@/utils/localStorageUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "./ChatMessage";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  discussion_id: string;
  user_id: string;
  message: string;
  created_at: string;
  user_name?: string;
}

interface RealTimeGroupChatProps {
  discussionId: string;
  discussionTitle?: string;
}

export const RealTimeGroupChat = ({ discussionId, discussionTitle }: RealTimeGroupChatProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<number>(1);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Fetch message history with fallback to localStorage
  const { data: messages, isLoading } = useQuery({
    queryKey: ["real-time-messages", discussionId],
    queryFn: async () => {
      console.log('Fetching message history for discussion:', discussionId);
      
      try {
        // Try Supabase first
        const { data: messagesData, error: messagesError } = await supabase
          .from("discussion_messages")
          .select("*")
          .eq("discussion_id", discussionId)
          .order("created_at", { ascending: true });

        if (messagesError) throw messagesError;

        if (messagesData && messagesData.length > 0) {
          // Get user profiles
          const userIds = [...new Set(messagesData.map(msg => msg.user_id))];
          const { data: profilesData } = await supabase
            .from("profiles")
            .select("user_id, name")
            .in("user_id", userIds);

          const userNameMap = new Map();
          if (profilesData) {
            profilesData.forEach(profile => {
              userNameMap.set(profile.user_id, profile.name);
            });
          }

          return messagesData.map(msg => ({
            ...msg,
            user_name: userNameMap.get(msg.user_id) || "Anonymous User"
          }));
        }
        
        throw new Error('No Supabase data, using localStorage');
        
      } catch (error) {
        console.log('Using localStorage for messages');
        
        // Fall back to localStorage
        const localMessages = localStorageUtils.getMessages(discussionId);
        return localMessages.map(msg => ({
          ...msg,
          user_name: msg.user_name || user?.email?.split('@')[0] || "Local User"
        }));
      }
    },
    enabled: !!discussionId && !!user,
    refetchInterval: 5000 // Poll every 5 seconds for localStorage updates
  });

  // Send message mutation with localStorage fallback
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      if (!user) throw new Error("Not authenticated");

      console.log('Sending message:', messageText, 'to discussion:', discussionId);
      
      try {
        // Try Supabase first
        const { error } = await supabase
          .from("discussion_messages")
          .insert({
            discussion_id: discussionId,
            user_id: user.id,
            message: messageText.trim()
          });

        if (error) throw error;
        return { source: 'supabase' };
        
      } catch (error) {
        console.log('Supabase failed, saving to localStorage:', error);
        
        // Fall back to localStorage
        localStorageUtils.saveMessage({
          discussion_id: discussionId,
          user_id: user.id,
          message: messageText.trim(),
          user_name: user.email?.split('@')[0] || "Local User"
        });
        
        return { source: 'localStorage' };
      }
    },
    onSuccess: (result) => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["real-time-messages", discussionId] });
      
      if (result.source === 'localStorage') {
        toast.success("Message saved locally!");
      } else {
        toast.success("Message sent!");
      }
    },
    onError: (error) => {
      console.error('Send message error:', error);
      toast.error("Failed to send message");
    }
  });

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

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-gradient-to-br from-gray-900/20 to-purple-900/20 dark:from-gray-800/30 dark:to-purple-800/30 backdrop-blur-xl rounded-3xl border border-white/10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-4xl">🔒</div>
          <p className="text-muted-foreground">Please sign in to join the chat</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/10 to-purple-900/10 dark:from-gray-800/20 dark:to-purple-800/20 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg">Local Group Chat</h3>
              {discussionTitle && (
                <p className="text-sm text-muted-foreground">{discussionTitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-100/80 dark:bg-blue-900/40 rounded-full backdrop-blur-sm">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Local Storage
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
              />
              <p className="text-muted-foreground mt-2">Loading chat history...</p>
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
                    userName={msg.user_name || "Local User"}
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
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg font-medium text-muted-foreground mb-2">Welcome to the local chat!</p>
              <p className="text-sm text-muted-foreground">Messages are stored locally on your device.</p>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type your message..."
              className="flex-1 bg-white/80 dark:bg-gray-800/80 border-white/20 backdrop-blur-sm"
              disabled={sendMessageMutation.isPending}
              maxLength={500}
            />
            <Button 
              type="submit" 
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              {sendMessageMutation.isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border border-white border-t-transparent rounded-full"
                />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Press Enter to send • Messages stored locally</span>
            <span>{message.length}/500</span>
          </div>
        </form>
      </div>
    </div>
  );
};
