import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default async function ProtectedRoute({ children, redirectTo = "/auth/login" }: ProtectedRouteProps) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect(redirectTo)
  }

  return <>{children}</>
}
