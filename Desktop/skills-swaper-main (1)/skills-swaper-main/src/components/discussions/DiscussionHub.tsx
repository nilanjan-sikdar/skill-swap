
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { DiscussionList } from "./DiscussionList";
import { CreateDiscussion } from "./CreateDiscussion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MessageCircle, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { ChatForm } from "./ChatForm";

export const DiscussionHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string | null>(null);
  const [selectedDiscussionTitle, setSelectedDiscussionTitle] = useState<string>("");
  const [showChatForm, setShowChatForm] = useState(false);

  const handleDiscussionSelect = (id: string, title: string) => {
    setSelectedDiscussionId(id);
    setSelectedDiscussionTitle(title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white/50 to-blue-50/80 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-blue-900/30 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/25 dark:from-blue-500/30 dark:to-purple-700/35 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/15 to-pink-600/20 dark:from-purple-500/25 dark:to-pink-700/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center"
        >
          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-4"
            >
              Live Discussions
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                💬
              </motion.div>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground flex items-center gap-2"
            >
              <Zap className="h-5 w-5 text-yellow-500" />
              Local storage chat with persistent messages
            </motion.p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setShowChatForm(!showChatForm)} 
                variant={showChatForm ? "default" : "outline"}
                className="flex items-center gap-2 font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                {showChatForm ? "Hide Chat" : "Open Chat"}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setShowCreateDialog(true)} 
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg"
              >
                <Plus className="h-6 w-6" />
                New Discussion
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Chat Form Section */}
        <AnimatePresence>
          {showChatForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="max-w-4xl mx-auto">
                <ChatForm 
                  discussionId="general-chat" 
                  title="General Discussion Chat" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Discussion List */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Enhanced Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="sm:w-80">
                <TagFilter selectedTags={selectedTags} onTagsChange={setSelectedTags} />
              </div>
            </div>

            {/* Discussion List */}
            <DiscussionList 
              searchQuery={searchQuery} 
              selectedTags={selectedTags}
              onDiscussionSelect={handleDiscussionSelect}
              selectedDiscussionId={selectedDiscussionId}
            />
          </motion.div>

          {/* Right Column - Enhanced Chat Display */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="h-[750px] flex flex-col backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/30 shadow-2xl shadow-blue-500/20 dark:shadow-purple-500/20 rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/60 dark:to-purple-950/60 border-b border-white/20 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity },
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </motion.div>
                  Local Storage Chat
                  {selectedDiscussionTitle && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      • {selectedDiscussionTitle}
                    </span>
                  )}
                  <div className="flex items-center gap-2 ml-auto px-4 py-2 bg-blue-100/80 dark:bg-blue-900/40 rounded-full backdrop-blur-sm">
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">LOCAL</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                {selectedDiscussionId ? (
                  <div className="h-full flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-center space-y-6"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -15, 0],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <MessageCircle className="h-20 w-20 text-muted-foreground/30 mx-auto" />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-lg text-muted-foreground mb-3">Discussion selected: {selectedDiscussionTitle}</p>
                        <p className="text-sm text-muted-foreground/70">Use the main chat above for general conversations</p>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                      >
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Persistent local storage</span>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-center space-y-6"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -15, 0],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <MessageCircle className="h-20 w-20 text-muted-foreground/30 mx-auto" />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-lg text-muted-foreground mb-3">Select a discussion or use the chat above</p>
                        <p className="text-sm text-muted-foreground/70">Choose any topic from the list or start chatting in the general chat</p>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                      >
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Persistent local storage</span>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Create Discussion Dialog */}
        <CreateDiscussion 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </div>
  );
};
