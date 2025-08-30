'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { restaurantsAPI, locationsAPI } from '@/lib/api'
import { requestNotificationPermission, isNotificationSupported } from '@/lib/notifications'
import { Search, Bell, MapPin, Star, Clock, Plus, Minus, Store, ShoppingCart, User, Filter } from 'lucide-react'
import BottomNavigation from './BottomNavigation'
import SearchPage from './SearchPage'
import GeneralStorePage from './GeneralStorePage'
import GroceryStorePage from './GroceryStorePage'
import RestaurantDetail from './RestaurantDetail'
import LocationPicker from './LocationPicker'
import CartPage from './CartPage'
import ProfilePage from './ProfilePage'

const foodCategories = [
  { id: '1', name: 'Pizza', nameMarathi: 'पिझ्झा', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop', color: 'from-red-400 to-red-600' },
  { id: '2', name: 'Burger', nameMarathi: 'बर्गर', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop', color: 'from-yellow-400 to-orange-500' },
  { id: '3', name: 'Biryani', nameMarathi: 'बिर्याणी', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=400&fit=crop', color: 'from-orange-400 to-red-500' },
  { id: '4', name: 'Cake', nameMarathi: 'केक', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', color: 'from-pink-400 to-purple-500' },
  { id: '5', name: 'Chicken', nameMarathi: 'चिकन', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop', color: 'from-amber-400 to-red-500' },
  { id: '6', name: 'Sandwich', nameMarathi: 'सँडविच', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=400&fit=crop', color: 'from-green-400 to-blue-500' },
  { id: '7', name: 'Rolls', nameMarathi: 'रोल्स', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop', color: 'from-yellow-400 to-red-500' },
  { id: '8', name: 'North Indian', nameMarathi: 'उत्तर भारतीय', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop', color: 'from-orange-400 to-red-600' }
]

const topBrands = [
  { 
    id: '1', 
    name: 'McDonald\'s', 
    nameMarathi: 'मॅकडोनाल्ड्स',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop',
    rating: 4.3, 
    time: '20 min',
    cuisine: 'Burgers, Fast Food',
    price: '₹150 for one',
    offer: '₹125 OFF'
  },
  { 
    id: '2', 
    name: 'KFC', 
    nameMarathi: 'केएफसी',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=600&h=400&fit=crop',
    rating: 4.1, 
    time: '30 min',
    cuisine: 'Chicken, Fast Food',
    price: '₹300 for one',
    offer: '₹100 OFF'
  },
  { 
    id: '3', 
    name: 'Domino\'s Pizza', 
    nameMarathi: 'डोमिनोज पिझ्झा',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    rating: 4.2, 
    time: '25 min',
    cuisine: 'North Indian, Chinese, Biryani',
    price: '₹200 for one',
    offer: '₹400 OFF'
  }
]


export default function NewDashboard() {
  const { language, selectedLocation, activeTab, setActiveTab } = useStore()
  const t = translations[language]
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notificationRequested, setNotificationRequested] = useState(false)
  const [showGeneralStore, setShowGeneralStore] = useState(false)
  const [showGroceryStore, setShowGroceryStore] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('food')
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch restaurants from Supabase
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        if (selectedLocation && typeof selectedLocation === 'object' && 'id' in selectedLocation) {
          const data = await restaurantsAPI.getByLocation((selectedLocation as any).id)
          setRestaurants(data)
        } else {
          // Use fallback location if none selected
          const locations = await locationsAPI.getAll()
          if (locations.length > 0) {
            const data = await restaurantsAPI.getByLocation(locations[0].id)
            setRestaurants(data)
          }
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error)
        setRestaurants([])
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [selectedLocation])

  // Request notification permission on component mount
  useEffect(() => {
    const requestPermission = async () => {
      if (isNotificationSupported() && !notificationRequested) {
        const granted = await requestNotificationPermission()
        setNotificationRequested(true)
        if (granted) {
          console.log('Notification permission granted')
        }
      }
    }
    
    // Delay the request slightly to avoid interrupting the initial load
    const timer = setTimeout(requestPermission, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (selectedRestaurant) {
    return (
      <RestaurantDetail 
        restaurant={selectedRestaurant} 
        onBack={() => setSelectedRestaurant(null)} 
      />
    )
  }

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />
  }

  if (activeTab === 'search') {
    return <SearchPage onBack={() => setActiveTab('home')} />
  }

  if (activeTab === 'cart') {
    return <CartPage onBack={() => setActiveTab('home')} />
  }

  if (activeTab === 'settings') {
    return <ProfilePage onBack={() => setActiveTab('home')} />
  }

  if (showGeneralStore) {
    return <GeneralStorePage onBack={() => setShowGeneralStore(false)} />
  }

  if (showGroceryStore) {
    return <GroceryStorePage onBack={() => setShowGroceryStore(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">VE</span>
              </div>
              <span className="text-xl font-bold text-gray-900">VillageEats</span>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"
            >
              <User className="w-5 h-5 text-orange-600" />
            </button>
          </div>

          <LocationPicker />

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              onClick={() => setActiveTab('search')}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-full">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
            <button className="px-3 py-2 bg-gray-100 rounded-full">
              <span className="text-sm">Pure Veg</span>
            </button>
            <button className="px-3 py-2 bg-gray-100 rounded-full">
              <span className="text-sm">Cuisines</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedCategory('food')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === 'food'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🍕</span>
                <span>{language === 'mr' ? 'खाद्यपदार्थ' : 'Food'}</span>
              </div>
            </button>
            <button
              onClick={() => setShowGeneralStore(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === 'general'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Store className="w-4 h-4" />
                <span>{language === 'mr' ? 'जनरल स्टोअर' : 'General Store'}</span>
              </div>
            </button>
            <button
              onClick={() => setShowGroceryStore(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === 'grocery'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>{language === 'mr' ? 'किराणा' : 'Grocery'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content based on selected category */}
        {selectedCategory === 'food' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'mr' ? 'तुमच्या पहिल्या ऑर्डरसाठी प्रेरणा' : 'Inspiration for your first order'}
            </h2>
          <div className="grid grid-cols-4 gap-4">
            {foodCategories.map((category, index) => {
              const displayName = language === 'mr' ? category.nameMarathi : category.name
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full mb-2 mx-auto shadow-lg overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{displayName}</p>
                </motion.div>
              )
            })}
          </div>
          <div className="text-center mt-4">
            <button className="text-orange-500 text-sm font-medium">see more ▼</button>
          </div>
        </div>
        )}

        {/* General Store Section */}
        {selectedCategory === 'general' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'mr' ? 'जनरल स्टोअर आयटम' : 'General Store Items'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Placeholder for general store items - will be loaded from Supabase */}
              <div className="text-center py-8 col-span-2">
                <p className="text-gray-500">
                  {language === 'mr' ? 'जनरल स्टोअर लोड होत आहे...' : 'Loading general store items...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Grocery Store Section */}
        {selectedCategory === 'grocery' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'mr' ? 'किराणा दुकान आयटम' : 'Grocery Store Items'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Placeholder for grocery items - will be loaded from Supabase */}
              <div className="text-center py-8 col-span-2">
                <p className="text-gray-500">
                  {language === 'mr' ? 'किराणा दुकान लोड होत आहे...' : 'Loading grocery items...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Restaurants Section */}
        {selectedCategory === 'food' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'mr' ? 'टॉप रेस्टॉरंट्स' : 'Top Restaurants'}
              </h2>
              <button className="text-orange-500 text-sm font-medium">
                {language === 'mr' ? 'सर्व पहा' : 'see all'}
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {language === 'mr' ? 'रेस्टॉरंट्स लोड होत आहेत...' : 'Loading restaurants...'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {restaurants.slice(0, 3).map((restaurant: any, index: number) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer"
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    <img 
                      src={restaurant.image_url || '/placeholder-restaurant.jpg'} 
                      alt={restaurant.name} 
                      className="w-full h-32 object-cover rounded-lg mb-3" 
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'mr' ? restaurant.name_marathi || restaurant.name : restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ⭐ {restaurant.rating || 4.5} • {restaurant.delivery_time || '30-45'} min
                    </p>
                    <p className="text-xs text-gray-500">{restaurant.cuisine_type}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Top Brands Section - Only show for food */}
        {selectedCategory === 'food' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'mr' ? 'तुमच्यासाठी टॉप ब्रँड्स' : 'Top brands for you'}
            </h2>
            <div className="space-y-4">
              {topBrands.map((brand: any, index: number) => {
                const displayName = language === 'mr' ? brand.nameMarathi : brand.name
                return (
                  <motion.div
                    key={brand.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedRestaurant(brand)}
                  >
                    <div className="relative">
                      <img 
                        src={brand.image} 
                        alt={displayName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {brand.offer}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{displayName}</h3>
                      <p className="text-gray-600 text-sm mb-2">{brand.cuisine}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-green-600 font-bold text-sm">{brand.rating}★</span>
                          <span className="text-gray-600 text-sm">{brand.time}</span>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{brand.price}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab)
        if (tab === 'settings') {
          setShowProfile(true)
        }
      }} />
    </div>
  )
}
