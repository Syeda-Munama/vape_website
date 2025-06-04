
import type { NextRequest } from "next/server"
import { updateSession } from "@/utils/supabase/middleware"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Handle auth session updates
  const response = await updateSession(request)

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // You can add admin role checking here when you implement roles
    // For now, we'll just ensure user is authenticated
    const supabaseResponse = response || NextResponse.next()
    return supabaseResponse
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
