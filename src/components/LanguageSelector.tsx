'use client'

import { useStore } from '@/store/useStore'
import { translations, Language } from '@/lib/translations'
import { motion } from 'framer-motion'

export default function LanguageSelector() {
  const { language, setLanguage } = useStore()
  const t = translations[language]

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-medium text-gray-700">{t.selectLanguage}</h3>
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage('en')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            language === 'en'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          English
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage('mr')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            language === 'mr'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          मराठी
        </motion.button>
      </div>
    </div>
  )
}
