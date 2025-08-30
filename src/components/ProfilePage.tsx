'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { ArrowLeft, Edit3, MapPin, Phone, Mail, User, LogOut, ChevronRight, Moon, Sun, Info, MessageSquare, Palette } from 'lucide-react'
import BottomNavigation from './BottomNavigation'
import MyOrders from './MyOrders'
import AddressManager from './AddressManager'
import AboutPage from './AboutPage'
import FeedbackForm from './FeedbackForm'

interface ProfilePageProps {
  onBack: () => void
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { language, user, logout, selectedLocation, theme, setTheme } = useStore()
  const t = translations[language]
  const [isEditing, setIsEditing] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [showAddresses, setShowAddresses] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || 'Sanket Patil',
    email: user?.email || 'sanket.patil@example.com',
    phone: user?.phone || '8071281897'
  })

  const handleSave = () => {
    useStore.getState().setUser({
      id: user?.id || '1',
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    onBack()
  }

  if (showOrders) {
    return <MyOrders onBack={() => setShowOrders(false)} />
  }

  if (showAddresses) {
    return <AddressManager onBack={() => setShowAddresses(false)} />
  }

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />
  }

  if (showFeedback) {
    return <FeedbackForm onBack={() => setShowFeedback(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"
          >
            <Edit3 className="w-5 h-5 text-orange-600" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{editForm.name}</h2>
              <p className="text-gray-600">{editForm.phone}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{editForm.email}</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{editForm.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{selectedLocation}</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Menu Options */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            <button 
              onClick={() => setShowOrders(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-900 font-medium">{t.myOrders}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setShowAddresses(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-900 font-medium">{t.manageAddresses}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  {theme === 'light' ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
                </div>
                <span className="text-gray-900 font-medium">
                  {language === 'mr' ? 'थीम मोड' : 'Theme Mode'} ({theme === 'light' ? (language === 'mr' ? 'हलका' : 'Light') : (language === 'mr' ? 'गडद' : 'Dark')})
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowAbout(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-900 font-medium">{language === 'mr' ? 'अॅपबद्दल' : 'About'}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowFeedback(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-900 font-medium">{language === 'mr' ? 'फीडबॅक पाठवा' : 'Send Feedback'}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 p-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-red-100"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <BottomNavigation activeTab="settings" onTabChange={(tab) => {
        const { setActiveTab } = useStore.getState()
        setActiveTab(tab)
        if (tab !== 'settings') {
          onBack()
        }
      }} />
    </div>
  )
}
