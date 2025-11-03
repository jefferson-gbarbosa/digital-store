import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/v1'

axios.defaults.withCredentials = true

interface User {
  id?: number
  firstname: string
  surname: string
  role: string
  email?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  users: User[]
  isLoading: boolean
  error: string | null

  login: (email: string, password: string) => Promise<User | null>
  logout: () => Promise<void>
  signupPublic: (
    firstname: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>
  signupAdmin: (
    firstname: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<User | null>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  users: [],

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      })
      // console.log("Login response:", response.data);
      set({ isAuthenticated: true, user: response.data.user, isLoading: false })
      return response.data.user
    } catch (error) {
      console.error('Login failed:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred'
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
      })
      return null
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await axios.post(`${API_URL}/user/logout`)
      set({ isAuthenticated: false, user: null, isLoading: false })
    } catch (error) {
      console.error('Logout failed:', error)
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: 'Erro no logout',
      })
    }
  },
  signupPublic: async (
    firstname,
    surname,
    email,
    password,
    confirmPassword,
  ) => {
    set({ isLoading: true, error: null })
    try {
      await axios.post(`${API_URL}/user/signup`, {
        firstname,
        surname,
        email,
        password,
        confirmPassword,
      })
      set({ isLoading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erro no cadastro'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },
  signupAdmin: async (firstname, surname, email, password, confirmPassword) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.post(`${API_URL}/user/admin/signup`, {
        firstname,
        surname,
        email,
        password,
        confirmPassword,
      })
      set({ isLoading: false })
      return data.user as User
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erro no cadastro admin'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },
}))
