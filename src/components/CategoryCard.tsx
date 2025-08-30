'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

interface Category {
  id: string
  name: string
  nameMarathi: string
  icon: string
  image: string
}

interface CategoryCardProps {
  category: Category
  isSelected: boolean
  onClick: () => void
}

export default function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  const { language } = useStore()
  const displayName = language === 'mr' ? category.nameMarathi : category.name

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`card cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:shadow-md'
      }`}
    >
      <div className="text-center">
        <div className="text-3xl mb-2">{category.icon}</div>
        <h3 className={`font-medium ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>
          {displayName}
        </h3>
      </div>
    </motion.div>
  )
}
