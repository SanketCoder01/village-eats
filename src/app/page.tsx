'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import LoadingScreen from '@/components/LoadingScreen'
import NewLandingPage from '@/components/NewLandingPage'
import OTPVerification from '@/components/OTPVerification'
import NewDashboard from '@/components/NewDashboard'

export default function Home() {
  const { isAuthenticated } = useStore()
  const [currentStep, setCurrentStep] = useState<'loading' | 'landing' | 'otp' | 'dashboard'>('loading')
  const [userPhone, setUserPhone] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentStep('dashboard')
    }
  }, [isAuthenticated])

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setCurrentStep('landing')
    }, 500)
  }

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {currentStep === 'landing' && (
        <NewLandingPage />
      )}

      {currentStep === 'otp' && (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
          <div className="max-w-md mx-auto p-4">
            <OTPVerification
              phoneNumber={userPhone}
              onVerified={() => setCurrentStep('dashboard')}
            />
          </div>
        </div>
      )}

      {currentStep === 'dashboard' && (
        <NewDashboard />
      )}
    </AnimatePresence>
  )
}
