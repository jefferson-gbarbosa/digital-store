import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/v1'
axios.defaults.withCredentials = true

export interface ProductOption {
  title: string
  type: string
  values: string[]
}

export interface ProductImage {
  id?: number
  content: string
  type: string
}

export interface ProductInput {
  name: string
  slug: string
  stock: number
  description?: string
  price: number
  price_with_discount?: number
  enabled?: boolean
  category_ids: number[]
  images: ProductImage[]
  options: ProductOption[]
}

export interface Product extends ProductInput {
  id: number
  created_at: string
  updated_at: string
}

interface ProductStore {
  products: Product[]
  currentProduct: Product | null
  loading: boolean
  creating: boolean
  updating: boolean
  error: string | null

  fetchProducts: () => Promise<void>
  searchProducts: (params: Record<string, string | number>) => Promise<void>
  fetchProductById: (id: number) => Promise<Product | null>
  createProduct: (data: ProductInput) => Promise<void>
  updateProduct: (id: number, data: Partial<ProductInput>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  creating: false,
  updating: false,
  error: null,

  // 🔹 Listar todos os produtos
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get<Product[]>(`${API_URL}/product`)
      set({ products: data, loading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao carregar produtos'
      console.error('Erro ao buscar produtos:', message)
      set({ error: message })
    } finally {
      set({ loading: false })
    }
  },
  searchProducts: async (params = {}) => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get(`${API_URL}/product/search`, { params })
      set({ products: data.data })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro na busca de produtos'
      set({ error: message })
    } finally {
      set({ loading: false })
    }
  },
  // 🔹 Buscar um produto pelo ID
  fetchProductById: async (id) => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get<Product>(`${API_URL}/product/${id}`)
      set({ currentProduct: data })
      return data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao buscar produto'
      console.error(message)
      set({ error: message })
      return null
    } finally {
      set({ loading: false })
    }
  },

  // 🔹 Criar novo produto
  createProduct: async (data: ProductInput) => {
    try {
      set({ creating: true, error: null })
      const payload: ProductInput = {
        ...data,
        description: data.description || undefined,
        price_with_discount: data.price_with_discount || undefined,
        enabled: data.enabled ?? true,
        category_ids: data.category_ids || [],
        images: data.images || [],
        options: data.options || [],
      }
      const response = await axios.post(`${API_URL}/product`, payload)
      set((state) => ({
        products: [...state.products, response.data],
        creating: false,
      }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao criar produto'
      console.error(message)
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ creating: false })
    }
  },

  // 🔹 Atualizar produto existente
  updateProduct: async (id: number, data: Partial<ProductInput>) => {
    set({ updating: true })
    try {
      const response = await axios.put(`${API_URL}/product/${id}`, data)
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? response.data : p)),
        currentProduct: response.data,
      }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao atualizar produto'
      console.error(message)
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ updating: false })
    }
  },

  // 🔹 Deletar produto
  deleteProduct: async (id: number) => {
    try {
      await axios.delete(`${API_URL}/product/${id}`)
      set({ products: get().products.filter((p) => p.id !== id) })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao deletar produto'
      console.error(message)
      set({ error: message })
      throw new Error(message)
    }
  },
}))
