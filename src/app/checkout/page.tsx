// // app/checkout/page.tsx

// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { createClient } from "@/utils/supabase/client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Separator } from "@/components/ui/separator";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   CreditCard,
//   Truck,
//   Shield,
//   AlertCircle,
// } from "lucide-react";

// interface CheckoutFormData {
//   // Customer Information
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone: string;

//   // Shipping Address
//   shippingAddress: string;
//   shippingCity: string;
//   shippingPostcode: string;
//   shippingCountry: string;

//   // Billing Address
//   billingAddress: string;
//   billingCity: string;
//   billingPostcode: string;
//   billingCountry: string;
//   billingIsSame: boolean;

//   // Order Details
//   paymentMethod: string;
//   deliveryMethod: string;
//   specialInstructions: string;

//   // Guest Options
//   createAccount: boolean;
//   password?: string;

//   // Marketing
//   emailUpdates: boolean;
// }

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); // This is the correct clearCart from your context
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [totalQunatity, setTotalQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState<CheckoutFormData>({
//     email: user?.email || "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     shippingAddress: "",
//     shippingCity: "",
//     shippingPostcode: "",
//     shippingCountry: "United Kingdom",
//     billingAddress: "",
//     billingCity: "",
//     billingPostcode: "",
//     billingCountry: "United Kingdom",
//     billingIsSame: true,
//     paymentMethod: "paypal",
//     deliveryMethod: "standard",
//     specialInstructions: "",
//     createAccount: false,
//     emailUpdates: true,
//   });

//   // Redirect if cart is empty
//   useEffect(() => {
//     // if (cart.length === 0) {
//     //   router.push("/cart")
//     // }
//   }, [cart, router]);

//   // Calculate totals
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const deliveryFee =
//     formData.deliveryMethod === "express"
//       ? 9.99
//       : formData.deliveryMethod === "standard"
//       ? 4.99
//       : 0;
//   const total = subtotal + deliveryFee;

//   const handleInputChange = (
//     field: keyof CheckoutFormData,
//     value: string | boolean
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//       // Auto-copy shipping to billing if billingIsSame is true
//       ...(field === "billingIsSame" && value === true
//         ? {
//             billingAddress: prev.shippingAddress,
//             billingCity: prev.shippingCity,
//             billingPostcode: prev.shippingPostcode,
//             billingCountry: prev.shippingCountry,
//           }
//         : {}),
//       // Auto-copy shipping fields to billing if billingIsSame is true
//       ...([
//         "shippingAddress",
//         "shippingCity",
//         "shippingPostcode",
//         "shippingCountry",
//       ].includes(field) && prev.billingIsSame
//         ? {
//             [`billing${field.replace("shipping", "")}`]: value,
//           }
//         : {}),
//     }));
//   };

//   const validateForm = () => {
//     const required = [
//       "email",
//       "firstName",
//       "lastName",
//       "phone",
//       "shippingAddress",
//       "shippingCity",
//       "shippingPostcode",
//     ];

//     for (const field of required) {
//       if (!formData[field as keyof CheckoutFormData]) {
//         setError(
//           `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
//         );
//         return false;
//       }
//     }

//     if (!formData.billingIsSame) {
//       const billingRequired = [
//         "billingAddress",
//         "billingCity",
//         "billingPostcode",
//       ];
//       for (const field of billingRequired) {
//         if (!formData[field as keyof CheckoutFormData]) {
//           setError(
//             `Please fill in billing ${field
//               .replace("billing", "")
//               .toLowerCase()}`
//           );
//           return false;
//         }
//       }
//     }

//     if (!user && formData.createAccount && !formData.password) {
//       setError("Please enter a password to create an account");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const supabase = createClient();

//       // Create account if guest user wants one
//       let userId = user?.id;
//       if (!user && formData.createAccount) {
//         const { data: authData, error: authError } = await supabase.auth.signUp(
//           {
//             email: formData.email,
//             password: formData.password!,
//           }
//         );

//         if (authError) throw authError;
//         userId = authData.user?.id;
//       }

//       // Create order
//       const orderData = {
//         user_id: userId,
//         email: formData.email,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         phone: formData.phone,
//         shipping_address: formData.shippingAddress,
//         shipping_city: formData.shippingCity,
//         shipping_postcode: formData.shippingPostcode,
//         shipping_country: formData.shippingCountry,
//         billing_address: formData.billingIsSame
//           ? formData.shippingAddress
//           : formData.billingAddress,
//         billing_city: formData.billingIsSame
//           ? formData.shippingCity
//           : formData.billingCity,
//         billing_postcode: formData.billingIsSame
//           ? formData.shippingPostcode
//           : formData.billingPostcode,
//         billing_country: formData.billingIsSame
//           ? formData.shippingCountry
//           : formData.billingCountry,
//         payment_method: formData.paymentMethod,
//         delivery_method: formData.deliveryMethod,
//         special_instructions: formData.specialInstructions,
//         subtotal: subtotal,
//         delivery_fee: deliveryFee,
//         total: total,
//         status: "pending",
//         items: cart,
//       };

//       // const { data: order, error: orderError } = await supabase.from("orders").insert(orderData).select().single()

//       // if (orderError) throw orderError

//       // // Clear cart and redirect to success page
//       // clearCart() // This now calls the clearCart from CartContext
//       // router.push(`/checkout/success?orderId=${order.id}`)
//       console.log("Order Data:", orderData);

//       console.log(
//         "Order filds:",
//         orderData.total,
//         orderData.items.reduce(
//           (sum: any, item: { quantity: any }) => sum + item.quantity,
//           0
//         )
//       );

//       if (orderData) {
//         const response = fetch("/api/stripe-checkout", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             // userId: orderData?.user_id,
//             // totalAmount: orderData?.total,
//             // totalQuantity: orderData?.items?.reduce(
//             //   (sum: any, item: { quantity: any }) => sum + item.quantity,
//             //   0
//             // ),
//             orderData : orderData
//           }),
//         })
//           .then(async (response) => {
//             const data = await response.json();
//             console.log("Stripe checkout response:", data);
//             console.log("Stripe checkout URL:", data?.message);
//             localStorage.setItem("orderData", JSON.stringify(orderData.items));
//             localStorage.setItem("orderSaved", "false") 
//             router.push(data?.message);
//           })
//           .catch((error) => {
//             console.error("Stripe checkout error:", error);
//           });
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cart.length === 0) {
//     return null; // Will redirect
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <Link
//             href="/cart"
//             className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Cart
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//           <p className="text-gray-600 mt-2">Complete your order below</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               {/* Customer Information */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Shield className="h-5 w-5" />
//                     Customer Information
//                   </CardTitle>
//                   {!user && (
//                     <CardDescription>
//                       Already have an account?{" "}
//                       <Link
//                         href="/auth/login"
//                         className="text-blue-600 hover:text-blue-500"
//                       >
//                         Sign in
//                       </Link>
//                     </CardDescription>
//                   )}
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="firstName">First Name *</Label>
//                       <Input
//                         id="firstName"
//                         value={formData.firstName}
//                         onChange={(e) =>
//                           handleInputChange("firstName", e.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="lastName">Last Name *</Label>
//                       <Input
//                         id="lastName"
//                         value={formData.lastName}
//                         onChange={(e) =>
//                           handleInputChange("lastName", e.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         handleInputChange("email", e.target.value)
//                       }
//                       disabled={!!user}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) =>
//                         handleInputChange("phone", e.target.value)
//                       }
//                       required
//                     />
//                   </div>

//                   {/* Guest Account Creation */}
//                   {!user && (
//                     <div className="space-y-4 pt-4 border-t">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="createAccount"
//                           checked={formData.createAccount}
//                           onCheckedChange={(checked) =>
//                             handleInputChange(
//                               "createAccount",
//                               checked as boolean
//                             )
//                           }
//                         />
//                         <Label htmlFor="createAccount">
//                           Create an account for faster checkout next time
//                         </Label>
//                       </div>
//                       {formData.createAccount && (
//                         <div>
//                           <Label htmlFor="password">Password *</Label>
//                           <Input
//                             id="password"
//                             type="password"
//                             value={formData.password || ""}
//                             onChange={(e) =>
//                               handleInputChange("password", e.target.value)
//                             }
//                             placeholder="Create a password"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* Shipping Address */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Truck className="h-5 w-5" />
//                     Shipping Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <Label htmlFor="shippingAddress">Address *</Label>
//                     <Input
//                       id="shippingAddress"
//                       value={formData.shippingAddress}
//                       onChange={(e) =>
//                         handleInputChange("shippingAddress", e.target.value)
//                       }
//                       placeholder="Street address"
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="shippingCity">City *</Label>
//                       <Input
//                         id="shippingCity"
//                         value={formData.shippingCity}
//                         onChange={(e) =>
//                           handleInputChange("shippingCity", e.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="shippingPostcode">Postcode *</Label>
//                       <Input
//                         id="shippingPostcode"
//                         value={formData.shippingPostcode}
//                         onChange={(e) =>
//                           handleInputChange("shippingPostcode", e.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="shippingCountry">Country</Label>
//                     <Input
//                       id="shippingCountry"
//                       value={formData.shippingCountry}
//                       onChange={(e) =>
//                         handleInputChange("shippingCountry", e.target.value)
//                       }
//                       disabled
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Billing Address */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Billing Address</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="billingIsSame"
//                       checked={formData.billingIsSame}
//                       onCheckedChange={(checked) =>
//                         handleInputChange("billingIsSame", checked as boolean)
//                       }
//                     />
//                     <Label htmlFor="billingIsSame">
//                       Same as shipping address
//                     </Label>
//                   </div>

//                   {!formData.billingIsSame && (
//                     <>
//                       <div>
//                         <Label htmlFor="billingAddress">Address *</Label>
//                         <Input
//                           id="billingAddress"
//                           value={formData.billingAddress}
//                           onChange={(e) =>
//                             handleInputChange("billingAddress", e.target.value)
//                           }
//                           placeholder="Street address"
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="billingCity">City *</Label>
//                           <Input
//                             id="billingCity"
//                             value={formData.billingCity}
//                             onChange={(e) =>
//                               handleInputChange("billingCity", e.target.value)
//                             }
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="billingPostcode">Postcode *</Label>
//                           <Input
//                             id="billingPostcode"
//                             value={formData.billingPostcode}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 "billingPostcode",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* Delivery & Payment */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Delivery & Payment</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {/* Delivery Method */}
//                   <div>
//                     <Label className="text-base font-medium">
//                       Delivery Method
//                     </Label>
//                     <RadioGroup
//                       value={formData.deliveryMethod}
//                       onValueChange={(value) =>
//                         handleInputChange("deliveryMethod", value)
//                       }
//                       className="mt-2"
//                     >
//                       <div className="flex items-center justify-between p-3 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="standard" id="standard" />
//                           <Label htmlFor="standard">
//                             Standard Delivery (3-5 days)
//                           </Label>
//                         </div>
//                         <span className="font-medium">£4.99</span>
//                       </div>
//                       <div className="flex items-center justify-between p-3 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="express" id="express" />
//                           <Label htmlFor="express">
//                             Express Delivery (1-2 days)
//                           </Label>
//                         </div>
//                         <span className="font-medium">£9.99</span>
//                       </div>
//                       <div className="flex items-center justify-between p-3 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="collection" id="collection" />
//                           <Label htmlFor="collection">Click & Collect</Label>
//                         </div>
//                         <span className="font-medium">Free</span>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   {/* Payment Method */}
//                   <div>
//                     <Label className="text-base font-medium">
//                       Payment Method
//                     </Label>
//                     <RadioGroup
//                       value={formData.paymentMethod}
//                       onValueChange={(value) =>
//                         handleInputChange("paymentMethod", value)
//                       }
//                       className="mt-2"
//                     >
//                       {/* <div className="flex items-center space-x-2 p-3 border rounded-lg">
//                         <RadioGroupItem value="card" id="card" />
//                         <CreditCard className="h-4 w-4" />
//                         <Label htmlFor="card">Credit/Debit Card</Label>
//                       </div> */}
//                       <div className="flex items-center space-x-2 p-3 border rounded-lg">
//                         <RadioGroupItem value="stripe" id="stripe" />
//                         <Label htmlFor="stripe">Stripe</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   {/* Special Instructions */}
//                   <div>
//                     <Label htmlFor="specialInstructions">
//                       Special Instructions (Optional)
//                     </Label>
//                     <Textarea
//                       id="specialInstructions"
//                       value={formData.specialInstructions}
//                       onChange={(e) =>
//                         handleInputChange("specialInstructions", e.target.value)
//                       }
//                       placeholder="Any special delivery instructions..."
//                       rows={3}
//                     />
//                   </div>

//                   {/* Email Updates */}
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="emailUpdates"
//                       checked={formData.emailUpdates}
//                       onCheckedChange={(checked) =>
//                         handleInputChange("emailUpdates", checked as boolean)
//                       }
//                     />
//                     <Label htmlFor="emailUpdates">
//                       Send me email updates about my order
//                     </Label>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full"
//                 size="lg"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Processing..."
//                   : `Complete Order - £${total.toFixed(2)}`}
//               </Button>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Cart Items */}
//                 <div className="space-y-3">
//                   {cart.map((item) => (
//                     <div key={item.id} className="flex items-center gap-3">
//                       <div className="relative w-12 h-12 bg-gray-100 rounded">
//                         <Image
//                           src={item.image || "/placeholder.svg"}
//                           alt={item.name}
//                           fill
//                           className="object-contain p-1"
//                           sizes="48px"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">
//                           {item.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           Qty: {item.quantity}
//                         </p>
//                       </div>
//                       <p className="text-sm font-medium">
//                         £{(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator />

//                 {/* Totals */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Subtotal</span>
//                     <span>£{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Delivery</span>
//                     <span>
//                       {deliveryFee === 0
//                         ? "Free"
//                         : `£${deliveryFee.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-medium">
//                     <span>Total</span>
//                     <span>£{total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Security Notice */}
//                 <div className="bg-green-50 p-3 rounded-lg">
//                   <div className="flex items-center gap-2 text-green-800">
//                     <Shield className="h-4 w-4" />
//                     <span className="text-xs font-medium">Secure Checkout</span>
//                   </div>
//                   <p className="text-xs text-green-700 mt-1">
//                     Your payment information is encrypted and secure
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client"

// import type React from "react"
// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { useCart } from "@/context/CartContext"
// import { createClient } from "@/utils/supabase/client"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Separator } from "@/components/ui/separator"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle, ArrowLeft, Loader2, Shield, Truck, CreditCard } from "lucide-react"

// type CheckoutFormData = {
//   email: string
//   firstName: string
//   lastName: string
//   phone: string

//   shippingAddress: string
//   shippingCity: string
//   shippingPostcode: string
//   shippingCountry: string

//   billingIsSame: boolean
//   billingAddress: string
//   billingCity: string
//   billingPostcode: string
//   billingCountry: string

//   deliveryMethod: "standard" | "express" | "collection"
//   paymentMethod: "mollie" | "cod"
//   specialInstructions: string

//   createAccount: boolean
//   password?: string
//   emailUpdates: boolean
// }

// export default function CheckoutPage() {
//   const router = useRouter()
//   const supabase = useMemo(() => createClient(), [])
//   const { cart, clearCart } = useCart()
//   const [error, setError] = useState<string>("")
//   const [loading, setLoading] = useState(false)
//   const [processing, setProcessing] = useState(false)

//   const [formData, setFormData] = useState<CheckoutFormData>({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     shippingAddress: "",
//     shippingCity: "",
//     shippingPostcode: "",
//     shippingCountry: "United Kingdom",
//     billingIsSame: true,
//     billingAddress: "",
//     billingCity: "",
//     billingPostcode: "",
//     billingCountry: "United Kingdom",
//     deliveryMethod: "standard",
//     paymentMethod: "mollie",
//     specialInstructions: "",
//     createAccount: false,
//     emailUpdates: true,
//   })

//   // Prefill email if logged in
//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       if (data.user?.email) {
//         setFormData((prev) => ({ ...prev, email: data.user!.email! }))
//       }
//     })
//   }, [supabase])

//   useEffect(() => {
//     if (cart.length === 0) {
//       router.push("/cart")
//     }
//   }, [cart, router])

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
//   const deliveryFee = formData.deliveryMethod === "express" ? 9.99 : formData.deliveryMethod === "standard" ? 4.99 : 0
//   const total = subtotal + deliveryFee

//   const handleInput = (field: keyof CheckoutFormData, value: string | boolean) => {
//     setFormData((prev) => {
//       const next = { ...prev, [field]: value } as CheckoutFormData
//       if (field === "billingIsSame" && value === true) {
//         next.billingAddress = prev.shippingAddress
//         next.billingCity = prev.shippingCity
//         next.billingPostcode = prev.shippingPostcode
//         next.billingCountry = prev.shippingCountry
//       }
//       if (["shippingAddress", "shippingCity", "shippingPostcode", "shippingCountry"].includes(field)) {
//         if (prev.billingIsSame) {
//           if (field === "shippingAddress") next.billingAddress = value as string
//           if (field === "shippingCity") next.billingCity = value as string
//           if (field === "shippingPostcode") next.billingPostcode = value as string
//           if (field === "shippingCountry") next.billingCountry = value as string
//         }
//       }
//       return next
//     })
//   }

//   const validateForm = () => {
//     const required = [
//       "email",
//       "firstName",
//       "lastName",
//       "phone",
//       "shippingAddress",
//       "shippingCity",
//       "shippingPostcode",
//     ] as (keyof CheckoutFormData)[]
//     for (const f of required) {
//       if (!String(formData[f] ?? "").trim()) {
//         setError(`Please fill in ${f.replace(/([A-Z])/g, " $1").toLowerCase()}`)
//         return false
//       }
//     }
//     if (!formData.billingIsSame) {
//       if (!formData.billingAddress || !formData.billingCity || !formData.billingPostcode) {
//         setError("Please complete your billing address")
//         return false
//       }
//     }
//     if (formData.paymentMethod === "mollie" && total <= 0) {
//       setError("Total must be greater than 0 for card payment")
//       return false
//     }
//     return true
//   }

//   const placeOrderWithMollie = async () => {
//     setProcessing(true)
//     try {
//       // Persist minimal draft for success page lookup
//       if (typeof window !== "undefined") {
//         window.sessionStorage.setItem(
//           "orderDraft",
//           JSON.stringify({
//             email: formData.email,
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//           }),
//         )
//       }

//       const res = await fetch("/api/mollie/create-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderData: {
//             ...formData,
//             items: cart,
//             totals: { subtotal, deliveryFee, total },
//           },
//         }),
//       })
//       const data = await res.json()
//       if (!res.ok) throw new Error(data?.error || "Failed to start payment")

//       // Save for success page
//       if (typeof window !== "undefined") {
//         sessionStorage.setItem("mollie_payment_id", data.paymentId)
//         sessionStorage.setItem("pending_order_id", data.orderId)
//       }
//       window.location.href = data.redirectUrl
//     } catch (e: any) {
//       console.error("Mollie create-payment error:", e)
//       setError(e.message || "Payment could not be started.")
//       setProcessing(false)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     if (!validateForm()) return
//     setLoading(true)
//     try {
//       if (formData.paymentMethod === "mollie") {
//         await placeOrderWithMollie()
//         return
//       }

//       // COD flow (no online payment) – create order immediately
//       const { data: auth } = await supabase.auth.getUser()
//       const orderPayload = {
//         user_id: auth.user?.id ?? null,
//         email: formData.email,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         phone: formData.phone,
//         shipping_address: formData.shippingAddress,
//         shipping_city: formData.shippingCity,
//         shipping_postcode: formData.shippingPostcode,
//         shipping_country: formData.shippingCountry,
//         billing_address: formData.billingIsSame ? formData.shippingAddress : formData.billingAddress,
//         billing_city: formData.billingIsSame ? formData.shippingCity : formData.billingCity,
//         billing_postcode: formData.billingIsSame ? formData.shippingPostcode : formData.billingPostcode,
//         billing_country: formData.billingIsSame ? formData.shippingCountry : formData.billingCountry,
//         payment_method: "cod",
//         delivery_method: formData.deliveryMethod,
//         special_instructions: formData.specialInstructions,
//         subtotal,
//         delivery_fee: deliveryFee,
//         total,
//         status: "pending",
//         items: cart,
//       }
//       const { data: inserted, error: orderError } = await supabase.from("orders").insert(orderPayload).select().single()
//       if (orderError) throw orderError
//       clearCart()
//       router.push(`/checkout/success?order=${inserted.id}`)
//       console.log("Webhook URL:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/mollie/webhook`);

//     } catch (e: any) {
//       console.error("Checkout error:", e)
//       setError(e.message || "Something went wrong.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (cart.length === 0) return null

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="mb-8">
//           <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Cart
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//           <p className="text-gray-600 mt-2">Complete your order below</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Shield className="h-5 w-5" />
//                     Customer Information
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="firstName">First Name *</Label>
//                       <Input
//                         id="firstName"
//                         value={formData.firstName}
//                         onChange={(e) => handleInput("firstName", e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="lastName">Last Name *</Label>
//                       <Input
//                         id="lastName"
//                         value={formData.lastName}
//                         onChange={(e) => handleInput("lastName", e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="email">Email *</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => handleInput("email", e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="phone">Phone *</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => handleInput("phone", e.target.value)}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Truck className="h-5 w-5" />
//                     Shipping Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <Label htmlFor="shippingAddress">Address *</Label>
//                     <Input
//                       id="shippingAddress"
//                       value={formData.shippingAddress}
//                       onChange={(e) => handleInput("shippingAddress", e.target.value)}
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="shippingCity">City *</Label>
//                       <Input
//                         id="shippingCity"
//                         value={formData.shippingCity}
//                         onChange={(e) => handleInput("shippingCity", e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="shippingPostcode">Postcode *</Label>
//                       <Input
//                         id="shippingPostcode"
//                         value={formData.shippingPostcode}
//                         onChange={(e) => handleInput("shippingPostcode", e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="shippingCountry">Country</Label>
//                     <Input
//                       id="shippingCountry"
//                       value={formData.shippingCountry}
//                       onChange={(e) => handleInput("shippingCountry", e.target.value)}
//                       disabled
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Billing Address</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="billingIsSame"
//                       checked={formData.billingIsSame}
//                       onCheckedChange={(c) => handleInput("billingIsSame", Boolean(c))}
//                     />
//                     <Label htmlFor="billingIsSame">Same as shipping address</Label>
//                   </div>
//                   {!formData.billingIsSame && (
//                     <>
//                       <div>
//                         <Label htmlFor="billingAddress">Address *</Label>
//                         <Input
//                           id="billingAddress"
//                           value={formData.billingAddress}
//                           onChange={(e) => handleInput("billingAddress", e.target.value)}
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="billingCity">City *</Label>
//                           <Input
//                             id="billingCity"
//                             value={formData.billingCity}
//                             onChange={(e) => handleInput("billingCity", e.target.value)}
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="billingPostcode">Postcode *</Label>
//                           <Input
//                             id="billingPostcode"
//                             value={formData.billingPostcode}
//                             onChange={(e) => handleInput("billingPostcode", e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Delivery & Payment</CardTitle>
//                   <CardDescription>Choose your delivery and payment preferences</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <Label className="text-sm">Delivery Method</Label>
//                     <RadioGroup
//                       className="mt-2"
//                       value={formData.deliveryMethod}
//                       onValueChange={(v) => handleInput("deliveryMethod", v as CheckoutFormData["deliveryMethod"])}
//                     >
//                       <div className="flex items-center justify-between p-3 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="standard" id="standard" />
//                           <Label htmlFor="standard">Standard (3-5 days)</Label>
//                         </div>
//                         <span className="font-medium">£4.99</span>
//                       </div>
//                       <div className="flex items-center justify-between p-3 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="express" id="express" />
//                           <Label htmlFor="express">Express (1-2 days)</Label>
//                         </div>
//                         <span className="font-medium">£9.99</span>
//                       </div>
//                       {/* <div className="flex items-center justify-between p-3 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="collection" id="collection" />
//                           <Label htmlFor="collection">Click & Collect</Label>
//                         </div>
//                         <span className="font-medium">Free</span>
//                       </div> */}
//                     </RadioGroup>
//                   </div>

                  

//                   <div>
//                     <Label htmlFor="specialInstructions">Special Instructions</Label>
//                     <Textarea
//                       id="specialInstructions"
//                       value={formData.specialInstructions}
//                       onChange={(e) => handleInput("specialInstructions", e.target.value)}
//                       rows={3}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Button type="submit" className="w-full" size="lg" disabled={loading || processing}>
//                 {processing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Redirecting to payment...
//                   </>
//                 ) : loading ? (
//                   "Processing..."
//                 ) : (
//                   `Complete Order - £${total.toFixed(2)}`
//                 )}
//               </Button>
//             </form>
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   {cart.map((item) => (
//                     <div key={item.id} className="flex items-center gap-3">
//                       <div className="relative w-12 h-12 bg-gray-100 rounded">
//                         <Image
//                           src={item.image || "/placeholder.svg?height=48&width=48&query=product-image"}
//                           alt={item.name}
//                           fill
//                           className="object-contain p-1"
//                           sizes="48px"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">{item.name}</p>
//                         <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="text-sm font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Subtotal</span>
//                     <span>£{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Delivery</span>
//                     <span>{deliveryFee === 0 ? "Free" : `£${deliveryFee.toFixed(2)}`}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-medium">
//                     <span>Total</span>
//                     <span>£{total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="bg-green-50 p-3 rounded-lg">
//                   <div className="flex items-center gap-2 text-green-800">
//                     <Shield className="h-4 w-4" />
//                     <span className="text-xs font-medium">Secure Checkout</span>
//                   </div>
//                   <p className="text-xs text-green-700 mt-1">Card payments are securely processed by Mollie</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Loader2, Shield, Truck } from "lucide-react";

type CheckoutFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  shippingAddress: string;
  shippingCity: string;
  shippingPostcode: string;
  shippingCountry: string;

  billingIsSame: boolean;
  billingAddress: string;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;

  deliveryMethod: "standard" | "express" | "collection";
  specialInstructions: string;
  emailUpdates: boolean;
};

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const { cart, clearCart } = useCart();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPostcode: "",
    shippingCountry: "United Kingdom",
    billingIsSame: true,
    billingAddress: "",
    billingCity: "",
    billingPostcode: "",
    billingCountry: "United Kingdom",
    deliveryMethod: "standard",
    specialInstructions: "",
    emailUpdates: true,
  });

  // Prefill email if logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setFormData((prev) => ({ ...prev, email: data.user!.email! }));
      }
    });
  }, [supabase]);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee =
    formData.deliveryMethod === "express" ? 9.99 : formData.deliveryMethod === "standard" ? 4.99 : 0;
  const total = subtotal + deliveryFee;

  const handleInput = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value } as CheckoutFormData;
      if (field === "billingIsSame" && value === true) {
        next.billingAddress = prev.shippingAddress;
        next.billingCity = prev.shippingCity;
        next.billingPostcode = prev.shippingPostcode;
        next.billingCountry = prev.shippingCountry;
      }
      if (["shippingAddress", "shippingCity", "shippingPostcode", "shippingCountry"].includes(field)) {
        if (prev.billingIsSame) {
          if (field === "shippingAddress") next.billingAddress = value as string;
          if (field === "shippingCity") next.billingCity = value as string;
          if (field === "shippingPostcode") next.billingPostcode = value as string;
          if (field === "shippingCountry") next.billingCountry = value as string;
        }
      }
      return next;
    });
  };

  const validateForm = () => {
    const required = [
      "email",
      "firstName",
      "lastName",
      "phone",
      "shippingAddress",
      "shippingCity",
      "shippingPostcode",
    ] as (keyof CheckoutFormData)[];
    for (const f of required) {
      if (!String(formData[f] ?? "").trim()) {
        setError(`Please fill in ${f.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }
    if (!formData.billingIsSame) {
      if (!formData.billingAddress || !formData.billingCity || !formData.billingPostcode) {
        setError("Please complete your billing address");
        return false;
      }
    }
    if (total <= 0) {
      setError("Total must be greater than 0");
      return false;
    }
    return true;
  };

  const placeOrderWithMollie = async () => {
    setProcessing(true);
    setError("");

    try {
      // Build full order payload
      const orderPayload = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingPostcode: formData.shippingPostcode,
        shippingCountry: formData.shippingCountry,
        billingIsSame: formData.billingIsSame,
        billingAddress: formData.billingIsSame ? formData.shippingAddress : formData.billingAddress,
        billingCity: formData.billingIsSame ? formData.shippingCity : formData.billingCity,
        billingPostcode: formData.billingIsSame ? formData.shippingPostcode : formData.billingPostcode,
        billingCountry: formData.billingIsSame ? formData.shippingCountry : formData.billingCountry,
        deliveryMethod: formData.deliveryMethod,
        specialInstructions: formData.specialInstructions,
        items: cart,
        totals: { subtotal, deliveryFee, total },
      };

      // Step 1: Save order temporarily → get tempId
      const prepareRes = await fetch("/api/mollie/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const prepareData = await prepareRes.json();
      if (!prepareRes.ok) throw new Error(prepareData.error || "Failed to prepare order");

      const { tempId } = prepareData;

      // Step 2: Create Mollie payment
      const paymentRes = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempId,
          total,
          email: formData.email,
        }),
      });

      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) throw new Error(paymentData.error || "Failed to start payment");

      // Save for success page
      sessionStorage.setItem("tempId", tempId);
      sessionStorage.setItem("molliePaymentId", paymentData.paymentId);

      // Redirect to Mollie
      window.location.href = paymentData.redirectUrl;
    } catch (e: any) {
      console.error("Mollie checkout error:", e);
      setError(e.message || "Payment could not be started. Please try again.");
      setProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Only Mollie payment path (COD removed for simplicity)
      await placeOrderWithMollie();
    } catch (e: any) {
      console.error("Checkout error:", e);
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInput("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInput("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInput("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInput("phone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shippingAddress">Address *</Label>
                    <Input
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) => handleInput("shippingAddress", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        value={formData.shippingCity}
                        onChange={(e) => handleInput("shippingCity", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingPostcode">Postcode *</Label>
                      <Input
                        id="shippingPostcode"
                        value={formData.shippingPostcode}
                        onChange={(e) => handleInput("shippingPostcode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="shippingCountry">Country</Label>
                    <Input
                      id="shippingCountry"
                      value={formData.shippingCountry}
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="billingIsSame"
                      checked={formData.billingIsSame}
                      onCheckedChange={(c) => handleInput("billingIsSame", Boolean(c))}
                    />
                    <Label htmlFor="billingIsSame">Same as shipping address</Label>
                  </div>
                  {!formData.billingIsSame && (
                    <>
                      <div>
                        <Label htmlFor="billingAddress">Address *</Label>
                        <Input
                          id="billingAddress"
                          value={formData.billingAddress}
                          onChange={(e) => handleInput("billingAddress", e.target.value)}
                          required={!formData.billingIsSame}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingCity">City *</Label>
                          <Input
                            id="billingCity"
                            value={formData.billingCity}
                            onChange={(e) => handleInput("billingCity", e.target.value)}
                            required={!formData.billingIsSame}
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingPostcode">Postcode *</Label>
                          <Input
                            id="billingPostcode"
                            value={formData.billingPostcode}
                            onChange={(e) => handleInput("billingPostcode", e.target.value)}
                            required={!formData.billingIsSame}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery & Notes</CardTitle>
                  <CardDescription>Choose delivery and add instructions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm">Delivery Method</Label>
                    <RadioGroup
                      className="mt-2"
                      value={formData.deliveryMethod}
                      onValueChange={(v) => handleInput("deliveryMethod", v as CheckoutFormData["deliveryMethod"])}
                    >
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Standard (3-5 days)</Label>
                        </div>
                        <span className="font-medium">£4.99</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express">Express (1-2 days)</Label>
                        </div>
                        <span className="font-medium">£9.99</span>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions (optional)</Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInput("specialInstructions", e.target.value)}
                      rows={3}
                      placeholder="e.g. Leave with neighbor, call before delivery..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting to payment...
                  </>
                ) : loading ? (
                  "Processing..."
                ) : (
                  `Pay now — £${total.toFixed(2)}`
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded">
                        <Image
                          src={item.image || "/placeholder.svg?height=48&width=48&query=product-image"}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? "Free" : `£${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">Card payments are securely processed by Mollie</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}