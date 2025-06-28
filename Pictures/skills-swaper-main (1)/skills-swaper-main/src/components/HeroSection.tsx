
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { CollaborationPreview } from "./CollaborationPreview";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-violet-50/50 dark:from-purple-900/20 dark:via-blue-900/10 dark:to-violet-900/20"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 animate-fade-in">
              🚀 The future of collaborative learning is here
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Learn together,{' '}
            <span className="gradient-text">grow faster</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            SkillSync transforms how teams learn with real-time collaboration, 
            interactive sessions, and AI-powered insights. Experience learning 
            that adapts to your pace and amplifies your potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg glow-purple">
              Start Learning for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CollaborationPreview />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-glow"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-full blur-xl animate-glow" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};
