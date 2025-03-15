import { create } from "zustand";

interface UserState {
  email: string;
  displayName: string;
  uid: string;
  weight: number;
  plec: string;
  height: number;
  wiek: number;
  isLoading: boolean;
  bmr: number;
}
export const useUser = create((set) => ({
  user: null,
  setUser: (user: UserState) => set({ user }),
}));
