'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { ArrowLeft, Star, Send } from 'lucide-react'
import toast from 'react-hot-toast'

interface FeedbackFormProps {
  onBack: () => void
}

export default function FeedbackForm({ onBack }: FeedbackFormProps) {
  const { language } = useStore()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [category, setCategory] = useState('general')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      toast.error(language === 'mr' ? 'कृपया रेटिंग द्या' : 'Please provide a rating')
      return
    }
    
    if (!feedback.trim()) {
      toast.error(language === 'mr' ? 'कृपया फीडबॅक लिहा' : 'Please write your feedback')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success(language === 'mr' ? 'फीडबॅक पाठवले गेले!' : 'Feedback sent successfully!')
      setIsSubmitting(false)
      setRating(0)
      setFeedback('')
      setCategory('general')
      onBack()
    }, 1500)
  }

  const categories = [
    { id: 'general', label: language === 'mr' ? 'सामान्य' : 'General' },
    { id: 'delivery', label: language === 'mr' ? 'डिलिव्हरी' : 'Delivery' },
    { id: 'app', label: language === 'mr' ? 'अॅप' : 'App Experience' },
    { id: 'food', label: language === 'mr' ? 'खाद्यपदार्थ' : 'Food Quality' },
    { id: 'other', label: language === 'mr' ? 'इतर' : 'Other' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center space-x-3">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {language === 'mr' ? 'फीडबॅक पाठवा' : 'Send Feedback'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6">
        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'mr' ? 'आमची सेवा कशी वाटली?' : 'How was our service?'}
          </h3>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm">
            {rating === 0 && (language === 'mr' ? 'रेटिंग द्या' : 'Tap to rate')}
            {rating === 1 && (language === 'mr' ? 'खराब' : 'Poor')}
            {rating === 2 && (language === 'mr' ? 'सामान्य' : 'Fair')}
            {rating === 3 && (language === 'mr' ? 'चांगले' : 'Good')}
            {rating === 4 && (language === 'mr' ? 'खूप चांगले' : 'Very Good')}
            {rating === 5 && (language === 'mr' ? 'उत्कृष्ट' : 'Excellent')}
          </p>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'mr' ? 'फीडबॅकचा प्रकार' : 'Feedback Category'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                  category === cat.id
                    ? 'bg-orange-50 border-orange-200 text-orange-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feedback Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'mr' ? 'तुमचा अनुभव सांगा' : 'Tell us about your experience'}
          </h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={language === 'mr' ? 'तुमचा फीडबॅक इथे लिहा...' : 'Write your feedback here...'}
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 text-sm">
              {language === 'mr' ? 'कमीत कमी 10 अक्षरे' : 'Minimum 10 characters'}
            </span>
            <span className="text-gray-500 text-sm">
              {feedback.length}/500
            </span>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          type="submit"
          disabled={isSubmitting || rating === 0 || feedback.length < 10}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl font-bold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{language === 'mr' ? 'फीडबॅक पाठवा' : 'Send Feedback'}</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}
