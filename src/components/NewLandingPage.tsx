'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { Utensils, Globe, ArrowRight, Star, Clock, MapPin } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import AuthForm from './AuthForm'

export default function NewLandingPage() {
  const { language } = useStore()
  const t = translations[language]
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: language === 'mr' ? 'जलद डिलिव्हरी' : 'Fast Delivery',
      desc: language === 'mr' ? '30 मिनिटांत ताजे जेवण' : 'Fresh food in 30 minutes'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: language === 'mr' ? 'गुणवत्तापूर्ण जेवण' : 'Quality Food',
      desc: language === 'mr' ? 'स्थानिक रेस्टॉरंट्समधून' : 'From local restaurants'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: language === 'mr' ? 'तुमच्या गावात' : 'In Your Village',
      desc: language === 'mr' ? 'आमच्या गावातील सर्वोत्तम जेवण' : 'Best food in our village'
    }
  ]

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAuth(false)}
                className="text-gray-600 hover:text-gray-800 mb-4"
              >
                ← {t.back}
              </button>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Utensils className="w-8 h-8 text-orange-500" />
                <h1 className="text-2xl font-bold text-gray-900">VillageEats</h1>
              </div>
            </div>
            <AuthForm 
              mode={authMode} 
              onModeChange={setAuthMode}
              onSuccess={() => {
                // Authentication is handled in AuthForm via setUser
                setShowAuth(false)
              }}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Utensils className="w-8 h-8 text-orange-500" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                VillageEats
              </h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-2xl">
              <Utensils className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            {language === 'mr' ? 'गावातील' : 'Village'}{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {language === 'mr' ? 'स्वादिष्ट' : 'Delicious'}
            </span>
            <br />
            {language === 'mr' ? 'जेवण' : 'Food'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto px-4"
          >
            {language === 'mr' 
              ? 'तुमच्या आवडत्या स्थानिक रेस्टॉरंट्समधून ताजे आणि स्वादिष्ट जेवण ऑर्डर करा'
              : 'Order fresh and delicious food from your favorite local restaurants'
            }
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-4 justify-center items-center w-full max-w-sm mx-auto px-4"
          >
            <button
              onClick={() => {
                setAuthMode('register')
                setShowAuth(true)
              }}
              className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 w-full"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => {
                setAuthMode('login')
                setShowAuth(true)
              }}
              className="bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 w-full"
            >
              {t.signIn}
            </button>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-4 text-orange-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Food Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {language === 'mr' ? 'लोकप्रिय पदार्थ' : 'Popular Dishes'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '🍕', name: language === 'mr' ? 'पिझ्झा' : 'Pizza' },
              { emoji: '🍔', name: language === 'mr' ? 'बर्गर' : 'Burger' },
              { emoji: '🍛', name: language === 'mr' ? 'बिर्याणी' : 'Biryani' },
              { emoji: '🍗', name: language === 'mr' ? 'चिकन' : 'Chicken' }
            ].map((dish, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300"
              >
                <div className="text-4xl mb-2">{dish.emoji}</div>
                <p className="font-medium text-gray-700">{dish.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
