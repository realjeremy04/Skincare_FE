"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { User } from "../types/login";
import api from "../hooks/axiosInstance";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/account/profile");
        console.log("Profile response:", response.data);
        setUser(response.data.user);
      } catch (e: unknown) {
        console.error("Failed to fetch user:", {
          status: e.response?.status,
          data: e.response?.data,
        });
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/account/login", { email, password });
      const data = response.data;
      setUser(data.user);
      switch (data.user.role.toLowerCase()) {
        case "staff":
          router.push("/staff/appointments");
          break;
        case "customer":
          router.push("/");
          break;
        case "therapist":
          router.push("/therapist/appointments");
          break;
        case "admin":
          router.push("/staff/appointments");
          break;
        default:
          router.push("/");
          break;
      }
    } catch (e) {
      console.error("Login failed:", e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await api.get("/account/logout");
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setUser(null);
      router.push("/login"); // Changed to /login (was /)
    }
  };

  const values = {
    user,
    login,
    logout,
    setUser,
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
