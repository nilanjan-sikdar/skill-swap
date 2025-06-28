
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "TechFlow",
    content: "SkillSync transformed how our engineering team learns new technologies. The collaborative sessions are incredibly engaging, and the AI recommendations help us stay ahead of industry trends.",
    avatar: "SC",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Marcus Rodriguez",
    role: "Learning & Development Lead",
    company: "InnovateCorp",
    content: "We've seen a 300% increase in course completion rates since switching to SkillSync. The real-time collaboration features make learning feel social and fun again.",
    avatar: "MR",
    rating: 5,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Emily Zhang",
    role: "Product Designer",
    company: "DesignLab",
    content: "The interactive workshops and peer learning sessions have accelerated our team's growth tremendously. SkillSync makes complex topics accessible and engaging.",
    avatar: "EZ",
    rating: 5,
    gradient: "from-green-500 to-teal-500"
  },
  {
    name: "David Kim",
    role: "Senior Developer",
    company: "CodeCraft",
    content: "The AI-powered challenges adapt perfectly to my skill level. I've learned more in 3 months with SkillSync than I did in the previous year using other platforms.",
    avatar: "DK",
    rating: 5,
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Lisa Thompson",
    role: "UX Research Lead",
    company: "UserFirst",
    content: "The collaboration tools are game-changing. Working with team members in real-time while learning has improved both our skills and team cohesion dramatically.",
    avatar: "LT",
    rating: 5,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    name: "Alex Rivera",
    role: "Tech Lead",
    company: "StartupLab",
    content: "SkillSync's leaderboard and achievement system keeps our entire team motivated. It's turned professional development into an exciting competition.",
    avatar: "AR",
    rating: 5,
    gradient: "from-pink-500 to-rose-500"
  },
];

export const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-purple-50/20 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-purple-900/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6"
          >
            <Quote className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by teams{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Join thousands of organizations already transforming their learning culture with SkillSync.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
              className="group perspective-1000"
            >
              <Card className="h-full relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glowing background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardContent className="p-6 relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.1 * i, 
                          type: "spring" as const, 
                          stiffness: 200 
                        }}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground mb-6 leading-relaxed flex-1 italic"
                  >
                    "{testimonial.content}"
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-md opacity-50`}
                      />
                      <Avatar className="relative">
                        <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white font-semibold`}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Join 10,000+ happy learners today
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
