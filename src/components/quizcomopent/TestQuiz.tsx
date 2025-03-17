"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchQuestions,
  fetchScoreband,
  submitQuizResults,
  checkAuth,
} from "@/libs/context/api";
import { IQuestion } from "@/libs/types/question.interface";
import { IScoreband } from "@/libs/types/scoreband.interface";
import { IUserQuizResult } from "@/libs/types/userquiz.interface";
import QuizQuestion from "@/components/quizcomopent/Quiz/QuizQuestion";
import QuizProgress from "@/components/quizcomopent/Quiz/QuizProgress";
import QuizResult from "@/components/quizcomopent/Quiz/QuizResult";
import { Button } from "@/components/quizcomopent/Quiz/ui/button";
import { useToast } from "@/components/quizcomopent/Quiz/ui/use-toast";
import { motion } from "framer-motion";

const TestQuiz = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IUserQuizResult[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scoreband, setScoreband] = useState<IScoreband | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check authentication when component mounts
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          toast({
            title: "Authentication Required",
            description: "Please login to access the quiz.",
            variant: "destructive",
          });
          router.push("/login"); // Redirect to login page
          return;
        }
        // If authenticated, load questions
        loadQuestions();
      } catch (error) {
        console.error("Auth check failed:", error);
        toast({
          title: "Authentication Error",
          description: "Please try logging in again.",
          variant: "destructive",
        });
        router.push("/login");
      }
    };

    verifyAuth();
  }, []); // Empty dependency array to run once on mount

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching questions..."); // Debug log
      const data = await fetchQuestions();
      console.log("Questions fetched successfully:", data.length); // Debug log
      setQuestions(data);
    } catch (error) {
      console.error("Error loading questions:", error);
      setError("Failed to load quiz questions. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (
    questionTitle: string,
    answerTitle: string,
    points: number
  ) => {
    const newAnswer: IUserQuizResult = {
      title: questionTitle,
      answer: answerTitle,
      point: points,
    };

    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.title === questionTitle
    );

    let updatedAnswers;
    if (existingAnswerIndex >= 0) {
      updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers = [...userAnswers, newAnswer];
    }

    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const hasAnswered = userAnswers.some(
      (answer) => answer.title === currentQuestion.title
    );

    if (!hasAnswered) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer before continuing.",
        variant: "default",
      });
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = async () => {
    const calculatedTotal = userAnswers.reduce(
      (sum, answer) => sum + answer.point,
      0
    );
    setTotalPoints(calculatedTotal);
    setIsSubmitting(true);
    setError(null);

    try {
      // Log initial state
      console.log("Starting quiz submission with:", {
        totalPoints: calculatedTotal,
        answers: userAnswers,
      });

      // 1. Fetch scoreband
      console.log("Fetching scoreband for points:", calculatedTotal);
      const scorebandResult = await fetchScoreband(calculatedTotal);
      console.log("Received scoreband:", scorebandResult);

      if (!scorebandResult) {
        throw new Error("Không tìm thấy kết quả phù hợp với điểm số của bạn.");
      }

      if (!scorebandResult._id) {
        console.error("Invalid scoreband result:", scorebandResult);
        throw new Error("Scoreband không hợp lệ - thiếu ID.");
      }

      setScoreband(scorebandResult);

      // 2. Submit results
      console.log("Submitting quiz results with:", {
        accountId: "65e5f6e6c2f2b6001c9a1234",
        scoreBandId: scorebandResult._id,
        result: userAnswers.map((answer) => ({
          title: answer.title,
          answer: answer.answer,
          point: answer.point,
        })),
        totalPoint: calculatedTotal,
      });

      const submitResult = await submitQuizResults(
        "65e5f6e6c2f2b6001c9a1234",
        userAnswers,
        calculatedTotal,
        scorebandResult._id
      );

      console.log("Quiz submission successful:", submitResult);

      toast({
        title: "Success",
        description: "Quiz completed successfully!",
      });

      setQuizCompleted(true);
    } catch (error) {
      console.error("Error completing quiz:", {
        error,
        type: error instanceof Error ? "Error" : typeof error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        state: {
          totalPoints: calculatedTotal,
          answers: userAnswers,
          scoreband: scoreband,
        },
      });

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process quiz results. Please try again.";

      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTotalPoints(0);
    setQuizCompleted(false);
    setScoreband(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={loadQuestions}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <QuizResult
          userAnswers={userAnswers}
          totalPoints={totalPoints}
          scoreband={scoreband}
          onRestart={restartQuiz}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Skin Type Quiz
          </h1>
          <p className="text-gray-600">
            Answer the following questions to determine your skin type
          </p>
        </motion.div>

        <QuizProgress
          currentStep={currentQuestionIndex}
          totalSteps={questions.length}
        />

        <div className="relative mb-8 min-h-[240px]">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className={index === currentQuestionIndex ? "block" : "hidden"}
            >
              <QuizQuestion
                question={question}
                onAnswer={handleAnswer}
                isActive={index === currentQuestionIndex}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="px-6"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 px-6"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Processing</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
              </>
            ) : currentQuestionIndex === questions.length - 1 ? (
              "Complete Quiz"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestQuiz;
