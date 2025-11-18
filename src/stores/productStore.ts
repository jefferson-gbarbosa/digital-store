import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/products'
axios.defaults.withCredentials = true

// Tipagem do produto
export interface Product {
  _id: string
  title: string
  description: string
  price: {
    value: number
    currency: string
  }
  sizes: string[]
  images: string[]
  category: string
  type: string
  popular?: boolean
  inStock?: boolean
  createdAt?: string
  updatedAt?: string
}

// Tipagem do Store
interface ProductStore {
  products: Product[]
  loading: boolean
  selectedProduct: Product | null
  error: string | null

  // Ações Sync
  setProducts: (products: Product[]) => void
  setLoading: (state: boolean) => void
  setSelectedProduct: (product: Product | null) => void
  setError: (message: string | null) => void

  // Ações Async
  fetchProducts: () => Promise<void>
  fetchProductById: (id: string) => Promise<void>
  createProduct: (data: unknown, images: File[]) => Promise<boolean>
  toggleStock: (id: string, inStock: boolean) => Promise<boolean>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  selectedProduct: null,
  error: null,

  setProducts: (products) => set({ products }),
  setLoading: (state) => set({ loading: state }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setError: (message) => set({ error: message }),

  // Buscar todos os produtos
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null })
      const { data } = await axios.get(`${API_URL}`)

      if (data.success) {
        set({ products: data.products })
      } else {
        set({ error: data.message })
      }
    } catch {
      set({ error: 'Erro ao carregar produtos' })
    } finally {
      set({ loading: false })
    }
  },

  // Buscar um único produto — POST /single com productId
  fetchProductById: async (id: string) => {
    try {
      set({ loading: true, error: null })

      const { data } = await axios.post(`${API_URL}/single`, { productId: id })

      if (data.success) {
        set({ selectedProduct: data.product })
      } else {
        set({ error: data.message })
      }
    } catch {
      set({ error: 'Erro ao carregar produto' })
    } finally {
      set({ loading: false })
    }
  },

  // Criar produto com imagens
  createProduct: async (productData: unknown, images: File[]) => {
    try {
      set({ loading: true, error: null })

      const formData = new FormData()
      formData.append('product', JSON.stringify(productData))
      images.forEach((img) => formData.append('images', img))

      const { data } = await axios.post(`${API_URL}`, formData)

      if (!data.success) {
        set({ error: data.message })
        return false
      }

      await useProductStore.getState().fetchProducts()
      return true
    } catch {
      set({ error: 'Erro ao criar produto' })
      return false
    } finally {
      set({ loading: false })
    }
  },

  // Alterar status de estoque — POST /toggle-stock com { productId, inStock }
  toggleStock: async (id: string, inStock: boolean) => {
    try {
      set({ loading: true, error: null })

      const { data } = await axios.post(`${API_URL}/toggle-stock`, {
        productId: id,
        inStock,
      })

      if (!data.success) {
        set({ error: data.message })
        return false
      }

      // Atualiza localmente
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? { ...p, inStock } : p,
        ),
      }))

      return true
    } catch {
      set({ error: 'Erro ao atualizar estoque' })
      return false
    } finally {
      set({ loading: false })
    }
  },
}))
