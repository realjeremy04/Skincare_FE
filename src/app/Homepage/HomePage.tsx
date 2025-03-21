"use client";
import React from "react";
import { Features } from "../../components/homeComponent/Features";
import { Services } from "../../components/homeComponent/Services";
import { Transformation } from "../../components/homeComponent/Transformation";
import ClientTestimonials from "../../components/homeComponent/ClientTestimonials";
import Hero from "../../components/homeComponent/Hero";
import { SkincareInsights } from "../../components/homeComponent/SkincareInsight";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <main className="flex flex-col w-full bg-stone-50 grow-0 max-md:max-w-full overflow-hidden">
        <Hero />
        <Features />
        <Services />
        <Transformation />
        <ClientTestimonials />
        <SkincareInsights />
      </main>
    </div>
  );
};

export default HomePage;
