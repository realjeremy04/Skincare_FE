// "use client";

// import { useRouter } from "next/navigation";
// import { createContext, useContext, useState, useEffect } from "react";
// import { ReactNode } from "react";
// import { User } from "../types/login";
// import api from "../hooks/axiosInstance";

// // Define type for the auth context
// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   setUser: (user: User | null) => void;
// }

// // Create context with proper type
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);

//   // Fetch user data on mount to initialize the state
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await api.get("/account/profile");
//         setUser(response.data.user);
//       } catch (e: unknown) {
//         console.error("Failed to fetch user:", e);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await api.post("/account/login", { email, password });
//       const data = response.data;
//       setUser(data.user);
//       router.push("/staff/appointments");
//     } catch (e: unknown) {
//       console.error("Login failed:", e);
//       throw e;
//     }
//   };

//   const logout = async () => {
//     try {
//       // Call logout endpoint if your backend requires it to invalidate the cookie
//       await api.post("/account/logout");
//     } catch (e: unknown) {
//       console.error("Logout failed:", e);
//     } finally {
//       setUser(null);
//       router.push("/");
//     }
//   };

//   const values = {
//     user,
//     login,
//     logout,
//     setUser,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

// /**
//  * Custom hook that provides access to authentication context
//  *
//  * @returns {AuthContextType} Authentication context object
//  * @returns {Object|null} returns.user - The current authenticated user data
//  * @returns {Function} returns.login - Async function to log in (email: string, password: string) => Promise<void>
//  * @returns {Function} returns.logout - Function to log out the current user
//  * @returns {Function} returns.setUser - State setter for user data
//  *
//  * @example
//  * const { user, login, logout } = useAuth();
//  *
//  * login('user@example.com', 'password');
//  *
//  * logout();
//  */
// const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export default useAuth;

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
      } catch (e) {
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
          router.push("/dashboard");
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
      await api.post("/account/logout");
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
