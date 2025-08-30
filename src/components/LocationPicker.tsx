'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { MapPin, Search, X, Navigation, ChevronDown } from 'lucide-react'

const maharashtraLocations = [
  { taluka: 'Pune', village: 'Pune City', district: 'Pune' },
  { taluka: 'Pimpri-Chinchwad', village: 'Pimpri', district: 'Pune' },
  { taluka: 'Baramati', village: 'Baramati', district: 'Pune' },
  { taluka: 'Maval', village: 'Lonavala', district: 'Pune' },
  { taluka: 'Shirur', village: 'Shirur', district: 'Pune' },
  { taluka: 'Mumbai City', village: 'Mumbai', district: 'Mumbai' },
  { taluka: 'Thane', village: 'Thane', district: 'Thane' },
  { taluka: 'Nashik', village: 'Nashik', district: 'Nashik' },
  { taluka: 'Aurangabad', village: 'Aurangabad', district: 'Aurangabad' },
  { taluka: 'Kolhapur', village: 'Kolhapur', district: 'Kolhapur' },
  { taluka: 'Sangli', village: 'Sangli', district: 'Sangli' },
  { taluka: 'Satara', village: 'Satara', district: 'Satara' },
  { taluka: 'Solapur', village: 'Solapur', district: 'Solapur' },
  { taluka: 'Ahmednagar', village: 'Ahmednagar', district: 'Ahmednagar' },
  { taluka: 'Latur', village: 'Latur', district: 'Latur' },
  { taluka: 'Osmanabad', village: 'Osmanabad', district: 'Osmanabad' },
  { taluka: 'Nanded', village: 'Nanded', district: 'Nanded' },
  { taluka: 'Parbhani', village: 'Parbhani', district: 'Parbhani' },
  { taluka: 'Jalna', village: 'Jalna', district: 'Jalna' },
  { taluka: 'Beed', village: 'Beed', district: 'Beed' }
]

export default function LocationPicker() {
  const { language, selectedLocation, setSelectedLocation, showLocationPicker, setShowLocationPicker } = useStore()
  const t = translations[language]
  const [searchQuery, setSearchQuery] = useState('')
  const [isDetecting, setIsDetecting] = useState(false)

  const filteredLocations = maharashtraLocations.filter(location =>
    location.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.taluka.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.district.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLocationSelect = (location: typeof maharashtraLocations[0]) => {
    const locationString = `${location.village}, ${location.taluka}, ${location.district}`
    setSelectedLocation(locationString)
    setShowLocationPicker(false)
    setSearchQuery('')
  }

  const detectCurrentLocation = () => {
    setIsDetecting(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          // For now, we'll just set a default location
          setSelectedLocation('Current Location, Pune, Maharashtra')
          setIsDetecting(false)
          setShowLocationPicker(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsDetecting(false)
        }
      )
    } else {
      setIsDetecting(false)
    }
  }

  if (!showLocationPicker) {
    return (
      <button
        onClick={() => setShowLocationPicker(true)}
        className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 max-w-xs"
      >
        <MapPin className="w-4 h-4 text-orange-500" />
        <div className="flex-1 text-left">
          <p className="text-xs text-gray-500">{language === 'mr' ? 'स्थान' : 'Location'}</p>
          <p className="text-sm font-medium text-gray-900 truncate">{selectedLocation}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center"
        onClick={() => setShowLocationPicker(false)}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          className="bg-white w-full max-w-md mx-4 rounded-t-2xl sm:rounded-2xl max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              {language === 'mr' ? 'स्थान निवडा' : 'Select Location'}
            </h2>
            <button
              onClick={() => setShowLocationPicker(false)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Current Location Button */}
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={detectCurrentLocation}
              disabled={isDetecting}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>
                {isDetecting 
                  ? (language === 'mr' ? 'शोधत आहे...' : 'Detecting...') 
                  : (language === 'mr' ? 'सध्याचे स्थान वापरा' : 'Use Current Location')
                }
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'mr' ? 'गाव, तालुका किंवा पत्ता शोधा' : 'Search village, taluka or address'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Location List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                {language === 'mr' ? 'महाराष्ट्रातील स्थाने' : 'Locations in Maharashtra'}
              </h3>
              <div className="space-y-2">
                {filteredLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{location.village}</p>
                        <p className="text-sm text-gray-600">{location.taluka}, {location.district}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {filteredLocations.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {language === 'mr' ? 'कोणतेही स्थान सापडले नाही' : 'No locations found'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
