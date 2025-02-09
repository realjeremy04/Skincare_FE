"use client";
import React from 'react';
import { Header } from './../components/Header';
import { Hero } from './../components/Hero';
import { Features } from './../components/Features';
import { Services } from './../components/Services';
import { Footer } from './../components/Footer';
import { Testimonials } from '../components/Testimonials';
import { Sponsors } from '../components/Sponsors';

export const GlistenPage = () => {
  return (
    <div className="flex gap-10">
      <main className="flex overflow-hidden flex-col pt-8 mt-auto w-full bg-stone-50 grow-0 max-md:max-w-full">
        <Header />
        <Hero />
        <Features />
        <Services />
        <Testimonials />
        <Sponsors />
        <Footer />
      </main>
    </div>
  );
};

export default GlistenPage;