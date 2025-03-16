"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-5 justify-between py-4 px-6 self-center w-full text-base bg-stone-50 text-red-400 max-md:max-w-full">
      <div
        className="flex justify-center items-center gap-1 font-medium"
        onClick={() => router.push("/")}
      >
        <img
          loading="lazy"
          src="/Logo-Noname.png"
          className="object-contain shrink-0 self-start aspect-square w-16"
          alt="Skincare logo"
        />
        <div className="text-2xl">| Crystal Care</div>
      </div>
      <div className="flex flex-wrap gap-10 my-auto max-md:max-w-full">
        <nav className="flex gap-10 items-center my-auto font-medium text-lg">
          <a href="/" className="self-stretch my-auto hover:underline">
            Home
          </a>
          <a href="/treatment" className="self-stretch my-auto hover:underline">
            Services
          </a>
        </nav>
        <div className="flex justify-center items-center border-l-2 border-l-red-400">
          <div
            className="flex gap-1.5 justify-center items-center p-2.5 hover:underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </div>
          <div
            className="flex gap-1.5 justify-center items-center p-2.5 hover:underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
};
