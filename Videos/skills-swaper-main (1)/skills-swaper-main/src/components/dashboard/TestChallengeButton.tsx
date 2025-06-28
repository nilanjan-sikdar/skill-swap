
import { Button } from "@/components/ui/button";
import { useChallengeTracking } from "@/hooks/useChallengeTracking";
import { Trophy } from "lucide-react";
import { toast } from "sonner";

export const TestChallengeButton = () => {
  const { completeChallenge } = useChallengeTracking();

  const simulateChallenge = () => {
    const challenges = [
      {
        challengeName: "React Component Challenge",
        score: Math.floor(Math.random() * 40) + 60,
        difficulty: "medium" as const,
        skills: ["React", "TypeScript"],
        xpEarned: 150,
        badge: {
          name: "React Master",
          color: "#3b82f6",
          type: "coding"
        }
      },
      {
        challengeName: "Algorithm Optimization",
        score: Math.floor(Math.random() * 30) + 70,
        difficulty: "hard" as const,
        skills: ["Algorithms", "Problem Solving"],
        xpEarned: 200,
        badge: {
          name: "Problem Solver",
          color: "#8b5cf6",
          type: "algorithm"
        }
      },
      {
        challengeName: "CSS Grid Layout",
        score: Math.floor(Math.random() * 35) + 65,
        difficulty: "easy" as const,
        skills: ["CSS", "Design"],
        xpEarned: 100,
        badge: {
          name: "Design Pro",
          color: "#10b981",
          type: "design"
        }
      }
    ];

    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    completeChallenge(randomChallenge);
    
    toast.success(`Challenge completed! Earned ${randomChallenge.xpEarned} XP`, {
      description: `${randomChallenge.challengeName} - ${randomChallenge.score}% score`
    });
  };

  return (
    <Button onClick={simulateChallenge} className="flex items-center gap-2">
      <Trophy className="h-4 w-4" />
      Test Challenge Completion
    </Button>
  );
};
