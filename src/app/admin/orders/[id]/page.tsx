// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { createClient } from "@/utils/supabase/client"
// import { useAdminAuth } from "@/context/AdminAuthContext"
// import { format } from "date-fns"
// import Image from "next/image"
// import Link from "next/link"
// import { ArrowLeft, Printer, Mail } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"

// interface OrderItem {
//   id: string
//   name: string
//   price: number
//   quantity: number
//   image: string
// }

// interface Order {
//   id: string
//   user_id: string | null
//   email: string
//   first_name: string
//   last_name: string
//   phone: string
//   shipping_address: string
//   shipping_city: string
//   shipping_postcode: string
//   shipping_country: string
//   billing_address: string
//   billing_city: string
//   billing_postcode: string
//   billing_country: string
//   payment_method: string
//   delivery_method: string
//   special_instructions: string | null
//   subtotal: number
//   delivery_fee: number
//   total: number
//   status: string
//   items: OrderItem[]
//   created_at: string
// }

// export default function OrderDetailPage() {
//   const { loading } = useAdminAuth()
//   const params = useParams()
//   const router = useRouter()
//   const [order, setOrder] = useState<Order | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [updatingStatus, setUpdatingStatus] = useState(false)
//   const supabase = createClient()

//   useEffect(() => {
//     if (!loading) {
//       fetchOrder()
//     }
//   }, [loading])

//   const fetchOrder = async () => {
//     setIsLoading(true)
//     try {
//       const { data, error } = await supabase.from("orders").select("*").eq("id", params.id).single()

//       if (error) throw error

//       setOrder(data)
//     } catch (error) {
//       console.error("Error fetching order:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const updateOrderStatus = async (status: string) => {
//     if (!order) return

//     setUpdatingStatus(true)
//     try {
//       const { error } = await supabase.from("orders").update({ status }).eq("id", order.id)

//       if (error) throw error

