"use client"; // Mark this as a Client Component
import { usePathname } from "next/navigation";
import { AppProps } from "next/app";
import { JSX } from "react";
import HomePage from "./Homepage/HomePage";
import { Header } from "../components/homeComponent/Header";
import { Footer } from "../components/homeComponent/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname(); // Get the current route path

  // Centralized Route Configuration
  const routes: { [key: string]: JSX.Element } = {
    "/": <HomePage />,
    //add more routes here
  };

  // Check if the route exists, otherwise show NotFoundPage
  const CurrentPage = routes[pathname];

  return (
    <div>
      <Header />
      {CurrentPage}
      <Footer />
    </div>
  );
}

export default MyApp;
