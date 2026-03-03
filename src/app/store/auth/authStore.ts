import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthState {
  token: string | null
  refreshToken: string | null
  tokenExpiration: number | null
  user: AuthUser | null
  isAuthenticated: boolean

  setToken: (token: string, refreshToken: string, expiration: number) => void
  setUser: (user: AuthUser) => void
  removeToken: () => void
  isLogged: () => boolean
}

// Safe storage for SSR compatibility (TanStack Start)
const safeStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(name)
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(name, value)
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(name)
  },
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      token: null,
      refreshToken: null,
      tokenExpiration: null,
      user: null,
      isAuthenticated: false,

      setToken: (token, refreshToken, expiration) => {
        set({ token, refreshToken, tokenExpiration: expiration, isAuthenticated: true })
      },

      setUser: (user) => {
        set({ user })
      },

      removeToken: () => {
        set({
          token: null,
          refreshToken: null,
          tokenExpiration: null,
          user: null,
          isAuthenticated: false,
        })
      },

      isLogged: () => {
        const { token, tokenExpiration } = get()
        if (!token) return false
        if (tokenExpiration && Date.now() > tokenExpiration) return false
        return true
      },
    }),
    {
      name: 'admin-auth-store',
      storage: createJSONStorage(() => safeStorage),
    },
  ),
)
