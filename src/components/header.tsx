// "use client"

// import { useCart } from "@/context/CartContext"
// import { useAuth } from "@/context/AuthContext"
// import { useState } from "react"
// import { VscChevronDown, VscChromeClose } from "react-icons/vsc"
// import { BsCart2 } from "react-icons/bs"
// import { CiSearch } from "react-icons/ci"
// import { FaRegUserCircle } from "react-icons/fa"
// import { HiMenuAlt3 } from "react-icons/hi"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import Image from "next/image"
// import logo from "@/app/public/lOGO.png"
// import { useRouter } from "next/navigation"
// import { LogOut, User, ShoppingBag, Heart, Settings } from "lucide-react"

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
//   const { user, loading, signOut } = useAuth()
//   const { cart } = useCart()
//   const router = useRouter()

//   const handleLogout = async () => {
//     await signOut()
//     setIsUserMenuOpen(false)
//     router.push("/")
//   }

//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

//   const navItems = [
//     { name: "E-liquid", href: "/category/eliquids" },
//     { name: "Vape Kits", href: "/category/vape-kits" },
//     { name: "Disposables", href: "/category/disposables" },
//     { name: "Coil", href: "/category/coils" },
//     { name: "Pods", href: "/category/pods" },
//     { name: "Nic Pouches", href: "/category/nic-pouches" },
//   ]

//   // Get user's first name or email prefix for display
//   const getUserDisplayName = () => {
//     if (!user?.email) return ""
//     return user.email.split("@")[0]
//   }

//   return (
//     <>
//       {/* Top Banner */}
//       <div className="relative flex items-center justify-center w-full h-10 bg-black text-white text-[14px] font-satoshi">
//         Get 20% on your first order. &nbsp;
//         <Link href="/auth/sign-up" className="text-[#ffb700] font-semibold">
//           <span className="underline cursor-pointer">Sign up now!</span>
//         </Link>
//         <button
//           onClick={() => setIsMenuOpen(false)}
//           aria-label="Close banner"
//           className="absolute right-5 max-md:hidden"
//         >
//           <VscChromeClose />
//         </button>
//       </div>

//       {/* Main Navbar */}
//       <div className="w-full px-5 md:px-10 bg-white flex items-center justify-between shadow-sm">
//         {/* Logo & Hamburger */}
//         <div className="flex items-center gap-4">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl md:hidden" aria-label="Toggle menu">
//             <HiMenuAlt3 />
//           </button>
//           <Link href="/">
//             <Image
//               src={logo || "/placeholder.svg"}
//               alt="Vaping World Logo"
//               width={120}
//               height={20}
//               className="ml-16"
//               priority
//             />
//           </Link>
//         </div>

//         {/* Search Bar */}
//         <form className="hidden md:flex flex-1 max-w-xl mx-6 relative">
//           <Input
//             type="search"
//             placeholder="Search for products..."
//             className="w-full p-2 pl-10 rounded-full bg-[#f0f0f0] border border-gray-300 shadow-inner"
//           />
//           <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
//         </form>

//         {/* Icons */}
//         <div className="flex items-center gap-4">
//           {/* Cart */}
//           <div className="relative">
//             <Link href="/cart" className="flex items-center">
//               <Button variant="ghost" size="icon" aria-label="Cart">
//                 <BsCart2 className="h-7 w-7" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
//                     {totalItems}
//                   </span>
//                 )}
//               </Button>
//             </Link>
//           </div>

//           {/* User Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//               className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               aria-label="User menu"
//             >
//               <FaRegUserCircle className="h-8 w-8" />
//               {user && (
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium text-gray-900">Hello, {getUserDisplayName()}</p>
//                   <p className="text-xs text-gray-500">My Account</p>
//                 </div>
//               )}
//             </button>

//             {/* User Dropdown Menu */}
//             {isUserMenuOpen && (
//               <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
//                 {user ? (
//                   <>
//                     {/* User Info Header */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">{user.email}</p>
//                       <p className="text-xs text-gray-500">
//                         Member since {new Date(user.created_at).toLocaleDateString()}
//                       </p>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-2">
//                       <Link
//                         href="/account"
//                         className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <User className="h-4 w-4" />
//                         My Account
//                       </Link>
//                       <Link
//                         href="/account/orders"
//                         className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <ShoppingBag className="h-4 w-4" />
//                         My Orders
//                       </Link>
//                       <Link
//                         href="/account/wishlist"
//                         className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <Heart className="h-4 w-4" />
//                         Wishlist
//                       </Link>
//                       <Link
//                         href="/account/settings"
//                         className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <Settings className="h-4 w-4" />
//                         Settings
//                       </Link>
//                     </div>

