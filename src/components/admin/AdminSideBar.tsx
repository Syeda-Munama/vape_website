// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   Users,
//   BarChart3,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const navigation = [
//   { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
//   { name: "Products", href: "/admin/products", icon: Package },
//   { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
 
//   { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
//   { name: "Settings", href: "/admin/settings", icon: Settings },
// ]

// export default function AdminSidebar() {
//   const [collapsed, setCollapsed] = useState(false)
//   const pathname = usePathname()

//   return (
//     <div className={cn("bg-white border-r border-gray-200 transition-all duration-300", collapsed ? "w-16" : "w-64")}>
//       <div className="flex flex-col h-full">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           {!collapsed && <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>}
//           <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
//             {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
//           </Button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-2">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
//                   isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
//                 )}
//               >
//                 <item.icon className="h-5 w-5 flex-shrink-0" />
//                 {!collapsed && <span>{item.name}</span>}
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-gray-200">
//           <Link
//             href="/"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           >
//             <ChevronLeft className="h-5 w-5 flex-shrink-0" />
//             {!collapsed && <span>Back to Store</span>}
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Tag,
  Wine,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Brands", href: "/admin/brands", icon: Tag },
  { name: "Series", href: "/admin/series", icon: Layers },
  { name: "Flavours", href: "/admin/flavours", icon: Wine },
 
 
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("bg-white border-r border-gray-200 transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <ChevronLeft className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}
