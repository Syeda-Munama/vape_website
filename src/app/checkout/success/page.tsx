
// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import { CheckCircle2 } from "lucide-react"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/context/CartContext"
// import { createClient } from "@/utils/supabase/client"
// import axios from "axios"

// export default function CheckoutSuccess() {
//   const searchParams = useSearchParams()
//   const sessionId = searchParams.get("session_id")
//   const { clearCart } = useCart()

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [saved, setSaved] = useState(false)
//   const [orderId, setOrderId] = useState<string | null>(null)

//   const formatOrderId = (id: string | null) => {
//     if (!id || id.length < 8) return "#UNKNOWN"
//     return `#${id.slice(-8).toUpperCase()}`
//   }

//   useEffect(() => {
//     const saveOrder = async () => {
//       const supabase = createClient()

//       const alreadySaved = localStorage.getItem("orderSaved")
//       if (alreadySaved === "true") {
//         const storedId = localStorage.getItem("orderId")
//         if (storedId) setOrderId(storedId)
//         setSaved(true)
//         setLoading(false)
//         return
//       }

//       try {
//         if (!sessionId) throw new Error("No session ID found.")

//         const res = await axios.get(`/api/stripe-session?session_id=${sessionId}`)
//         const session = res.data.session

//         const itemsString = localStorage.getItem("orderData")
//         if (!itemsString || itemsString === "undefined") {
//           throw new Error("No order items found.")
//         }

//         const fullName = session.metadata.fullName || ""
//         const [firstName, ...lastParts] = fullName.split(" ")
//         const lastName = lastParts.join(" ")

//         const items = JSON.parse(itemsString)

//         const orderPayload = {
//           user_id: session.metadata.user_id || null,
//           email: session.customer_details.email,
//           first_name: firstName,
//           last_name: lastName,
//           phone: session.metadata.phone,
//           shipping_address: session.metadata.shipping_address,
//           shipping_city: session.metadata.shipping_city,
//           shipping_postcode: session.metadata.shipping_postcode,
//           shipping_country: session.metadata.shipping_country,
//           billing_address: session.metadata.billing_address,
//           billing_city: session.metadata.billing_city,
//           billing_postcode: session.metadata.billing_postcode,
//           billing_country: session.metadata.billing_country,
//           payment_method: session.metadata.payment_method,
//           delivery_method: session.metadata.delivery_method,
//           special_instructions: session.metadata.special_instructions || "",
//           subtotal: parseFloat(session.metadata.subtotal),
//           delivery_fee: parseFloat(session.metadata.delivery_fee),
//           total: session.amount_total / 100,
//           items: items
//         }

//         const { data, error: insertError } = await supabase
//           .from("orders")
//           .insert(orderPayload)
//           .select()
//           .single()

//         if (insertError) throw insertError

//         console.log("Order saved successfully:", data)

//         setOrderId(data.id)
//         localStorage.setItem("orderId", data.id)
//         localStorage.setItem("orderSaved", "true")
//         localStorage.removeItem("orderData")
//         clearCart()
//         setSaved(true)
//       } catch (err: any) {
//         console.error("Order saving failed:", err)
//         setError(err.message || "Something went wrong.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     saveOrder()
//   }, [sessionId, clearCart])

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-16 flex justify-center">
//         <p className="text-center text-muted-foreground">Finalizing your order...</p>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-16 flex justify-center">
//         <Card className="w-full max-w-md text-center">
//           <CardHeader>
//             <CardTitle className="text-red-600">Something went wrong</CardTitle>
//             <CardDescription>{error}</CardDescription>
//           </CardHeader>
//           <CardFooter className="flex justify-center">
//             <Link href="/">
//               <Button>Return Home</Button>
//             </Link>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-16 flex justify-center">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-4">
//             <CheckCircle2 className="h-16 w-16 text-green-500" />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">Order Confirmed!</CardTitle>
//           <CardDescription className="text-center">
//             Thank you for your purchase. Your order has been received and is being processed.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="rounded-lg bg-muted p-4 text-center">
//             <p className="text-sm font-medium">
//               Order ID: <span className="text-muted-foreground">{formatOrderId(orderId)}</span>
//             </p>
//             <p className="text-sm text-muted-foreground">Your order has been confirmed.</p>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-center space-x-4">
//           <Link href="/">
//             <Button>Continue Shopping</Button>
//           </Link>
//           <Link href="/account/orders">
//             <Button variant="outline">View Orders</Button>
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useCart } from "@/context/CartContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, Package } from "lucide-react"

type Order = {
  id: string
  email: string
  first_name: string
  last_name: string
  total: number
  status: string
  created_at: string
}

export default function CheckoutSuccessPage() {
  const supabase = createClient()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const molliePaymentId = typeof window !== "undefined" ? sessionStorage.getItem("mollie_payment_id") : null
    const pendingOrderId = typeof window !== "undefined" ? sessionStorage.getItem("pending_order_id") : null

    const fetchOrder = async () => {
      try {
        // Try pending order id first (fast path)
        if (pendingOrderId) {
          const { data, error } = await supabase.from("orders").select("*").eq("id", pendingOrderId).single()
          if (!error && data) {
            setOrder(data as unknown as Order)
            clearCart()
            return
          }
        }

        // Fallback: lookup by Mollie payment id saved in stripe_session_id
        if (molliePaymentId) {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("stripe_session_id", molliePaymentId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()

          if (!error && data) {
            setOrder(data as unknown as Order)
            clearCart()
            return
          }
        }

        // Fallback: show generic success
        setOrder(null)
      } catch (e) {
        console.error("Success page fetch error:", e)
      } finally {
        setLoading(false)
        // Clean up session markers
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("mollie_payment_id")
          sessionStorage.removeItem("pending_order_id")
          sessionStorage.removeItem("orderDraft")
        }
      }
    }

    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Processing your order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h1>
            <p className="text-gray-600 mb-6">Your payment was received. Your order will appear shortly.</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thanks for your purchase, {order.first_name}!</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Order Number</p>
              <p className="font-medium">#{order.id.slice(-8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-600">Order Date</p>
              <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="font-medium">£{Number(order.total).toFixed(2)}</p>
            </div>
            {/* <div>
              <p className="text-gray-600">Status</p>
              <p className="font-medium capitalize">{order.status}</p>
            </div> */}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/">Continue Shopping</Link>
          </Button>
         
        </div>
      </div>
    </div>
  )
}
