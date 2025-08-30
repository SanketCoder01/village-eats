'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { ArrowLeft, Clock, CheckCircle, Truck, Star } from 'lucide-react'

interface Order {
  id: string
  restaurantName: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'preparing' | 'on-the-way' | 'delivered'
  orderDate: string
  deliveryTime: string
  paymentMethod: 'cod' | 'online'
}

const mockOrders: Order[] = [
  {
    id: '1',
    restaurantName: 'MOJO Pizza - 2X Toppings',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 299 },
      { name: 'Ukadiche Modak (4 Pcs)', quantity: 1, price: 259 }
    ],
    totalAmount: 583,
    status: 'delivered',
    orderDate: '2024-01-15',
    deliveryTime: '45 min',
    paymentMethod: 'cod'
  },
  {
    id: '2',
    restaurantName: 'Hotel Al Zaika',
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: 350 }
    ],
    totalAmount: 725,
    status: 'on-the-way',
    orderDate: '2024-01-16',
    deliveryTime: '30 min',
    paymentMethod: 'online'
  }
]

interface MyOrdersProps {
  onBack: () => void
}

export default function MyOrders({ onBack }: MyOrdersProps) {
  const { language } = useStore()
  const t = translations[language]
  const [orders] = useState<Order[]>(mockOrders)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />
      case 'on-the-way':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Preparing'
      case 'on-the-way':
        return 'On the way'
      case 'delivered':
        return 'Delivered'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'text-orange-600 bg-orange-50'
      case 'on-the-way':
        return 'text-blue-600 bg-blue-50'
      case 'delivered':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center space-x-3">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">{t.myOrders}</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-6">
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{order.restaurantName}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.name}</span>
                      <span className="text-gray-900 font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Order Date</span>
                    <span className="text-gray-900 text-sm">{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Payment</span>
                    <span className="text-gray-900 text-sm capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-orange-600">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
                    Reorder
                  </button>
                  {order.status === 'delivered' && (
                    <button className="flex-1 bg-orange-100 text-orange-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Rate</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Place your first order to see it here</p>
            <button
              onClick={onBack}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium"
            >
              Start Ordering
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
