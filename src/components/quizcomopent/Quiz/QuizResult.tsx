"use client";

import { Button } from "@/components/quizcomopent/Quiz/ui/button";
import { Card } from "@/components/quizcomopent/Quiz/ui/card";
import { IScoreband } from "@/libs/types/scoreband.interface";
import { IUserQuizResult } from "@/libs/types/userquiz.interface";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface QuizResultProps {
  userAnswers: IUserQuizResult[];
  totalPoints: number;
  scoreband: IScoreband | null;
  onRestart: () => void;
}

const QuizResult = ({
  userAnswers,
  totalPoints,
  scoreband,
  onRestart,
}: QuizResultProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Results
          </h2>
          <p className="text-gray-600">
            Based on your answers, we&apos;ve analyzed your skin type
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">{totalPoints}</span>
          </div>
          <p className="text-gray-600">Total Points</p>
        </div>

        {scoreband ? (
          <div className="bg-purple-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">
              {scoreband.typeOfSkin}
            </h3>
            <p className="text-gray-700">{scoreband.skinExplanation}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                Score Range: {scoreband.minPoint} - {scoreband.maxPoint} points
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No matching skin type found
            </h3>
            <p className="text-gray-700">
              We couldn&apos;t determine your skin type based on your answers.
              Please try again or consult with a specialist.
            </p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Answers
          </h3>
          <div className="space-y-3">
            {userAnswers.map((result, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4"
              >
                <h4 className="font-medium text-gray-800 mb-2">
                  {result.title}
                </h4>
                <div className="flex justify-between">
                  <span className="text-gray-600">{result.answer}</span>
                  <span className="text-purple-600 font-medium">
                    {result.point} point{result.point !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Restart Quiz
          </Button>
          <Button
            onClick={() => router.push("/quizHistory")}
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-50"
          >
            View Quiz History
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuizResult;
