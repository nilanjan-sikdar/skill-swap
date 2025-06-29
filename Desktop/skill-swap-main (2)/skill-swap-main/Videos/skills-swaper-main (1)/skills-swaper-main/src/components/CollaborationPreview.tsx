
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CollaborationPreview = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main collaboration interface */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">React Fundamentals</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              Live Session
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 rounded-lg p-3">
                <p className="text-sm">Just completed the useState hook exercise! 🎉</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">SM</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 rounded-lg p-3">
                <p className="text-sm">Great work! Can you help me with the useEffect part?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">DR</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/20">
                <p className="text-sm">I'm sharing my screen to walk through the component lifecycle...</p>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Screen sharing</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex -space-x-2">
              <Avatar className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">AJ</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="bg-green-100 text-green-700 text-xs">DR</AvatarFallback>
              </Avatar>
              <div className="w-6 h-6 border-2 border-background bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+3</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">6 people learning together</span>
          </div>
        </div>
      </Card>
      
      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full glow-purple animate-float opacity-60"></div>
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full glow-blue animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};
