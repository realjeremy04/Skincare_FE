import { useRouter } from "next/router";
import useAuth from "../context/AuthContext";
import { role } from "../constants/role";
import { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { accessToken, user } = useAuth();

  if (!accessToken || !user) {
    router.push("/login");
  }

  if (
    ![role.ADMIN, role.STAFF, role.THERAPIST].includes(user?.role as string)
  ) {
    router.push("/");
  }

  return children;
};