//       setOrder({ ...order, status })
//     } catch (error) {
//       console.error("Error updating order status:", error)
//     } finally {
//       setUpdatingStatus(false)
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "processing":
//         return "bg-blue-100 text-blue-800"
//       case "shipped":
//         return "bg-purple-100 text-purple-800"
//       case "delivered":
//         return "bg-green-100 text-green-800"
//       case "cancelled":
//         return "bg-red-100 text-red-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   if (loading || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!order) {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="sm" onClick={() => router.back()}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//         </div>
//         <div className="bg-white rounded-lg p-8 text-center">
//           <h2 className="text-xl font-semibold text-gray-800">Order not found</h2>
//           <p className="text-gray-600 mt-2">
//             The order you're looking for doesn't exist or you don't have permission to view it.
//           </p>
//           <Button className="mt-4" onClick={() => router.push("/admin/orders")}>
//             Return to Orders
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="sm" onClick={() => router.back()}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h1>
//           <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <Printer className="h-4 w-4 mr-2" />
//             Print
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Order Summary */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Order Summary</CardTitle>
//                 <CardDescription>
//                   Placed on {format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}
//                 </CardDescription>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-500">Status:</span>
//                 <Select value={order.status} onValueChange={updateOrderStatus} disabled={updatingStatus}>
//                   <SelectTrigger className="w-[140px]">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="processing">Processing</SelectItem>
//                     <SelectItem value="shipped">Shipped</SelectItem>
//                     <SelectItem value="delivered">Delivered</SelectItem>
//                     <SelectItem value="cancelled">Cancelled</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {order.items && order.items.length > 0 ? (
//                   order.items.map((item, index) => (
//                     <div key={index} className="flex items-center gap-4 py-3">
//                       <div className="relative w-16 h-16 bg-gray-100 rounded">
//                         {item.image ? (
//                           <Image
//                             src={item.image || "/placeholder.svg"}
//                             alt={item.name}
//                             fill
//                             className="object-contain p-2"
//                             sizes="64px"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center h-full text-gray-400">No image</div>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.name}</h4>
//                         <p className="text-sm text-gray-500">
//                           £{item.price.toFixed(2)} × {item.quantity}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No items in this order</p>
//                 )}

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Subtotal</span>
//                     <span>£{order.subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Shipping ({order.delivery_method})</span>
//                     <span>£{order.delivery_fee.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between font-medium text-lg">
//                     <span>Total</span>
//                     <span>£{order.total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Special Instructions */}
//           {order.special_instructions && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Special Instructions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700">{order.special_instructions}</p>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* Customer Information */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Customer</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h4 className="font-medium">
//                   {order.first_name} {order.last_name}
//                 </h4>
//                 <p className="text-sm text-gray-500">{order.email}</p>
//                 {order.phone && <p className="text-sm text-gray-500">{order.phone}</p>}
//               </div>
              
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Shipping Address</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-700">
//                 {order.shipping_address}
//                 <br />
//                 {order.shipping_city}
//                 <br />
//                 {order.shipping_postcode}
//                 <br />
//                 {order.shipping_country}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Billing Address</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-700">
//                 {order.billing_address}
//                 <br />
//                 {order.billing_city}
//                 <br />
//                 {order.billing_postcode}
//                 <br />
//                 {order.billing_country}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Payment Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-700">
//                 <span className="font-medium">Method:</span> {order.payment_method}
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useAdminAuth } from "@/context/AdminAuthContext"
import { format } from "date-fns"
import Image from "next/image"
import { ArrowLeft, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import html2pdf from "html2pdf.js"
import logo from "@/app/public/lOGO.webp"

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
  const supabase = createClient()
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading) fetchOrder()
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

  const handlePrint = () => {
    if (!printRef.current || !order) return
    const element = printRef.current

    const opt = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: `Invoice-${order.id.slice(-8).toUpperCase()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }

    html2pdf().set(opt).from(element).save()
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
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
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
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h1>
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print Invoice
        </Button>
      </div>

      {/* Printable Invoice Section */}
      <div ref={printRef} className="bg-white rounded-lg shadow-md p-8 printable">
        {/* Company Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
            <p className="text-sm text-gray-500">
              Date: {format(new Date(order.created_at), "MMMM d, yyyy")}
            </p>
            <p className="text-sm text-gray-500">Order ID: {order.id.slice(-8).toUpperCase()}</p>
          </div>
          <div className="text-right">
            {/* Replace with your actual store logo */}
            <Image src={logo} alt="Company Logo" width={100} height={50} />
            <p className="text-sm text-gray-700 mt-2 font-medium">The Vaping World</p>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Billing To:</h3>
            <p className="text-gray-700">
              {order.first_name} {order.last_name}
              <br />
              {order.billing_address}
              <br />
              {order.billing_city}, {order.billing_postcode}
              <br />
              {order.billing_country}
              <br />
              {order.email}
              <br />
              {order.phone}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Shipping To:</h3>
            <p className="text-gray-700">
              {order.shipping_address}
              <br />
              {order.shipping_city}, {order.shipping_postcode}
              <br />
              {order.shipping_country}
              <br />
              {/* <span className="text-sm text-gray-500">
                Method: {order.payment_method}
              </span> */}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <table className="w-full text-sm border-collapse mb-8">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-y">
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded border"
                        />
                      )}
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-right">£{item.price.toFixed(2)}</td>
                  <td className="p-2 text-right">
                    £{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No items in this order
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex justify-end">
          <div className="w-1/2 sm:w-1/3">
            <div className="flex justify-between py-1 text-gray-700">
              <span>Subtotal</span>
              <span>£{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700">
              <span>Delivery Fee</span>
              <span>£{order.delivery_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t mt-2 font-semibold text-gray-800 text-lg">
              <span>Total</span>
              <span>£{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        {order.special_instructions && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-1">Special Instructions:</h3>
            <p className="text-gray-600">{order.special_instructions}</p>
          </div>
        )}

        <div className="text-center mt-10 text-gray-500 text-sm">
          <p>Thank you for your order!</p>
        </div>
      </div>
    </div>
  )
}
