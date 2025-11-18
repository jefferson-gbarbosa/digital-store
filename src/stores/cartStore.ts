import { create } from 'zustand'

interface CartItem {
  id: string
  _id: string
  name: string
  price: number
  quantity: number
  image: string
  category?: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  lastUpdated: number
  clearCart: () => void
  totalItems: number
}

const STORAGE_KEY = 'cart:v1'

const readInitial = (): { items: CartItem[]; lastUpdated: number } => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [], lastUpdated: 0 }
    const parsed = JSON.parse(raw)
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      lastUpdated:
        typeof parsed.lastUpdated === 'number' ? parsed.lastUpdated : 0,
    }
  } catch {
    return { items: [], lastUpdated: 0 }
  }
}

const writeStorage = (items: CartItem[], lastUpdated: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, lastUpdated }))
  } catch {
    // ignore
  }
}

export const useCartStore = create<CartState>((set, get) => {
  const initial = readInitial()
  return {
    items: initial.items,
    lastUpdated: initial.lastUpdated,
    addItem: (item) => {
      const items = get().items
      const existing = items.find((i) => i.id === item.id)

      if (existing) {
        const updated = items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
        const ts = Date.now()
        set({ items: updated, lastUpdated: ts })
        writeStorage(updated, ts)
      } else {
        const updated = [...items, item]
        const ts = Date.now()
        set({ items: updated, lastUpdated: ts })
        writeStorage(updated, ts)
      }
    },
    removeItem: (id) => {
      const updated = get().items.filter((i) => i.id !== id)
      const ts = Date.now()
      set({ items: updated, lastUpdated: ts })
      writeStorage(updated, ts)
    },
    updateQuantity: (id, quantity) => {
      if (quantity < 1) {
        const updated = get().items.filter((i) => i.id !== id)
        const ts = Date.now()
        set({ items: updated, lastUpdated: ts })
        writeStorage(updated, ts)
        return
      }

      const updated = get().items.map((i) =>
        i.id === id ? { ...i, quantity } : i,
      )
      const ts = Date.now()
      set({ items: updated, lastUpdated: ts })
      writeStorage(updated, ts)
    },
    clearCart: () => {
      const ts = Date.now()
      set({ items: [], lastUpdated: ts })
      writeStorage([], ts)
    },
    get totalItems() {
      return get().items.reduce((sum, i) => sum + i.quantity, 0)
    },
  }
})
