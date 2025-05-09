// import Image from "next/image"
// import Link from "next/link"

// export default function FeaturedProducts() {
//   const products = [
//     {
//       id: 1,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//     {
//       id: 2,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//     {
//       id: 3,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//     {
//       id: 4,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//   ]

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-center text-3xl font-bold uppercase tracking-wider mb-10 font-integral">Featured</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <Link
//             href={`/products/${product.id}`}
//             key={product.id}
//             className="group bg-white rounded-lg overflow-hidden border border-gray-200 transition-shadow hover:shadow-md"
//           >
//             <div className="p-6 flex flex-col items-center">
//               <div className="mb-4 h-40 w-40 relative">
//                 <Image
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.name}
//                   fill
//                   className="object-contain"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                 />
//               </div>
//               <h3 className="text-center text-sm font-medium mb-2">{product.name}</h3>
//               <div className="flex items-center gap-2">
//                 <span className="font-bold">{product.currentPrice}</span>
//                 <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
// import Image from "next/image";
// import Link from "next/link";

// export default function FeaturedProducts() {
//   const products = [
//     {
//       id: 1,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//     {
//       id: 2,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//     {
//       id: 3,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//     {
//       id: 4,
//       name: "Blueberry Mint XQS Nicotine Pouches",
//       image: "/placeholder.svg?height=200&width=200",
//       currentPrice: "£4.99",
//       originalPrice: "£6.99",
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="flex items-center justify-center gap-4 mb-10">
//   <div className="flex-grow border-t border-black/40"></div>
//   <h2 className="text-3xl font-bold uppercase tracking-wider font-integral">Featured</h2>
//   <div className="flex-grow border-t border-black/40"></div>
// </div>


//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <Link
//             href={`/product/${product.id}`}
//             key={product.id}
//             className="group bg-white rounded-3xl overflow-hidden border border-gray-400 transition-shadow hover:shadow-md"
//           >
//             <div className="p-8 flex flex-col items-center">
//               <div className="mb-6 h-48 w-48 relative">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-contain"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                 />
//               </div>
//               <h3 className="text-center text-sm font-medium mb-3">{product.name}</h3>
//               <div className="flex items-center gap-2">
//                 <span className="font-bold">{product.currentPrice}</span>
//                 <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";

import disposable from "@/app/public/products/elf-bar-600-blue-razz-lemonade-disposable-vape.webp"
import vapekit1 from "@/app/public/products/vapoo kit.jpg"
import eliquid1 from "@/app/public/products/nasty-bad-blood.jpeg"
import pod from "@/app/public/products/uwell-caliburn-g2-kit-cobalt-green.jpg"

export default function FeaturedProducts() {
  const products = [
    {
      slug: "elf-bar-blue-razz",
      name: "Elf Bar 600 Blue Razz Lemonade",
      price: 5.99,
      originalPrice: 7.99,
      image: disposable,
    },
    {
      slug: "voopoo-drag-x",
      name: "Voopoo Drag X Vape Kit",
      price: 9.99,
      originalPrice: 10.99,
      image: vapekit1,
    },
    {
      slug: "nasty-juice-bad-blood",
      name: "Nasty Juice E-Liquid - Bad Blood",
      price: 9.99,
      originalPrice: 12.99,
      image: eliquid1,
    },
    {
      slug: "caliburn-g2-pods",
      name: "Uwell Caliburn G2 Pods",
      price: 6.49,
      originalPrice: 8.99,
      image: pod,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="flex-grow border-t border-black/40"></div>
        <h2 className="text-3xl font-bold uppercase tracking-wider font-integral">Featured</h2>
        <div className="flex-grow border-t border-black/40"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            key={product.slug}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-400 transition-shadow hover:shadow-md"
          >
            <div className="p-8 flex flex-col items-center">
              <div className="mb-6 h-48 w-48 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-center text-sm font-medium mb-3 font-satoshi">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-bold">£{product.price.toFixed(2)}</span>
                <span className="text-gray-400 line-through text-sm">£{product.originalPrice.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
