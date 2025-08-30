'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { User, Phone, Mail, LogOut, Globe, ChevronRight } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

export default function SettingsPage() {
  const { language, user, setUser } = useStore()
  const t = translations[language]

  const handleLogout = () => {
    setUser(null)
    window.location.href = '/'
  }

  const menuItems = [
    {
      icon: User,
      label: t.profile,
      value: user?.name || 'Guest User',
      onClick: () => {}
    },
    {
      icon: Mail,
      label: t.email,
      value: user?.email || 'Not provided',
      onClick: () => {}
    },
    {
      icon: Phone,
      label: t.phone,
      value: user?.phone || 'Not provided',
      onClick: () => {}
    }
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {user?.name || 'Guest User'}
        </h2>
        <p className="text-gray-600">{user?.email || 'Welcome to VillageEats'}</p>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="font-bold text-lg text-gray-900 mb-4">{t.profile}</h3>
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={item.onClick}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.value}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Language Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-5 h-5 text-gray-500" />
          <h3 className="font-bold text-lg text-gray-900">Language</h3>
        </div>
        <LanguageSelector />
      </motion.div>

      {/* App Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="font-bold text-lg text-gray-900 mb-4">About VillageEats</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Version 1.0.0</p>
          <p>Fresh food delivered to your village</p>
          <p>© 2024 VillageEats. All rights reserved.</p>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        <LogOut className="w-5 h-5" />
        <span>{t.logout}</span>
      </motion.button>
    </div>
  )
}
