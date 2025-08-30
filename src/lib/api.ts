import { supabase, supabaseAdmin } from './supabase'
import type { Database } from './supabase'

// Type definitions
type Restaurant = Database['public']['Tables']['restaurants']['Row']
type FoodItem = Database['public']['Tables']['food_items']['Row']
type GeneralStoreItem = Database['public']['Tables']['general_store_items']['Row']
type GroceryItem = Database['public']['Tables']['grocery_items']['Row']
type WeightOption = Database['public']['Tables']['weight_options']['Row']
type Shop = Database['public']['Tables']['shops']['Row']
type ShopProduct = Database['public']['Tables']['shop_products']['Row']
type Location = Database['public']['Tables']['locations']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type OrderItem = Database['public']['Tables']['order_items']['Row']

// Authentication API
export const authAPI = {
  async sendOTP(phone: string) {
    const { data, error } = await supabase.rpc('send_otp', { phone_number: phone })
    if (error) throw error
    return data
  },

  async verifyOTP(phone: string, otp: string) {
    const { data, error } = await supabase.rpc('verify_otp', { 
      phone_number: phone, 
      token: otp 
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  },

  async updateUserProfile(userId: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data
  }
}

// Locations API
export const locationsAPI = {
  async getAll(): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name')
    if (error) throw error
    return data || []
  },

  async search(query: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .or(`name.ilike.%${query}%,name_marathi.ilike.%${query}%,taluka.ilike.%${query}%`)
      .order('name')
    if (error) throw error
    return data || []
  }
}

// Restaurants API
export const restaurantsAPI = {
  async getByLocation(locationId: string): Promise<Restaurant[]> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('location_id', locationId)
      .eq('is_open', true)
      .order('rating', { ascending: false })
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Restaurant> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async getFoodItems(restaurantId: string): Promise<FoodItem[]> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('is_available', true)
      .order('category', { ascending: true })
    if (error) throw error
    return data || []
  }
}

// General Store API
export const generalStoreAPI = {
  async getAll(): Promise<(GeneralStoreItem & { shops: (Shop & { price_multiplier: number; distance: string })[] })[]> {
    const { data: items, error: itemsError } = await supabase
      .from('general_store_items')
      .select('*')
      .order('name')
    
    if (itemsError) throw itemsError

    // Get shop information for each item
    const itemsWithShops = await Promise.all(
      (items || []).map(async (item) => {
        const { data: shopProducts, error: shopError } = await supabase
          .from('shop_products')
          .select(`
            price_multiplier,
            distance,
            is_available,
            shops (
              id,
              name,
              phone,
              address,
              is_open
            )
          `)
          .eq('product_id', item.id)
          .eq('product_type', 'general')
          .eq('is_available', true)

        if (shopError) throw shopError

        const shops = (shopProducts || []).map(sp => ({
          ...sp.shops,
          price_multiplier: sp.price_multiplier,
          distance: sp.distance
        }))

        return { ...item, shops }
      })
    )

    return itemsWithShops
  },

  async getByCategory(category: string): Promise<(GeneralStoreItem & { shops: (Shop & { price_multiplier: number; distance: string })[] })[]> {
    const items = await this.getAll()
    if (category === 'all') return items
    return items.filter(item => item.category.toLowerCase() === category.toLowerCase())
  }
}

// Grocery Store API
export const groceryStoreAPI = {
  async getAll(): Promise<(GroceryItem & { 
    weightOptions: WeightOption[]; 
    shops: (Shop & { price_multiplier: number; distance: string })[] 
  })[]> {
    const { data: items, error: itemsError } = await supabase
      .from('grocery_items')
      .select('*')
      .order('name')
    
    if (itemsError) throw itemsError

    // Get weight options and shop information for each item
    const itemsWithDetails = await Promise.all(
      (items || []).map(async (item) => {
        // Get weight options
        const { data: weightOptions, error: weightError } = await supabase
          .from('weight_options')
          .select('*')
          .eq('grocery_item_id', item.id)
          .order('base_price')

        if (weightError) throw weightError

        // Get shop information
        const { data: shopProducts, error: shopError } = await supabase
          .from('shop_products')
          .select(`
            price_multiplier,
            distance,
            is_available,
            shops (
              id,
              name,
              phone,
              address,
              is_open
            )
          `)
          .eq('product_id', item.id)
          .eq('product_type', 'grocery')
          .eq('is_available', true)

        if (shopError) throw shopError

        const shops = (shopProducts || []).map(sp => ({
          ...sp.shops,
          price_multiplier: sp.price_multiplier,
          distance: sp.distance
        }))

        return { 
          ...item, 
          weightOptions: weightOptions || [],
          shops 
        }
      })
    )

    return itemsWithDetails
  },

  async getByCategory(category: string): Promise<(GroceryItem & { 
    weightOptions: WeightOption[]; 
    shops: (Shop & { price_multiplier: number; distance: string })[] 
  })[]> {
    const items = await this.getAll()
    if (category === 'all') return items
    return items.filter(item => item.category.toLowerCase() === category.toLowerCase())
  }
}

// Orders API
export const ordersAPI = {
  async create(orderData: {
    user_id: string;
    total_amount: number;
    delivery_address: string;
    phone: string;
    items: {
      product_id: string;
      product_type: 'food' | 'general' | 'grocery';
      product_name: string;
      product_name_marathi: string;
      quantity: number;
      unit_price: number;
      total_price: number;
      weight?: string;
      shop_name?: string;
    }[];
  }): Promise<Order> {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total_amount: orderData.total_amount,
        delivery_address: orderData.delivery_address,
        phone: orderData.phone
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Insert order items
    const orderItems = orderData.items.map(item => ({
      ...item,
      order_id: order.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return order
  },

  async getByUser(userId: string): Promise<(Order & { items: OrderItem[] })[]> {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (ordersError) throw ordersError

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      (orders || []).map(async (order) => {
        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id)

        if (itemsError) throw itemsError

        return { ...order, items: items || [] }
      })
    )

    return ordersWithItems
  },

  async updateStatus(orderId: string, status: Order['status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Search API
export const searchAPI = {
  async searchAll(query: string, locationId?: string) {
    const results = {
      restaurants: [] as Restaurant[],
      foodItems: [] as FoodItem[],
      generalItems: [] as GeneralStoreItem[],
      groceryItems: [] as GroceryItem[]
    }

    // Search restaurants
    let restaurantQuery = supabase
      .from('restaurants')
      .select('*')
      .or(`name.ilike.%${query}%,name_marathi.ilike.%${query}%`)
      .eq('is_open', true)

    if (locationId) {
      restaurantQuery = restaurantQuery.eq('location_id', locationId)
    }

    const { data: restaurants } = await restaurantQuery
    results.restaurants = restaurants || []

    // Search food items
    const { data: foodItems } = await supabase
      .from('food_items')
      .select('*')
      .or(`name.ilike.%${query}%,name_marathi.ilike.%${query}%,category.ilike.%${query}%`)
      .eq('is_available', true)

    results.foodItems = foodItems || []

    // Search general store items
    const { data: generalItems } = await supabase
      .from('general_store_items')
      .select('*')
      .or(`name.ilike.%${query}%,name_marathi.ilike.%${query}%,category.ilike.%${query}%,brand.ilike.%${query}%`)

    results.generalItems = generalItems || []

    // Search grocery items
    const { data: groceryItems } = await supabase
      .from('grocery_items')
      .select('*')
      .or(`name.ilike.%${query}%,name_marathi.ilike.%${query}%,category.ilike.%${query}%,brand.ilike.%${query}%`)

    results.groceryItems = groceryItems || []

    return results
  }
}
