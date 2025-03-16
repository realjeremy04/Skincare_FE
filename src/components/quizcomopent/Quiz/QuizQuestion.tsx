import { useState } from "react";
import { IQuestion } from "@/libs/types/question.interface";
import { cn } from "@/libs/utils/cn";
import { motion } from "framer-motion";

interface QuizQuestionProps {
  question: IQuestion;
  onAnswer: (
    questionTitle: string,
    answerTitle: string,
    points: number
  ) => void;
  isActive: boolean;
}

const QuizQuestion = ({ question, onAnswer, isActive }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelectAnswer = (answerTitle: string, points: number) => {
    setSelectedAnswer(answerTitle);
    onAnswer(question.title, answerTitle, points);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full p-6 bg-white rounded-lg shadow-md",
        !isActive && "absolute top-0 left-0 pointer-events-none"
      )}
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {question.title}
      </h2>
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(answer.title, answer.point)}
            className={cn(
              "w-full p-4 text-left rounded-md transition-all duration-200 border",
              selectedAnswer === answer.title
                ? "border-purple-500 bg-purple-50 text-purple-800"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{answer.title}</span>
              <span className="text-sm font-normal text-gray-500">
                {answer.point} point{answer.point !== 1 ? "s" : ""}
              </span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizQuestion;
