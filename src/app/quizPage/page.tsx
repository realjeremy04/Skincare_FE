import { Footer } from "@/components/homeComponent/Footer";
import { Header } from "@/components/homeComponent/Header";
// import QuizPage from "@/components/quizcomopent/TestQuiz";
import Index from "@/components/quizcomopent/Index";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      {/* <QuizPage /> */}
      <Index />
      <Footer />
    </div>
  );
};

export default page;
