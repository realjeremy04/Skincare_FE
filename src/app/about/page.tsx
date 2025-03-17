"use client";

import { Footer } from "@/components/homeComponent/Footer";
import { Header } from "@/components/homeComponent/Header";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <>
      <Header />
      <section
        className="py-16 text-center"
        style={{ backgroundColor: "#FCF3EE" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div
            className="flex flex-col items-center"
            style={{ color: "#ED6672" }}
          >
            <Image
              src="/about-hero.png"
              alt="Our Experts"
              width={1200}
              height={400}
              className="rounded-lg"
            />
            <h1 className="text-3xl md:text-5xl font-bold mt-6">
              Your journey to radiant skin starts here
            </h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Experience personalized skincare from our team of professionals.
            </p>
            <button
              className="mt-6 text-white py-2 px-6 rounded-full transition hover:bg-pink-50 hover:text-pink-700"
              style={{
                backgroundColor: "#ED6672",
                color: "#FCF3EE",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ce424e";
                e.currentTarget.style.boxShadow = "0 0 0 2px #ED6672";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ED6672";
                e.currentTarget.style.color = "#FCF3EE";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl font-bold " style={{ color: "#ED6672" }}>
            Who we are
          </h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            We are a team of experienced dermatologists dedicated to helping you
            achieve healthy, radiant skin through advanced skincare solutions.
          </p>
          <div className="mt-6">
            <Image
              src="/About-img.png"
              alt="Skincare"
              width={400}
              height={200}
              className="rounded-lg mx-auto"
            />
          </div>
        </div>
      </section>

      <section
        className="py-16 bg-pink-50 text-center"
        style={{ backgroundColor: "#FCF3EE" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl font-bold " style={{ color: "#ED6672" }}>
            What sets us apart
          </h2>
          <ul className="text-gray-600 mt-4 max-w-3xl mx-auto space-y-3">
            <li>✔ Personalized skincare treatments</li>
            <li>✔ Advanced dermatology technology</li>
            <li>✔ Expert team of certified dermatologists</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl font-bold " style={{ color: "#ED6672" }}>
            Our skincare experts
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="text-center">
              <Image
                src="/about-character.png"
                alt="Expert 1"
                width={200}
                height={200}
                className="rounded-full"
              />
              <p className="mt-2 font-medium text-gray-700">Dr. Sarah Lee</p>
            </div>
            <div className="text-center">
              <Image
                src="/about-character.png"
                alt="Expert 2"
                width={200}
                height={200}
                className="rounded-full"
              />
              <p className="mt-2 font-medium text-gray-700">Dr. Michael Tan</p>
            </div>
            <div className="text-center">
              <Image
                src="/about-character.png"
                alt="Expert 3"
                width={200}
                height={200}
                className="rounded-full"
              />
              <p className="mt-2 font-medium text-gray-700">Dr. Rachel Kim</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}