'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Star, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Restaurant {
  id: string
  name: string
  nameMarathi: string
  image: string
  rating: number
  deliveryTime: string
  categories: string[]
  menu: any[]
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { language } = useStore()
  const router = useRouter()
  const displayName = language === 'mr' ? restaurant.nameMarathi : restaurant.name

  const handleClick = () => {
    router.push(`/restaurant/${restaurant.id}`)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="card cursor-pointer hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">{displayName}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {restaurant.categories.slice(0, 2).map((categoryId) => (
            <span
              key={categoryId}
              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
            >
              Category {categoryId}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
