"use client";
import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Sidebar } from "../../components/profileComponent";

export const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <div className="flex flex-row">
        <Sidebar />
        <main className="flex flex-col mt-24 w-full bg-stone-50 grow-0 max-md:max-w-full overflow-hidden ml-64">
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
