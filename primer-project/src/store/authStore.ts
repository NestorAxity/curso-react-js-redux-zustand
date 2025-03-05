import { create } from "zustand";
import { loginService } from "../services/auth.service";
import { devOnlyDevtools as devtools } from "./devTools";
import { immer } from "zustand/middleware/immer";
import { AuthState } from "../types";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const useAuthStore = create<AuthState>(
  devtools(
    immer((set) => ({
      isAuthenticated: false,
      loading: false,
      error: false,
      login: (username: string, password: string) =>
        loginService(username, password)
        .then(() =>
          set({ isAuthenticated: true }, false, { type: "loginSuccess" })
        )
        .catch(() =>
          set({ isAuthenticated: false }, false, { type: "loginError" })
        ),

      checkAuth: async () => {
        try {
          const response = await axios.get(`${BASE_URL}/auth/me`, {
            withCredentials: true,
          });
          const user = response.data.user || null;
          set({ isAuthenticated: !!user, user });

          return { isAuthenticated: !!user, user };
        } catch {
          set({ isAuthenticated: false, user: null });
          return { isAuthenticated: false, user: null };
        }
      },
    })),
    { name: "authStore" }
  )
);