
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DiscussionCard } from "./DiscussionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { localStorageUtils } from "@/utils/localStorageUtils";
import { useAuth } from "@/hooks/useAuth";

interface DiscussionListProps {
  searchQuery: string;
  selectedTags: string[];
  onDiscussionSelect: (id: string, title: string) => void;
  selectedDiscussionId: string | null;
}

export const DiscussionList = ({ 
  searchQuery, 
  selectedTags, 
  onDiscussionSelect, 
  selectedDiscussionId 
}: DiscussionListProps) => {
  const { user } = useAuth();

  const { data: discussions, isLoading, error } = useQuery({
    queryKey: ["discussions", searchQuery, selectedTags],
    queryFn: async () => {
      console.log('Fetching discussions with search:', searchQuery, 'tags:', selectedTags);
      
      // Try to fetch from Supabase first
      try {
        let query = supabase
          .from("discussions")
          .select(`
            *,
            profiles!discussions_user_id_fkey(name, user_id)
          `)
          .order("created_at", { ascending: false });

        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }

        if (selectedTags.length > 0) {
          query = query.overlaps('tags', selectedTags);
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Supabase error, falling back to localStorage:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          return data;
        }
        
        // If no data from Supabase, fall back to localStorage
        throw new Error('No data from Supabase, using localStorage');
        
      } catch (error) {
        console.log('Using localStorage for discussions');
        
        // Fall back to localStorage
        const localDiscussions = localStorageUtils.searchDiscussions(searchQuery, selectedTags);
        
        // Add current user as profiles data for localStorage discussions
        return localDiscussions.map(discussion => ({
          ...discussion,
          profiles: discussion.profiles || {
            name: user?.email?.split('@')[0] || "Local User",
            user_id: discussion.user_id
          }
        }));
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && (!discussions || discussions.length === 0)) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">💾</div>
        <p className="text-lg font-medium text-blue-600 mb-2">Using Local Storage</p>
        <p className="text-sm text-muted-foreground">Data is stored locally on your device. Create discussions to get started!</p>
      </motion.div>
    );
  }

  if (!discussions || discussions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💭
        </motion.div>
        <p className="text-lg font-medium text-muted-foreground mt-4">No discussions found</p>
        <p className="text-sm text-muted-foreground">Be the first to start a conversation!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {discussions.map((discussion, index) => (
        <motion.div
          key={discussion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <DiscussionCard
            discussion={discussion}
            onSelect={() => onDiscussionSelect(discussion.id, discussion.title)}
            isSelected={selectedDiscussionId === discussion.id}
          />
        </motion.div>
      ))}
    </div>
  );
};
