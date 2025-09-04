'use client';

import React from 'react';
import { useStore } from '../store/useStore';
import { Home, Search, ShoppingCart, Truck, Settings, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { getCartItemCount, orders, language } = useStore();

  const cartCount = getCartItemCount();
  const activeOrdersCount = orders?.filter(order => 
    !['delivered', 'rejected'].includes(order.status)
  ).length || 0;
  
  const tabs = [
    { id: 'home', label: language === 'mr' ? 'होम' : 'Home', icon: Home },
    { id: 'search', label: language === 'mr' ? 'शोध' : 'Search', icon: Search },
    { id: 'orders', label: language === 'mr' ? 'ऑर्डर' : 'Orders', icon: Truck, badge: activeOrdersCount },
    { id: 'cart', label: language === 'mr' ? 'कार्ट' : 'Cart', icon: ShoppingCart, badge: cartCount },
    { id: 'settings', label: language === 'mr' ? 'सेटिंग्स' : 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200 lg:pt-20">
        <div className="flex-1 flex flex-col min-h-0 pt-8">
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span className="flex-1 text-left">{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className="ml-3 inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-red-500 text-white">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[18px] h-[18px]">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium mt-1">{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
