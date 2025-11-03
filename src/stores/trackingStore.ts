import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/v1'
axios.defaults.withCredentials = true

interface TimelineEvent {
  id: number
  order_id?: number
  status: string
  event_date: string
  description?: string
  location?: string
}

interface TrackingState {
  timeline: TimelineEvent[]
  isLoading: boolean
  error: string | null

  fetchUserTimelineById: (userId: number) => Promise<TimelineEvent[] | null>
  fetchOrderTimeline: (orderId: number) => Promise<TimelineEvent[] | null>
  updateTracking: (
    trackingId: number,
    status?: string,
    location?: string,
    note?: string,
  ) => Promise<TimelineEvent | null>
  deleteTracking: (trackingId: number) => Promise<void>
}

export const useTrackingStore = create<TrackingState>((set) => ({
  timeline: [],
  isLoading: false,
  error: null,

  fetchUserTimelineById: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(`${API_URL}/tracking/timeline/${userId}`)
      console.log(data)
      const mapped =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.timeline?.map((t: any) => ({
          id: t.id,
          order_id: t.order_id,
          status: t.status,
          event_date: t.timestamp,
          description: t.note || '',
          location: t.location || '',
        })) || []
      set({ timeline: mapped, isLoading: false })
      return mapped
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Erro ao buscar timeline do usuário'
      set({ isLoading: false, error: message })
      return null
    }
  },

  fetchOrderTimeline: async (orderId) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(`${API_URL}/tracking/${orderId}`)
      const mapped =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.map((t: any) => ({
          id: t.id,
          status: t.status,
          event_date: t.timestamp,
          description: t.note || '',
          location: t.location || '',
        })) || []
      set({ timeline: mapped, isLoading: false })
      return mapped
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Erro ao buscar rastreamento do pedido'
      set({ isLoading: false, error: message })
      return null
    }
  },

  updateTracking: async (trackingId, status, location, note) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.patch(`${API_URL}/tracking/${trackingId}`, {
        status,
        location,
        note,
      })
      set({ isLoading: false })
      return data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Erro ao atualizar rastreamento'
      set({ isLoading: false, error: message })
      return null
    }
  },

  deleteTracking: async (trackingId) => {
    set({ isLoading: true, error: null })
    try {
      await axios.delete(`${API_URL}/tracking/${trackingId}`)
      set({ isLoading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Erro ao deletar rastreamento'
      set({ isLoading: false, error: message })
      throw new Error(message)
    }
  },
}))
