
import React, { useState } from 'react';
import { ChallengeForm } from './ChallengeForm';
import { QuizComponent } from './QuizComponent';
import { QuizResults } from './QuizResults';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
}

type ChallengeStep = 'form' | 'quiz' | 'results';

export const EnhancedChallengeGenerator = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<ChallengeStep>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [challengeData, setChallengeData] = useState<{ name: string; skills: string[] } | null>(null);

  const generateQuestions = async (name: string, skills: string[]): Promise<Question[]> => {
    const prompt = `Generate exactly 10 multiple-choice questions based on these skills: ${skills.join(', ')}.

Requirements:
- Mix difficulty levels: 3 easy, 4 medium, 3 hard questions
- Each question should test practical knowledge
- Provide 4 options (A, B, C, D) for each question
- Clearly indicate the correct answer
- Cover different skills provided
- Make questions challenging but fair

Format your response as a JSON array with this structure:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "difficulty": "easy",
    "skill": "Python"
  }
]

Skills to focus on: ${skills.join(', ')}
Target difficulty distribution: 3 easy, 4 medium, 3 hard questions.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert technical interviewer. Generate challenging but fair multiple-choice questions. Always respond with valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Clean the response to ensure it's valid JSON
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      const parsedQuestions = JSON.parse(cleanedContent);
      
      return parsedQuestions;
    } catch (error) {
      console.error('Error generating questions:', error);
      
      // Fallback questions if API fails
      const fallbackQuestions: Question[] = [
        {
          id: 1,
          question: "What is the correct syntax for defining a function in Python?",
          options: ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"],
          correctAnswer: 1,
          difficulty: "easy" as const,
          skill: skills[0] || "Programming"
        },
        {
          id: 2,
          question: "Which HTML tag is used for the largest heading?",
          options: ["<h6>", "<h1>", "<head>", "<header>"],
          correctAnswer: 1,
          difficulty: "easy" as const,
          skill: skills.includes('HTML') ? 'HTML' : skills[0] || "Programming"
        },
        {
          id: 3,
          question: "What does CSS stand for?",
          options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
          correctAnswer: 2,
          difficulty: "easy" as const,
          skill: skills.includes('CSS') ? 'CSS' : skills[0] || "Programming"
        },
        {
          id: 4,
          question: "Which method is used to add an element to the end of an array in JavaScript?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: 0,
          difficulty: "medium" as const,
          skill: skills.includes('JavaScript') ? 'JavaScript' : skills[0] || "Programming"
        },
        {
          id: 5,
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correctAnswer: 1,
          difficulty: "medium" as const,
          skill: skills[0] || "Programming"
        },
        {
          id: 6,
          question: "In React, what is the purpose of useEffect hook?",
          options: ["To manage state", "To handle side effects", "To create components", "To style components"],
          correctAnswer: 1,
          difficulty: "medium" as const,
          skill: skills.includes('React') ? 'React' : skills[0] || "Programming"
        },
        {
          id: 7,
          question: "What is a closure in JavaScript?",
          options: ["A type of loop", "A function that has access to outer scope", "A way to close the browser", "A method to end execution"],
          correctAnswer: 1,
          difficulty: "medium" as const,
          skill: skills.includes('JavaScript') ? 'JavaScript' : skills[0] || "Programming"
        },
        {
          id: 8,
          question: "Which design pattern ensures a class has only one instance?",
          options: ["Factory", "Observer", "Singleton", "Strategy"],
          correctAnswer: 2,
          difficulty: "hard" as const,
          skill: skills[0] || "Programming"
        },
        {
          id: 9,
          question: "What is the difference between '==' and '===' in JavaScript?",
          options: ["No difference", "=== checks type and value, == only value", "== checks type and value, === only value", "=== is deprecated"],
          correctAnswer: 1,
          difficulty: "hard" as const,
          skill: skills.includes('JavaScript') ? 'JavaScript' : skills[0] || "Programming"
        },
        {
          id: 10,
          question: "In machine learning, what is overfitting?",
          options: ["Model performs well on training data but poorly on new data", "Model performs poorly on all data", "Model is too simple", "Model has too few parameters"],
          correctAnswer: 0,
          difficulty: "hard" as const,
          skill: skills.includes('Machine Learning') ? 'Machine Learning' : skills[0] || "Programming"
        }
      ];
      
      return fallbackQuestions;
    }
  };

  const handleFormSubmit = async (data: { name: string; skills: string[] }) => {
    setIsLoading(true);
    setChallengeData(data);
    
    try {
      const generatedQuestions = await generateQuestions(data.name, data.skills);
      setQuestions(generatedQuestions);
      setCurrentStep('quiz');
      toast.success('Questions generated successfully! Good luck!');
    } catch (error) {
      toast.error('Failed to generate questions. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (answers: number[], time: number) => {
    setUserAnswers(answers);
    setTimeSpent(time);
    setCurrentStep('results');
    
    const correctCount = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    const score = Math.round((correctCount / questions.length) * 100);
    
    toast.success(`Quiz completed! You scored ${score}%`);
  };

  const handleRetakeQuiz = () => {
    setCurrentStep('form');
    setQuestions([]);
    setUserAnswers([]);
    setTimeSpent(0);
    setChallengeData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/10 py-8 px-4">
      <div className="container mx-auto">
        {currentStep === 'form' && (
          <ChallengeForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 'quiz' && challengeData && (
          <QuizComponent
            questions={questions}
            onComplete={handleQuizComplete}
            userName={challengeData.name}
          />
        )}
        
        {currentStep === 'results' && challengeData && (
          <QuizResults
            questions={questions}
            userAnswers={userAnswers}
            timeSpent={timeSpent}
            userName={challengeData.name}
            onRetakeQuiz={handleRetakeQuiz}
          />
        )}
      </div>
    </div>
  );
};
