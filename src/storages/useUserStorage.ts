import { CreateUser, UpdateUser } from "@/hooks/repositories";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
  user: Partial<CreateUser> | null;
  setUser: (user: Partial<CreateUser>) => void;
  updateUser: (partial: Partial<UpdateUser>) => void;
  clearUser: () => void;
}

export const useUserStorage = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (partial) => set((state) => ({ user: { ...state.user, ...partial } })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "finix-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
