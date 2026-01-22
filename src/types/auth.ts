export type User = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type LoginPayload = { username: string; password: string };
export type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};
