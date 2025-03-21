"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { User } from "../types/login";
import api, { setAuthContext } from "../hooks/axiosInstance";
import { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  loading: boolean;
  router: ReturnType<typeof useRouter>;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      await api.get("/account/profile", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
      }
      return false;
    }
  };

  const fetchUser = async (): Promise<User | null> => {
    try {
      console.log("[Auth Debug] Fetching user from /account/profile...");
      const response = await api.get("/account/profile", {
        withCredentials: true,
      });

      console.log("[Auth Debug] User fetched:", response.data.user);
      setIsAuthenticated(true);
      return response.data.user;
    } catch (e) {
      const error = e as AxiosError;
      console.error("[Auth Debug] Failed to fetch user:", error.response?.data);

      if (error.response?.status === 401) {
        console.log("[Auth Debug] Unauthorized");
        setIsAuthenticated(false);
      }

      return null;
    }
  };

  // Xử lý sự kiện storage change giữa các tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authStatus" && e.newValue === "loggedOut") {
        console.log("[Auth Debug] Received logout event from another tab");
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Xử lý logout
  const handleLogout = async () => {
    console.log("[Auth Debug] Handling logout...");
    try {
      await api.post("/account/logout", {}, { withCredentials: true });
    } catch (e) {
      console.error("[Auth Debug] Logout failed:", e);
    } finally {
      // Xóa tất cả cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }

      // Xóa localStorage
      localStorage.removeItem("lastLoginTime");
      localStorage.removeItem("authStatus");

      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Khi reload trang, tự động lấy user từ cookies
  useEffect(() => {
    setAuthContext({ setUser, router });

    const initializeAuth = async () => {
      console.log("[Auth Debug] Initializing auth...");
      setLoading(true);

      try {
        const response = await api.get("/account/profile");
        console.log("Profile response:", response.data);
        setUser(response.data.user);
      } catch (e: any) {
        console.error("Failed to fetch user:", {
          status: e.response?.status,
          data: e.response?.data,
        });
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const login = async (email: string, password: string) => {
    console.log("[Auth Debug] Logging in...");

    try {
      // Step 1: Perform login
      await api.post("/account/loginWithCookies", { email, password });

      // Step 2: Fetch full profile after successful login
      const profileResponse = await api.get("/account/profile");
      const fullUser = profileResponse.data.user;
      setUser(fullUser); // Update user with full profile data

      // Step 3: Redirect based on role
      switch (fullUser.role.toLowerCase()) {
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
          router.push("/profile"); // Assuming you navigate to profile
          break;
      }
    } catch (e) {
      console.error("[Auth Debug] Login failed:", e);
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
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: isAuthenticated ? user : null,
        login,
        logout,
        setUser,
        loading,
        router,
        checkAuthStatus,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
