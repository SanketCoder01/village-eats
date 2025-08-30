'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { X, Star, Clock, MapPin, Minus, Plus, Share } from 'lucide-react'
import toast from 'react-hot-toast'

interface Shop {
  name: string
  price: number
  distance: string
}

interface Product {
  id: string
  name: string
  nameMarathi: string
  image: string
  category: string
  categoryMarathi: string
  brand: string
  rating: number
  deliveryTime: string
  weight?: string
  discount?: number
  shops: Shop[]
  description: string
}

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
  type: 'general' | 'grocery'
}

export default function ProductDetailModal({ product, onClose, type }: ProductDetailModalProps) {
  const { language, addToCart } = useStore()
  const [selectedShop, setSelectedShop] = useState(product.shops[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedUnit, setSelectedUnit] = useState(product.weight || '1 piece')

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${selectedShop.name}`,
      name: product.name,
      nameMarathi: product.nameMarathi,
      price: selectedShop.price,
      image: product.image,
      restaurantId: selectedShop.name,
      restaurantName: selectedShop.name,
      quantity: quantity
    }
    
    addToCart(cartItem)
    toast.success(
      language === 'mr' 
        ? `${product.nameMarathi} कार्टमध्ये जोडले गेले`
        : `${product.name} added to cart`
    )
    onClose()
  }

  const units = type === 'grocery' 
    ? ['170 g', '500 g', '1 kg'] 
    : ['1 piece', '2 pieces', '5 pieces']

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="bg-white w-full max-w-lg mx-4 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Share className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'mr' ? product.nameMarathi : product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{product.deliveryTime}</span>
              </div>
            </div>

            {/* Brand Info */}
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{product.brand[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{product.brand}</p>
                <p className="text-sm text-gray-600">
                  {language === 'mr' ? 'सर्व उत्पादने एक्सप्लोर करा' : 'Explore all products'}
                </p>
              </div>
            </div>

            {/* Unit Selection */}
            {type === 'grocery' && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === 'mr' ? 'युनिट निवडा' : 'Select Unit'}
                </h3>
                <div className="flex space-x-2">
                  {units.map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setSelectedUnit(unit)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedUnit === unit
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {unit}
                      {unit === '170 g' && (
                        <div className="text-xs">
                          {product.discount && product.discount > 0 && (
                            <span className="bg-orange-500 text-white px-1 rounded ml-1">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shop Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'mr' ? 'दुकान निवडा' : 'Choose Shop'}
              </h3>
              <div className="space-y-2">
                {product.shops.map((shop) => (
                  <motion.button
                    key={shop.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedShop(shop)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedShop.name === shop.name
                        ? 'bg-orange-50 border-orange-500'
                        : 'bg-white border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{shop.name}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{shop.distance}</span>
                          <Clock className="w-3 h-3 ml-2" />
                          <span>{product.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{shop.price}</p>
                        {product.discount && product.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{Math.round(shop.price / (1 - product.discount/100))}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {selectedUnit} • MRP ₹{Math.round(selectedShop.price / (1 - (product.discount || 0)/100))}
                    {product.discount && product.discount > 0 && (
                      <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{selectedShop.price}
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      ({language === 'mr' ? 'सर्व कर समाविष्ट' : 'inclusive of all taxes'})
                    </span>
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors"
              >
                {language === 'mr' ? 'कार्टमध्ये जोडा' : 'Add to cart'}
              </motion.button>
            </div>

            {/* Product Description */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'mr' ? 'उत्पादन तपशील' : 'Product Details'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Top Products in Category */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'mr' ? 'या श्रेणीतील टॉप 10 उत्पादने' : 'Top 10 products in this category'}
              </h3>
              <div className="text-sm text-gray-600">
                {language === 'mr' 
                  ? 'अधिक उत्पादने पाहण्यासाठी मागे जा'
                  : 'Go back to see more products in this category'
                }
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
