import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/v1/category'

axios.defaults.withCredentials = true

interface Category {
  id: number
  name: string
  slug: string
  use_in_menu: boolean
}

interface Pagination {
  total: number
  page: number
  limit: number
}

interface CategoryStore {
  categories: Category[]
  selectedCategory: Category | null
  loading: boolean
  error: string | null
  pagination: Pagination
  fetchCategories: (params?: {
    limit?: number
    page?: number
    use_in_menu?: boolean
    fields?: string
  }) => Promise<void>
  getCategoryById: (id: number) => Promise<void>
  createCategory: (data: Omit<Category, 'id'>, token: string) => Promise<void>
  updateCategory: (
    id: number,
    data: Partial<Category>,
    token: string,
  ) => Promise<void>
  deleteCategory: (id: number, token: string) => Promise<void>
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  pagination: { total: 0, page: 1, limit: 12 },

  async fetchCategories(params = {}) {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}/search`, { params })
      const { data, total, page, limit } = response.data
      console.log(data[0])
      set({
        categories: data,
        pagination: { total, page, limit },
        loading: false,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.error || 'Erro ao carregar categorias',
      })
    }
  },

  async getCategoryById(id) {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      set({ selectedCategory: response.data, loading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.error || 'Erro ao buscar categoria',
      })
    }
  },

  async createCategory(data) {
    set({ loading: true, error: null })
    try {
      await axios.post(`${API_URL}/create-category`, data)
      // Atualiza lista após criação
      await get().fetchCategories()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.error || 'Erro ao criar categoria',
      })
    } finally {
      set({ loading: false })
    }
  },

  async updateCategory(id, data) {
    set({ loading: true, error: null })
    try {
      await axios.put(`${API_URL}/${id}`, data)
      await get().fetchCategories()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.error || 'Erro ao atualizar categoria',
      })
    } finally {
      set({ loading: false })
    }
  },

  async deleteCategory(id) {
    set({ loading: true, error: null })
    try {
      await axios.delete(`${API_URL}/${id}`)
      await get().fetchCategories()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.error || 'Erro ao excluir categoria',
      })
    } finally {
      set({ loading: false })
    }
  },
}))
