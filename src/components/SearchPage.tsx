'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { Search, ArrowLeft, Filter } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

const searchResults = [
  'Pizza',
  'Burger', 
  'Biryani',
  'Chinese',
  'North Indian',
  'South Indian',
  'Fast Food',
  'Desserts',
  'Beverages',
  'MOJO Pizza',
  'Hotel Al Zaika',
  'Dominos',
  'KFC',
  'McDonald\'s'
]

interface SearchPageProps {
  onBack: () => void
}

export default function SearchPage({ onBack }: SearchPageProps) {
  const { language, searchQuery, setSearchQuery } = useStore()
  const t = translations[language]
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const [filteredResults, setFilteredResults] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>(['Pizza', 'Biryani', 'Chinese'])

  useEffect(() => {
    if (localQuery.trim()) {
      const filtered = searchResults.filter(item => 
        item.toLowerCase().includes(localQuery.toLowerCase())
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults([])
    }
  }, [localQuery, language])

  const handleSearch = (query: string) => {
    setLocalQuery(query)
    setSearchQuery(query)
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 4)])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{t.search}</h1>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
          </div>

          <div className="flex space-x-3">
            <button className="px-3 py-2 bg-gray-100 rounded-full flex items-center space-x-1">
              <Filter className="w-4 h-4" />
              <span className="text-sm">{t.filters}</span>
            </button>
            <button className="px-3 py-2 bg-gray-100 rounded-full">
              <span className="text-sm">{t.pureVeg}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Results or History */}
      <div className="px-4 py-6">
        {localQuery.trim() ? (
          filteredResults.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Search Results</h3>
              {filteredResults.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSearch(item)}
                  className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{item}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.noResultsFound}</h3>
              <p className="text-gray-600">{t.trySearchingElse}</p>
            </div>
          )
        ) : (
          <div className="space-y-6">
            {/* Recent Searches */}
            {searchHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Searches</h3>
                <div className="space-y-3">
                  {searchHistory.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSearch(item)}
                      className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-4 h-4 text-gray-500" />
                        </div>
                        <span className="text-gray-900">{item}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Searches</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Pizza', 'Biryani', 'Chinese', 'Burger', 'North Indian', 'Fast Food'].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSearch(item)}
                    className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-orange-50 hover:border-orange-200"
                  >
                    <span className="text-gray-900 font-medium">{item}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="search" onTabChange={() => {}} />
    </div>
  )
}
