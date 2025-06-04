
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import disposable from "@/app/public/products/elf-bar-600-blue-razz-lemonade-disposable-vape.webp"
// import vapekit1 from "@/app/public/products/vapoo kit.jpg"
// import eliquid1 from "@/app/public/products/nasty-bad-blood.jpeg"
// import pod from "@/app/public/products/uwell-caliburn-g2-kit-cobalt-green.jpg"
// import coil from "@/app/public/products/coil.webp"
// import nicpoch from "@/app/public/products/blueberry_nic_pouch.webp"
// import vapekit2 from "@/app/public/products/geek_vape.png"
// import eliquid2 from "@/app/public/products/DinnerLady-Salts-DESSERTS-Lemon-Tart.webp"

// // Mock product data for multiple categories
// const allProducts = [
//   {
//     id: 1,
//     name: "Elf Bar 600 Blue Razz Lemonade",
//     price: 5.99,
//     originalPrice: 7.99,
//     image: disposable,
//     slug: "elf-bar-blue-razz",
//     category: "disposable",
//   },
//   {
//     id: 2,
//     name: "Voopoo Drag X Vape Kit",
//     price: 29.99,
//     image: vapekit1,
//     slug: "voopoo-drag-x",
//     category: "vape-kits",
//   },
//   {
//     id: 3,
//     name: "Nasty Juice E-Liquid - Bad Blood",
//     price: 9.99,
//     image: eliquid1,
//     slug: "nasty-juice-bad-blood",
//     category: "e-liquid",
//   },
//   {
//     id: 4,
//     name: "Uwell Caliburn G2 Pods",
//     price: 6.49,
//     image: pod,
//     slug: "caliburn-g2-pods",
//     category: "pod",
//   },
//   {
//     id: 5,
//     name: "Smok RPM 2 Coils",
//     price: 10.99,
//     image: coil,
//     slug: "smok-rpm2-coils",
//     category: "coils",
//   },
//   {
//     id: 6,
//     name: "XQS Nicotine Pouches - Blueberry Mint",
//     price: 4.99,
//     originalPrice: 6.99,
//     image: nicpoch,
//     slug: "xqs-blueberry",
//     category: "nic-pouches",
//   },
//   {
//     id: 7,
//     name: "GeekVape Wenax K1 Kit",
//     price: 22.99,
//     image: vapekit2,
//     slug: "geekvape-wenax-k1",
//     category: "vape-kits",
//   },
//   {
//     id: 8,
//     name: "Dinner Lady E-Liquid - Lemon Tart",
//     price: 8.99,
//     image: eliquid2,
//     slug: "dinner-lady-lemon-tart",
//     category: "e-liquid",
//   },
// ];

// export default function CategoryPage({ params }: { params: { category: string } }) {
//   const filteredProducts = allProducts.filter(
//     (p) => p.category === params.category
//   );

//   return (
//     <div className="container mx-auto px-4 py-6 font-satoshi font-semibold">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
//         <Link href="/" className="hover:text-foreground transition-colors">
//           Vaping World
//         </Link>
//         <ChevronRight className="h-4 w-4" />
//         <span className="text-foreground capitalize">{params.category.replace("-", " ")}</span>
//       </div>

//       {/* Title + Sorting */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//         <h1 className="text-2xl font-bold capitalize font-integral">
//           {params.category.replace("-", " ")}
//         </h1>
//         <div className="flex items-center gap-2 text-sm flex-wrap">
//           <span>Showing {filteredProducts.length} Products</span>
//           <div className="flex items-center gap-2">
//             <span>Sort by:</span>
//             <Select defaultValue="most-popular">
//               <SelectTrigger className="w-[140px] h-8">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="most-popular">Most Popular</SelectItem>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="newest">Newest</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">

//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-10 overflow-x-auto gap-4">
//         <Button variant="outline" size="sm" disabled>
//           Previous
//         </Button>
//         <div className="flex gap-1">
//           {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
//             <Button
//               key={index}
//               variant={page === 1 ? "default" : "outline"}
//               size="sm"
//               className="w-8 h-8 p-0"
//             >
//               {page}
//             </Button>
//           ))}
//         </div>
//         <Button variant="outline" size="sm">
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }

