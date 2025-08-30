'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { ArrowLeft, Heart, Users, MapPin, Phone, Mail } from 'lucide-react'

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const { language } = useStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center space-x-3">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {language === 'mr' ? 'अॅपबद्दल' : 'About VillageEats'}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">VE</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">VillageEats</h2>
            <p className="text-gray-600">
              {language === 'mr' 
                ? 'आवृत्ती 1.0.0' 
                : 'Version 1.0.0'
              }
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === 'mr' ? 'आमचे ध्येय' : 'Our Mission'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'mr' 
                    ? 'गावातील लोकांसाठी खाद्यपदार्थ, किराणा आणि जनरल स्टोअरच्या वस्तू घरपोच पोहोचवणे.' 
                    : 'Bringing food, groceries, and general store items to villagers at their doorstep.'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === 'mr' ? 'आमच्याबद्दल' : 'About Us'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'mr' 
                    ? 'VillageEats हे महाराष्ट्रातील गावांसाठी विशेष डिझाइन केलेले अॅप आहे. आम्ही स्थानिक व्यापाऱ्यांना डिजिटल प्लॅटफॉर्मवर आणत आहोत.' 
                    : 'VillageEats is specially designed for villages in Maharashtra. We are bringing local merchants to the digital platform.'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === 'mr' ? 'सेवा क्षेत्र' : 'Service Area'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'mr' 
                    ? 'सध्या आम्ही महाराष्ट्रातील सर्व तालुके आणि गावांमध्ये सेवा देत आहोत.' 
                    : 'Currently serving all talukas and villages across Maharashtra.'
                  }
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'mr' ? 'वैशिष्ट्ये' : 'Features'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700 text-sm">
                {language === 'mr' ? 'द्विभाषिक समर्थन (मराठी/इंग्रजी)' : 'Bilingual Support (Marathi/English)'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700 text-sm">
                {language === 'mr' ? 'खाद्यपदार्थ, किराणा आणि जनरल स्टोअर' : 'Food, Grocery & General Store'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700 text-sm">
                {language === 'mr' ? 'घरपोच डिलिव्हरी' : 'Home Delivery'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700 text-sm">
                {language === 'mr' ? 'सुरक्षित पेमेंट' : 'Secure Payment'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'mr' ? 'संपर्क' : 'Contact Us'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700 text-sm">+91 8071281897</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700 text-sm">support@villageeats.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700 text-sm">
                {language === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra, India'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
