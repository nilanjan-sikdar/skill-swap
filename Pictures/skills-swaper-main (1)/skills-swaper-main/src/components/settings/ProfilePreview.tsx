
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/contexts/ProfileContext";
import { motion } from "framer-motion";
import { MapPin, Globe, Github, Eye } from "lucide-react";

export const ProfilePreview = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();

  const mockProfile = {
    totalXP: 2350,
    level: 3,
    joinedDate: "March 2024"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-6"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg">Profile Preview</CardTitle>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
          <CardDescription>How others will see your profile</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Avatar and Basic Info */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <Avatar className="h-20 w-20 mx-auto mb-3 ring-4 ring-white shadow-lg">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-bold">{mockProfile.level}</span>
              </div>
            </motion.div>
            
            <h3 className="font-bold text-lg">{profileData.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{profileData.bio}</p>
            
            <div className="flex items-center justify-center text-xs text-muted-foreground mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                {mockProfile.totalXP} XP
              </span>
              <span className="mx-2">•</span>
              <span>Joined {mockProfile.joinedDate}</span>
            </div>
          </div>

          {/* Location and Website */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary hover:underline cursor-pointer">
                {profileData.website}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Github className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary hover:underline cursor-pointer">
                @johndoe
              </span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {profileData.skills.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 border-blue-200"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">15</div>
              <div className="text-xs text-muted-foreground">Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">Collaborations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
