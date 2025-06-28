
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { localStorageUtils } from "@/utils/localStorageUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface CreateDiscussionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateDiscussion = ({ open, onOpenChange }: CreateDiscussionProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const createDiscussionMutation = useMutation({
    mutationFn: async (discussionData: { title: string; content: string; tags: string[] }) => {
      if (!user) throw new Error("Not authenticated");

      // Try to save to Supabase first
      try {
        const { data, error } = await supabase
          .from("discussions")
          .insert({
            title: discussionData.title,
            content: discussionData.content,
            tags: discussionData.tags,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;
        return { source: 'supabase', data };
      } catch (error) {
        console.log('Supabase failed, saving to localStorage:', error);
        
        // Fall back to localStorage
        const localDiscussion = localStorageUtils.saveDiscussion({
          title: discussionData.title,
          content: discussionData.content,
          tags: discussionData.tags,
          user_id: user.id,
          profiles: {
            name: user.email?.split('@')[0] || "Local User",
            user_id: user.id
          }
        });
        
        return { source: 'localStorage', data: localDiscussion };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      setTitle("");
      setContent("");
      setTags([]);
      onOpenChange(false);
      
      if (result.source === 'localStorage') {
        toast.success("Discussion created locally!");
      } else {
        toast.success("Discussion created successfully!");
      }
    },
    onError: (error) => {
      console.error('Error creating discussion:', error);
      toast.error("Failed to create discussion");
    },
  });

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    createDiscussionMutation.mutate({ title, content, tags });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-gray-900/95 dark:to-blue-950/95 backdrop-blur-xl border border-white/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-blue-500" />
            </motion.div>
            Start a New Discussion
          </DialogTitle>
        </DialogHeader>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Discussion Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              className="bg-white/80 dark:bg-gray-800/80 border-white/30 backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, questions, or ideas..."
              className="min-h-[120px] bg-white/80 dark:bg-gray-800/80 border-white/30 backdrop-blur-sm resize-none"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Tags (Optional)</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 bg-white/80 dark:bg-gray-800/80 border-white/30 backdrop-blur-sm"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/30 backdrop-blur-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createDiscussionMutation.isPending}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              {createDiscussionMutation.isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Create Discussion"
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
