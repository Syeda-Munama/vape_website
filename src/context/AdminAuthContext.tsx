"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

interface AdminAuthContextType {
  isAdmin: boolean
  loading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// For now, we'll use a simple email-based admin check
// You can replace this with proper role-based authentication later
const ADMIN_EMAILS = [
  "admin@vapingworld.com",
  "owner@vapingworld.com",
  // Add your admin emails here
]

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if user is admin (you can replace this with role-based check)
      const adminStatus = ADMIN_EMAILS.includes(user.email || "")
      setIsAdmin(adminStatus)

      if (!adminStatus) {
        router.push("/") // Redirect non-admin users
        return
      }

      setLoading(false)
    }
  }, [user, authLoading, router])

  return <AdminAuthContext.Provider value={{ isAdmin, loading }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}