//                     {/* Logout */}
//                     <div className="border-t border-gray-100 py-2">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         Sign Out
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="py-2">
//                     <Link
//                       href="/auth/login"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       href="/auth/sign-up"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     >
//                       Create Account
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation Bar */}
//       <div className="hidden md:flex w-full bg-[#dbdbdb] px-10 py-6 text-sm justify-between font-satoshi font-semibold">
//         {navItems.map((item, index) => (
//           <Link key={index} href={item.href} className="flex items-center gap-1 cursor-pointer hover:underline">
//             {item.name} <VscChevronDown />
//           </Link>
//         ))}
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <ul className="flex flex-col gap-4 px-5 py-4">
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   href={item.href}
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name} <VscChevronDown />
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Search Bar */}
//           <div className="px-5 pb-4">
//             <form className="relative w-full">
//               <Input
//                 type="search"
//                 placeholder="Search for products..."
//                 className="w-full p-2 pl-10 rounded-full border border-gray-300"
//               />
//               <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Click outside to close user menu */}
//       {isUserMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />}
//     </>
//   )
// }
// "use client"

// import { useCart } from "@/context/CartContext"
// import { useAuth } from "@/context/AuthContext"
// import { useState, useEffect } from "react"
// import { VscChevronDown, VscChromeClose } from "react-icons/vsc"
// import { BsCart2 } from "react-icons/bs"
// import { CiSearch } from "react-icons/ci"
// import { FaRegUserCircle } from "react-icons/fa"
// import { HiMenuAlt3 } from "react-icons/hi"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import Image from "next/image"
// import logo from "@/app/public/lOGO.png"
// import { useRouter } from "next/navigation"
// import { LogOut, User, ShoppingBag, Heart, Settings } from "lucide-react"

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
//   const [mounted, setMounted] = useState(false)

//   const { user, loading, signOut } = useAuth()
//   const { cart } = useCart()

//   const router = useRouter()

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   // Debug log to see user state changes in header
//   useEffect(() => {
//     console.log("Header - User state:", user?.email, "Loading:", loading)
//   }, [user, loading])

//   const handleLogout = async () => {
//     await signOut()
//     setIsUserMenuOpen(false)
//     router.push("/")
//     // Force a hard refresh to clear all state
//     window.location.reload()
//   }

//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

//   const navItems = [
//     { name: "E-liquid", href: "/category/eliquids" },
//     { name: "Vape Kits", href: "/category/vape-kits" },
//     { name: "Disposables", href: "/category/disposables" },
//     { name: "Coil", href: "/category/coils" },
//     { name: "Pods", href: "/category/pods" },
//     { name: "Nic Pouches", href: "/category/nic-pouches" },
//   ]

//   const getUserDisplayName = () => {
//     if (!user?.email) return ""
//     return user.email.split("@")[0]
//   }

//   const renderUserContent = () => {
//     if (!mounted) {
//       return (
//         <div className="flex items-center gap-2 p-2 rounded-lg">
//           <FaRegUserCircle className="h-8 w-8" />
//         </div>
//       )
//     }

//     if (loading) {
//       return (
//         <div className="flex items-center gap-2 p-2 rounded-lg">
//           <FaRegUserCircle className="h-8 w-8" />
//           <div className="hidden md:block text-left">
//             <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//         </div>
//       )
//     }

//     return (
//       <button
//         onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//         className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//         aria-label="User menu"
//       >
//         <FaRegUserCircle className="h-8 w-8" />
//         {user && (
//           <div className="hidden md:block text-left">
//             <p className="text-sm font-medium text-gray-900">Hello, {getUserDisplayName()}</p>
//             <p className="text-xs text-gray-500">My Account</p>
//           </div>
//         )}
//       </button>
//     )
//   }

