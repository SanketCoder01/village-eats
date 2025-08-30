'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { ArrowLeft, MapPin, Plus, Check } from 'lucide-react'
import AddressManager from './AddressManager'

interface CheckoutFlowProps {
  onBack: () => void
  onSuccess: (orderDetails: any) => void
  totalAmount: number
}

export default function CheckoutFlow({ onBack, onSuccess, totalAmount }: CheckoutFlowProps) {
  const { language, user, addresses, selectedAddress, setSelectedAddress, cart } = useStore()
  const t = translations[language]
  const [currentStep, setCurrentStep] = useState<'payment' | 'address' | 'verify'>('payment')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod')
  const [showAddressManager, setShowAddressManager] = useState(false)

  const deliveryFee = 25
  const platformFee = 5
  const gst = Math.round(useStore.getState().getCartTotal() * 0.05)

  const handlePaymentNext = () => {
    setCurrentStep('address')
  }

  const handleAddressNext = () => {
    if (selectedAddress) {
      setCurrentStep('verify')
    }
  }

  const handleConfirmOrder = () => {
    const orderDetails = {
      orderId: `VE${Date.now().toString().slice(-6)}`,
      totalAmount: totalAmount,
      estimatedTime: '30-45 mins',
      paymentMethod: paymentMethod
    }
    onSuccess(orderDetails)
  }

  if (showAddressManager) {
    return (
      <AddressManager 
        onBack={() => setShowAddressManager(false)}
        onAddressSelect={(address) => {
          setSelectedAddress(address)
          setShowAddressManager(false)
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full rounded-t-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={currentStep === 'payment' ? onBack : () => {
                if (currentStep === 'address') setCurrentStep('payment')
                else if (currentStep === 'verify') setCurrentStep('address')
              }}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {currentStep === 'payment' && t.choosePaymentMethod}
              {currentStep === 'address' && t.selectAddress}
              {currentStep === 'verify' && t.verifyOrderDetails}
            </h2>
          </div>
        </div>

        <div className="p-6">
          {/* Payment Method Step */}
          {currentStep === 'payment' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`w-full p-4 rounded-xl border-2 text-left ${
                  paymentMethod === 'cod' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="font-medium text-gray-900">{t.cashOnDelivery}</div>
                <div className="text-gray-600 text-sm">{t.payWhenOrderArrives}</div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('online')}
                className={`w-full p-4 rounded-xl border-2 text-left ${
                  paymentMethod === 'online' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="font-medium text-gray-900">{t.onlinePayment}</div>
                <div className="text-gray-600 text-sm">{t.upiCardsNetBanking}</div>
              </button>

              <button
                onClick={handlePaymentNext}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold mt-6"
              >
                {t.selectAddress}
              </button>
            </motion.div>
          )}

          {/* Address Selection Step */}
          {currentStep === 'address' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {addresses.length > 0 ? (
                <>
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => setSelectedAddress(address)}
                      className={`w-full p-4 rounded-xl border-2 text-left ${
                        selectedAddress?.id === address.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-900 capitalize">
                              {language === 'mr' ? 
                                (address.type === 'home' ? 'घर' : address.type === 'work' ? 'कार्यालय' : 'इतर') :
                                address.type
                              }
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{address.address}</p>
                          {address.landmark && (
                            <p className="text-gray-500 text-xs mt-1">{address.landmark}</p>
                          )}
                          <p className="text-gray-600 text-sm">{address.city} - {address.pincode}</p>
                        </div>
                        {selectedAddress?.id === address.id && (
                          <Check className="w-5 h-5 text-orange-500 mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setShowAddressManager(true)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-600 hover:border-orange-300 hover:text-orange-600"
                  >
                    <Plus className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">{t.addNewAddress}</span>
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No addresses found</h3>
                  <p className="text-gray-600 mb-6">Add a delivery address to continue</p>
                  <button
                    onClick={() => setShowAddressManager(true)}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium"
                  >
                    {t.addAddress}
                  </button>
                </div>
              )}

              {selectedAddress && (
                <button
                  onClick={handleAddressNext}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold mt-6"
                >
                  {t.verifyOrderDetails}
                </button>
              )}
            </motion.div>
          )}

          {/* Order Verification Step */}
          {currentStep === 'verify' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Customer Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">{t.customerDetails}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.name}</span>
                    <span className="text-gray-900">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.phone}</span>
                    <span className="text-gray-900">{user?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.email}</span>
                    <span className="text-gray-900">{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              {selectedAddress && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">{t.deliveryTo}</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {language === 'mr' ? 
                          (selectedAddress.type === 'home' ? 'घर' : selectedAddress.type === 'work' ? 'कार्यालय' : 'इतर') :
                          selectedAddress.type
                        }
                      </p>
                      <p className="text-gray-700 text-sm">{selectedAddress.address}</p>
                      <p className="text-gray-600 text-sm">{selectedAddress.city} - {selectedAddress.pincode}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">{t.orderSummary}</h3>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => {
                    const displayName = language === 'mr' ? item.nameMarathi : item.name
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{displayName} x {item.quantity}</span>
                        <span className="text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t border-gray-200 pt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.itemTotal}</span>
                    <span className="text-gray-900">₹{useStore.getState().getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.deliveryFee}</span>
                    <span className="text-gray-900">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.platformFee}</span>
                    <span className="text-gray-900">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.gst}</span>
                    <span className="text-gray-900">₹{gst}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                    <span className="text-gray-900">{t.totalAmount}</span>
                    <span className="text-orange-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">{t.payment}</h3>
                <p className="text-gray-700 capitalize">
                  {paymentMethod === 'cod' ? t.cashOnDelivery : t.onlinePayment}
                </p>
              </div>

              <button
                onClick={handleConfirmOrder}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg"
              >
                {t.confirmOrder} • ₹{totalAmount}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
