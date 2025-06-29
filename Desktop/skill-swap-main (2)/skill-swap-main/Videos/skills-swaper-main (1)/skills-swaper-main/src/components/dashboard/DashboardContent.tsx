
import { motion } from "framer-motion";
import { CollaborationPreview } from "./CollaborationPreview";
import { ChallengesPreview } from "./ChallengesPreview";
import { SkillBadges } from "./SkillBadges";
import { BadgeShowcase } from "./BadgeShowcase";
import { WelcomeBadge } from "./WelcomeBadge";
import { Button } from "@/components/ui/button";
import { Users, Code, Trophy, Zap, Sparkles, Star, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardContent = () => {
  const navigate = useNavigate();

  const handleCodeTogether = () => {
    navigate('/collaboration');
  };

  const handleChallenges = () => {
    navigate('/challenges');
  };

  const handleDiscussions = () => {
    navigate('/discussions');
  };

  return (
    <div className="p-8 space-y-8 relative">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 text-6xl opacity-10"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 left-20 text-5xl opacity-10"
        >
          🚀
        </motion.div>
      </div>

      <WelcomeBadge />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-blue-500/10">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3"
              >
                Welcome back, Champion! 
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯
                </motion.div>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-300 flex items-center gap-2"
              >
                Ready to conquer new coding challenges today?
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </motion.div>
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleDiscussions}
                  variant="outline"
                  className="border-2 border-green-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-green-700 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Discussions
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleChallenges}
                  variant="outline"
                  className="border-2 border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 hover:border-orange-300 text-orange-700 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  Take Challenge
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleCodeTogether}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0"
                >
                  <Code className="mr-2 h-5 w-5" />
                  Code Together
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -5, rotate: 0.5 }}
          className="transform-gpu"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative">
              <BadgeShowcase />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -5, rotate: -0.5 }}
          className="transform-gpu"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative">
              <CollaborationPreview />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
        <div className="relative">
          <SkillBadges />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ y: -3 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
        <div className="relative">
          <ChallengesPreview />
        </div>
      </motion.div>
    </div>
  );
};
