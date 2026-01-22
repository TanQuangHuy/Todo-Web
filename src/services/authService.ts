import type { LoginPayload, RegisterPayload, User } from "../types/auth";
import { fakeUser } from "../data/fakeDb";
import { sleep } from "../utils/sleep";

export const authService = {
  async login(payload: LoginPayload): Promise<{ token: string; user: User }> {
    await sleep(450);
    if (!payload.username || !payload.password) {
      throw new Error("Missing credentials");
    }
    return { token: "fake_jwt_token", user: fakeUser };
  },

  async register(payload: RegisterPayload): Promise<{ token: string; user: User }> {
    await sleep(650);
    if (!payload.agree) throw new Error("You must agree to terms");
    if (payload.password !== payload.confirmPassword)
      throw new Error("Password mismatch");
    return { token: "fake_jwt_token", user: fakeUser };
  },

  async me(): Promise<User | null> {
    await sleep(250);
    const token = localStorage.getItem("token");
    return token ? fakeUser : null;
  },

  async logout(): Promise<void> {
    await sleep(150);
  },
};
