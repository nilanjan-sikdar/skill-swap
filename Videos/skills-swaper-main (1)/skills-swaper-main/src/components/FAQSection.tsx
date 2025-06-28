
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes SkillSync different from other learning platforms?",
    answer: "SkillSync focuses on real-time collaboration and social learning. Unlike traditional platforms where you learn alone, SkillSync enables teams to learn together through synchronized sessions, live discussions, and collaborative exercises. Our AI-powered recommendations and progress tracking ensure personalized learning paths while maintaining team cohesion.",
  },
  {
    question: "How does the real-time collaboration work?",
    answer: "Our platform enables live screen sharing, synchronized code editing, interactive whiteboards, and real-time chat. Multiple learners can participate in the same session, work on exercises together, and get immediate feedback from instructors and peers. Everything happens in your browser with no additional software required.",
  },
  {
    question: "Can I integrate SkillSync with our existing tools?",
    answer: "Yes! SkillSync integrates seamlessly with popular tools like Slack, Microsoft Teams, GitHub, Jira, and most SSO providers. We also offer robust APIs for custom integrations and can work with your IT team to ensure smooth deployment in your existing infrastructure.",
  },
  {
    question: "What kind of content and courses are available?",
    answer: "We offer comprehensive courses in software development, data science, design, product management, and leadership skills. Content ranges from beginner to expert level, with new courses added monthly. You can also create custom learning paths and upload your own content for internal training programs.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer: "Security is our top priority. We use bank-level encryption, maintain SOC 2 compliance, and offer enterprise features like SSO, role-based access control, and private cloud deployment. All data is encrypted in transit and at rest, and we never share your learning data with third parties.",
  },
  {
    question: "What support options are available?",
    answer: "We provide 24/7 customer support via chat and email, comprehensive documentation, video tutorials, and dedicated customer success managers for enterprise clients. We also offer onboarding assistance and training sessions to help your team get started quickly.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to common questions about SkillSync and how it can transform your team's learning experience.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-lg">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