//   return (
//     <>
//       {/* Top Banner */}
//       <div className="relative flex items-center justify-center w-full h-10 bg-black text-white text-[14px] font-satoshi">
//         Get 20% on your first order. &nbsp;
//         <Link href="/auth/sign-up" className="text-[#ffb700] font-semibold">
//           <span className="underline cursor-pointer">Sign up now!</span>
//         </Link>
//         <button
//           onClick={() => setIsMenuOpen(false)}
//           aria-label="Close banner"
//           className="absolute right-5 max-md:hidden"
//         >
//           <VscChromeClose />
//         </button>
//       </div>

//       {/* Main Navbar */}
//       <div className="w-full px-5 md:px-10 bg-white flex items-center justify-between shadow-sm">
//         {/* Logo & Hamburger */}
//         <div className="flex items-center gap-4">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl md:hidden" aria-label="Toggle menu">
//             <HiMenuAlt3 />
//           </button>
//           <Link href="/">
//             <Image
//               src={logo || "/placeholder.svg"}
//               alt="Vaping World Logo"
//               width={120}
//               height={20}
//               className="ml-16"
//               priority
//             />
//           </Link>
//         </div>

//         {/* Search Bar */}
//         <form className="hidden md:flex flex-1 max-w-xl mx-6 relative">
//           <Input
//             type="search"
//             placeholder="Search for products..."
//             className="w-full p-2 pl-10 rounded-full bg-[#f0f0f0] border border-gray-300 shadow-inner"
//           />
//           <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
//         </form>

//         {/* Icons */}
//         <div className="flex items-center gap-4">
//           {/* Cart */}
//           <div className="relative">
//             <Link href="/cart" className="flex items-center">
//               <Button variant="ghost" size="icon" aria-label="Cart">
//                 <BsCart2 className="h-7 w-7" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
//                     {totalItems}
//                   </span>
//                 )}
//               </Button>
//             </Link>
//           </div>

//           {/* User Menu */}
//           <div className="relative">
//             {renderUserContent()}

//             {/* User Dropdown Menu */}
//             {isUserMenuOpen && mounted && (
//               <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
//                 {user ? (
//                   <>
//                     {/* User Info Header */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">{user.email}</p>
//                       <p className="text-xs text-gray-500">
//                         Member since {new Date(user.created_at).toLocaleDateString()}
//                       </p>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-2">
//                       <Link
//                         href="/account"
//                         className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <User className="h-4 w-4" />
//                         My Account
//                       </Link>
//                       <Link
//                         href="/account/orders"
//                         className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <ShoppingBag className="h-4 w-4" />
//                         My Orders
//                       </Link>
                      
                      
//                     </div>

//                     {/* Logout */}
//                     <div className="border-t border-gray-100 py-2">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         Sign Out
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="py-2">
//                     <Link
//                       href="/auth/login"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       href="/auth/sign-up"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     >
//                       Create Account
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation Bar */}
//       <div className="hidden md:flex w-full bg-[#dbdbdb] px-10 py-6 text-sm justify-between font-satoshi font-semibold">
//         {navItems.map((item, index) => (
//           <Link key={index} href={item.href} className="flex items-center gap-1 cursor-pointer hover:underline">
//             {item.name} <VscChevronDown />
//           </Link>
//         ))}
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <ul className="flex flex-col gap-4 px-5 py-4">
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   href={item.href}
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name} <VscChevronDown />
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Search Bar */}
//           <div className="px-5 pb-4">
//             <form className="relative w-full">
//               <Input
//                 type="search"
//                 placeholder="Search for products..."
//                 className="w-full p-2 pl-10 rounded-full border border-gray-300"
//               />
//               <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Click outside to close user menu */}
//       {isUserMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />}
//     </>
//   )
// }
"use client"

import type React from "react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect, useCallback, useRef } from "react"
import { VscChevronDown, VscChromeClose } from "react-icons/vsc"
import { BsCart2 } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import { FaRegUserCircle } from "react-icons/fa"
import { HiMenuAlt3 } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import logo from "@/app/public/lOGO.png"
import { useRouter } from "next/navigation"
import { LogOut, User, ShoppingBag } from 'lucide-react'
import { createClient } from "@supabase/supabase-js"