// function ProductCard({ product }: { product: any }) {
//   return (
//     <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow bg-white">
//       <Link href={`/product/${product.slug}`} className="block">
//         <div className="aspect-square relative bg-gray-100">
//           <Image
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
//             className="object-contain p-4 transition-transform group-hover:scale-105"
//           />
//         </div>
//         <div className="p-4">
//           <h3 className="font-medium text-sm sm:text-base line-clamp-2 font-satoshi">
//             {product.name}
//           </h3>
//           <div className="mt-2 flex items-baseline gap-2">
//             <span className="font-bold text-base sm:text-lg font-satoshi">
//               £{product.price.toFixed(2)}
//             </span>
//             {product.originalPrice && (
//               <span className="text-muted-foreground text-sm line-through font-satoshi font-semibold ">
//                 £{product.originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>
//       </Link>
//     </div>
//   )
// }

// "use client";

// import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   original_price?: number;
//   img_url: string;
//   slug: string;
// }

// export default function CategoryPage({ params }: { params: { category: string } }) {
//   const supabase = createClient();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data: category, error: categoryError } = await supabase
//         .from("categories")
//         .select("id")
//         .eq("slug", params.category)
//         .single();

//       if (categoryError || !category) {
//         setProducts([]);
//         setLoading(false);
//         return;
//       }

//       const { data: products, error: productsError } = await supabase
//         .from("products")
//         .select("*")
//         .eq("category_id", category.id);

//       if (productsError) {
//         console.error("Error fetching products:", productsError.message);
//         setProducts([]);
//       } else {
//         setProducts(products);
//       }

//       setLoading(false);
//     };

//     fetchProducts();
//   }, [params.category]);

//   return (
//     <div className="container mx-auto px-4 py-6 font-satoshi font-semibold">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
//         <Link href="/" className="hover:text-foreground transition-colors">
//           Vaping World
//         </Link>
//         <ChevronRight className="h-4 w-4" />
//         <span className="text-foreground capitalize">{params.category.replace("-", " ")}</span>
//       </div>

//       {/* Title + Sorting */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//         <h1 className="text-2xl font-bold capitalize font-integral">
//           {params.category.replace("-", " ")}
//         </h1>
//         <div className="flex items-center gap-2 text-sm flex-wrap">
//           <span>Showing {products.length} Products</span>
//           <div className="flex items-center gap-2">
//             <span>Sort by:</span>
//             <Select defaultValue="most-popular">
//               <SelectTrigger className="w-[140px] h-8">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="most-popular">Most Popular</SelectItem>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="newest">Newest</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Product Grid */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow bg-white">
//       <Link href={`/product/${product.slug}`} className="block">
//         <div className="aspect-square relative bg-white">
//           <Image
//             src={product.img_url}
//             alt={product.name}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
//             className="object-contain p-4 transition-transform group-hover:scale-105"
//           />
//         </div>
//         <div className="p-4">
//           <h3 className="font-medium text-sm sm:text-base line-clamp-2 font-satoshi">
//             {product.name}
//           </h3>
//           <div className="mt-2 flex items-baseline gap-2">
//             <span className="font-bold text-base sm:text-lg font-satoshi">
//               £{product.price.toFixed(2)}
//             </span>
//             {product.original_price && (
//               <span className="text-muted-foreground text-sm line-through font-satoshi font-semibold ">
//                 £{product.original_price.toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  discounted_price?: number;
  img_url: string;
  slug: string;
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12; // Adjusted to 12 for better grid layout (divisible by 2, 3, 4)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Fetch category ID
      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", params.category)
        .single();

      if (categoryError || !category) {
        setProducts([]);
        setTotalProducts(0);
        setLoading(false);
        return;
      }

      // Fetch total count for pagination
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("category_id", category.id);

      // Fetch products for the current page
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", category.id)
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);

      if (productsError) {
        console.error("Error fetching products:", productsError.message);
        setProducts([]);
        setTotalProducts(0);
      } else {
        setProducts(products);
        setTotalProducts(count || 0);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [params.category, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Generate page numbers (show up to 5 pages around the current page)
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-6 font-satoshi font-semibold">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">
          Vaping World
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground capitalize">{params.category.replace("-", " ")}</span>
      </div>

      {/* Title + Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold capitalize font-integral">
          {params.category.replace("-", " ")}
        </h1>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span>Showing {products.length} of {totalProducts} Products</span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <Select defaultValue="most-popular">
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {[...Array(productsPerPage)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                {getPageNumbers().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow bg-white">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square relative bg-white">
          <Image
            src={product.img_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 font-satoshi">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-bold text-base sm:text-lg font-satoshi">
              £
              {typeof product.discounted_price === "number"
                ? product.discounted_price.toFixed(2)
                : product.price.toFixed(2)}
            </span>
            {typeof product.discounted_price === "number" && (
              <span className="text-muted-foreground text-sm line-through font-satoshi font-semibold">
                £{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="aspect-square relative bg-gray-200 animate-pulse"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
}