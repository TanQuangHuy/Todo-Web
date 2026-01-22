import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/auth";
import { authService } from "../services/authService";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 auto login
  useEffect(() => {
    authService
      .me()
      .then((u) => setUser(u))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await authService.login({ username, password });
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const register = async (payload: any) => {
    const res = await authService.register(payload);
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
