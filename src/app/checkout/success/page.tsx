

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { createClient } from "@/utils/supabase/client";
// import { useCart } from "@/context/CartContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, Loader2, Package, ArrowRight } from "lucide-react";

// type Order = {
//   id: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   total: number;
//   status: string;
//   created_at: string;
//   payment_id: string;
// };

// export default function CheckoutSuccessPage() {
//   const supabase = createClient();
//   const { clearCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [order, setOrder] = useState<Order | null>(null);

//   useEffect(() => {
//     const molliePaymentId = typeof window !== "undefined" ? sessionStorage.getItem("molliePaymentId") : null;
//     const tempId = typeof window !== "undefined" ? sessionStorage.getItem("tempId") : null;

//     const fetchOrder = async () => {
//       try {
//         // Fast path: lookup by Mollie payment_id
//         if (molliePaymentId) {
//           const { data, error } = await supabase
//             .from("orders")
//             .select("*")
//             .eq("payment_id", molliePaymentId)
//             .single();

//           if (!error && data) {
//             setOrder(data as Order);
//             clearCart();
//             return;
//           }
//         }

//         // Fallback: if payment_id not found, show generic success
//         // (webhook might still be processing)
//         console.warn("Order not found yet for payment_id:", molliePaymentId);
//       } catch (e) {
//         console.error("Success page fetch error:", e);
//       } finally {
//         setLoading(false);
//         // Always clean up session storage
//         if (typeof window !== "undefined") {
//           sessionStorage.removeItem("molliePaymentId");
//           sessionStorage.removeItem("tempId");
//         }
//       }
//     };

//     fetchOrder();
//   }, [supabase, clearCart]);

//   // Show loading
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-lg text-gray-700">Finalizing your order...</p>
//           <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
//         </div>
//       </div>
//     );
//   }

//   // Generic success (order not yet in DB — webhook pending)
//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <Card className="max-w-md w-full">
//           <CardContent className="text-center py-10">
//             <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//               <CheckCircle className="h-8 w-8 text-green-600" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
//             <p className="text-gray-600 mb-6">
//               Your payment was received. We're processing your order and will send a confirmation email shortly.
//             </p>
//             <Button asChild className="w-full">
//               <Link href="/">
//                 Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // Full order success
//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4 max-w-2xl">
//         <div className="text-center mb-8">
//           <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//             <CheckCircle className="h-8 w-8 text-green-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
//           <p className="text-lg text-gray-700">
//             Thank you, <span className="font-medium">{order.first_name}</span>!
//           </p>
         
//         </div>

//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               Order Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-600">Order Number</p>
//               <p className="font-mono font-medium">#{order.id.slice(-8).toUpperCase()}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Order Date</p>
//               <p className="font-medium">
//                 {new Date(order.created_at).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600">Total Paid</p>
//               <p className="font-medium text-lg">£{Number(order.total).toFixed(2)}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Status</p>
//               <p className="font-medium capitalize text-green-700">{order.status}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button asChild className="flex-1">
//             <Link href="/">
//               Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//           <Button asChild variant="outline" className="flex-1">
//             <Link href="/account/orders">View Orders</Link>
//           </Button>
//         </div>

       
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { createClient } from "@/utils/supabase/client";
// import { useCart } from "@/context/CartContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, Loader2, Package } from "lucide-react";

// type Order = {
//   id: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   total: number;
//   status: string;
//   created_at: string;
//   payment_id: string;
// };

// export default function CheckoutSuccessPage() {
//   const supabase = createClient();
//   const { clearCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [order, setOrder] = useState<Order | null>(null);

//   // useEffect(() => {
//   //   const molliePaymentId = typeof window !== "undefined"
//   //     ? sessionStorage.getItem("molliePaymentId")
//   //     : null;

//   //   const fetchOrder = async () => {
//   //     try {
//   //       if (!molliePaymentId) {
//   //         setOrder(null);
//   //         return;
//   //       }

//   //       const { data, error } = await supabase
//   //         .from("orders")
//   //         .select("id, email, first_name, last_name, total, status, created_at, payment_id")
//   //         .eq("payment_id", molliePaymentId)
//   //         .single();

//   //       if (!error && data) {
//   //         setOrder(data);
//   //         clearCart();
//   //       } else {
//   //         setOrder(null);
//   //       }
//   //     } catch (e) {
//   //       console.error("Success page error:", e);
//   //       setOrder(null);
//   //     } finally {
//   //       setLoading(false);
//   //       // Clean up session
//   //       // sessionStorage.removeItem("molliePaymentId");
//   //       // sessionStorage.removeItem("tempId");
//   //     }
//   //   };

//   //   fetchOrder();
//   // }, [supabase, clearCart]);
// useEffect(() => {
//   const molliePaymentId = sessionStorage.getItem("molliePaymentId");
//   const tempId = sessionStorage.getItem("tempId");

