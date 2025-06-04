"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useAdminAuth } from "@/context/AdminAuthContext"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  user_id: string | null
  email: string
  first_name: string
  last_name: string
  phone: string
  shipping_address: string
  shipping_city: string
  shipping_postcode: string
  shipping_country: string
  billing_address: string
  billing_city: string
  billing_postcode: string
  billing_country: string
  payment_method: string
  delivery_method: string
  special_instructions: string | null
  subtotal: number
  delivery_fee: number
  total: number
  status: string
  items: OrderItem[]
  created_at: string
}

export default function OrderDetailPage() {
  const { loading } = useAdminAuth()
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!loading) {
      fetchOrder()
    }
  }, [loading])

  const fetchOrder = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("orders").select("*").eq("id", params.id).single()

      if (error) throw error

      setOrder(data)
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (status: string) => {
    if (!order) return

    setUpdatingStatus(true)
    try {
      const { error } = await supabase.from("orders").update({ status }).eq("id", order.id)

      if (error) throw error

      setOrder({ ...order, status })
    } catch (error) {
      console.error("Error updating order status:", error)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Order not found</h2>
          <p className="text-gray-600 mt-2">
            The order you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button className="mt-4" onClick={() => router.push("/admin/orders")}>
            Return to Orders
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h1>
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Placed on {format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <Select value={order.status} onValueChange={updateOrderStatus} disabled={updatingStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded">
                        {item.image ? (
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          £{item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in this order</p>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>£{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping ({order.delivery_method})</span>
                    <span>£{order.delivery_fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>£{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          {order.special_instructions && (
            <Card>
              <CardHeader>
                <CardTitle>Special Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{order.special_instructions}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Customer Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">
                  {order.first_name} {order.last_name}
                </h4>
                <p className="text-sm text-gray-500">{order.email}</p>
                {order.phone && <p className="text-sm text-gray-500">{order.phone}</p>}
              </div>
              
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {order.shipping_address}
                <br />
                {order.shipping_city}
                <br />
                {order.shipping_postcode}
                <br />
                {order.shipping_country}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {order.billing_address}
                <br />
                {order.billing_city}
                <br />
                {order.billing_postcode}
                <br />
                {order.billing_country}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                <span className="font-medium">Method:</span> {order.payment_method}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
