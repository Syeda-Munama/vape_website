// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { CheckCircle2 } from "lucide-react"

// export default function CheckoutSuccess() {
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
//           <div className="rounded-lg bg-muted p-4">
//             <p className="text-sm font-medium">Order #12345</p>
//             <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address.</p>
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

// app/checkout/success/page.jsx (or .tsx)
"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useSearchParams } from "next/navigation" // Import useSearchParams

export default function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") // Retrieve the orderId here

  // You can keep your formatting logic for display
  const displayOrderId = orderId ? `#${orderId.slice(-8).toUpperCase()}` : "N/A"

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Order Confirmed!</CardTitle>
          <CardDescription className="text-center">
            Thank you for your purchase. Your order has been received and is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            {/* Display the dynamic order ID */}
            <p className="text-sm font-medium">Order {displayOrderId}</p>
            <p className="text-sm text-muted-foreground">Your order has been confirmed.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}