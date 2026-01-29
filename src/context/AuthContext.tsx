import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/auth";
import { authService } from "../services/authService";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (input: string, password: string) => Promise<void>;
  register: (payload: {
    phoneNumber: string;
    userName: string;
    email: string;
    password: string;
    address: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // auto login khi refresh
  useEffect(() => {
    authService
      .me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (input: string, password: string) => {
    const isEmail = input.includes("@");

    const res = await authService.login({
      email: isEmail ? input : undefined,
      phoneNumber: !isEmail ? input : undefined,
      password,
    });

    localStorage.setItem("token", res.token);
    setUser(res);
  };

  // register
  const register = async (payload: {
    phoneNumber: string;
    userName: string;
    email: string;
    password: string;
    address: string;
  }) => {
    await authService.register(payload);
  };

  // logout
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
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
