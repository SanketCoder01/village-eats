'use client';

import React from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

interface OrderTrackingProps {
  onBack: () => void;
}

export default function OrderTracking({ onBack }: OrderTrackingProps) {
  const { language } = useStore();

  const orders = [
    {
      id: '1',
      restaurant: 'McDonald\'s',
      items: ['Big Mac', 'French Fries', 'Coke'],
      status: 'preparing',
      total: 450,
      estimatedTime: '25 min',
      orderTime: '2:30 PM'
    },
    {
      id: '2',
      restaurant: 'KFC',
      items: ['Chicken Bucket', 'Coleslaw'],
      status: 'delivered',
      total: 650,
      estimatedTime: 'Delivered',
      orderTime: '1:15 PM'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'on_way':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return language === 'mr' ? 'तयार करत आहे' : 'Preparing';
      case 'on_way':
        return language === 'mr' ? 'वाटेत आहे' : 'On the way';
      case 'delivered':
        return language === 'mr' ? 'पोहोचवले' : 'Delivered';
      default:
        return language === 'mr' ? 'ऑर्डर केले' : 'Ordered';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {language === 'mr' ? 'ऑर्डर ट्रॅकिंग' : 'Order Tracking'}
            </h1>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'mr' ? 'कोणतेही ऑर्डर नाहीत' : 'No orders yet'}
            </h2>
            <p className="text-gray-600">
              {language === 'mr' 
                ? 'तुमचे ऑर्डर इथे दिसतील' 
                : 'Your orders will appear here'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.restaurant}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'mr' ? 'ऑर्डर वेळ:' : 'Order time:'} {order.orderTime}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium text-gray-700">
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'mr' ? 'आयटम:' : 'Items:'}
                  </h4>
                  <ul className="text-sm text-gray-600">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm">
                    <span className="text-gray-600">
                      {language === 'mr' ? 'एकूण:' : 'Total:'} 
                    </span>
                    <span className="font-semibold text-gray-900 ml-1">
                      ₹{order.total}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">
                      {order.status === 'delivered' 
                        ? (language === 'mr' ? 'पोहोचवले' : 'Delivered')
                        : (language === 'mr' ? 'अंदाजे वेळ:' : 'Est. time:')
                      }
                    </span>
                    <span className="font-semibold text-gray-900 ml-1">
                      {order.estimatedTime}
                    </span>
                  </div>
                </div>

                {order.status === 'preparing' && (
                  <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm text-orange-700">
                        {language === 'mr' 
                          ? 'तुमचे ऑर्डर तयार केले जात आहे' 
                          : 'Your order is being prepared'
                        }
                      </span>
                    </div>
                  </div>
                )}

                {order.status === 'on_way' && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm text-blue-700">
                        {language === 'mr' 
                          ? 'तुमचे ऑर्डर वाटेत आहे' 
                          : 'Your order is on the way'
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
