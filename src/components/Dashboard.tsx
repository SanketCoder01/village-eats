'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import Header from './Header';
import Navigation from './Navigation';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import CartPage from './CartPage';
import OrderTracking from './OrderTracking';

const foodCategories = [
  { id: '1', name: 'Pizza', nameMarathi: 'पिझ्झा', image: '🍕', color: '#EF4444' },
  { id: '2', name: 'Burger', nameMarathi: 'बर्गर', image: '🍔', color: '#F59E0B' },
  { id: '3', name: 'Biryani', nameMarathi: 'बिर्याणी', image: '🍛', color: '#EA580C' },
  { id: '4', name: 'Desserts', nameMarathi: 'मिठाई', image: '🍰', color: '#EC4899' },
  { id: '5', name: 'Chicken', nameMarathi: 'चिकन', image: '🍗', color: '#F59E0B' },
  { id: '6', name: 'Chinese', nameMarathi: 'चायनीज', image: '🥡', color: '#10B981' },
  { id: '7', name: 'Rolls', nameMarathi: 'रोल्स', image: '🌯', color: '#F59E0B' },
  { id: '8', name: 'South Indian', nameMarathi: 'दक्षिण भारतीय', image: '🥞', color: '#EA580C' }
];

const topBrands = [
  { 
    id: '1', 
    name: 'McDonald\'s', 
    nameMarathi: 'मॅकडोनाल्ड्स',
    image: '🍔',
    rating: 4.3, 
    time: '20 min',
    cuisine: 'Burgers, Fast Food',
    price: '₹150 for one',
    offer: '₹125 OFF',
    is_open: true
  },
  { 
    id: '2', 
    name: 'KFC', 
    nameMarathi: 'केएफसी',
    image: '🍗',
    rating: 4.1, 
    time: '30 min',
    cuisine: 'Chicken, Fast Food',
    price: '₹300 for one',
    offer: '₹100 OFF',
    is_open: true
  },
  { 
    id: '3', 
    name: 'Domino\'s Pizza', 
    nameMarathi: 'डोमिनोज पिझ्झा',
    image: '🍕',
    rating: 4.2, 
    time: '25 min',
    cuisine: 'Pizza, Italian',
    price: '₹200 for one',
    offer: '₹400 OFF',
    is_open: false
  },
  { 
    id: '4', 
    name: 'Subway', 
    nameMarathi: 'सबवे',
    image: '🥪',
    rating: 4.0, 
    time: '15 min',
    cuisine: 'Sandwiches, Healthy',
    price: '₹200 for one',
    offer: '₹50 OFF',
    is_open: true
  },
  { 
    id: '5', 
    name: 'Pizza Hut', 
    nameMarathi: 'पिझ्झा हट',
    image: '🍕',
    rating: 4.1, 
    time: '35 min',
    cuisine: 'Pizza, Italian',
    price: '₹250 for one',
    offer: '₹200 OFF',
    is_open: true
  },
  { 
    id: '6', 
    name: 'Starbucks', 
    nameMarathi: 'स्टारबक्स',
    image: '☕',
    rating: 4.4, 
    time: '10 min',
    cuisine: 'Coffee, Beverages',
    price: '₹300 for one',
    offer: '₹75 OFF',
    is_open: true
  }
];

export default function Dashboard() {
  const { language } = useStore();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [showProfile, setShowProfile] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'search':
        return <SearchPage onBack={() => setActiveTab('home')} />;
      case 'cart':
        return <CartPage onBack={() => setActiveTab('home')} />;
      case 'orders':
        return <OrderTracking onBack={() => setActiveTab('home')} />;
      case 'settings':
        return <ProfilePage onBack={() => setActiveTab('home')} />;
      default:
        return null;
    }
  };

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />;
  }

  if (activeTab !== 'home') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onProfileClick={() => setShowProfile(true)}
          onSearchClick={() => setActiveTab('search')}
        />
        <div className="flex">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 lg:ml-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onProfileClick={() => setShowProfile(true)}
        onSearchClick={() => setActiveTab('search')}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Category Tabs */}
          <div className="mb-8">
            <div className="bg-gray-100 rounded-xl p-1 inline-flex">
              <button
                onClick={() => setSelectedCategory('food')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === 'food'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">🍕</span>
                <span>{language === 'mr' ? 'खाद्यपदार्थ' : 'Food'}</span>
              </button>
              <button
                onClick={() => setSelectedCategory('general')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === 'general'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">🏪</span>
                <span>{language === 'mr' ? 'जनरल स्टोअर' : 'General Store'}</span>
              </button>
              <button
                onClick={() => setSelectedCategory('grocery')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === 'grocery'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">🛒</span>
                <span>{language === 'mr' ? 'किराणा' : 'Grocery'}</span>
              </button>
            </div>
          </div>

          {/* Food Categories */}
          {selectedCategory === 'food' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'mr' ? 'खाद्य श्रेणी' : 'Food Categories'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {foodCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{category.image}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {language === 'mr' ? category.nameMarathi : category.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Top Brands Section */}
          {selectedCategory === 'food' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'mr' ? 'तुमच्यासाठी टॉप ब्रँड्स' : 'Top brands for you'}
                </h2>
                <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                  {language === 'mr' ? 'सर्व पहा' : 'See all'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topBrands.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-6xl">{restaurant.image}</span>
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                        restaurant.is_open 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {restaurant.is_open ? 'Open' : 'Closed'}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 truncate">
                        {restaurant.cuisine}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <span>⭐</span>
                          <span>{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>🕐</span>
                          <span>{restaurant.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 truncate">
                        By Restaurant Owner
                      </p>
                      
                      {restaurant.offer && (
                        <div className="mt-2 bg-orange-50 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                          {restaurant.offer}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* General Store Content */}
          {selectedCategory === 'general' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏪</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'mr' ? 'जनरल स्टोअर' : 'General Store'}
              </h2>
              <p className="text-gray-600">
                {language === 'mr' ? 'लवकरच येत आहे...' : 'Coming soon...'}
              </p>
            </div>
          )}

          {/* Grocery Content */}
          {selectedCategory === 'grocery' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'mr' ? 'किराणा दुकान' : 'Grocery Store'}
              </h2>
              <p className="text-gray-600">
                {language === 'mr' ? 'लवकरच येत आहे...' : 'Coming soon...'}
              </p>
            </div>
          )}
          </main>
        </div>
      </div>
    </div>
  );
}
