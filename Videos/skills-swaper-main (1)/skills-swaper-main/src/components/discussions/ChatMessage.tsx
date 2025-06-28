
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  userName: string;
  timestamp: string;
  isOwnMessage: boolean;
}

export const ChatMessage = ({ message, userName, timestamp, isOwnMessage }: ChatMessageProps) => {
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className={cn(
      "flex gap-3 max-w-[85%] animate-in slide-in-from-bottom-1 duration-200",
      isOwnMessage ? "ml-auto flex-row-reverse" : ""
    )}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={cn(
          "text-xs font-medium",
          isOwnMessage 
            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white" 
            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200"
        )}>
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col gap-1 min-w-0",
        isOwnMessage ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {!isOwnMessage && <span className="font-medium text-foreground">{userName}</span>}
          <span>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
        </div>
        
        <div className={cn(
          "rounded-2xl px-4 py-3 max-w-full break-words shadow-sm border",
          isOwnMessage 
            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-md border-blue-200" 
            : "bg-white dark:bg-gray-800 text-foreground rounded-bl-md border-gray-200 dark:border-gray-700"
        )}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};
