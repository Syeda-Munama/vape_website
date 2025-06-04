"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Package, Calendar, DollarSign } from "lucide-react"
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
  payment_method: string
}

export default function OrdersPage() {
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

  // Helper function to safely get item property
  const getItemProperty = (item: any, property: string, fallback: any = "") => {
    try {
      return item[property] ?? fallback
    } catch {
      return fallback
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
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
        {/* Header */}
        <div className="mb-8">
          <Link href="/account" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Account
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
              <p className="text-gray-600 mt-1">View all your orders</p>
            </div>
            <div className="text-sm text-gray-500">{orders.length} total orders</div>
          </div>
        </div>

        {/* Orders List */}
        {ordersLoading ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your orders...</p>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
              <Button asChild>
                <Link href="/">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-lg text-gray-900">{formatOrderId(order.id)}</h3>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>
                            {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>£{(order.total || 0).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Delivery:</span> {order.delivery_method || "Standard"}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="lg:max-w-md">
                      {order.items && order.items.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Items:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.slice(0, 3).map((item: any, index: number) => (
                              <div key={index} className="flex items-center gap-2 bg-gray-50 rounded p-2 text-sm">
                                <div className="relative w-6 h-6 bg-white rounded flex-shrink-0">
                                  <Image
                                    src={getItemProperty(item, "image", "/placeholder.svg") || "/placeholder.svg"}
                                    alt={getItemProperty(item, "name", "Product")}
                                    fill
                                    className="object-contain p-0.5"
                                    sizes="24px"
                                  />
                                </div>
                                <span className="truncate max-w-24">
                                  {getItemProperty(item, "name", "Unknown Product")}
                                </span>
                                <span className="text-gray-500">×{getItemProperty(item, "quantity", 1)}</span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="bg-gray-100 rounded p-2 text-sm text-gray-500">
                                +{order.items.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
