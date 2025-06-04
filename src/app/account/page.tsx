// import { redirect } from "next/navigation"
// import { createClient } from "@/utils/supabase/server"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { User, Mail, Calendar, ShoppingBag, Heart, Settings } from "lucide-react"
// import Link from "next/link"

// export default async function AccountPage() {
//   const supabase = await createClient()

//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect("/auth/login")
//   }

//   const user = data.user

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
//           <p className="mt-2 text-gray-600">Manage your account and view your orders</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Profile Information */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Profile Information
//                 </CardTitle>
//                 <CardDescription>Your account details and information</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Mail className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">Email</p>
//                       <p className="text-sm text-gray-600">{user.email}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Calendar className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">Member since</p>
//                       <p className="text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">Email Verified</p>
//                       <p className="text-sm text-gray-600">{user.email_confirmed_at ? "Yes" : "No"}</p>
//                     </div>
//                     <Button variant="outline" size="sm">
//                       Edit Profile
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent Orders */}
//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <ShoppingBag className="h-5 w-5" />
//                   Recent Orders
//                 </CardTitle>
//                 <CardDescription>Your recent purchases and order history</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center py-8">
//                   <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500 mb-4">No orders yet</p>
//                   <Button asChild>
//                     <Link href="/">Start Shopping</Link>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Actions */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//                 <CardDescription>Manage your account settings</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button variant="outline" className="w-full justify-start" asChild>
//                   <Link href="/account/orders">
//                     <ShoppingBag className="h-4 w-4 mr-2" />
//                     View Orders
//                   </Link>
//                 </Button>
//                 <Button variant="outline" className="w-full justify-start" asChild>
//                   <Link href="/account/wishlist">
//                     <Heart className="h-4 w-4 mr-2" />
//                     Wishlist
//                   </Link>
//                 </Button>
//                 <Button variant="outline" className="w-full justify-start" asChild>
//                   <Link href="/account/settings">
//                     <Settings className="h-4 w-4 mr-2" />
//                     Account Settings
//                   </Link>
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Account Stats */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Account Stats</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Total Orders</span>
//                   <span className="font-semibold">0</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Wishlist Items</span>
//                   <span className="font-semibold">0</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Loyalty Points</span>
//                   <span className="font-semibold">0</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, ShoppingBag, Package, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Order {
  id: string
  created_at: string
  total: number
  status: string
  items: any[]
  delivery_method: string
  first_name: string
  last_name: string
}

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        setIsLoading(false)
        fetchOrders()
      }
    }
  }, [user, loading, router])

  const fetchOrders = async () => {
    if (!user) return

    try {
      setOrdersLoading(true)
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .or(`user_id.eq.${user.id}`)
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) {
        console.error("Error fetching orders:", error)
        return
      }

      setOrders(data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setOrdersLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatOrderId = (id: string) => {
    return `#${id.slice(-8).toUpperCase()}`
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="mt-2 text-gray-600">Manage your profile and view your order history</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Your account details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member since</p>
                    <p className="text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Verified</p>
                    <p className="text-sm text-gray-600">{user.email_confirmed_at ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order History
              </CardTitle>
              <CardDescription>Your recent purchases and order details</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No orders yet</p>
                  <p className="text-sm text-gray-400 mb-6">When you place your first order, it will appear here.</p>
                  <Button asChild>
                    <Link href="/">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-gray-900">{formatOrderId(order.id)}</h3>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                            <p>
                              {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""} • £
                              {order.total.toFixed(2)}
                            </p>
                            <p className="capitalize">Delivery: {order.delivery_method}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/account/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      {order.items && order.items.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center gap-2 mb-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Items:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {order.items.slice(0, 3).map((item: any, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="relative w-8 h-8 bg-gray-100 rounded flex-shrink-0">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="32px"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-gray-900">{item.name}</p>
                                  <p className="text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="text-sm text-gray-500">
                                +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {orders.length >= 10 && (
                    <div className="text-center pt-4">
                      <Button variant="outline" asChild>
                        <Link href="/account/orders">View All Orders</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
