"use client";

import dynamic from "next/dynamic";

const ForgotPassPage = dynamic(
  () => import("@/components/authComponent/forgotPass"),
  {
    ssr: false,
  }
);

export default function Login() {
  return <ForgotPassPage />;
}
