"use client";

import dynamic from "next/dynamic";

const RegisterPage = dynamic(() => import("@/components/authComponent/register"), {
  ssr: false,
});

export default function Login() {
  return <RegisterPage />;
}
