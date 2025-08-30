import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wbafbeeblwnofwmafcdn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiYWZiZWVibHdub2Z3bWFmY2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzY0MzQsImV4cCI6MjA3MjE1MjQzNH0.oYekjXqLdoobHX2w8Tu1zRfs4uNWUtcwPeH-7Czdyv8'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiYWZiZWVibHdub2Z3bWFmY2RuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU3NjQzNCwiZXhwIjoyMDcyMTUyNDM0fQ.mQ131JFKgoZPs3KbCWvBz8-ofKeFRQI0sb_v4W3UjPc'

// Client for browser usage (with anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (with service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          phone: string
          name: string
          name_marathi: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          phone: string
          name: string
          name_marathi?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          phone?: string
          name?: string
          name_marathi?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          name_marathi: string
          taluka: string
          district: string
          state: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          name_marathi: string
          taluka: string
          district: string
          state: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_marathi?: string
          taluka?: string
          district?: string
          state?: string
          created_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          name: string
          name_marathi: string
          image: string
          rating: number
          delivery_time: string
          location_id: string
          phone: string | null
          address: string | null
          is_open: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_marathi: string
          image: string
          rating?: number
          delivery_time: string
          location_id: string
          phone?: string | null
          address?: string | null
          is_open?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_marathi?: string
          image?: string
          rating?: number
          delivery_time?: string
          location_id?: string
          phone?: string | null
          address?: string | null
          is_open?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      food_items: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          name_marathi: string
          image: string
          price: number
          category: string
          category_marathi: string
          description: string | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          name_marathi: string
          image: string
          price: number
          category: string
          category_marathi: string
          description?: string | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          name_marathi?: string
          image?: string
          price?: number
          category?: string
          category_marathi?: string
          description?: string | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      general_store_items: {
        Row: {
          id: string
          name: string
          name_marathi: string
          image: string
          category: string
          category_marathi: string
          brand: string
          rating: number
          delivery_time: string
          base_price: number
          discount: number
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_marathi: string
          image: string
          category: string
          category_marathi: string
          brand: string
          rating?: number
          delivery_time: string
          base_price: number
          discount?: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_marathi?: string
          image?: string
          category?: string
          category_marathi?: string
          brand?: string
          rating?: number
          delivery_time?: string
          base_price?: number
          discount?: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      grocery_items: {
        Row: {
          id: string
          name: string
          name_marathi: string
          image: string
          category: string
          category_marathi: string
          brand: string
          rating: number
          delivery_time: string
          discount: number
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_marathi: string
          image: string
          category: string
          category_marathi: string
          brand: string
          rating?: number
          delivery_time: string
          discount?: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_marathi?: string
          image?: string
          category?: string
          category_marathi?: string
          brand?: string
          rating?: number
          delivery_time?: string
          discount?: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      weight_options: {
        Row: {
          id: string
          grocery_item_id: string
          weight: string
          base_price: number
          created_at: string
        }
        Insert: {
          id?: string
          grocery_item_id: string
          weight: string
          base_price: number
          created_at?: string
        }
        Update: {
          id?: string
          grocery_item_id?: string
          weight?: string
          base_price?: number
          created_at?: string
        }
      }
      shops: {
        Row: {
          id: string
          name: string
          location_id: string
          phone: string | null
          address: string | null
          is_open: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location_id: string
          phone?: string | null
          address?: string | null
          is_open?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location_id?: string
          phone?: string | null
          address?: string | null
          is_open?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      shop_products: {
        Row: {
          id: string
          shop_id: string
          product_id: string
          product_type: 'general' | 'grocery'
          price_multiplier: number
          distance: string
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          product_id: string
          product_type: 'general' | 'grocery'
          price_multiplier: number
          distance: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shop_id?: string
          product_id?: string
          product_type?: 'general' | 'grocery'
          price_multiplier?: number
          distance?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'
          delivery_address: string
          phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'
          delivery_address: string
          phone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'
          delivery_address?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_type: 'food' | 'general' | 'grocery'
          product_name: string
          product_name_marathi: string
          quantity: number
          unit_price: number
          total_price: number
          weight: string | null
          shop_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_type: 'food' | 'general' | 'grocery'
          product_name: string
          product_name_marathi: string
          quantity: number
          unit_price: number
          total_price: number
          weight?: string | null
          shop_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_type?: 'food' | 'general' | 'grocery'
          product_name?: string
          product_name_marathi?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          weight?: string | null
          shop_name?: string | null
          created_at?: string
        }
      }
    }
  }
}
