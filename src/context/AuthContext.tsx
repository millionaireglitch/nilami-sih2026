import React, { createContext, useContext, useState, useCallback } from "react";
import type { User, UserRole } from "@/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_USER: User = {
  id: "u001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  role: "user" as UserRole,
  membership: "free",
  verified: true,
  kycStatus: "approved",
  savedAuctions: ["AUC001", "AUC004", "AUC010"],
  compareList: [],
  createdAt: "2025-03-15T09:30:00",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("nilami_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock auth — any email logs you in as demo user
    const u = { ...DEMO_USER, email };
    setUser(u);
    localStorage.setItem("nilami_user", JSON.stringify(u));
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, phone: string, _password: string): Promise<boolean> => {
      const u: User = { ...DEMO_USER, name, email, phone, id: `u_${Date.now()}` };
      setUser(u);
      localStorage.setItem("nilami_user", JSON.stringify(u));
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("nilami_user");
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem("nilami_user", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
