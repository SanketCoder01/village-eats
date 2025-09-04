'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Clock } from 'lucide-react'

interface CartPageProps {
  onBack: () => void
}

export default function CartPage({ onBack }: CartPageProps) {
  const { language, cart, updateQuantity, removeFromCart, getCartTotal, getCartItemCount, selectedLocation, clearCart } = useStore()
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod')

  const deliveryFee = 25
  const platformFee = 5
  const gst = Math.round(getCartTotal() * 0.05) // 5% GST
  const totalAmount = getCartTotal() + deliveryFee + platformFee + gst

  const [orderDetails, setOrderDetails] = useState<any>(null)

  const handleOrderSuccess = (details: any) => {
    setShowCheckout(false)
    setOrderDetails(details)
    setShowSuccess(true)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center space-x-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{language === 'mr' ? 'कार्ट' : 'Cart'}</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 text-center mb-6">Add some delicious food to get started</p>
          <button
            onClick={onBack}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium"
          >
            Browse Restaurants
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center space-x-3">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">{language === 'mr' ? 'कार्ट' : 'Cart'} ({getCartItemCount()})</h1>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          <span className="font-medium text-gray-900">{language === 'mr' ? 'डिलिव्हरी' : 'Delivery to'}</span>
        </div>
        <p className="text-gray-700 ml-8">{selectedLocation}</p>
        <div className="flex items-center space-x-3 mt-2 ml-8">
          <Clock className="w-4 h-4 text-green-500" />
          <span className="text-green-600 text-sm font-medium">30-40 min</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Order Summary</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {cart.map((item, index) => {
              const displayName = language === 'mr' ? item.nameMarathi : item.name
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 flex items-center space-x-4"
                >
                  <img 
                    src={item.image} 
                    alt={displayName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{displayName}</h3>
                    <p className="text-gray-600 text-sm">{item.restaurantName}</p>
                    <p className="text-orange-600 font-bold">₹{item.price}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-100 rounded-l-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 font-bold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-100 rounded-r-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bill Details */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-bold text-gray-900 mb-4">Bill Details</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Item Total</span>
              <span className="text-gray-900">₹{getCartTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee</span>
              <span className="text-gray-900">₹{platformFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST</span>
              <span className="text-gray-900">₹{gst}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-bold text-orange-600">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={() => setShowCheckout(true)}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg"
        >
          Proceed to Checkout • ₹{totalAmount}
        </button>
      </div>

      {/* Simplified checkout for now */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 m-4 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Checkout</h3>
            <p className="text-gray-600 mb-4">Total: ₹{totalAmount}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCheckout(false)
                  clearCart()
                  onBack()
                }}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
