
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import disposable from "@/app/public/products/elf-bar-600-blue-razz-lemonade-disposable-vape.webp"
import vapekit1 from "@/app/public/products/vapoo kit.jpg"
import eliquid1 from "@/app/public/products/nasty-bad-blood.jpeg"
import pod from "@/app/public/products/uwell-caliburn-g2-kit-cobalt-green.jpg"
import coil from "@/app/public/products/coil.webp"
import nicpoch from "@/app/public/products/blueberry_nic_pouch.webp"
import vapekit2 from "@/app/public/products/geek_vape.png"
import eliquid2 from "@/app/public/products/DinnerLady-Salts-DESSERTS-Lemon-Tart.webp"

// Mock product data for multiple categories
const allProducts = [
  {
    id: 1,
    name: "Elf Bar 600 Blue Razz Lemonade",
    price: 5.99,
    originalPrice: 7.99,
    image: disposable,
    slug: "elf-bar-blue-razz",
    category: "disposable",
  },
  {
    id: 2,
    name: "Voopoo Drag X Vape Kit",
    price: 29.99,
    image: vapekit1,
    slug: "voopoo-drag-x",
    category: "vape-kits",
  },
  {
    id: 3,
    name: "Nasty Juice E-Liquid - Bad Blood",
    price: 9.99,
    image: eliquid1,
    slug: "nasty-juice-bad-blood",
    category: "e-liquid",
  },
  {
    id: 4,
    name: "Uwell Caliburn G2 Pods",
    price: 6.49,
    image: pod,
    slug: "caliburn-g2-pods",
    category: "pod",
  },
  {
    id: 5,
    name: "Smok RPM 2 Coils",
    price: 10.99,
    image: coil,
    slug: "smok-rpm2-coils",
    category: "coils",
  },
  {
    id: 6,
    name: "XQS Nicotine Pouches - Blueberry Mint",
    price: 4.99,
    originalPrice: 6.99,
    image: nicpoch,
    slug: "xqs-blueberry",
    category: "nic-pouches",
  },
  {
    id: 7,
    name: "GeekVape Wenax K1 Kit",
    price: 22.99,
    image: vapekit2,
    slug: "geekvape-wenax-k1",
    category: "vape-kits",
  },
  {
    id: 8,
    name: "Dinner Lady E-Liquid - Lemon Tart",
    price: 8.99,
    image: eliquid2,
    slug: "dinner-lady-lemon-tart",
    category: "e-liquid",
  },
];

export default function CategoryPage({ params }: { params: { category: string } }) {
  const filteredProducts = allProducts.filter(
    (p) => p.category === params.category
  );

  return (
    <div className="container mx-auto px-4 py-6">
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
        <h1 className="text-2xl font-bold capitalize">
          {params.category.replace("-", " ")}
        </h1>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span>Showing {filteredProducts.length} Products</span>
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">

        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10 overflow-x-auto gap-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <div className="flex gap-1">
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <Button
              key={index}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow bg-white">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm sm:text-base line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-semibold text-base sm:text-lg">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}