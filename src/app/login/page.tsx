"use client";

import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/components/authComponent/login"), {
  ssr: false,
});

export default function Login() {
  return <LoginPage />;
}
