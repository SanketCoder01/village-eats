'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { MapPin, Search, X } from 'lucide-react'

const maharashtraLocations = [
  'Pune, Maharashtra',
  'Mumbai, Maharashtra', 
  'Nashik, Maharashtra',
  'Aurangabad, Maharashtra',
  'Solapur, Maharashtra',
  'Kolhapur, Maharashtra',
  'Sangli, Maharashtra',
  'Satara, Maharashtra',
  'Ahmednagar, Maharashtra',
  'Latur, Maharashtra',
  'Osmanabad, Maharashtra',
  'Beed, Maharashtra',
  'Nanded, Maharashtra',
  'Parbhani, Maharashtra',
  'Jalna, Maharashtra',
  'Buldhana, Maharashtra',
  'Akola, Maharashtra',
  'Washim, Maharashtra',
  'Amravati, Maharashtra',
  'Wardha, Maharashtra',
  'Nagpur, Maharashtra',
  'Bhandara, Maharashtra',
  'Gondia, Maharashtra',
  'Chandrapur, Maharashtra',
  'Gadchiroli, Maharashtra',
  'Yavatmal, Maharashtra',
  'Hingoli, Maharashtra',
  'Jalgaon, Maharashtra',
  'Dhule, Maharashtra',
  'Nandurbar, Maharashtra',
  'Raigad, Maharashtra',
  'Ratnagiri, Maharashtra',
  'Sindhudurg, Maharashtra',
  'Thane, Maharashtra',
  'Palghar, Maharashtra'
]

interface LocationSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export default function LocationSelector({ isOpen, onClose }: LocationSelectorProps) {
  const { selectedLocation, setLocation } = useStore()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLocations = maharashtraLocations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLocationSelect = (location: string) => {
    setLocation(location)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Select Location</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for your area, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-96">
              {filteredLocations.map((location, index) => (
                <motion.button
                  key={location}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 flex items-center space-x-3 ${
                    selectedLocation === location ? 'bg-orange-50 border-orange-200' : ''
                  }`}
                >
                  <MapPin className={`w-5 h-5 ${selectedLocation === location ? 'text-orange-500' : 'text-gray-400'}`} />
                  <span className={`${selectedLocation === location ? 'text-orange-600 font-medium' : 'text-gray-700'}`}>
                    {location}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
