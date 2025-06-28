
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardTable } from "./LeaderboardTable";
import { Trophy, Calendar, Clock, Star } from "lucide-react";
import { TestChallengeButton } from "../dashboard/TestChallengeButton";

export const LeaderboardHub = () => {
  const [activeTab, setActiveTab] = useState("all-time");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Challenge Leaderboard
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Track your challenge progress and compete with others!
        </p>
        
        {/* Test Button for Demo */}
        <div className="flex justify-center">
          <TestChallengeButton />
        </div>
      </div>

      {/* Tabs for different time periods */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="all-time" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            All Time
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <LeaderboardTable period="daily" />
        </TabsContent>
        
        <TabsContent value="weekly">
          <LeaderboardTable period="weekly" />
        </TabsContent>
        
        <TabsContent value="all-time">
          <LeaderboardTable period="all-time" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
