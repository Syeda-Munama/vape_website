// import Link from "next/link"
// import Image from "next/image"
// import { Minus, Plus, X } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function CartPage() {
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-5xl">
//       <div className="flex items-center gap-1 text-sm mb-6">
//         <Link href="/" className="text-gray-500 hover:text-gray-700">
//           Home
//         </Link>
//         <span className="text-gray-500">&gt;</span>
//         <span className="font-medium">Cart</span>
//       </div>

//       <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>

//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2 space-y-4">
//           {/* Elf bar 500 */}
//           <div className="flex items-center border rounded-lg p-4 relative">
//             <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
//               <X size={18} />
//             </button>
//             <div className="w-20 h-20 relative mr-4">
//               <Image
//                 src="/placeholder.svg?height=200&width=200"
//                 alt="Elf bar 500"
//                 width={80}
//                 height={80}
//                 className="object-contain"
//               />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-medium">Elf bar 500</h3>
//               <p className="text-sm text-gray-500">Color: White</p>
//               <p className="font-semibold mt-2">£6.99</p>
//             </div>
//             <div className="flex items-center border rounded-md">
//               <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
//                 <Minus size={16} />
//               </button>
//               <span className="px-3 py-1">1</span>
//               <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
//                 <Plus size={16} />
//               </button>
//             </div>
//           </div>

//           {/* E-liquid */}
//           <div className="flex items-center border rounded-lg p-4 relative">
//             <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
//               <X size={18} />
//             </button>
//             <div className="w-20 h-20 relative mr-4">
//               <Image
//                 src="/placeholder.svg?height=200&width=200"
//                 alt="E-liquid"
//                 width={80}
//                 height={80}
//                 className="object-contain"
//               />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-medium">E-liquid</h3>
//               <p className="text-sm text-gray-500">Flavor: Raspberry</p>
//               <p className="font-semibold mt-2">£6.99</p>
//             </div>
//             <div className="flex items-center border rounded-md">
//               <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
//                 <Minus size={16} />
//               </button>
//               <span className="px-3 py-1">1</span>
//               <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
//                 <Plus size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Blueberry Nicotine pouche */}
//           <div className="flex items-center border rounded-lg p-4 relative">
//             <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
//               <X size={18} />
//             </button>
//             <div className="w-20 h-20 relative mr-4">
//               <Image
//                 src="/placeholder.svg?height=200&width=200"
//                 alt="Blueberry Nicotine pouche"
//                 width={80}
//                 height={80}
//                 className="object-contain"
//               />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-medium">Blueberry Nicotine pouche</h3>
//               <p className="text-sm text-gray-500">Flavor: Raspberry</p>
//               <p className="font-semibold mt-2">£7.99</p>
//             </div>
//             <div className="flex items-center border rounded-md">
//               <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
//                 <Minus size={16} />
//               </button>
//               <span className="px-3 py-1">1</span>
//               <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
//                 <Plus size={16} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="md:col-span-1">
//           <div className="border rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="font-medium">£21.97</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Discount</span>
//                 <span className="font-medium text-red-500">-£3.00</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Delivery Fee</span>
//                 <span className="font-medium">£8</span>
//               </div>

//               <div className="border-t pt-4 mt-4">
//                 <div className="flex justify-between font-semibold">
//                   <span>Total</span>
//                   <span>£26.97</span>
//                 </div>
//               </div>

//               <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-md py-6 mt-4 flex items-center justify-center gap-2">
//                 Go to Checkout
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="ml-2"
//                 >
//                   <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// "use client";

// import { useContext } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { CartContext } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";

// export default function CartPage() {

 
//     const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

//     const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
//         <p className="text-muted-foreground mb-6">
//           Looks like you haven’t added anything to your cart yet.
//         </p>
//         <Link href="/" className="text-blue-500 hover:underline">
//           ← Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

//       <div className="grid gap-6">
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-4 rounded-lg shadow-sm"
//           >
//             <div className="flex items-center gap-4">
//               <div className="relative w-24 h-24">
//                 <Image
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.name}
//                   fill
//                   className="object-contain"
//                   sizes="100px"
//                 />
//               </div>
//               <div>
//                 <h2 className="text-lg font-medium">{item.name}</h2>
//                 <p className="text-muted-foreground text-sm">£{item.price.toFixed(2)}</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
//               <div className="flex items-center border rounded px-2 py-1">
//                 <button
//                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                   disabled={item.quantity <= 1}
//                   className="p-1 text-gray-500 hover:text-black disabled:opacity-50"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-3">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                   className="p-1 text-gray-500 hover:text-black"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="text-sm text-gray-600">
//                 Total: £{(item.price * item.quantity).toFixed(2)}
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Summary */}
//       <div className="mt-10 p-6 border rounded-lg bg-white max-w-md ml-auto">
//         <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//         <div className="flex justify-between mb-2 text-sm">
//           <span>Subtotal</span>
//           <span>£{subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between mb-4 text-sm">
//           <span>Shipping</span>
//           <span className="text-muted-foreground">Calculated at checkout</span>
//         </div>
//         <Button className="w-full">Checkout</Button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";

// export default function CartPage() {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   console.log("Cart contents:", cart);


//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
//         <p className="text-muted-foreground mb-6">
//           Looks like you haven’t added anything to your cart yet.
//         </p>
//         <Link href="/" className="text-blue-500 hover:underline">
//           ← Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

//       <div className="grid gap-6">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-4 rounded-lg shadow-sm"
//           >
//             <div className="flex items-center gap-4">
//               <div className="relative w-24 h-24">
//                 <Image
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.name}
//                   fill
//                   className="object-contain"
//                   sizes="100px"
//                 />
//               </div>
//               <div>
//                 <h2 className="text-lg font-medium">{item.name}</h2>
//                 <p className="text-muted-foreground text-sm">£{item.price.toFixed(2)}</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
//               <div className="flex items-center border rounded px-2 py-1">
//                 <button
//                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                   disabled={item.quantity <= 1}
//                   className="p-1 text-gray-500 hover:text-black disabled:opacity-50"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-3">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                   className="p-1 text-gray-500 hover:text-black"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="text-sm text-gray-600">
//                 Total: £{(item.price * item.quantity).toFixed(2)}
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Order Summary */}
//       <div className="mt-10 p-6 border rounded-lg bg-white max-w-md ml-auto">
//         <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//         <div className="flex justify-between mb-2 text-sm">
//           <span>Subtotal</span>
//           <span>£{subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between mb-4 text-sm">
//           <span>Shipping</span>
//           <span className="text-muted-foreground">Calculated at checkout</span>
//         </div>
//         <Button className="w-full">Checkout</Button>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  console.log("🛒 Cart contents:", cart); // Debugging line

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="100px"
                />
              </div>
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-muted-foreground text-sm">£{item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
              <div className="flex items-center border rounded px-2 py-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-1 text-gray-500 hover:text-black disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-500 hover:text-black"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Total: £{(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 border rounded-lg bg-white max-w-md ml-auto">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2 text-sm">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <span>Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
}
