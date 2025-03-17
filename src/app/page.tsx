// 'use client';  // Mark this as a Client Component
// import { usePathname } from 'next/navigation';
// import { AppProps } from 'next/app';
// import { JSX } from 'react';
// import HomePage from './Homepage/HomePage';
// import ContactPage from './contact/page';

// function MyApp({ Component, pageProps }: AppProps) {
//   const pathname = usePathname();  // Get the current route path

//   // Centralized Route Configuration
//   const routes: { [key: string]: JSX.Element } = {
//     '/': <HomePage />,
//     //add more routes here
//     '/contact': <ContactPage />,
//   };

//   // Check if the route exists, otherwise show NotFoundPage
//   const CurrentPage = routes[pathname] ;

//   return (
//     <div>
//       {CurrentPage}
//     </div>
//   );
// }

// export default MyApp;

"use client";
import { usePathname } from "next/navigation";
import { AppProps } from "next/app";
import { Header } from "@/components/homeComponent/Header";
import { Footer } from "@/components/homeComponent/Footer";
import QuizPage from "./quizPage/page";
import HomePage from "./Homepage/HomePage";
import ContactPage from "./contact/page";
import QuizHistoryPage from "./quizHistory/page";
import QuizHistoryDetailPage from "./quizHistory/[id]/page";

import { AuthProvider } from "@/libs/context/AuthContext";
import { JSX } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const quizHistoryMatch = pathname?.match(/^\/quizHistory\/(.+)$/);
  const quizHistoryId = quizHistoryMatch ? quizHistoryMatch[1] : null;
  const routes: { [key: string]: JSX.Element } = {
    "/": <HomePage />,
    "/contact": <ContactPage />,
    "/quizPage": <QuizPage />,
    "/quizHistory": <QuizHistoryPage />,
    ...(quizHistoryId && {
      [`/quizHistory/${quizHistoryId}`]: (
        <QuizHistoryDetailPage params={{ id: quizHistoryId }} />
      ),
    }),
  };

  const CurrentPage = routes[pathname] || <Component {...pageProps} />; // Fallback to default Component

  return (
    <AuthProvider>
      <Header />
      <div>{CurrentPage}</div>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
