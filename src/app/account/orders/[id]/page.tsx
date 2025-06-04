"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CreditCard, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  brand: string | { name: string } // Handle both string and object formats
}

interface OrderDetails {
  id: string
  created_at: string
  total: number
  subtotal: number
  delivery_fee: number
  status: string
  items: OrderItem[]
  delivery_method: string
  payment_method: string
  first_name: string
  last_name: string
  email: string
  phone: string
  shipping_address: string
  shipping_city: string
  shipping_postcode: string
  shipping_country: string
  special_instructions?: string
}

export default function OrderDetailsPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [orderLoading, setOrderLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        fetchOrderDetails()
      }
    }
  }, [user, loading, id])

  const fetchOrderDetails = async () => {
    if (!user || !id) return

    try {
      setOrderLoading(true)
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .single()

      if (error) {
        console.error("Error fetching order:", error)
        return
      }

      console.log("Order data:", data) // Debug log to see the structure
      setOrder(data)
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setOrderLoading(false)
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

  // Helper function to safely get brand name
  const getBrandName = (brand: string | { name: string } | undefined): string => {
    if (!brand) return "Unknown Brand"
    if (typeof brand === "string") return brand
    if (typeof brand === "object" && brand.name) return brand.name
    return "Unknown Brand"
  }

  // Helper function to safely get item property
  const getItemProperty = (item: any, property: string, fallback: any = "") => {
    try {
      return item[property] ?? fallback
    } catch {
      return fallback
    }
  }

  if (loading || orderLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Button asChild>
            <Link href="/account">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Account
            </Link>
          </Button>
        </div>
      </div>
    )
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
              <h1 className="text-3xl font-bold text-gray-900">Order {formatOrderId(order.id)}</h1>
              <p className="text-gray-600 mt-1">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <Badge className={getStatusColor(order.status)} variant="secondary">
              {order.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items ({order.items?.length || 0} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!order.items || order.items.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No items found in this order.</p>
                ) : (
                  <div className="space-y-4">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                        <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                          <Image
                            src={getItemProperty(item, "image", "/placeholder.svg") || "/placeholder.svg"}
                            alt={getItemProperty(item, "name", "Product")}
                            fill
                            className="object-contain p-2"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900">
                            {getItemProperty(item, "name", "Unknown Product")}
                          </h3>
                          <p className="text-sm text-gray-500">{getBrandName(item.brand)}</p>
                          <p className="text-sm text-gray-600">Quantity: {getItemProperty(item, "quantity", 1)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            £
                            {(
                              (getItemProperty(item, "price", 0) || 0) * (getItemProperty(item, "quantity", 1) || 1)
                            ).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            £{(getItemProperty(item, "price", 0) || 0).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {order.first_name} {order.last_name}
                  </p>
                  <p>{order.shipping_address}</p>
                  <p>
                    {order.shipping_city}, {order.shipping_postcode}
                  </p>
                  <p>{order.shipping_country}</p>
                  <div className="pt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      {order.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      {order.phone}
                    </div>
                  </div>
                  {order.special_instructions && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-gray-900">Special Instructions:</p>
                      <p className="text-sm text-gray-600">{order.special_instructions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>£{(order.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>{(order.delivery_fee || 0) === 0 ? "Free" : `£${(order.delivery_fee || 0).toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>£{(order.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Method</span>
                    <span className="capitalize">{order.delivery_method || "Standard"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Method</span>
                    <span className="capitalize">{order.payment_method || "Card"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <span className="text-green-600">Paid</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
