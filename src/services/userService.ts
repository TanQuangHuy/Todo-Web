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

const userService = {
  login: async (input: string, password: string): Promise<LoginResponse> => {
    const res = await axiosClient.post(`${axiosClient.defaults.baseURL}/login`, {
      input,
      password,
    });

    return res.data;
  },
};

export default userService;
