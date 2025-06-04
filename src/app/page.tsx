// import CategoryCards from "@/components/homepage/Category";
// import FeaturedProducts from "@/components/homepage/Featured";
// import FeaturedBrands from "@/components/homepage/FeaturedBrands";
// import FlavorExplorer from "@/components/homepage/Flaour";
// import HeroBanner from "@/components/homepage/HeroBanner";

// export default function HomePage(){
//     return (
//         <>
//         <HeroBanner/>
//         <FeaturedBrands/>
//         <CategoryCards/>
//         <FeaturedProducts/>
//         <FlavorExplorer/>
//         </>
//     );
// }
// "use client"

// import { useEffect, useState } from "react"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { CheckCircle2 } from "lucide-react"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import CategoryCards from "@/components/homepage/Category"
// import FeaturedProducts from "@/components/homepage/Featured"
// import FeaturedBrands from "@/components/homepage/FeaturedBrands"
// import FlavorExplorer from "@/components/homepage/Flaour"
// import HeroBanner from "@/components/homepage/HeroBanner"

// export default function HomePage() {
//   const [user, setUser] = useState<any>(null)
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
//   const supabase = createClientComponentClient()

//   // Check auth status and if we should show the welcome message
//   useEffect(() => {
//     const checkAuth = async () => {
//       const { data } = await supabase.auth.getSession()
//       if (data.session) {
//         setUser(data.session.user)

//         // Check if this is a new login
//         const isNewLogin = sessionStorage.getItem("newLogin") === "true"
//         if (isNewLogin) {
//           setShowWelcomeMessage(true)
//           // Clear the flag so it doesn't show on refresh
//           sessionStorage.removeItem("newLogin")

//           // Hide the message after 5 seconds
//           setTimeout(() => {
//             setShowWelcomeMessage(false)
//           }, 5000)
//         }
//       }
//     }

//     checkAuth()
//   }, [supabase])

//   return (
//     <>
//       {/* Authentication success message */}
//       {showWelcomeMessage && user && (
//         <div className="container mx-auto px-4 py-4">
//           <Alert className="border-green-500 bg-green-50 text-green-700">
//             <CheckCircle2 className="h-4 w-4" />
//             <AlertDescription>Welcome back, {user.email}! You are now logged in.</AlertDescription>
//           </Alert>
//         </div>
//       )}

//       {/* Existing homepage components */}
//       <HeroBanner />
//       <FeaturedBrands />
//       <CategoryCards />
//       <FeaturedProducts />
//       <FlavorExplorer />
//     </>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { CheckCircle2 } from "lucide-react"
// import { useRouter } from "next/navigation"
// import CategoryCards from "@/components/homepage/Category"
// import FeaturedProducts from "@/components/homepage/Featured"
// import FeaturedBrands from "@/components/homepage/FeaturedBrands"
// import FlavorExplorer from "@/components/homepage/Flaour"
// import HeroBanner from "@/components/homepage/HeroBanner"

// export default function HomePage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [userEmail, setUserEmail] = useState<string | null>(null)
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
//   const router = useRouter()

//   // Check authentication state on client side
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const supabase = createClientComponentClient()
//       const { data } = await supabase.auth.getSession()

//       if (data.session) {
//         setIsLoggedIn(true)
//         setUserEmail(data.session.user.email)

//         // Check if we should show the welcome message
//         const isNewLogin = sessionStorage.getItem("newLogin") === "true"
//         if (isNewLogin) {
//           setShowWelcomeMessage(true)
//           // Clear the flag so it doesn't show on refresh
//           sessionStorage.removeItem("newLogin")

//           // Hide the message after 5 seconds
//           setTimeout(() => {
//             setShowWelcomeMessage(false)
//           }, 5000)
//         }
//       } else {
//         setIsLoggedIn(false)
//         setUserEmail(null)
//         setShowWelcomeMessage(false)
//       }
//     }

//     checkAuthStatus()
//   }, [])

//   // Listen for auth state changes
//   useEffect(() => {
//     const supabase = createClientComponentClient()

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN" && session) {
//         setIsLoggedIn(true)
//         setUserEmail(session.user.email)
//         setShowWelcomeMessage(true)

//         // Hide the message after 5 seconds
//         setTimeout(() => {
//           setShowWelcomeMessage(false)
//         }, 5000)

//         router.refresh()
//       } else if (event === "SIGNED_OUT") {
//         setIsLoggedIn(false)
//         setUserEmail(null)
//         setShowWelcomeMessage(false)
//         router.refresh()
//       }
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [router])

//   return (
//     <>
//       {/* Authentication success message */}
//       {showWelcomeMessage && isLoggedIn && (
//         <div className="container mx-auto px-4 py-4">
//           <Alert className="border-green-500 bg-green-50 text-green-700">
//             <CheckCircle2 className="h-4 w-4" />
//             <AlertDescription>Welcome back, {userEmail}! You are now logged in.</AlertDescription>
//           </Alert>
//         </div>
//       )}

//       {/* Existing homepage components */}
//       <HeroBanner />
//       <FeaturedBrands />
//       <CategoryCards />
//       <FeaturedProducts />
//       <FlavorExplorer />
//     </>
//   )
// }
// app/page.tsx (or wherever your homepage is rendered)
import CategoryCards from "@/components/homepage/Category"
import FeaturedProducts from "@/components/homepage/Featured"
import FeaturedBrands from "@/components/homepage/FeaturedBrands"
import FlavorExplorer from "@/components/homepage/Flaour"
import HeroBanner from "@/components/homepage/HeroBanner"
import WelcomeMessage from "@/components/WelcomeMessageClient"


export default function HomePage() {
  return (
    <>
      
      <WelcomeMessage />
      <HeroBanner />
      <FeaturedBrands />
      <CategoryCards />
      <FeaturedProducts />
      <FlavorExplorer />
    </>
  )
}