// TypeScript interfaces (unchanged)
interface Category {
  id: string
  name: string
}
interface Brand {
  id: string
  name: string
}
interface Series {
  id: string
  name: string
}
interface Flavour {
  id: string
  name: string
}
interface Product {
  id: string
  name: string
  price: number
  discounted_price: number | null
  img_url: string | null
  capacity: string | null
  nicotine_strength: string | null
  description: string | null
  stock: number | null
  slug: string | null
  categories: Category | null
  brands: Brand | null
  series: Series | null
  flavours: Flavour | null
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [displayedResults, setDisplayedResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showAllResults, setShowAllResults] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { user, loading, signOut } = useAuth()
  const { cart } = useCart()
  const router = useRouter()

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const INITIAL_DISPLAY_COUNT = 24

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log("Header - User state:", user?.email, "Loading:", loading)
  }, [user, loading])

  const handleLogout = async () => {
    await signOut()
    setIsUserMenuOpen(false)
    router.push("/")
    window.location.reload()
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  const navItems = [
    { name: "E-liquid", href: "/category/eliquids" },
    { name: "Vape Kits", href: "/category/vape-kits" },
    { name: "Disposables", href: "/category/disposables" },
    { name: "Coil", href: "/category/coils" },
    { name: "Pods", href: "/category/pods" },
    { name: "Nic Pouches", href: "/category/nic-pouches" },
  ]

  const getUserDisplayName = () => {
    if (!user?.email) return ""
    return user.email.split("@")[0]
  }

  const prioritizeResults = (results: Product[], query: string): Product[] => {
    const lowerQuery = query.toLowerCase()
    return results.sort((a, b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      if (aName === lowerQuery && bName !== lowerQuery) return -1
      if (bName === lowerQuery && aName !== lowerQuery) return 1
      if (aName.startsWith(lowerQuery) && !bName.startsWith(lowerQuery)) return -1
      if (bName.startsWith(lowerQuery) && !aName.startsWith(lowerQuery)) return 1
      return 0
    })
  }

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setDisplayedResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
        id,
        name,
        price,
        discounted_price,
        img_url,
        capacity,
        nicotine_strength,
        description,
        stock,
        slug,
        categories (
          id,
          name
        ),
        brands (
          id,
          name
        ),
        series (
          id,
          name
        ),
        flavours (
          id,
          name
        )
      `)
        .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
        .eq("is_active", true)
        .gt("stock", 0)
        .order("name")

      if (error) {
        console.error("Search error:", error)
        return
      }

      const results = (data as unknown as Product[]) || []
      const prioritizedResults = prioritizeResults(results, query)
      setSearchResults(prioritizedResults)
      setDisplayedResults(prioritizedResults.slice(0, INITIAL_DISPLAY_COUNT))
      setShowSearchResults(true)
      setShowAllResults(false)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(query)
    }, 300)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setDisplayedResults([])
    setShowSearchResults(false)
    setShowAllResults(false)
  }

  const handleProductClick = (product: Product) => {
    if (product.slug) {
      router.push(`/product/${product.slug}`)
      clearSearch()
      setIsMenuOpen(false)
    }
  }

  const renderUserContent = () => {
    if (!mounted) {
      return (
        <div className="flex items-center gap-2 p-2 rounded-lg">
          <FaRegUserCircle className="h-8 w-8" />
        </div>
      )
    }

    if (loading) {
      return (
        <div className="flex items-center gap-2 p-2 rounded-lg">
          <FaRegUserCircle className="h-8 w-8" />
          <div className="hidden md:block text-left">
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      )
    }

    return (
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="User menu"
      >
        <FaRegUserCircle className="h-8 w-8" />
        {user && (
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">Hello, {getUserDisplayName()}</p>
            <p className="text-xs text-gray-500">My Account</p>
          </div>
        )}
      </button>
    )
  }

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".search-container")) {
        setShowSearchResults(false)
      }
    }

    if (showSearchResults) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showSearchResults])

  return (
    <>
      {/* Top Banner */}
      <div className="relative flex items-center justify-center w-full h-10 bg-black text-white text-[14px] font-satoshi">
        Get 20% on your first order.  
        <Link href="/auth/sign-up" className="font-semibold">
          <span className="underline cursor-pointer">Sign up now!</span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close banner"
          className="absolute right-5 max-md:hidden"
        >
          <VscChromeClose />
        </button>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-5 md:px-10 bg-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl md:hidden" aria-label="Toggle menu">
            <HiMenuAlt3 />
          </button>
          <Link href="/">
            <Image
              src={logo || "/placeholder.svg"}
              alt="Vaping World Logo"
              width={120}
              height={20}
              className="ml-16"
              priority
            />
          </Link>
        </div>

        {/* Desktop Search Bar with Results */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6 relative search-container">
          <form onSubmit={(e) => e.preventDefault()} className="w-full relative">
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 pl-10 pr-10 rounded-full bg-[#f0f0f0] border border-gray-300 shadow-inner"
            />
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
            {/* Desktop Search Results */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-[60vh] overflow-y-auto">
                {isSearching ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Results for "{searchQuery}" ({searchResults.length} found)
                      </h2>
                      <button onClick={clearSearch} className="text-gray-500 hover:text-gray-700 text-sm">
                        Clear
                      </button>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {displayedResults.map((product) => (
                        <li
                          key={product.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="w-12 h-12 flex-shrink-0">
                            <Image
                              src={product.img_url || "/placeholder.svg"}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                            <div className="flex items-center gap-2">
                              {product.discounted_price ? (
                                <>
                                  <span className="text-sm font-bold text-red-600">${product.discounted_price}</span>
                                  <span className="text-xs text-gray-500 line-through">${product.price}</span>
                                </>
                              ) : (
                                <span className="text-sm font-bold text-gray-900">${product.price}</span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {searchResults.length > INITIAL_DISPLAY_COUNT && (
                      <div className="text-center mt-4">
                        <button
                          onClick={() => {
                            if (showAllResults) {
                              setDisplayedResults(searchResults.slice(0, INITIAL_DISPLAY_COUNT))
                              setShowAllResults(false)
                            } else {
                              setDisplayedResults(searchResults)
                              setShowAllResults(true)
                            }
                          }}
                          className={`px-4 py-2 rounded-lg text-white transition-colors ${
                            showAllResults ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {showAllResults ? `Show Less` : `Show All ${searchResults.length} Results`}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-600">No products found for "{searchQuery}"</p>
                    <p className="text-xs text-gray-500 mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Link href="/cart" className="flex items-center">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <BsCart2 className="h-7 w-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
          <div className="relative">
            {renderUserContent()}
            {isUserMenuOpen && mounted && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        Member since {new Date(user.created_at || "").toLocaleDateString()}
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        My Orders
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-2">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="hidden md:flex w-full bg-[#dbdbdb] px-10 py-6 text-sm justify-between font-satoshi font-semibold">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href} className="flex items-center gap-1 cursor-pointer hover:underline">
            {item.name} <VscChevronDown />
          </Link>
        ))}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-5 py-4 search-container border-b border-gray-200 relative">
            <form onSubmit={(e) => e.preventDefault()} className="w-full relative">
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 pl-10 pr-10 rounded-full border border-gray-300"
              />
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              {/* Mobile Search Results */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-[60vh] overflow-y-auto">
                  {isSearching ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
                      <p className="mt-2 text-sm text-gray-600">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Results for "{searchQuery}" ({searchResults.length} found)
                        </h2>
                        <button onClick={clearSearch} className="text-gray-500 hover:text-gray-700 text-sm">
                          Clear
                        </button>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {displayedResults.map((product) => (
                          <li
                            key={product.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                            onClick={() => handleProductClick(product)}
                          >
                            <div className="w-12 h-12 flex-shrink-0">
                              <Image
                                src={product.img_url || "/placeholder.svg"}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                              <div className="flex items-center gap-2">
                                {product.discounted_price ? (
                                  <>
                                    <span className="text-sm font-bold text-red-600">${product.discounted_price}</span>
                                    <span className="text-xs text-gray-500 line-through">${product.price}</span>
                                  </>
                                ) : (
                                  <span className="text-sm font-bold text-gray-900">${product.price}</span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {searchResults.length > INITIAL_DISPLAY_COUNT && (
                        <div className="text-center mt-4">
                          <button
                            onClick={() => {
                              if (showAllResults) {
                                setDisplayedResults(searchResults.slice(0, INITIAL_DISPLAY_COUNT))
                                setShowAllResults(false)
                              } else {
                                setDisplayedResults(searchResults)
                                setShowAllResults(true)
                              }
                            }}
                            className={`px-4 py-2 rounded-lg text-white transition-colors ${
                              showAllResults ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {showAllResults ? `Show Less` : `Show All ${searchResults.length} Results`}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-600">No products found for "{searchQuery}"</p>
                      <p className="text-xs text-gray-500 mt-1">Try different keywords</p>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
          <ul className="flex flex-col gap-4 px-5 py-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name} <VscChevronDown />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isUserMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />}
    </>
  )
}