import { create } from 'zustand'

interface AuthState {
  user: unknown | null
  setUser: (user: unknown) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
