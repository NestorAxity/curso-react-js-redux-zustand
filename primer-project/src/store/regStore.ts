import { create } from "zustand";
import { registerService } from "../services/reg.service";
import { devOnlyDevtools as devtools } from "./devTools";
import { immer } from "zustand/middleware/immer";
import { RegState } from "../types";

export const useRegStore = create<RegState>(
  devtools(
    immer((set) => ({
    isRegistred: false,
    loading: false,
    error: false,
    regis: (username: string, password: string) =>
        registerService(username, password)
        .then(() =>
            set({ isRegistred: true }, false)
        )
        .catch(() =>
            set({ isRegistred: false }, false)
        ),
    regisOut: () => set({
        isRegistred: false
    })
        
    })),
    { name: "regStore" }
  )
);