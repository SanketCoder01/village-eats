'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { ArrowLeft, Plus, Edit3, Trash2, MapPin, Home, Briefcase } from 'lucide-react'

interface Address {
  id: string
  name: string
  phone: string
  alternatePhone?: string
  pincode: string
  locality: string
  address: string
  city: string
  state: string
  landmark?: string
  type: 'home' | 'work' | 'other'
}

interface AddressManagerProps {
  onBack: () => void
  onAddressSelect?: (address: any) => void
  isCheckoutMode?: boolean
}

export default function AddressManager({ onBack, onAddressSelect, isCheckoutMode = false }: AddressManagerProps) {
  const { language } = useStore()
  const t = translations[language]
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Sanket Patil',
      phone: '8071281897',
      pincode: '411030',
      locality: 'Shaniwar Peth',
      address: '217, Omkareshwar Path, Hasabnis Bakhal',
      city: 'Pune',
      state: 'Maharashtra',
      landmark: 'Near Dagdusheth Temple',
      type: 'home'
    }
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home'
  })

  const handleSaveAddress = () => {
    // Validate required fields
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.pincode) {
      return
    }

    const completeAddress: Address = {
      id: editingAddress?.id || Date.now().toString(),
      name: newAddress.name,
      phone: newAddress.phone,
      alternatePhone: newAddress.alternatePhone,
      pincode: newAddress.pincode,
      locality: newAddress.locality || '',
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state || 'Maharashtra',
      landmark: newAddress.landmark,
      type: newAddress.type || 'home'
    }

    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? completeAddress : addr
      ))
    } else {
      setAddresses([...addresses, completeAddress])
      
      // If in checkout mode, automatically select the new address
      if (isCheckoutMode && onAddressSelect) {
        onAddressSelect(completeAddress)
      }
    }
    resetForm()
  }

  const handleEditAddress = (address: Address) => {
    setNewAddress(address)
    setEditingAddress(address)
    setShowAddForm(true)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const resetForm = () => {
    setNewAddress({ type: 'home' })
    setEditingAddress(null)
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{t.manageAddresses}</h1>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Address List */}
      <div className="px-4 py-6">
        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white border rounded-xl p-4 cursor-pointer ${
                  isCheckoutMode ? 'hover:border-orange-500' : 'border-gray-200'
                }`}
                onClick={() => {
                  if (isCheckoutMode && onAddressSelect) {
                    onAddressSelect(address)
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {address.type === 'home' ? (
                        <Home className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="font-medium text-gray-900 capitalize">{address.type}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{address.address}</p>
                    <p className="text-gray-600 text-sm">{address.city} - {address.pincode}</p>
                  </div>
                  {!isCheckoutMode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditAddress(address)
                        }}
                        className="p-2 text-gray-500 hover:text-orange-500"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAddress(address.id)
                        }}
                        className="p-2 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {address.landmark && (
                    <p className="text-gray-500 text-sm mt-2">Landmark: {address.landmark}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No addresses saved</h3>
            <p className="text-gray-600 mb-6">Add an address to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium"
            >
              Add New Address
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Address Modal */}
      <AnimatePresence>
        {showAddForm && (
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
              className="bg-white w-full max-h-[90vh] rounded-t-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4">
                <div className="space-y-4">
                  {/* Use Current Location Button */}
                  <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Use my current location</span>
                  </button>

                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={newAddress.name || ''}
                        onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">10-digit mobile number</label>
                      <input
                        type="tel"
                        value={newAddress.phone || ''}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Mobile number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                      <input
                        type="text"
                        value={newAddress.pincode || ''}
                        onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Pincode"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>
                      <input
                        type="text"
                        value={newAddress.locality || ''}
                        onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Locality"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address (Area and Street)</label>
                    <textarea
                      value={newAddress.address || ''}
                      onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="House/Flat/Floor No., Building Name or Street"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City/District/Town</label>
                      <input
                        type="text"
                        value={newAddress.city || ''}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <select
                        value={newAddress.state || 'Maharashtra'}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={newAddress.landmark || ''}
                        onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Landmark"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone (Optional)</label>
                      <input
                        type="tel"
                        value={newAddress.alternatePhone || ''}
                        onChange={(e) => setNewAddress({...newAddress, alternatePhone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Alternate phone"
                      />
                    </div>
                  </div>

                  {/* Address Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setNewAddress({...newAddress, type: 'home'})}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${
                          newAddress.type === 'home' 
                            ? 'border-orange-500 bg-orange-50 text-orange-600' 
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                      </button>
                      
                      <button
                        onClick={() => setNewAddress({...newAddress, type: 'work'})}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${
                          newAddress.type === 'work' 
                            ? 'border-orange-500 bg-orange-50 text-orange-600' 
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Work</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
