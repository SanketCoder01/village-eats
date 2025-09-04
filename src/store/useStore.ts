import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface CartItem {
  id: string
  name: string
  nameMarathi?: string
  price: number
  quantity: number
  image: string
  restaurantId?: string
  restaurantName?: string
  shop?: string
  type?: 'food' | 'general' | 'grocery'
  weight?: string
}

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  name: string
  address: string
  landmark?: string
  city: string
  pincode: string
  isDefault: boolean
}

interface Order {
  id: string
  restaurant: string
  items: string[]
  status: 'preparing' | 'on_way' | 'delivered' | 'rejected'
  total: number
  estimatedTime: string
  orderTime: string
}

interface Store {
  // User State
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
  
  // UI State
  language: 'en' | 'mr'
  setLanguage: (language: 'en' | 'mr') => void
  selectedLocation: string
  setSelectedLocation: (location: string) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  showLocationPicker: boolean
  setShowLocationPicker: (show: boolean) => void
  
  // Cart
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
  
  // Orders
  orders: Order[]
  addOrder: (order: Omit<Order, 'id'>) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Addresses
  addresses: Address[]
  selectedAddress: Address | null
  setSelectedAddress: (address: Address | null) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
  
  // Navigation
  activeTab: string
  setActiveTab: (tab: string) => void
  
  // UI
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set, get) => ({
  // Language
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  
  // Location
  selectedLocation: 'Pune, Maharashtra',
  setSelectedLocation: (location: string) => set({ selectedLocation: location }),
  
  // Theme
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  
  // Location Picker
  showLocationPicker: false,
  setShowLocationPicker: (show) => set({ showLocationPicker: show }),
  
  // User
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false, cart: [] }),
  
  // Cart
  cart: [],
  addToCart: (item) => {
    const existingItem = get().cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      set({
        cart: get().cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      })
    } else {
      set({ cart: [...get().cart, { ...item, quantity: 1 }] })
    }
  },
  removeFromCart: (id) => set({ cart: get().cart.filter(item => item.id !== id) }),
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id)
    } else {
      set({
        cart: get().cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      })
    }
  },
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  getCartItemCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0)
  },
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Addresses
  addresses: [
    {
      id: '1',
      type: 'home',
      name: 'Home',
      address: '123 Main Street, Apartment 4B',
      landmark: 'Near City Mall',
      city: 'Pune',
      pincode: '411001',
      isDefault: true
    }
  ],
  selectedAddress: null,
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  addAddress: (address) => {
    const newAddress = { ...address, id: Date.now().toString() }
    set({ addresses: [...get().addresses, newAddress] })
  },
  updateAddress: (id, updatedAddress) => {
    set({
      addresses: get().addresses.map(addr =>
        addr.id === id ? { ...addr, ...updatedAddress } : addr
      )
    })
  },
  deleteAddress: (id) => {
    set({ addresses: get().addresses.filter(addr => addr.id !== id) })
  },
  
  // Navigation
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Orders
  orders: [],
  addOrder: (order) => {
    const newOrder = { ...order, id: Date.now().toString() }
    set({ orders: [...get().orders, newOrder] })
  },
  updateOrderStatus: (id, status) => {
    set({
      orders: get().orders.map(order =>
        order.id === id ? { ...order, status } : order
      )
    })
  },
  
  // UI
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading })
}))
