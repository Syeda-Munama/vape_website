// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import {
//   Minus,
//   Plus,
//   Star,
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function ClientProduct({ product }: { product: any }) {
//   const [quantity, setQuantity] = useState(1);
//   const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
//   const [isSpecificationOpen, setIsSpecificationOpen] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);

//   const { addToCart } = useCart();

//   const increaseQuantity = () => setQuantity((q) => q + 1);
//   const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

//   const handleAddToCart = () => {
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.img_url,
//       quantity,
//       brand: product.brand,
//     };
//     addToCart(cartItem);
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 3000);
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <Link
//         href="/"
//         className="inline-flex items-center text-sm mb-8 hover:underline"
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to products
//       </Link>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Product Image */}
//         <div className="bg-white p-8 border rounded-lg flex items-center justify-center">
//           <div className="relative w-64 h-64">
//             <Image
//               src={product.img_url || "/placeholder.svg"}
//               alt={product.name}
//               fill
//               className="object-contain"
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-2xl font-bold mb-2 font-integral">
//             {product.name}
//           </h1>
//           <p className="text-muted-foreground mb-4 font-satoshi font-semibold">
//             by {product.brand?.name || "Unknown Brand"}
//           </p>

//           <div className="flex items-center mb-4">
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Star
//                   key={i}
//                   className="h-4 w-4 text-yellow-500 fill-yellow-500"
//                 />
//               ))}
//           </div>

//           <div className="flex items-center gap-3 mb-6">
//             <span className="text-2xl font-extrabold font-satoshi">
//               £{product.dicounted_price.toFixed(2)}
//             </span>
//             {product.price && (
//               <>
//                 <span className="line-through text-muted-foreground text-sm">
//                   £{product.price.toFixed(2)}
//                 </span>
//                 <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-satoshi font-semibold">
//                   Save{" "}
//                   {Math.round(
//                     ((product.price - product.discounted_price) /
//                       product.price) *
//                       100
//                   )}
//                   %
//                 </span>
//               </>
//             )}
//           </div>

//           {product.color && (
//             <>
//               <label
//                 htmlFor="color"
//                 className="block text-sm mb-1 font-satoshi font-bold"
//               >
//                 Colour:
//               </label>
//               <select
//                 id="color"
//                 className="w-full border px-3 py-2 rounded mb-6 text-sm font-satoshi font-semibold"
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Choose an option
//                 </option>
//                 {product.color.split(",").map((clr: string) => (
//                   <option key={clr}>{clr}</option>
//                 ))}
//               </select>
//             </>
//           )}

//           <div className="flex items-center gap-4 mb-6">
//             <div className="flex items-center border rounded px-2 py-1">
//               <button
//                 onClick={decreaseQuantity}
//                 className="p-1 text-gray-500 hover:text-black"
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="px-3 text-sm">{quantity}</span>
//               <button
//                 onClick={increaseQuantity}
//                 className="p-1 text-gray-500 hover:text-black"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//             <Button
//               size="lg"
//               className="w-full sm:w-auto font-satoshi font-bold"
//               onClick={handleAddToCart}
//             >
//               Add to Cart
//             </Button>
//             <AnimatePresence>
//               {showNotification && (
//                 <motion.div
//                   initial={{ x: 300, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: 300, opacity: 0 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                   className="fixed bottom-6 right-6 bg-green-100 border border-green-400 text-green-900 px-6 py-4 rounded-xl shadow-lg z-50 w-full max-w-xs"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <svg
//                       className="w-5 h-5 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     <span className="font-semibold font-satoshi">
//                       Item added to cart successfully!
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Description */}
//           <div className="mt-8 border border-gray-200 rounded-md">
//             <button
//               className="w-full flex justify-between items-center p-4 text-left"
//               onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
//             >
//               <h2 className="text-lg font-medium font-integral">
//                 Product Description
//               </h2>
//               {isDescriptionOpen ? (
//                 <ChevronUp className="h-5 w-5" />
//               ) : (
//                 <ChevronDown className="h-5 w-5" />
//               )}
//             </button>
//             {isDescriptionOpen && (
//               <div className="p-4 border-t border-gray-200 text-sm space-y-3 font-satoshi font-bold">
//                 <p>{product.description}</p>
//                 {product.features && (
//                   <ul className="list-disc pl-5 text-sm">
//                     {Array.isArray(product.features) && (
//                       <ul className="list-disc pl-5 text-sm">
//                         {product.features.map(
//                           (feature: string, idx: number) => (
//                             <li key={idx}>{feature.trim()}</li>
//                           )
//                         )}
//                       </ul>
//                     )}
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Specification */}
// {product.specification && typeof product.specification === "object" && (
//   <div className="mt-4 border border-gray-200 rounded-md">
//     <button
//       className="w-full flex justify-between items-center p-4 text-left"
//       onClick={() => setIsSpecificationOpen(!isSpecificationOpen)}
//     >
//       <h2 className="text-lg font-medium font-integral">
//         Product Specification
//       </h2>
//       {isSpecificationOpen ? (
//         <ChevronUp className="h-5 w-5" />
//       ) : (
//         <ChevronDown className="h-5 w-5" />
//       )}
//     </button>
//     {isSpecificationOpen && (
//       <div className="p-4 border-t border-gray-200 text-sm font-satoshi font-bold">
//         <ul className="list-disc pl-5 space-y-1 text-sm">
//           {Object.entries(product.specification).map(([key, value]) => (
//             <li key={key} className="font-satoshi font-bold">
//               <span className="capitalize">{key.replace(/_/g, " ")}:</span>{" "}
//               {String(value)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </div>
// )}

