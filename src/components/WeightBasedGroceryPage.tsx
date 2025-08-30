'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { ArrowLeft, Search, Clock, Star, Plus, Minus } from 'lucide-react'
import BottomNavigation from './BottomNavigation'
import toast from 'react-hot-toast'

interface WeightBasedGroceryPageProps {
  onBack: () => void
}

const groceryProducts = [
  {
    id: 'gr1',
    name: 'Basmati Rice',
    nameMarathi: 'बासमती तांदूळ',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    category: 'grains',
    categoryMarathi: 'धान्य',
    brand: 'India Gate',
    rating: 4.5,
    deliveryTime: '10 mins',
    discount: 15,
    weightOptions: [
      { weight: '500g', basePrice: 90 },
      { weight: '1kg', basePrice: 180 },
      { weight: '2kg', basePrice: 350 },
      { weight: '5kg', basePrice: 850 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.0, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 0.97, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.03, distance: '1.5 km' }
    ],
    description: 'Premium quality basmati rice with long grains'
  },
  {
    id: 'gr2',
    name: 'Toor Dal',
    nameMarathi: 'तूर डाळ',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop',
    category: 'pulses',
    categoryMarathi: 'डाळी',
    brand: 'Organic',
    rating: 4.3,
    deliveryTime: '10 mins',
    discount: 10,
    weightOptions: [
      { weight: '250g', basePrice: 45 },
      { weight: '500g', basePrice: 85 },
      { weight: '1kg', basePrice: 160 },
      { weight: '2kg', basePrice: 310 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.0, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 0.95, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.05, distance: '1.5 km' }
    ],
    description: 'Fresh toor dal, rich in protein'
  },
  {
    id: 'gr3',
    name: 'Onions',
    nameMarathi: 'कांदे',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    category: 'vegetables',
    categoryMarathi: 'भाज्या',
    brand: 'Fresh',
    rating: 4.0,
    deliveryTime: '10 mins',
    discount: 5,
    weightOptions: [
      { weight: '250g', basePrice: 15 },
      { weight: '500g', basePrice: 28 },
      { weight: '1kg', basePrice: 50 },
      { weight: '2kg', basePrice: 95 }
    ],
    shops: [
      { name: 'Vegetable Market', priceMultiplier: 0.9, distance: '0.2 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.0, distance: '1.5 km' },
      { name: 'Village Grocery', priceMultiplier: 1.1, distance: '0.8 km' }
    ],
    description: 'Fresh red onions from local farms'
  },
  {
    id: 'gr4',
    name: 'Wheat Flour',
    nameMarathi: 'गव्हाचं पीठ',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
    category: 'flour',
    categoryMarathi: 'पीठ',
    brand: 'Aashirvaad',
    rating: 4.6,
    deliveryTime: '10 mins',
    discount: 8,
    weightOptions: [
      { weight: '1kg', basePrice: 45 },
      { weight: '2kg', basePrice: 85 },
      { weight: '5kg', basePrice: 200 },
      { weight: '10kg', basePrice: 380 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.0, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 0.98, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.02, distance: '1.5 km' }
    ],
    description: 'Premium quality wheat flour for soft rotis'
  }
]

const categories = [
  { id: 'all', name: 'All', nameMarathi: 'सर्व' },
  { id: 'grains', name: 'Grains', nameMarathi: 'धान्य' },
  { id: 'pulses', name: 'Pulses', nameMarathi: 'डाळी' },
  { id: 'vegetables', name: 'Vegetables', nameMarathi: 'भाज्या' },
  { id: 'flour', name: 'Flour', nameMarathi: 'पीठ' }
]

export default function WeightBasedGroceryPage({ onBack }: WeightBasedGroceryPageProps) {
  const { language, cart, addToCart, updateQuantity, activeTab, setActiveTab } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedWeights, setSelectedWeights] = useState<{[key: string]: number}>({})

  const filteredProducts = groceryProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameMarathi.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getSelectedWeight = (productId: string) => {
    return selectedWeights[productId] || 0
  }

  const setSelectedWeight = (productId: string, weightIndex: number) => {
    setSelectedWeights(prev => ({
      ...prev,
      [productId]: weightIndex
    }))
  }

  const getProductPrice = (product: any, shopIndex: number = 0) => {
    const weightIndex = getSelectedWeight(product.id)
    const basePrice = product.weightOptions[weightIndex].basePrice
    const shop = product.shops[shopIndex]
    return Math.round(basePrice * shop.priceMultiplier)
  }

  const getCartQuantity = (productId: string, weight: string) => {
    const cartItem = cart.find((item: any) => item.id === `${productId}-${weight}`)
    return cartItem?.quantity || 0
  }

  const handleAddToCart = (product: any) => {
    const weightIndex = getSelectedWeight(product.id)
    const selectedWeightOption = product.weightOptions[weightIndex]
    const cheapestShop = product.shops.reduce((min, shop, index) => 
      getProductPrice(product, index) < getProductPrice(product, min.index) 
        ? { ...shop, index } 
        : min
    , { ...product.shops[0], index: 0 })

    const price = getProductPrice(product, cheapestShop.index)
    const itemId = `${product.id}-${selectedWeightOption.weight}`

    addToCart({
      id: itemId,
      name: `${product.name} (${selectedWeightOption.weight})`,
      nameMarathi: `${product.nameMarathi} (${selectedWeightOption.weight})`,
      price: price,
      image: product.image,
      shop: cheapestShop.name,
      type: 'grocery',
      weight: selectedWeightOption.weight
    })

    toast.success(language === 'mr' ? 'कार्टमध्ये जोडले' : 'Added to cart')
  }

  const handleUpdateQuantity = (productId: string, weight: string, change: number) => {
    const itemId = `${productId}-${weight}`
    const currentQty = getCartQuantity(productId, weight)
    const newQty = Math.max(0, currentQty + change)
    
    if (newQty === 0) {
      updateQuantity(itemId, 0)
    } else {
      updateQuantity(itemId, newQty)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {language === 'mr' ? 'किराणा दुकान' : 'Grocery Store'}
          </h1>
          <div className="w-10" />
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'mr' ? 'वस्तू शोधा...' : 'Search items...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => {
            const weightIndex = getSelectedWeight(product.id)
            const selectedWeightOption = product.weightOptions[weightIndex]
            const price = getProductPrice(product)
            const quantity = getCartQuantity(product.id, selectedWeightOption.weight)

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    {language === 'mr' ? product.categoryMarathi : product.category}
                  </div>
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-1 mb-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{product.deliveryTime}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {language === 'mr' ? product.nameMarathi : product.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-2">{product.brand}</p>

                  {/* Weight Selection */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {language === 'mr' ? 'वजन निवडा:' : 'Select Weight:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.weightOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedWeight(product.id, idx)}
                          className={`px-2 py-1 text-xs rounded ${
                            weightIndex === idx
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option.weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">₹{price}</span>
                      {product.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          ₹{Math.round(price / (1 - product.discount / 100))}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{selectedWeightOption.weight}</span>
                  </div>

                  {/* Quantity Controls */}
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, selectedWeightOption.weight, -1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium min-w-[20px] text-center">{quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(product.id, selectedWeightOption.weight, 1)}
                          className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        Total: ₹{price * quantity}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      {language === 'mr' ? 'कार्टमध्ये जोडा' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

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
