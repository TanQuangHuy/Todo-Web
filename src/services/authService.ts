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

    const res = await axiosClient.post("/api/user/login", {
      email: isEmail ? input : null,
      phoneNumber: !isEmail ? input : null,
      password,
    });

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
    await axiosClient.post("/api/user/register", payload);
  },

  logout: async () => {
    return axiosClient.post("/logout");
  },
};

export default authService;
