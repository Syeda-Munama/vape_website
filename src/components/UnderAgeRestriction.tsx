"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function UnderAgeRestriction() {
  const handleContactSupport = () => {
    window.location.href = "mailto:support@vapingworld.com"
  }

  const handleGoBack = () => {
    localStorage.removeItem("ageVerified")
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h1>
          <p className="text-gray-600 leading-relaxed">
            Sorry! This site is restricted to users aged 18 and older. If you have any questions, please contact our
            support team for assistance.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleContactSupport} className="w-full bg-blue-600 hover:bg-blue-700">
            Contact Support
          </Button>
          <Button onClick={handleGoBack} variant="outline" className="w-full bg-transparent">
            Go Back
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This restriction is in place to comply with age verification requirements for vaping products.
          </p>
        </div>
      </div>
    </div>
  )
}
