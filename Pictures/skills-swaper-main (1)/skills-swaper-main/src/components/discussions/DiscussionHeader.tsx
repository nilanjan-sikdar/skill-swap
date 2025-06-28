
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Star, Pin, MessageCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DiscussionHeaderProps {
  discussion: any;
}

export const DiscussionHeader = ({ discussion }: DiscussionHeaderProps) => {
  const mentorRating = discussion.user_karma?.[0]?.mentor_rating || 0;
  const totalXP = discussion.user_karma?.[0]?.total_xp || 0;

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-800 dark:to-purple-950/30 border-none shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            {discussion.is_pinned && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Pin className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Pinned</span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                {discussion.title}
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                {discussion.content}
              </p>
            </div>
          </div>

          {/* Tags */}
          {discussion.tags && discussion.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map((tag: string) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats and Author Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  {(discussion.profiles?.name || "A").charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{discussion.profiles?.name || "Anonymous"}</span>
                  <span className="text-xs">
                    {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              {mentorRating > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                    {mentorRating.toFixed(1)}
                  </span>
                </div>
              )}
              
              <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {totalXP} XP
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{discussion.message_count || 0} messages</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
