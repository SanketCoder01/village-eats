'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/lib/translations'
import { Eye, EyeOff, Phone, Mail, User, Lock, Chrome } from 'lucide-react'
import toast from 'react-hot-toast'

interface AuthFormProps {
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
  onSuccess: () => void
}

interface FormData {
  name?: string
  email: string
  phone?: string
  password: string
  confirmPassword?: string
}

export default function AuthForm({ mode, onModeChange, onSuccess }: AuthFormProps) {
  const { language, setUser } = useStore()
  const t = translations[language]
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (mode === 'register') {
        // Mock user registration
        const user = {
          id: '1',
          name: data.name || '',
          email: data.email,
          phone: data.phone || ''
        }
        setUser(user)
        toast.success(t.success)
        onSuccess()
      } else {
        // Mock user login
        const user = {
          id: '1',
          name: 'John Doe',
          email: data.email,
          phone: '+91 9876543210'
        }
        setUser(user)
        toast.success(t.success)
        onSuccess()
      }
    } catch (error) {
      toast.error(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    
    try {
      // Simulate Google Sign-in API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock Google user data
      const googleUser = {
        id: 'google_' + Date.now(),
        name: 'Sanket Patil',
        email: 'sanket.patil@gmail.com',
        phone: '' // Phone will need to be filled by user
      }
      
      setUser(googleUser)
      toast.success(t.success)
      onSuccess()
    } catch (error) {
      toast.error(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? t.loginTitle : t.registerTitle}
        </h2>

        {/* Google Sign-in Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 p-4 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 mb-4"
        >
          <Chrome className="w-5 h-5 text-blue-500" />
          <span>{mode === 'login' ? t.signInWithGoogle : t.continueWithGoogle}</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">{t.orDivider}</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'register' && (
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('name', { required: mode === 'register' })}
                  type="text"
                  placeholder={t.name}
                  className="input-field pl-10"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
            </div>
          )}

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email', { 
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
                type="email"
                placeholder={t.email}
                className="input-field pl-10"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
          </div>

          {mode === 'register' && (
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('phone', { required: mode === 'register' })}
                  type="tel"
                  placeholder={t.phone}
                  className="input-field pl-10"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">Phone number is required</p>}
            </div>
          )}

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('password', { required: true, minLength: 6 })}
                type={showPassword ? 'text' : 'password'}
                placeholder={t.password}
                className="input-field pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
          </div>

          {mode === 'register' && (
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('confirmPassword', { 
                    required: mode === 'register',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.confirmPassword}
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? t.loading : (mode === 'login' ? t.login : t.register)}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            {mode === 'login' ? t.dontHaveAccount : t.alreadyHaveAccount}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
