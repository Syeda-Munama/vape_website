
// "use client"

// import { useAuth } from "@/context/AuthContext"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ShoppingBag, User } from "lucide-react"
// import { useEffect, useState } from "react"

// export default function WelcomeMessage() {
//   const { user, loading } = useAuth()
//   const [mounted, setMounted] = useState(false)

//   // Ensure component is mounted before rendering to avoid hydration issues
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted || loading) {
//     return (
//       <div className="container mx-auto px-4 py-6">
//         <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
//       </div>
//     )
//   }

//   if (!user) {
//     return (
//       <div className="container mx-auto px-4 py-6 font-satoshi">
//         <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to Vaping World!</h2>
//                 <p className="text-gray-600">
//                   Sign up today. Join thousands of satisfied customers!
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <Button asChild variant="outline">
//                   <Link href="/auth/login">Sign In</Link>
//                 </Button>
//                 <Button asChild>
//                   <Link href="/auth/sign-up">Sign Up</Link>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 font-satoshi">
//       <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome back, {user.email?.split("@")[0]}! 👋</h2>
//               <p className="text-gray-600">
//                 Ready to explore our latest vaping products? Check out our new arrivals and exclusive deals.
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <Button asChild variant="outline">
//                 <Link href="/account">
//                   <User className="h-4 w-4 mr-2" />
//                   My Account
//                 </Link>
//               </Button>
//               {/* <Button asChild>
//                 <Link href="/category/new-arrivals">
//                   <ShoppingBag className="h-4 w-4 mr-2" />
//                   Shop Now
//                 </Link>
//               </Button> */}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function WelcomeMessage({ user }: { user: SupabaseUser | null }) {
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 font-satoshi">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to Vaping World!</h2>
                <p className="text-gray-600">
                  Sign up today. Join thousands of satisfied customers!
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 font-satoshi">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Welcome back, {user.email?.split("@")[0]}! 👋
              </h2>
              <p className="text-gray-600">
                Ready to explore our latest vaping products? Check out our new arrivals and exclusive deals.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="/account">
                  <User className="h-4 w-4 mr-2" />
                  My Account
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}