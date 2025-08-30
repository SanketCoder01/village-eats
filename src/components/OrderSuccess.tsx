'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Home } from 'lucide-react'

interface OrderSuccessProps {
  orderDetails: {
    orderId: string
    totalAmount: number
    estimatedTime: string
    paymentMethod: string
  }
  onGoHome: () => void
}

export default function OrderSuccess({ orderDetails, onGoHome }: OrderSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center relative"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Your delicious food is on its way</p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3"
        >
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID</span>
            <span className="font-bold text-gray-900">#{orderDetails.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-bold text-orange-600">₹{orderDetails.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Time</span>
            <span className="font-bold text-gray-900">{orderDetails.estimatedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment</span>
            <span className="font-bold text-gray-900 capitalize">
              {orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={onGoHome}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Home</span>
          </button>
          
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium">
            Track Order
          </button>
        </motion.div>

        {/* Celebration Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className="absolute -top-4 -right-4 text-4xl"
        >
          🎉
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="absolute -bottom-4 -left-4 text-4xl"
        >
          🎊
        </motion.div>
      </motion.div>
    </div>
  )
}
