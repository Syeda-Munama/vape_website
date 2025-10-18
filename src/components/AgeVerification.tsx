"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showRestriction, setShowRestriction] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only show age verification on the homepage
    if (pathname !== "/") {
      return
    }

    // Show age verification modal after 3.5 seconds delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3500) // 3.5 seconds delay

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer)
  }, [pathname])

  const handleAgeVerification = (isOver18: boolean) => {
    if (isOver18) {
      // Don't save to localStorage - just set verified for this session
      setIsVerified(true)
      setIsVisible(false)
    } else {
      // Hide the verification modal and show restriction message
      setIsVisible(false)
      setShowRestriction(true)
    }
  }

  const handleGoBack = () => {
    setShowRestriction(false)
    setIsVisible(true)
  }

  // Don't show anything if not on homepage
  if (pathname !== "/") {
    return null
  }

  // Don't show anything if verified for this session
  if (isVerified) {
    return null
  }

  // Show restriction message for under 18 users
  if (showRestriction) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Sorry! This site is restricted to users aged 18 and older. If you have any questions, please contact our
              support team for assistance.
            </p>
          </div>
          
        </div>
      </div>
    )
  }

  // Show age verification modal (only after delay and only on homepage)
  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center relative">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-4 font-integral">Welcome to Vaping World</h2>
          <p className="text-gray-600 mb-6 font-satoshi">Please, verify your age to enter</p>

          <div className="flex flex-col sm:flex-row gap-4 font-satoshi">
            <Button
              onClick={() => handleAgeVerification(false)}
              variant="outline"
              className="flex-1 bg-black text-white hover:bg-gray-800"
            >
              I am under 18
            </Button>
            <Button
              onClick={() => handleAgeVerification(true)}
              variant="outline"
              className="flex-1 border-black text-black hover:bg-gray-100"
            >
              I am over 18
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            By entering this site you are agreeing to the Terms of Use and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
