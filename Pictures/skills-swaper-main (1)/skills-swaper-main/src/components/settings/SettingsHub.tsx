
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileInfo } from "./ProfileInfo";
import { ConnectedAccounts } from "./ConnectedAccounts";
import { SkillTags } from "./SkillTags";
import { ProfilePreview } from "./ProfilePreview";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { motion } from "framer-motion";

export const SettingsHub = () => {
  return (
    <ProfileProvider>
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger 
                  value="profile" 
                  className="transition-all duration-200 data-[state=active]:scale-105"
                >
                  Profile Info
                </TabsTrigger>
                <TabsTrigger 
                  value="accounts"
                  className="transition-all duration-200 data-[state=active]:scale-105"
                >
                  Connected Accounts
                </TabsTrigger>
                <TabsTrigger 
                  value="skills"
                  className="transition-all duration-200 data-[state=active]:scale-105"
                >
                  Skill Tags
                </TabsTrigger>
              </TabsList>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="profile" className="space-y-6">
                  <ProfileInfo />
                </TabsContent>

                <TabsContent value="accounts" className="space-y-6">
                  <ConnectedAccounts />
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <SkillTags />
                </TabsContent>
              </motion.div>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
};
