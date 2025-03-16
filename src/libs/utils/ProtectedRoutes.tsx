"use client";

import { useRouter } from "next/navigation";
import useAuth from "../context/AuthContext"; // Adjust path
import { role } from "../constants/role";
import { ReactNode, useEffect } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Wait until loading is done

    if (!user) {
      router.push("/login");
      return;
    }

    // Optional: Uncomment for role-based routing
    if (![role.ADMIN, role.STAFF, role.THERAPIST].includes(user.role as string)) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Better UX
  }

  return children;
};