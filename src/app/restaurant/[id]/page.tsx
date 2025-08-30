'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { restaurants } from '@/lib/sampleData'
import { ArrowLeft, Star, Clock, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const { language, addToCart, cart, updateQuantity } = useStore()
  const t = translations[language]
  
  const restaurant = restaurants.find(r => r.id === params.id)
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
          <button
            onClick={() => router.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const displayName = language === 'mr' ? restaurant.nameMarathi : restaurant.name

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId)
    return cartItem?.quantity || 0
  }

  const handleAddToCart = (item: any) => {
    const displayItemName = language === 'mr' ? item.nameMarathi : item.name
    addToCart({
      id: item.id,
      name: displayItemName,
      price: item.price,
      restaurantId: restaurant.id,
      image: item.image
    })
    toast.success(`${displayItemName} added to cart!`)
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
    if (newQuantity === 0) {
      toast.success('Item removed from cart')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.back()}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="mr-3">{restaurant.rating}</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Image */}
      <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
        <span className="text-6xl">🍽️</span>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
        
        <div className="space-y-4">
          {restaurant.menu.map((item, index) => {
            const displayItemName = language === 'mr' ? item.nameMarathi : item.name
            const quantity = getItemQuantity(item.id)
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{displayItemName}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <p className="font-bold text-orange-600">₹{item.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {quantity === 0 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(item)}
                        className="btn-primary"
                      >
                        {t.addToCart}
                      </motion.button>
                    ) : (
                      <div className="flex items-center space-x-3 bg-orange-500 text-white rounded-lg px-3 py-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-orange-600 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="font-bold min-w-[20px] text-center">{quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-orange-600 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
                <p className="text-orange-600 font-bold">
                  ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/cart')}
                className="btn-primary"
              >
                View Cart
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
