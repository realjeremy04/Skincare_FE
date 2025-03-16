"use client";
import React from "react";
import { Sidebar } from "../../components/adminComponent";

export const adminPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Sidebar />
    </div>
  );
};

export default adminPage;
