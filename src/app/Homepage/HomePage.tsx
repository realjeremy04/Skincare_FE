"use client";
import React from "react";
import { Header } from "../../components/homeComponent/Header";
import { Features } from "../../components/homeComponent/Features";
import { Services } from "../../components/homeComponent/Services";
import { Footer } from "../../components/homeComponent/Footer";
import { Transformation } from "../../components/homeComponent/Transformation";
import ClientTestimonials from "../../components/homeComponent/ClientTestimonials";
import Hero from "../../components/homeComponent/Hero";
import { SkincareInsights } from "../../components/homeComponent/SkincareInsight";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <main className="flex flex-col mt-24 w-full bg-stone-50 grow-0 max-md:max-w-full overflow-hidden">
        <Hero />
        <Features />
        <Services />
        <Transformation />
        <ClientTestimonials />
        <SkincareInsights />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
