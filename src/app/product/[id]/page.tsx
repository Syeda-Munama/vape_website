
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft, Minus, Plus, Star, ChevronDown, ChevronUp } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const allProducts = [
//   {
//     id: 1,
//     name: "Elf Bar 600 Blue Razz Lemonade",
//     price: 5.99,
//     originalPrice: 7.99,
//     image: "/images/elfbar-blue-razz.png",
//     slug: "elf-bar-blue-razz",
//     category: "disposable",
//     brand: "Elf Bar",
//     description: "Delicious blue raspberry lemonade flavor in a disposable vape.",
//     features: ["Up to 600 puffs", "20mg Nic Salt", "No charging needed"],
//   },
//   {
//     id: 2,
//     name: "Voopoo Drag X Vape Kit",
//     price: 29.99,
//     image: "/images/voopoo-dragx.png",
//     slug: "voopoo-drag-x",
//     category: "vape-kits",
//     brand: "Voopoo",
//     color: "Carbon Fiber",
//     description: "High-performance vape kit with powerful output.",
//     features: ["Adjustable wattage", "18650 battery", "PnP coil compatibility"],
//   },
//   {
//     id: 3,
//     name: "Nasty Juice E-Liquid - Bad Blood",
//     price: 9.99,
//     image: "/images/nasty-badblood.png",
//     slug: "nasty-juice-bad-blood",
//     category: "e-liquid",
//     brand: "Nasty Juice",
//     flavour: "Blackcurrant & Mint",
//     description: "Rich blackcurrant e-liquid with a cooling mint twist.",
//     features: ["50ml shortfill", "70/30 VG/PG", "Made in Malaysia"],
//   },
//   {
//     id: 4,
//     name: "Uwell Caliburn G2 Pods",
//     price: 6.49,
//     image: "/images/caliburn-pods.png",
//     slug: "caliburn-g2-pods",
//     category: "pod",
//     brand: "Uwell",
//     description: "Replacement pods for Caliburn G2 devices.",
//     features: ["2ml capacity", "Top-fill", "Pack of 2"],
//   },
//   {
//     id: 5,
//     name: "Smok RPM 2 Coils",
//     price: 10.99,
//     image: "/images/smok-coils.png",
//     slug: "smok-rpm2-coils",
//     category: "coils",
//     brand: "Smok",
//     description: "Replacement coils for RPM 2 devices.",
//     features: ["Mesh build", "0.16 ohm", "Pack of 5"],
//   },
//   {
//     id: 6,
//     name: "XQS Nicotine Pouches - Blueberry Mint",
//     price: 4.99,
//     originalPrice: 6.99,
//     image: "/images/xqs-blueberry.png",
//     slug: "xqs-blueberry",
//     category: "nic-pouches",
//     brand: "XQS",
//     description: "Refreshing blueberry mint pouches with a discreet nicotine hit.",
//     features: ["Sugar-free", "Long-lasting flavor", "Tobacco-free"],
//   },
//   {
//     id: 7,
//     name: "GeekVape Wenax K1 Kit",
//     price: 22.99,
//     image: "/images/geekvape-k1.png",
//     slug: "geekvape-wenax-k1",
//     category: "vape-kits",
//     brand: "GeekVape",
//     color: "Gunmetal Grey",
//     description: "Lightweight and stylish pod system from GeekVape.",
//     features: ["600mAh battery", "Type-C charging", "Tight MTL draw"],
//   },
//   {
//     id: 8,
//     name: "Dinner Lady E-Liquid - Lemon Tart",
//     price: 8.99,
//     image: "/images/lemon-tart.png",
//     slug: "dinner-lady-lemon-tart",
//     category: "e-liquid",
//     brand: "Dinner Lady",
//     flavour: "Lemon Tart",
//     description: "Tangy lemon curd with buttery pastry base. A dessert vape classic.",
//     features: ["60ml shortfill", "70/30 VG/PG", "Nic shot ready"],
//   },
// ];


// export default function ProductPage({ params }: { params: { id: string } }) {
//   const product = allProducts.find((product) => product.slug === params.id);
//   const [quantity, setQuantity] = useState(1);
//   const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
//   const [isSpecificationOpen, setIsSpecificationOpen] = useState(false);

//   const increaseQuantity = () => setQuantity((q) => q + 1);
//   const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-2xl font-bold">Product Not Found</h1>
//         <p className="text-muted-foreground mt-4">
//           Sorry, we couldn't find the product you're looking for.
//         </p>
//         <Link href="/" className="text-blue-500 mt-6 inline-block hover:underline">
//           ← Go back home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <Link href="/" className="inline-flex items-center text-sm mb-8 hover:underline">
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to featured products
//       </Link>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Product Image */}
//         <div className="bg-white p-8 border rounded-lg flex items-center justify-center">
//           <div className="relative w-64 h-64">
//             <Image
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               fill
//               className="object-contain"
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//           </div>
//         </div>

//         {/* Product Details */}
//         <div>
//           <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//           <p className="text-muted-foreground mb-4">By {product.brand.replace("-", " ")}</p>

//           <div className="flex items-center mb-4">
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//               ))}
//           </div>

//           <div className="flex items-center gap-3 mb-6">
//             <span className="text-2xl font-bold">£{product.price.toFixed(2)}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="line-through text-muted-foreground text-sm">
//                   £{product.originalPrice.toFixed(2)}
//                 </span>
//                 <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
//                   Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
//                 </span>
//               </>
//             )}
//           </div>

//           <label htmlFor="color" className="block text-sm font-medium mb-1">
//             Colour:
//           </label>
//           <select
//             id="color"
//             className="w-full border px-3 py-2 rounded mb-6 text-sm"
//             defaultValue=""
//           >
//             <option value="" disabled>
//               Choose an option
//             </option>
//             <option>Black</option>
//             <option>Blue</option>
//             <option>Silver</option>
//           </select>

//           <div className="flex items-center gap-4 mb-6">
//             <div className="flex items-center border rounded px-2 py-1">
//               <button onClick={decreaseQuantity} className="p-1 text-gray-500 hover:text-black">
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="px-3 text-sm">{quantity}</span>
//               <button onClick={increaseQuantity} className="p-1 text-gray-500 hover:text-black">
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//             <Button size="lg" className="w-full sm:w-auto">
//               Add to Cart
//             </Button>
//           </div>

//           {/* Collapsible Sections */}
//           <div className="mt-8 border border-gray-200 rounded-md">
//             <button
//               className="w-full flex justify-between items-center p-4 text-left"
//               onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
//             >
//               <h2 className="text-lg font-medium">Product Description</h2>
//               {isDescriptionOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//             </button>
//             {isDescriptionOpen && (
//               <div className="p-4 border-t border-gray-200 text-sm space-y-3">
//                 <p>{product.description}</p>
//                 {product.features && (
//                   <ul className="list-disc pl-5 text-sm">
//                     {product.features.map((feature, idx) => (
//                       <li key={idx}>{feature}</li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="mt-4 border border-gray-200 rounded-md">
//             <button
//               className="w-full flex justify-between items-center p-4 text-left"
//               onClick={() => setIsSpecificationOpen(!isSpecificationOpen)}
//             >
//               <h2 className="text-lg font-medium">Product Specification</h2>
//               {isSpecificationOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//             </button>
//             {isSpecificationOpen && (
//               <div className="p-4 border-t border-gray-200 text-sm">
//                 <p>Specification details would appear here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useCart } from "@/context/CartContext";

import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import disposable from "@/app/public/products/elf-bar-600-blue-razz-lemonade-disposable-vape.webp"
import vapekit1 from "@/app/public/products/vapoo kit.jpg"
import eliquid1 from "@/app/public/products/nasty-bad-blood.jpeg"
import pod from "@/app/public/products/uwell-caliburn-g2-kit-cobalt-green.jpg"
import coil from "@/app/public/products/coil.webp"
import nicpoch from "@/app/public/products/blueberry_nic_pouch.webp"
import vapekit2 from "@/app/public/products/geek_vape.png"
import eliquid2 from "@/app/public/products/DinnerLady-Salts-DESSERTS-Lemon-Tart.webp"


import { copyFileSync } from "node:fs";


const allProducts = [
  {
    id: 1,
    name: "Elf Bar 600 Blue Razz Lemonade",
    price: 5.99,
    originalPrice: 7.99,
    image: disposable,
    slug: "elf-bar-blue-razz",
    category: "disposable",
    brand: "Elf Bar",
    description: "Delicious blue raspberry lemonade flavor in a disposable vape.",
    features: ["Up to 600 puffs", "20mg Nic Salt", "No charging needed"],
  },
  {
    id: 2,
    name: "Voopoo Drag X Vape Kit",
    price: 29.99,
    image: vapekit1,
    slug: "voopoo-drag-x",
    category: "vape-kits",
    brand: "Voopoo",
    color: "Carbon Fiber",
    description: "High-performance vape kit with powerful output.",
    features: ["Adjustable wattage", "18650 battery", "PnP coil compatibility"],
  },
  {
    id: 3,
    name: "Nasty Juice E-Liquid - Bad Blood",
    price: 9.99,
    image: eliquid1,
    slug: "nasty-juice-bad-blood",
    category: "e-liquid",
    brand: "Nasty Juice",
    flavour: "Blackcurrant & Mint",
    description: "Rich blackcurrant e-liquid with a cooling mint twist.",
    features: ["50ml shortfill", "70/30 VG/PG", "Made in Malaysia"],
  },
  {
    id: 4,
    name: "Uwell Caliburn G2 Pods",
    price: 6.49,
    image: pod,
    slug: "caliburn-g2-pods",
    category: "pod",
    brand: "Uwell",
    description: "Replacement pods for Caliburn G2 devices.",
    features: ["2ml capacity", "Top-fill", "Pack of 2"],
  },
  {
    id: 5,
    name: "Smok RPM 2 Coils",
    price: 10.99,
    image: coil,
    slug: "smok-rpm2-coils",
    category: "coils",
    brand: "Smok",
    description: "Replacement coils for RPM 2 devices.",
    features: ["Mesh build", "0.16 ohm", "Pack of 5"],
  },
  {
    id: 6,
    name: "XQS Nicotine Pouches - Blueberry Mint",
    price: 4.99,
    originalPrice: 6.99,
    image: nicpoch,
    slug: "xqs-blueberry",
    category: "nic-pouches",
    brand: "XQS",
    description: "Refreshing blueberry mint pouches with a discreet nicotine hit.",
    features: ["Sugar-free", "Long-lasting flavor", "Tobacco-free"],
  },
  {
    id: 7,
    name: "GeekVape Wenax K1 Kit",
    price: 22.99,
    image: vapekit2,
    slug: "geekvape-wenax-k1",
    category: "vape-kits",
    brand: "GeekVape",
    color: "Gunmetal Grey",
    description: "Lightweight and stylish pod system from GeekVape.",
    features: ["600mAh battery", "Type-C charging", "Tight MTL draw"],
  },
  {
    id: 8,
    name: "Dinner Lady E-Liquid - Lemon Tart",
    price: 8.99,
    image: eliquid2,
    slug: "dinner-lady-lemon-tart",
    category: "e-liquid",
    brand: "Dinner Lady",
    flavour: "Lemon Tart",
    description: "Tangy lemon curd with buttery pastry base. A dessert vape classic.",
    features: ["60ml shortfill", "70/30 VG/PG", "Nic shot ready"],
  },
];



export default function ProductPage({ params }: { params: { id: string } }) {
  const product = allProducts.find((product) => product.slug === params.id);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isSpecificationOpen, setIsSpecificationOpen] = useState(false);
  const { addToCart } = useCart();



  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  // const handleAddToCart = () => {
  //   if (product) {
  //     addToCart(product, quantity);
  //   }
  // };
  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        brand: product.brand,
      };
      addToCart(cartItem);
      console.log("Added to cart:", cartItem);
    }
    
  };
  

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-4">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link href="/" className="text-blue-500 mt-6 inline-block hover:underline">
          ← Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white p-8 border rounded-lg flex items-center justify-center">
          <div className="relative w-64 h-64">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2 font-integral">{product.name}</h1>
          <p className="text-muted-foreground mb-4 font-satoshi font-semibold">by {product.brand.replace("-", " ")}</p>

          <div className="flex items-center mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-extrabold font-satoshi">£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="line-through text-muted-foreground text-sm">
                  £{product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-satoshi font-semibold">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <label htmlFor="color" className="block text-sm mb-1 font-satoshi font-bold">
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
            <option>Black</option>
            <option>Blue</option>
            <option>Silver</option>
          </select>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded px-2 py-1">
              <button onClick={decreaseQuantity} className="p-1 text-gray-500 hover:text-black">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm">{quantity}</span>
              <button onClick={increaseQuantity} className="p-1 text-gray-500 hover:text-black">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button size="lg" className="w-full sm:w-auto font-satoshi font-bold" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>

          {/* Collapsible Sections */}
          <div className="mt-8 border border-gray-200 rounded-md">
            <button
              className="w-full flex justify-between items-center p-4 text-left"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <h2 className="text-lg font-medium font-integral">Product Description</h2>
              {isDescriptionOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {isDescriptionOpen && (
              <div className="p-4 border-t border-gray-200 text-sm space-y-3 font-satoshi font-bold">
                <p>{product.description}</p>
                {product.features && (
                  <ul className="list-disc pl-5 text-sm">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 border border-gray-200 rounded-md">
            <button
              className="w-full flex justify-between items-center p-4 text-left "
              onClick={() => setIsSpecificationOpen(!isSpecificationOpen)}
            >
              <h2 className="text-lg font-medium font-integral">Product Specification</h2>
              {isSpecificationOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {isSpecificationOpen && (
              <div className="p-4 border-t border-gray-200 text-sm font-satoshi font-bold">
                <p>Specification details would appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