//   console.log("DEBUG: sessionStorage.molliePaymentId =", molliePaymentId);
//   console.log("DEBUG: sessionStorage.tempId =", tempId);
//   console.log("DEBUG: All sessionStorage =", { ...sessionStorage });

//   const fetchOrder = async () => {
//     if (!molliePaymentId) {
//       console.log("No molliePaymentId → fallback");
//       setOrder(null);
//       setLoading(false);
//       return;
//     }

//     console.log("Querying DB for payment_id =", molliePaymentId);

//     const { data, error } = await supabase
//       .from("orders")
//       .select("id, payment_id, total, email, first_name, last_name, status, created_at")
//       .eq("payment_id", molliePaymentId)
//       .single();

//     console.log("DB result:", { data, error });

//     if (data) {
//       // assert the row as Order so TypeScript knows all fields are present
//       setOrder(data as Order);
//       clearCart();
//     } else {
//       console.log("No order found → fallback");
//       setOrder(null);
//     }

//     setLoading(false);
//   };

//   fetchOrder();
// }, []);

//   // Loading
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
//           <p className="mt-4 text-gray-600">Processing your order...</p>
//         </div>
//       </div>
//     );
//   }

//   // Fallback: Payment received, order not in DB yet
//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Card className="max-w-md w-full mx-4">
//           <CardContent className="text-center py-8">
//             <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
//             <h1 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h1>
//             <p className="text-gray-600 mb-6">
//               Your payment was received. Your order will appear shortly.
//             </p>
//             <Button asChild>
//               <Link href="/">Continue Shopping</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // Success: Full order details
//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4 max-w-2xl">
//         <div className="text-center mb-8">
//           <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//             <CheckCircle className="h-8 w-8 text-green-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
//           <p className="text-gray-600">Thanks for your purchase, {order.first_name}!</p>
//         </div>

//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               Order Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-600">Order Number</p>
//               <p className="font-medium">#{order.id.slice(-8).toUpperCase()}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Order Date</p>
//               <p className="font-medium">
//                 {new Date(order.created_at).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600">Total Amount</p>
//               <p className="font-medium">£{Number(order.total).toFixed(2)}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button asChild className="flex-1">
//             <Link href="/">Continue Shopping</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Package } from "lucide-react";

type Order = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  total: number;
  status: string;
  created_at: string;
  payment_id: string;
};

export default function CheckoutSuccessPage() {
  const supabase = createClient();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const molliePaymentId = typeof window !== "undefined"
      ? sessionStorage.getItem("molliePaymentId")
      : null;
    const tempId = typeof window !== "undefined"
      ? sessionStorage.getItem("tempId")
      : null;

    console.log("DEBUG: Looking for payment_id =", molliePaymentId);
    console.log("DEBUG: tempId =", tempId);

    if (!molliePaymentId) {
      console.log("No payment ID in session → show fallback");
      setLoading(false);
      return;
    }

    const maxAttempts = 12; // ~18 seconds total
    const delay = 1500; // 1.5 sec between polls

    const pollOrder = async () => {
      setAttempts((prev) => prev + 1);
      console.log(`Polling attempt ${attempts + 1}/${maxAttempts} for payment_id: ${molliePaymentId}`);

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, email, first_name, last_name, total, status, created_at, payment_id")
          .eq("payment_id", molliePaymentId)
          .single();

        if (data) {
          console.log("ORDER FOUND!", data);
          setOrder(data);
          clearCart();
          sessionStorage.removeItem("molliePaymentId");
          sessionStorage.removeItem("tempId");
          setLoading(false);
          return;
        }

        if (error) {
          if (error.code !== "PGRST116") {
            console.error("Supabase error:", error);
          } else {
            console.log("No order yet (PGRST116) → retrying...");
          }
        }

        if (attempts + 1 < maxAttempts) {
          setTimeout(pollOrder, delay);
        } else {
          console.log("Max attempts reached → show fallback");
          setLoading(false);
        }
      } catch (err) {
        console.error("Unexpected error in polling:", err);
        if (attempts + 1 < maxAttempts) {
          setTimeout(pollOrder, delay);
        } else {
          setLoading(false);
        }
      }
    };

    pollOrder();
  }, [supabase, clearCart, attempts]);

  // Loading State with Polling Feedback
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Finalizing Your Order...
            </h2>
            <p className="text-sm text-gray-600">
              Checking for your order... ({attempts}/{12})
            </p>
            <p className="text-xs text-gray-500 mt-3">
              This usually takes 3–10 seconds
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fallback: Payment received, order not in DB yet
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-10">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your payment was received successfully. <br />
              Your order will appear in your account shortly.
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // SUCCESS: Full Order Details
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thanks for your purchase, {order.first_name}!
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Package className="h-6 w-6" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold">
                #{order.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date</span>
              <span className="font-medium">
                {new Date(order.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-lg">
                £{Number(order.total).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600 capitalize">
                {order.status}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1 text-base h-12">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 text-base h-12">
            <Link href="/account/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}