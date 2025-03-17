"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/homeComponent/Header";
import { Footer } from "@/components/homeComponent/Footer";
import { Card } from "@/components/quizcomopent/Quiz/ui/card";
import { Button } from "@/components/quizcomopent/Quiz/ui/button";
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

export default function QuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [quizDetail, setQuizDetail] = useState<QuizResult | null>(null);
  const [scoreband, setScoreband] = useState<Scoreband | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push("/login");
          return;
        }

        // Fetch quiz detail
        const response = await fetch(
          `http://localhost:8080/api/userQuiz/${resolvedParams.id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz detail");
        }

        const quizData: QuizResult = await response.json();
        setQuizDetail(quizData);

        // Fetch scoreband detail
        const scorebandResponse = await fetch(
          `http://localhost:8080/api/scoreband/${quizData.scoreBandId}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (scorebandResponse.ok) {
          const scorebandData: Scoreband = await scorebandResponse.json();
          setScoreband(scorebandData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizDetail();
  }, [resolvedParams.id, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !quizDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg mb-4 border border-red-200">
            {error || "Quiz not found"}
          </div>
          <div className="text-center">
            <Button
              onClick={() => router.push("/quizHistory")}
              className="bg-red-400 hover:bg-red-500 text-white transition-colors duration-300"
            >
              Back to History
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-red-400">
              Quiz Result Detail
            </h1>
            <Button
              onClick={() => router.push("/quizHistory")}
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-50"
            >
              Back to History
            </Button>
          </div>

          <Card className="p-8 shadow-lg mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-red-400 mb-2">
                {scoreband?.typeOfSkin || "Loading..."}
              </h2>
              <p className="text-gray-600">
                Taken on: {formatDate(quizDetail.createdAt)}
              </p>
            </div>

            <div className="bg-rose-50 p-4 rounded-lg border border-red-100 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-400 font-medium">Total Points:</span>
                <span className="text-2xl font-bold text-red-400">
                  {quizDetail.totalPoint}
                </span>
              </div>
              {scoreband && (
                <p className="text-sm text-gray-600">
                  Score Range: {scoreband.minPoint} - {scoreband.maxPoint}
                </p>
              )}
            </div>

            {scoreband && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-red-400 mb-2">
                  Skin Analysis
                </h3>
                <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-100">
                  {scoreband.skinExplanation}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium text-red-400 mb-4">
                Your Answers
              </h3>
              <div className="space-y-4">
                {quizDetail.result.map((answer, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-100"
                  >
                    <h4 className="font-medium text-gray-800 mb-2">
                      {answer.title}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">{answer.answer}</span>
                      <span className="text-red-400 font-medium">
                        {answer.point} point{answer.point !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
