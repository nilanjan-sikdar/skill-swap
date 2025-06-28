
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DiscussionHeader } from "./DiscussionHeader";
import { DiscussionChat } from "./DiscussionChat";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface DiscussionDetailViewProps {
  discussionId: string;
}

export const DiscussionDetailView = ({ discussionId }: DiscussionDetailViewProps) => {
  const { data: discussion, isLoading, error } = useQuery({
    queryKey: ["discussion", discussionId],
    queryFn: async () => {
      console.log('Fetching discussion details for:', discussionId);
      
      const { data, error } = await supabase
        .from("discussions")
        .select(`
          *,
          profiles!discussions_user_id_fkey(name),
          user_karma!left(total_xp, mentor_rating)
        `)
        .eq("id", discussionId)
        .single();

      if (error) {
        console.error('Error fetching discussion:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!discussionId
  });

  if (isLoading) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Card className="mx-6 mt-6">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
        </Card>
        <div className="flex-1 p-6">
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !discussion) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-2">Failed to load discussion</p>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 pb-3">
        <DiscussionHeader discussion={discussion} />
      </div>
      <div className="flex-1 overflow-hidden px-6 pb-6">
        <DiscussionChat discussionId={discussionId} />
      </div>
    </div>
  );
};
