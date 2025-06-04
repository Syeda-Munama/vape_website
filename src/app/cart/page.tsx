
"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center font-satoshi font-semibold">
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
    <div className="container mx-auto px-4 py-12 font-satoshi font-semibold">
      <h1 className="text-2xl font-bold mb-8 font-integral">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 grid gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-24 h-24 shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="100px"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-muted-foreground text-sm">£{item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
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

        {/* Order Summary */}
        <div className="w-full lg:w-auto">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-bold mb-4 font-satoshi">Order Summary</h2>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span>Shipping</span>
              <span className="text-muted-foreground">Calculated at checkout</span>
            </div>
            <Link href="/checkout">
            <Button className="w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