//         </div>
//       </div>

    
      
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Star,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Define TypeScript interface for the product
interface Product {
  id: string | number;
  name: string;
  price?: number;
  discounted_price?: number | null;
  img_url: string;
  brand?: { name: string };
  color?: string;
  description?: string;
  features?: string[];
  specification?: Record<string, any>;
  stock?: number; // Added stock property
}

interface ClientProductProps {
  product: Product;
}

export default function ClientProduct({ product }: ClientProductProps) {
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isSpecificationOpen, setIsSpecificationOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const { addToCart } = useCart();

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    const cartItem : any = {
      id: product.id,
      name: product.name,
      price: product.discounted_price ?? product.price ?? 0,
      image: product.img_url,
      quantity,
      brand: product.brand,
    };
    addToCart(cartItem);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Check if product is out of stock
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm mb-8 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white p-8 border rounded-lg flex items-center justify-center">
          <div className="relative w-64 h-64">
            <Image
              src={product.img_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2 font-integral">
            {product.name}
          </h1>
          <p className="text-muted-foreground mb-4 font-satoshi font-semibold">
            by {product.brand?.name || "Unknown Brand"}
          </p>

          <div className="flex items-center mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-500 fill-yellow-500"
                />
              ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-extrabold font-satoshi">
              £
              {product.discounted_price != null &&
              typeof product.discounted_price === "number"
                ? product.discounted_price.toFixed(2)
                : typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : "0.00"}
            </span>
            {product.price != null &&
              typeof product.price === "number" &&
              product.discounted_price != null &&
              typeof product.discounted_price === "number" &&
              product.discounted_price < product.price && (
                <>
                  <span className="line-through text-muted-foreground text-sm">
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-satoshi font-semibold">
                    Save{" "}
                    {Math.round(
                      ((product.price - product.discounted_price) /
                        product.price) *
                        100
                    )}
                    %
                  </span>
                </>
              )}
          </div>

          {product.color && (
            <>
              <label
                htmlFor="color"
                className="block text-sm mb-1 font-satoshi font-bold"
              >
                Colour:
              </label>
              <select
                id="color"
                className="w-full border px-3 py-2 rounded mb-6 text-sm font-satoshi font-semibold"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {product.color.split(",").map((clr: string) => (
                  <option key={clr}>{clr}</option>
                ))}
              </select>
            </>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded px-2 py-1">
              <button
                onClick={decreaseQuantity}
                className="p-1 text-gray-500 hover:text-black"
                disabled={isOutOfStock}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-1 text-gray-500 hover:text-black"
                disabled={isOutOfStock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto font-satoshi font-bold"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              variant={isOutOfStock ? "destructive" : "default"}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="fixed bottom-6 right-6 bg-green-100 border border-green-400 text-green-900 px-6 py-4 rounded-xl shadow-lg z-50 w-full max-w-xs"
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-semibold font-satoshi">
                      Item added to cart successfully!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="mt-8 border border-gray-200 rounded-md">
            <button
              className="w-full flex justify-between items-center p-4 text-left"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <h2 className="text-lg font-medium font-integral">
                Product Description
              </h2>
              {isDescriptionOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {isDescriptionOpen && (
              <div className="p-4 border-t border-gray-200 text-sm space-y-3 font-satoshi font-bold">
                <p>{product.description}</p>
                {product.features && Array.isArray(product.features) && (
                  <ul className="list-disc pl-5 text-sm">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx}>{feature.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Specification */}
          {product.specification && typeof product.specification === "object" && (
            <div className="mt-4 border border-gray-200 rounded-md">
              <button
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => setIsSpecificationOpen(!isSpecificationOpen)}
              >
                <h2 className="text-lg font-medium font-integral">
                  Product Specification
                </h2>
                {isSpecificationOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {isSpecificationOpen && (
                <div className="p-4 border-t border-gray-200 text-sm font-satoshi font-bold">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {Object.entries(product.specification).map(([key, value]) => (
                      <li key={key} className="font-satoshi font-bold">
                        <span className="capitalize">{key.replace(/_/g, " ")}:</span>{" "}
                        {String(value)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}