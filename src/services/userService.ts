import axiosClient from "../api/axiosClient";

export interface LoginResponse {
  userId: number;
  phoneNumber: string;
  userName: string;
  email: string;
  address: string;
  avatar?: string;
  role: number;
  token: string;
}

const authService = {
  login: async (input: string, password: string): Promise<LoginResponse> => {
    const isEmail = input.includes("@");

    const res = await axiosClient.post("/login", {
      email: isEmail ? input : null,
      phoneNumber: !isEmail ? input : null,
      password,
    });

    return res.data;
  },

  me: async () => {
    const res = await axiosClient.get("/me");
    return res.data;
  },

  logout: async () => {
    return axiosClient.post("/logout");
  },
};

export default authService;
