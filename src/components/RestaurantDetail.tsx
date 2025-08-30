'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { ArrowLeft, Star, Clock, Phone, MapPin, Plus, Minus, Share, Heart } from 'lucide-react'
import { translations } from '@/lib/translations'
import BottomNavigation from './BottomNavigation'
import toast from 'react-hot-toast'

interface RestaurantDetailProps {
  restaurant: any
  onBack: () => void
}

export default function RestaurantDetail({ restaurant, onBack }: RestaurantDetailProps) {
  const { language, addToCart, cart, activeTab, setActiveTab } = useStore()
  const t = translations[language]
  const [activeSection, setActiveSection] = useState('overview')

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleAddToCart = (item: any) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      nameMarathi: item.nameMarathi,
      price: item.price,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    }
    addToCart(cartItem)
    toast.success(t.addToCart)
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      useStore.getState().removeFromCart(itemId)
    } else {
      useStore.getState().updateQuantity(itemId, newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Share className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              {language === 'mr' ? restaurant.nameMarathi : restaurant.name}
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              {restaurant.cuisine || 'Multi-cuisine Restaurant'}
            </p>
          </div>
          <div className="flex items-center space-x-1 bg-green-500 px-2 py-1 rounded">
            <span className="text-white text-sm font-semibold">{restaurant.rating}</span>
            <Star className="w-3 h-3 text-white fill-current" />
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{restaurant.deliveryTime || restaurant.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">2.5 km</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">+91 98765 43210</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
            Direction
          </button>
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
            Share
          </button>
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
            Reviews
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex">
          {['overview', 'menu', 'reviews', 'photos'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${
                activeSection === section
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        {activeSection === 'overview' && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">About this place</h3>
            <p className="text-gray-600 text-sm mb-4">
              {language === 'mr' 
                ? 'हे रेस्टॉरंट स्वादिष्ट आणि ताजे जेवण देते. आमच्याकडे विविध प्रकारचे पदार्थ उपलब्ध आहेत.'
                : 'This restaurant serves delicious and fresh food. We have a variety of dishes available for you to enjoy.'
              }
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Village Center, Near Bus Stand</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Open: 9:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'menu' && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Menu</h3>
            <div className="space-y-4">
              {(restaurant.menu || []).map((item: any, index: number) => {
                const quantity = getItemQuantity(item.id)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {language === 'mr' ? item.nameMarathi : item.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                    </div>
                    <div className="ml-4 flex flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mb-2"
                      />
                      {quantity === 0 ? (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-20 bg-orange-500 text-white py-1 rounded-lg text-sm font-medium"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center justify-between w-20 bg-orange-500 text-white rounded-lg p-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium">{quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Rahul S.</span>
                </div>
                <p className="text-sm text-gray-700">Great food quality and fast delivery!</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4].map(star => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-600">Priya M.</span>
                </div>
                <p className="text-sm text-gray-700">Good taste, reasonable prices.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'photos' && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Photos</h3>
            <div className="grid grid-cols-2 gap-2">
              {restaurant.menu.map((item: any) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'home') {
            onBack()
          } else {
            setActiveTab(tab)
          }
        }}
      />
    </div>
  )
}
