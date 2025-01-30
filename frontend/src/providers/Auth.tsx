"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import axios from "axios";
import { User } from "@/types";

type AuthContextType =
  | undefined
  | {
      loggedUserData?: User;
      setLoggedUserData: Dispatch<SetStateAction<User | undefined>>;
      isAuthenticated: boolean;
      isLoading: boolean;
      setAuthenticated: Dispatch<SetStateAction<boolean>>;
    };
const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState<User>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await axios.get("/check-auth");
        const response = await axios.get("/user/me");
        setLoggedUserData(response.data);
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      }
      setLoading(false);
    };
    initializeAuth();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        loggedUserData,
        setLoggedUserData,
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
