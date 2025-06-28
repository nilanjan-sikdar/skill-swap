
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Users, MessageCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "./ChatMessage";
import { motion, AnimatePresence } from "framer-motion";
import { localStorageUtils, LocalMessage } from "@/utils/localStorageUtils";

interface ChatFormProps {
  discussionId?: string;
  title?: string;
}

export const ChatForm = ({ discussionId = "general-chat", title = "General Chat" }: ChatFormProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [onlineUsers] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const loadMessages = () => {
      const storedMessages = localStorageUtils.getMessages(discussionId);
      setMessages(storedMessages);
    };

    loadMessages();
    
    // Set up polling to check for new messages every second
    const interval = setInterval(loadMessages, 1000);
    
    return () => clearInterval(interval);
  }, [discussionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      const newMessage = localStorageUtils.saveMessage({
        discussion_id: discussionId,
        user_id: user.id,
        message: message.trim(),
        user_name: user.email || "Anonymous"
      });

      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error('Send message error:', error);
      toast.error("Failed to send message");
    }
  };

  if (!user) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <CardContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Please sign in to join the chat</p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
      <CardHeader className="py-4 px-6 border-b bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">Local storage chat</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-100/80 dark:bg-green-900/40 rounded-full">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {onlineUsers} online
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length > 0 ? (
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatMessage
                      message={msg.message}
                      userName={msg.user_name}
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
                <p className="text-lg font-medium text-muted-foreground mb-2">Start the conversation!</p>
                <p className="text-sm text-muted-foreground">Be the first to share your thoughts.</p>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white dark:bg-gray-800"
                maxLength={500}
              />
              <Button 
                type="submit" 
                disabled={!message.trim()}
                className="px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3" />
                <span>Local storage • Press Enter to send</span>
              </div>
              <span>{message.length}/500</span>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
