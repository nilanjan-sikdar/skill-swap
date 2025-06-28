
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Tag } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useToast } from "@/hooks/use-toast";

const predefinedSkills = [
  "React", "TypeScript", "Node.js", "Python", "JavaScript", "CSS", "HTML",
  "Vue.js", "Angular", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS",
  "GraphQL", "REST APIs", "Git", "Figma", "UI/UX Design", "Machine Learning"
];

export const SkillTags = () => {
  const { profileData, updateProfileData } = useProfile();
  const { toast } = useToast();
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      const updatedSkills = [...profileData.skills, skill];
      updateProfileData({ skills: updatedSkills });
      setNewSkill("");
      toast({
        title: "Skill Added",
        description: `${skill} has been added to your skills.`,
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = profileData.skills.filter(skill => skill !== skillToRemove);
    updateProfileData({ skills: updatedSkills });
    toast({
      title: "Skill Removed",
      description: `${skillToRemove} has been removed from your skills.`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  const availableSkills = predefinedSkills.filter(skill => !profileData.skills.includes(skill));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Current Skills */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Your Skills ({profileData.skills.length})
          </CardTitle>
          <CardDescription>
            Showcase your expertise and skills to other members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 min-h-[60px]">
            <AnimatePresence>
              {profileData.skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  layout
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 border-blue-200 px-3 py-1 text-sm"
                  >
                    {skill}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Add New Skill */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>
            Type a skill name or select from popular options below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => addSkill(newSkill)} disabled={!newSkill}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </motion.div>
          </div>

          {/* Popular Skills */}
          {availableSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">Popular Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {availableSkills.slice(0, 12).map((skill) => (
                  <motion.button
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addSkill(skill)}
                    className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full transition-colors border border-border hover:border-primary/30"
                  >
                    + {skill}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
