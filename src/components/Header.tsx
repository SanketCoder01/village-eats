'use client';

import React from 'react';
import { useStore } from '../store/useStore';
import { Search, Filter, User, MapPin } from 'lucide-react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchClick: () => void;
}

export default function Header({ onProfileClick, onSearchClick }: HeaderProps) {
  const { language, selectedLocation } = useStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🛒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">VillageMarts</h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">
                {selectedLocation || (language === 'mr' ? 'स्थान निवडा' : 'Select Location')}
              </span>
            </div>

            {/* Profile */}
            <button
              onClick={onProfileClick}
              className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
            >
              <User className="w-5 h-5 text-orange-600" />
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="pb-4 space-y-4">
          {/* Search bar */}
          <div 
            onClick={onSearchClick}
            className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 flex-1">
              {language === 'mr' 
                ? 'रेस्टॉरंट, पाककृती किंवा डिश शोधा' 
                : 'Search for restaurant, cuisine or a dish'
              }
            </span>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center space-x-3 overflow-x-auto">
            <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap transition-colors">
              <Filter className="w-4 h-4" />
              <span>{language === 'mr' ? 'फिल्टर' : 'Filters'}</span>
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap transition-colors">
              {language === 'mr' ? 'शुद्ध शाकाहारी' : 'Pure Veg'}
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap transition-colors">
              {language === 'mr' ? 'पाककृती' : 'Cuisines'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
