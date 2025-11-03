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

interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null

  fetchUsers: () => Promise<User[] | null>
  fetchUserById: (id: number) => Promise<User | null>
  updateUser: (
    id: number,
    firstname: string,
    surname: string,
    email: string,
    role?: string,
  ) => Promise<User | null>
  deleteUser: (id: number) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(`${API_URL}/user/users`)
      set({ users: data, isLoading: false })
      return data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao carregar usuários'
      set({ isLoading: false, error: message })
      return null
    }
  },

  fetchUserById: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(`${API_URL}/user/${id}`)
      set({ isLoading: false })
      return data as User
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao buscar usuário'
      set({ isLoading: false, error: message })
      return null
    }
  },

  updateUser: async (id, firstname, surname, email, role) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.patch(`${API_URL}/user/update/${id}`, {
        firstname,
        surname,
        email,
        role,
      })

      const updatedUser = data.user as User
      const updatedUsers = get().users.map((u) =>
        u.id === id ? updatedUser : u,
      )
      set({ users: updatedUsers, isLoading: false })
      return updatedUser
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao atualizar usuário'
      set({ isLoading: false, error: message })
      return null
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axios.delete(`${API_URL}/user/${id}`)
      set({ users: get().users.filter((u) => u.id !== id), isLoading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao deletar usuário'
      set({ isLoading: false, error: message })
      throw new Error(message)
    }
  },
}))
