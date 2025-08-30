'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { Home, Search, ShoppingCart, Settings } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { getCartItemCount } = useStore()
  const { language, cart } = useStore()
  const t = translations[language]

  const cartCount = getCartItemCount()
  
  const tabs = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'search', label: t.search, icon: Search },
    { id: 'cart', label: t.cart, icon: ShoppingCart, badge: cartCount },
    { id: 'settings', label: t.settings, icon: Settings }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.1 }}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors relative ${
                isActive 
                  ? 'text-orange-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Icon className="w-6 h-6 mb-1" />
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
