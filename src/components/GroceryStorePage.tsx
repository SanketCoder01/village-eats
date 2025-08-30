'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { ArrowLeft, Search, Clock, Star, Percent } from 'lucide-react'
// import ProductDetailModal from './ProductDetailModal' // Temporarily disabled
import toast from 'react-hot-toast'
import BottomNavigation from './BottomNavigation'

interface GroceryStorePageProps {
  onBack: () => void
}

const groceryProducts = [
  {
    id: 'gr1',
    name: 'Basmati Rice',
    nameMarathi: 'बासमती तांदूळ',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    category: 'Grains',
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
    name: 'Amul Fresh Milk',
    nameMarathi: 'अमूल ताजे दूध',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    category: 'Dairy',
    categoryMarathi: 'दुग्धजन्य',
    brand: 'Amul',
    rating: 4.7,
    deliveryTime: '10 mins',
    discount: 0,
    weightOptions: [
      { weight: '250ml', basePrice: 15 },
      { weight: '500ml', basePrice: 28 },
      { weight: '1L', basePrice: 55 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.0, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 0.97, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.03, distance: '1.5 km' }
    ],
    description: 'Fresh full cream milk, rich in calcium'
  },
  {
    id: 'gr3',
    name: 'Tata Salt',
    nameMarathi: 'टाटा मीठ',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop',
    category: 'Spices',
    categoryMarathi: 'मसाले',
    brand: 'Tata',
    rating: 4.3,
    deliveryTime: '10 mins',
    discount: 10,
    weightOptions: [
      { weight: '100g', basePrice: 5 },
      { weight: '500g', basePrice: 20 },
      { weight: '1kg', basePrice: 38 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.1, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 1.0, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.2, distance: '1.5 km' }
    ],
    description: 'Iodized salt for healthy cooking'
  },
  {
    id: 'gr4',
    name: 'Britannia Bread',
    nameMarathi: 'ब्रिटानिया ब्रेड',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    category: 'Bakery',
    categoryMarathi: 'बेकरी',
    brand: 'Britannia',
    rating: 4.2,
    deliveryTime: '10 mins',
    discount: 5,
    weightOptions: [
      { weight: '200g', basePrice: 12 },
      { weight: '400g', basePrice: 25 },
      { weight: '800g', basePrice: 48 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.0, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 0.96, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.04, distance: '1.5 km' }
    ],
    description: 'Soft and fresh white bread'
  },
  {
    id: 'gr5',
    name: 'Onions',
    nameMarathi: 'कांदे',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    category: 'Vegetables',
    categoryMarathi: 'भाज्या',
    brand: 'Fresh',
    rating: 4.0,
    deliveryTime: '10 mins',
    discount: 5,
    weightOptions: [
      { weight: '250g', basePrice: 12 },
      { weight: '500g', basePrice: 22 },
      { weight: '1kg', basePrice: 40 },
      { weight: '2kg', basePrice: 75 }
    ],
    shops: [
      { name: 'Vegetable Market', priceMultiplier: 0.9, distance: '0.2 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.0, distance: '1.5 km' },
      { name: 'Village Grocery', priceMultiplier: 1.1, distance: '0.8 km' }
    ],
    description: 'Fresh red onions from local farms'
  },
  {
    id: 'gr6',
    name: 'Maggi Noodles',
    nameMarathi: 'मॅगी नूडल्स',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop',
    category: 'Instant Food',
    categoryMarathi: 'तत्काळ खाद्य',
    brand: 'Maggi',
    rating: 4.4,
    deliveryTime: '10 mins',
    discount: 8,
    weightOptions: [
      { weight: '70g', basePrice: 14 },
      { weight: '140g', basePrice: 26 },
      { weight: '280g', basePrice: 48 }
    ],
    shops: [
      { name: 'Sharma Kirana', priceMultiplier: 1.0, distance: '0.3 km' },
      { name: 'Village Grocery', priceMultiplier: 0.93, distance: '0.8 km' },
      { name: 'Fresh Mart', priceMultiplier: 1.07, distance: '1.5 km' }
    ],
    description: '2-minute instant noodles with masala'
  }
]

const groceryCategories = [
  { id: 'all', name: 'All', nameMarathi: 'सर्व' },
  { id: 'grains', name: 'Grains', nameMarathi: 'धान्य' },
  { id: 'dairy', name: 'Dairy', nameMarathi: 'दुग्धजन्य' },
  { id: 'spices', name: 'Spices', nameMarathi: 'मसाले' },
  { id: 'bakery', name: 'Bakery', nameMarathi: 'बेकरी' },
  { id: 'vegetables', name: 'Vegetables', nameMarathi: 'भाज्या' },
  { id: 'instant food', name: 'Instant Food', nameMarathi: 'तत्काळ खाद्य' }
]

export default function GroceryStorePage({ onBack }: GroceryStorePageProps) {
  const { language, selectedLocation, activeTab, setActiveTab, cart, addToCart, updateQuantity } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedWeights, setSelectedWeights] = useState<{[key: string]: number}>({})

  const getSelectedWeight = (productId: string) => {
    return selectedWeights[productId] || 0
  }

  const setSelectedWeight = (productId: string, weightIndex: number) => {
    setSelectedWeights(prev => ({
      ...prev,
      [productId]: weightIndex
    }))
  }

  const getProductPrice = (product: any, shopIndex?: number) => {
    const selectedWeightOption = product.weightOptions[getSelectedWeight(product.id)]
    
    if (shopIndex !== undefined) {
      const shop = product.shops[shopIndex]
      return Math.round(selectedWeightOption.basePrice * shop.priceMultiplier)
    }
    
    // Return cheapest price across all shops
    const cheapestPrice = Math.min(...product.shops.map((shop: any) => 
      Math.round(selectedWeightOption.basePrice * shop.priceMultiplier)
    ))
    return cheapestPrice
  }

  const getCartQuantity = (productId: string, weight: string) => {
    const cartItem = cart.find((item: any) => item.id === `${productId}-${weight}`)
    return cartItem?.quantity || 0
  }

  const filteredProducts = groceryProducts.filter(product => {
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
                  {language === 'mr' ? 'किराणा दुकान' : 'Grocery Store'}
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
              placeholder={language === 'mr' ? 'किराणा माल शोधा' : 'Search groceries'}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {groceryCategories.map((category) => (
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

      {/* Hot Deals Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            {language === 'mr' ? 'हॉट डील्स' : 'Hot deals'}
          </h2>
          <button className="text-orange-500 text-sm font-medium">
            {language === 'mr' ? 'सर्व पहा' : 'see all'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.filter(p => p.discount > 0).slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
            >
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
                {product.discount}% OFF
              </div>
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 sm:h-32 object-cover"
              />
              
              <div className="p-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{product.deliveryTime}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {language === 'mr' ? product.nameMarathi : product.name}
                </h3>
                
                {/* Weight Selection */}
                <div className="mb-2">
                  <p className="text-xs text-gray-600 mb-1">
                    {language === 'mr' ? 'वजन:' : 'Weight:'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.weightOptions.map((option: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWeight(product.id, idx)
                        }}
                        className={`px-2 py-1 text-xs rounded ${
                          getSelectedWeight(product.id) === idx
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option.weight}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{getProductPrice(product)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{Math.round(getProductPrice(product) / (1 - product.discount/100))}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.weightOptions[getSelectedWeight(product.id)].weight}
                  </span>
                </div>

                {/* Quantity Controls */}
                {(() => {
                  const selectedWeightOption = product.weightOptions[getSelectedWeight(product.id)]
                  const quantity = getCartQuantity(product.id, selectedWeightOption.weight)
                  
                  return quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(`${product.id}-${selectedWeightOption.weight}`, quantity - 1)
                          }}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                        >
                          -
                        </button>
                        <span className="font-medium min-w-[20px] text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(`${product.id}-${selectedWeightOption.weight}`, quantity + 1)
                          }}
                          className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-medium text-gray-900">
                        ₹{getProductPrice(product) * quantity}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const cheapestShop = product.shops.reduce((min: any, shop: any, index: number) => 
                          getProductPrice(product, index) < getProductPrice(product, min.index) 
                            ? { ...shop, index } 
                            : min
                        , { ...product.shops[0], index: 0 })

                        addToCart({
                          id: `${product.id}-${selectedWeightOption.weight}`,
                          name: `${product.name} (${selectedWeightOption.weight})`,
                          nameMarathi: `${product.nameMarathi} (${selectedWeightOption.weight})`,
                          price: getProductPrice(product, cheapestShop.index),
                          image: product.image,
                          shop: cheapestShop.name,
                          type: 'grocery',
                          weight: selectedWeightOption.weight
                        })
                        toast.success(language === 'mr' ? 'कार्टमध्ये जोडले' : 'Added to cart')
                      }}
                      className="w-full bg-orange-500 text-white py-1 rounded text-xs font-medium"
                    >
                      {language === 'mr' ? 'जोडा' : 'ADD'}
                    </button>
                  )
                })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Fresh Needs Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            {language === 'mr' ? 'दैनंदिन ताज्या गरजा' : 'Your daily fresh needs'}
          </h2>
          <button className="text-orange-500 text-sm font-medium">
            {language === 'mr' ? 'सर्व पहा' : 'see all'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.filter(p => ['vegetables', 'dairy'].includes(p.category.toLowerCase())).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
            >
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
                  {product.discount}% OFF
                </div>
              )}
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 sm:h-32 object-cover"
              />
              
              <div className="p-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{product.deliveryTime}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {language === 'mr' ? product.nameMarathi : product.name}
                </h3>
                
                {/* Weight Selection */}
                <div className="mb-2">
                  <p className="text-xs text-gray-600 mb-1">
                    {language === 'mr' ? 'वजन:' : 'Weight:'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.weightOptions.map((option: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWeight(product.id, idx)
                        }}
                        className={`px-2 py-1 text-xs rounded ${
                          getSelectedWeight(product.id) === idx
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option.weight}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{getProductPrice(product)}
                  </span>
                </div>

                {/* Quantity Controls */}
                {(() => {
                  const selectedWeightOption = product.weightOptions[getSelectedWeight(product.id)]
                  const quantity = getCartQuantity(product.id, selectedWeightOption.weight)
                  
                  return quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(`${product.id}-${selectedWeightOption.weight}`, quantity - 1)
                          }}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                        >
                          -
                        </button>
                        <span className="font-medium min-w-[20px] text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(`${product.id}-${selectedWeightOption.weight}`, quantity + 1)
                          }}
                          className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-medium text-gray-900">
                        ₹{getProductPrice(product) * quantity}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const cheapestShop = product.shops.reduce((min: any, shop: any, index: number) => 
                          getProductPrice(product, index) < getProductPrice(product, min.index) 
                            ? { ...shop, index } 
                            : min
                        , { ...product.shops[0], index: 0 })

                        addToCart({
                          id: `${product.id}-${selectedWeightOption.weight}`,
                          name: `${product.name} (${selectedWeightOption.weight})`,
                          nameMarathi: `${product.nameMarathi} (${selectedWeightOption.weight})`,
                          price: getProductPrice(product, cheapestShop.index),
                          image: product.image,
                          shop: cheapestShop.name,
                          type: 'grocery',
                          weight: selectedWeightOption.weight
                        })
                        toast.success(language === 'mr' ? 'कार्टमध्ये जोडले' : 'Added to cart')
                      }}
                      className="w-full bg-green-50 text-green-600 py-2 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                    >
                      {language === 'mr' ? 'जोडा' : 'ADD'}
                    </button>
                  )
                })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Products Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            {language === 'mr' ? 'सर्व उत्पादने' : 'All Products'}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
            >
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
                  {product.discount}% OFF
                </div>
              )}
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 sm:h-40 object-cover"
              />
              
              <div className="p-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{product.deliveryTime}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {language === 'mr' ? product.nameMarathi : product.name}
                </h3>
                
                {/* Weight Selection */}
                <div className="mb-2">
                  <p className="text-xs text-gray-600 mb-1">
                    {language === 'mr' ? 'वजन:' : 'Weight:'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.weightOptions.map((option: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWeight(product.id, idx)
                        }}
                        className={`px-2 py-1 text-xs rounded ${
                          getSelectedWeight(product.id) === idx
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option.weight}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{getProductPrice(product)}
                  </span>
                </div>

                {/* Quantity Controls */}
                {(() => {
                  const selectedWeightOption = product.weightOptions[getSelectedWeight(product.id)]
                  const quantity = getCartQuantity(product.id, selectedWeightOption.weight)
                  
                  return quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(`${product.id}-${selectedWeightOption.weight}`, quantity - 1)
                          }}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                        >
                          -
                        </button>
                        <span className="font-medium min-w-[20px] text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(`${product.id}-${selectedWeightOption.weight}`, quantity + 1)
                          }}
                          className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-medium text-gray-900">
                        ₹{getProductPrice(product) * quantity}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const cheapestShop = product.shops.reduce((min: any, shop: any, index: number) => 
                          getProductPrice(product, index) < getProductPrice(product, min.index) 
                            ? { ...shop, index } 
                            : min
                        , { ...product.shops[0], index: 0 })

                        addToCart({
                          id: `${product.id}-${selectedWeightOption.weight}`,
                          name: `${product.name} (${selectedWeightOption.weight})`,
                          nameMarathi: `${product.nameMarathi} (${selectedWeightOption.weight})`,
                          price: getProductPrice(product, cheapestShop.index),
                          image: product.image,
                          shop: cheapestShop.name,
                          type: 'grocery',
                          weight: selectedWeightOption.weight
                        })
                        toast.success(language === 'mr' ? 'कार्टमध्ये जोडले' : 'Added to cart')
                      }}
                      className="w-full bg-green-50 text-green-600 py-2 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                    >
                      {language === 'mr' ? 'जोडा' : 'ADD'}
                    </button>
                  )
                })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal - Temporarily disabled */}
      {/* {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          type="grocery"
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
