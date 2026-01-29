import axiosClient from "../api/axiosClient";
import type { LoginResponse, User } from "../types/auth";

const api = axiosClient;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // login
  login: async (payload: {
    phoneNumber?: string;
    email?: string;
    password: string;
  }): Promise<LoginResponse> => {
    const res = await api.post("/api/user/login", payload);
    return res.data;
  },

  // register (BE KHÔNG trả token)
  register: async (payload: {
    phoneNumber: string;
    userName: string;
    email: string;
    password: string;
    address: string;
  }): Promise<void> => {
    await api.post("/api/user/register", payload);
  },

  // lấy user hiện tại
  me: async (): Promise<User> => {
    const res = await api.get("/me");
    return res.data;
  },

  // logout (nếu BE có endpoint)
  logout: async (): Promise<void> => {
    await api.post("/logout");
  },
};
