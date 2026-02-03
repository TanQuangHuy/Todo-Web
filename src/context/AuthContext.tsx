import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/auth";
import authService from "../services/authService";

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

  // ✅ restore login từ localStorage
  useEffect(() => {
    const cachedUser = localStorage.getItem("auth_user");

    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (input: string, password: string) => {
    const res = await authService.login(input, password);

    localStorage.setItem("token", res.token);
    localStorage.setItem("auth_user", JSON.stringify(res));

    setUser(res);
  };

  // ✅ REGISTER (KHÔNG auto login)
  const register = async (payload: {
    phoneNumber: string;
    userName: string;
    email: string;
    password: string;
    address: string;
  }) => {
    await authService.register(payload);
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
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
