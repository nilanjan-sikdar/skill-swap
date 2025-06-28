
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Brain, BarChart3, MessageSquare, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Learn together with your team in synchronized sessions. Share screens, collaborate on code, and solve problems collectively.",
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Get personalized learning paths and intelligent recommendations that adapt to your progress and learning style.",
  },
  {
    icon: Zap,
    title: "Interactive Sessions",
    description: "Engage with hands-on exercises, live coding challenges, and interactive workshops designed for maximum retention.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your learning journey with detailed analytics, skill assessments, and performance insights.",
  },
  {
    icon: MessageSquare,
    title: "Smart Discussions",
    description: "Contextual chat, threaded discussions, and AI-moderated Q&A sessions keep conversations focused and productive.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SSO integration, role-based access control, and compliance with industry standards.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful features for{' '}
            <span className="gradient-text">modern teams</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create engaging, collaborative learning experiences 
            that drive real results for your organization.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
