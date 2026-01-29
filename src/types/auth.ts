export interface User {
  userId: number;
  phoneNumber: string;
  userName: string;
  email: string;
  address: string;
  avatar?: string;
  role: number;
}

export interface LoginResponse {
  token: string;
  userId: number;
  phoneNumber: string;
  userName: string;
  email: string;
  address: string;
  avatar: string;
  role: number;
}