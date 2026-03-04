"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
};

type AuthContextType = {
  isLogin: boolean;
  user: User | null;
  loading: boolean;
  login: (access: string, refresh: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      setIsLogin(true);

      try {
        if (storedUser && storedUser !== "undefined") {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  function login(access: string, refresh: string, user: User) {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setIsLogin(true);
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    setIsLogin(false);
    window.location.href = "/auth/login";
  }

  return (
    <AuthContext.Provider value={{ isLogin, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
}
