'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { ArrowLeft, Search, Filter, Star, Clock, Plus } from 'lucide-react'
// import ProductDetailModal from './ProductDetailModal' // Temporarily disabled
import BottomNavigation from './BottomNavigation'

interface GeneralStorePageProps {
  onBack: () => void
}

const generalStoreProducts = [
  {
    id: 'gs1',
    name: 'Classmate Notebook',
    nameMarathi: 'क्लासमेट नोटबुक',
    basePrice: 25,
    image: '/api/placeholder/150/150',
    category: 'stationery',
    description: 'Single ruled notebook, 172 pages',
    descriptionMarathi: 'एकल रुल्ड नोटबुक, १७२ पृष्ठे',
    shops: [
      { name: 'Patil Stationery', distance: '0.2 km', basePrice: 25 },
      { name: 'Village Store', distance: '0.5 km', basePrice: 23 },
      { name: 'New Book Shop', distance: '0.8 km', basePrice: 27 }
    ]
  },
  {
    id: 'gs2',
    name: 'Reynolds Pen Set',
    nameMarathi: 'रेनॉल्ड्स पेन सेट',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    category: 'Stationery',
    categoryMarathi: 'लेखन साहित्य',
    brand: 'Reynolds',
    rating: 4.5,
    deliveryTime: '10 mins',
    shops: [
      { name: 'Patil Stationery', basePrice: 45, distance: '0.5 km' },
      { name: 'Village Store', basePrice: 50, distance: '1.2 km' },
      { name: 'New Book Shop', basePrice: 48, distance: '2.1 km' }
    ],
    description: 'Blue ink ball pen set of 5 pieces'
  },
  {
    id: 'gs3',
    name: 'Yoga Mat',
    nameMarathi: 'योग चटई',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    category: 'Sports',
    categoryMarathi: 'खेळ',
    brand: 'Decathlon',
    rating: 4.2,
    deliveryTime: '15 mins',
    shops: [
      { name: 'Sports Corner', basePrice: 150, distance: '0.8 km' },
      { name: 'Fitness Store', basePrice: 140, distance: '1.5 km' },
      { name: 'Village Store', basePrice: 160, distance: '1.2 km' }
    ],
    description: 'Non-slip yoga and exercise mat'
  },
  {
    id: 'gs4',
    name: 'Cotton Cap',
    nameMarathi: 'कापसाची टोपी',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    category: 'Clothing',
    categoryMarathi: 'कपडे',
    brand: 'Adidas',
    rating: 4.1,
    deliveryTime: '12 mins',
    shops: [
      { name: 'Fashion Hub', basePrice: 80, distance: '0.7 km' },
      { name: 'Style Store', basePrice: 85, distance: '1.0 km' },
      { name: 'Village Store', basePrice: 90, distance: '1.2 km' }
    ],
    description: 'Comfortable cotton baseball cap'
  },
  {
    id: 'gs5',
    name: 'School Bag',
    nameMarathi: 'शाळेची बॅग',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Bags',
    categoryMarathi: 'बॅग',
    brand: 'VIP',
    rating: 4.4,
    deliveryTime: '15 mins',
    shops: [
      { name: 'Bag House', basePrice: 450, distance: '0.6 km' },
      { name: 'Student Store', basePrice: 420, distance: '1.1 km' },
      { name: 'Village Store', basePrice: 480, distance: '1.2 km' }
    ],
    description: 'Durable school backpack with multiple compartments'
  },
  {
    id: 'gs6',
    name: 'Water Bottle',
    nameMarathi: 'पाण्याची बाटली',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    category: 'Kitchen',
    categoryMarathi: 'स्वयंपाकघर',
    brand: 'Milton',
    rating: 4.6,
    deliveryTime: '10 mins',
    shops: [
      { name: 'Kitchen Store', basePrice: 120, distance: '0.4 km' },
      { name: 'Home Needs', basePrice: 115, distance: '0.9 km' },
      { name: 'Village Store', basePrice: 125, distance: '1.2 km' }
    ],
    description: '1 liter stainless steel water bottle'
  }
]

const categories = [
  { id: 'all', name: 'All', nameMarathi: 'सर्व' },
  { id: 'stationery', name: 'Stationery', nameMarathi: 'लेखन साहित्य' },
  { id: 'sports', name: 'Sports', nameMarathi: 'खेळ' },
  { id: 'clothing', name: 'Clothing', nameMarathi: 'कपडे' },
  { id: 'bags', name: 'Bags', nameMarathi: 'बॅग' },
  { id: 'kitchen', name: 'Kitchen', nameMarathi: 'स्वयंपाकघर' }
]

export default function GeneralStorePage({ onBack }: GeneralStorePageProps) {
  const { language, selectedLocation, activeTab, setActiveTab, cart, addToCart, updateQuantity } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const filteredProducts = generalStoreProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameMarathi.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {language === 'mr' ? 'जनरल स्टोअर' : 'General Store'}
                </h1>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{language === 'mr' ? '10 मिनिटांत डिलिव्हरी' : 'Delivery in 10 minutes'}</span>
                </div>
              </div>
            </div>
            <Search className="w-5 h-5 text-gray-400" />
          </div>

          <div className="text-sm text-gray-600 mb-4">
            {selectedLocation}
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'वस्तू शोधा' : 'Search products'}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'mr' ? category.nameMarathi : category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 sm:h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  {language === 'mr' ? product.categoryMarathi : product.category}
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{product.deliveryTime}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {language === 'mr' ? product.nameMarathi : product.name}
                </h3>
                
                <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{Math.min(...product.shops.map(s => s.basePrice))}+
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        const currentQty = cart.find((item: any) => item.id === product.id)?.quantity || 0
                        if (currentQty > 0) {
                          updateQuantity(product.id, currentQty - 1)
                        }
                      }}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium min-w-[20px] text-center">
                      {cart.find((item: any) => item.id === product.id)?.quantity || 0}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        const cheapestShop = product.shops.reduce((min, shop) => 
                          shop.basePrice < min.basePrice ? shop : min
                        )
                        addToCart({
                          id: product.id,
                          name: product.name,
                          nameMarathi: product.nameMarathi,
                          price: cheapestShop.basePrice,
                          image: product.image,
                          shop: cheapestShop.name,
                          type: 'general'
                        })
                      }}
                      className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-600">
                    Total: ₹{((cart.find((item: any) => item.id === product.id)?.quantity || 0) * Math.min(...product.shops.map(s => s.basePrice)))}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal - Temporarily disabled until ProductDetailModal is fixed */}
      {/* {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          type="general"
        />
      )} */}

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'home') {
            onBack()
          } else {
            setActiveTab(tab)
          }
        }}
      />
    </div>
  )
}
