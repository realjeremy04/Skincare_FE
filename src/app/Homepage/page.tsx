"use client";
import React from 'react';
import { Header } from './../components/Header';
import { Features } from './../components/Features';
import { Services } from './../components/Services';
import { Footer } from './../components/Footer';
import { Transformation } from '../components/Transformation';
import ClientTestimonials from './../components/ClientTestimonials';
import Hero from '../components/Hero';

export const GlistenPage = () => {
  return (
    <div className="flex gap-10">
      <main className="flex overflow-hidden flex-col pt-8 mt-auto w-full bg-stone-50 grow-0 max-md:max-w-full">
        <Header />
        <Hero />
        <Features />
        <Services />
        <Transformation />
        <ClientTestimonials />
        <Footer />
      </main>
    </div>
  );
};

export default GlistenPage;