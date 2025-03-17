"use client";

import { Button } from "@/components/quizcomopent/Quiz/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Index = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStartQuiz = () => {
    router.push("/testQuizPage");
  };

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Skin Type Quiz
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover your unique skin type and get personalized recommendations
          for your skincare routine.
        </p>

        <Button
          onClick={handleStartQuiz}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6 px-8"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default Index;
