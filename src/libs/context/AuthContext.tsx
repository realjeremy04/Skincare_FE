import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { User } from "../types/login";

// Define type for the auth context
interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

// Create context with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      localStorage.setItem("accessToken", data.user.token);
      setAccessToken(data.user.token);

      delete data.user.token;
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      router.push("/staff/services");
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    
    router.push("/login");
  };

  const values = {
    accessToken,
    user,
    login,
    logout,
    setAccessToken,
    setUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook that provides access to authentication context
 *
 * @returns {AuthContextType} Authentication context object
 * @returns {string|null} returns.accessToken - The current JWT access token
 * @returns {Object|null} returns.user - The current authenticated user data
 * @returns {Function} returns.login - Async function to log in (email: string, password: string) => Promise<void>
 * @returns {Function} returns.logout - Function to log out the current user
 * @returns {Function} returns.setAccessToken - State setter for access token
 * @returns {Function} returns.setUser - State setter for user data
 *
 * @example
 * const { user, login, logout } = useAuth();
 *
 * login('user@example.com', 'password');
 *
 * logout();
 */
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
