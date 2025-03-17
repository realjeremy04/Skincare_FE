"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/homeComponent/Header";
import { Footer } from "@/components/homeComponent/Footer";
import { Card } from "@/components/quizcomopent/Quiz/ui/card";
import { Button } from "@/components/quizcomopent/Quiz/ui/button";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/libs/context/api";

interface QuizResult {
  _id: string;
  accountId: string;
  scoreBandId: string;
  result: Array<{
    title: string;
    answer: string;
    point: number;
  }>;
  totalPoint: number;
  createdAt: string;
  updatedAt: string;
}

interface Scoreband {
  _id: string;
  typeOfSkin: string;
  skinExplanation: string;
  minPoint: number;
  maxPoint: number;
}

export default function QuizHistoryPage() {
  const [quizHistory, setQuizHistory] = useState<
    (QuizResult & { scorebandDetails?: Scoreband })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push("/login");
          return;
        }

        // Fetch user's quiz results
        const response = await fetch("http://localhost:8080/api/userQuiz", {
          credentials: "include", // This will send cookies automatically
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quiz history");
        }

        const quizData: QuizResult[] = await response.json();

        // Fetch scoreband details for each quiz result
        const quizWithScoreband = await Promise.all(
          quizData.map(async (quiz) => {
            try {
              const scorebandResponse = await fetch(
                `http://localhost:8080/api/scoreband/${quiz.scoreBandId}`,
                {
                  credentials: "include", // This will send cookies automatically
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (scorebandResponse.ok) {
                const scorebandData: Scoreband = await scorebandResponse.json();
                return { ...quiz, scorebandDetails: scorebandData };
              }
              return quiz;
            } catch (error) {
              console.error("Error fetching scoreband:", error);
              return quiz;
            }
          })
        );

        setQuizHistory(quizWithScoreband);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizHistory();
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-400">
          Your Quiz History
        </h1>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizHistory.map((result) => (
            <Card
              key={result._id}
              className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  {result.scorebandDetails?.typeOfSkin || "Loading..."}
                </h3>
                <p className="text-gray-600 text-sm">
                  Taken on: {formatDate(result.createdAt)}
                </p>
              </div>

              <div className="mb-4">
                <div className="bg-rose-50 p-3 rounded-lg border border-red-100">
                  <p className="text-red-400 font-medium">
                    Total Points: {result.totalPoint}
                  </p>
                  {result.scorebandDetails && (
                    <p className="text-sm text-gray-600">
                      Range: {result.scorebandDetails.minPoint} -{" "}
                      {result.scorebandDetails.maxPoint}
                    </p>
                  )}
                </div>
              </div>

              {result.scorebandDetails && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-400 mb-2">
                    Skin Analysis:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {result.scorebandDetails.skinExplanation}
                  </p>
                </div>
              )}

              <Button
                onClick={() => router.push(`/quizHistory/${result._id}`)}
                className="w-full bg-red-400 hover:bg-red-500 text-white transition-colors duration-300"
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {quizHistory.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No quiz history found.</p>
            <Button
              onClick={() => router.push("/testQuizPage")}
              className="bg-red-400 hover:bg-red-500 text-white transition-colors duration-300"
            >
              Take a Quiz
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
