"use client";

import { useRouter } from "next/navigation";
import useAuth from "../context/AuthContext";
import { role } from "../constants/role";
import { ReactNode, useEffect } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    
    // Uncomment if you need this role-based check
    if (![role.ADMIN, role.STAFF, role.THERAPIST].includes(user?.role as string)) {
      router.push("/");
    }
  }, [router, user]);

  return children;
};