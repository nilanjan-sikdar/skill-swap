
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, MessageCircle, Star, Pin, Users } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DiscussionCardProps {
  discussion: any;
  onSelect?: (discussionId: string) => void;
  isSelected?: boolean;
}

export const DiscussionCard = ({ discussion, onSelect, isSelected }: DiscussionCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(discussion.upvotes || 0);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please sign in to vote");
      return;
    }

    try {
      if (isUpvoted) {
        await supabase
          .from("votes")
          .delete()
          .eq("user_id", user.id)
          .eq("discussion_id", discussion.id);
        
        await supabase
          .from("discussions")
          .update({ upvotes: upvotes - 1 })
          .eq("id", discussion.id);

        setUpvotes(prev => prev - 1);
        setIsUpvoted(false);
      } else {
        await supabase
          .from("votes")
          .insert({
            user_id: user.id,
            discussion_id: discussion.id,
            vote_type: "upvote"
          });

        await supabase
          .from("discussions")
          .update({ upvotes: upvotes + 1 })
          .eq("id", discussion.id);

        setUpvotes(prev => prev + 1);
        setIsUpvoted(true);
      }
    } catch (error) {
      toast.error("Failed to vote");
    }
  };

  const handleDiscussionClick = () => {
    if (onSelect) {
      onSelect(discussion.id);
    } else {
      navigate(`/discussions/${discussion.id}`);
    }
  };

  const mentorRating = discussion.user_karma?.[0]?.mentor_rating || 0;
  const totalXP = discussion.user_karma?.[0]?.total_xp || 0;

  return (
    <Card 
      className={cn(
        "p-6 hover:shadow-md transition-all cursor-pointer border-2",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-transparent hover:border-primary/20"
      )} 
      onClick={handleDiscussionClick}
    >
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <Button
            variant={isUpvoted ? "default" : "outline"}
            size="sm"
            onClick={handleUpvote}
            className="p-2"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{upvotes}</span>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {discussion.is_pinned && (
                  <Pin className="h-4 w-4 text-primary" />
                )}
                <h3 className={cn(
                  "text-lg font-semibold transition-colors",
                  isSelected ? "text-primary" : "hover:text-primary"
                )}>
                  {discussion.title}
                </h3>
                {onSelect && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="ml-auto flex items-center gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/discussions/${discussion.id}`);
                    }}
                  >
                    <Users className="h-3 w-3" />
                    Full View
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground line-clamp-2 mb-3">
                {discussion.content}
              </p>
            </div>
          </div>

          {/* Tags */}
          {discussion.tags && discussion.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium">{discussion.profiles?.name || "Anonymous"}</span>
                {mentorRating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{mentorRating.toFixed(1)}</span>
                  </div>
                )}
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  {totalXP} XP
                </Badge>
              </div>
              <span>
                {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{discussion.reply_count || 0} replies</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>{discussion.message_count || 0} live messages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
