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

interface Order {
  id: number
  user: User
  total_price: number
  status: string
  createdAt?: string
}

interface OrderState {
  orders: Order[]
  isLoading: boolean
  error: string | null

  fetchOrders: () => Promise<Order[] | null>
  updateOrderStatus: (
    orderId: number,
    newStatus: string,
  ) => Promise<Order | null>
}

const statusMapBackendToFrontend: Record<string, string> = {
  pending: 'Processing',
  confirmed: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  canceled: 'Cancelled',
}

const statusMapFrontendToBackend: Record<string, string> = {
  Processing: 'pending',
  Shipped: 'shipped',
  Delivered: 'delivered',
  Cancelled: 'canceled',
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(`${API_URL}/orders`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped = data.orders.map((order: any) => ({
        id: order.id,
        user: order.user,
        total_price: order.total_price,
        status: statusMapBackendToFrontend[order.status] || order.status,
        createdAt: order.createdAt,
      }))
      set({ orders: mapped, isLoading: false })
      return mapped
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao carregar pedidos'
      set({ isLoading: false, error: message })
      return null
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    set({ isLoading: true, error: null })
    try {
      const backendStatus = statusMapFrontendToBackend[newStatus] || newStatus
      const { data } = await axios.patch(
        `${API_URL}/orders/${orderId}/status`,
        { status: backendStatus },
      )
      set({
        orders: get().orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status:
                  statusMapBackendToFrontend[
                    data.status || data?.order?.status
                  ],
              }
            : o,
        ),
        isLoading: false,
      })

      return data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(
        '❌ Erro ao atualizar status:',
        err.response?.data || err.message,
      )
      const message =
        err.response?.data?.message || 'Erro ao atualizar status do pedido'
      set({ isLoading: false, error: message })
      return null
    }
  },
}))
