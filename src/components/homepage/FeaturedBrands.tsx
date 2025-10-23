'use client';

import Image from 'next/image';
import ske from "@/app/public/brands/ske.webp"
import doozy from "@/app/public/brands/doozy.webp"
import hayati from "@/app/public/brands/hayati.webp"
import aspire from "@/app/public/brands/Aspire.webp"
import nasty from "@/app/public/brands/nasty.webp"
import velo from "@/app/public/brands/velo.webp"
import elfbar from "@/app/public/brands/elfbar.webp"

const brands = [
  { name: 'SKE Crystal Bar', src: ske },
  { name: 'Doozy Vape', src: doozy },
  { name: 'Hayati', src: hayati },
  { name: 'Aspire', src: aspire },
  { name: 'Velo', src: velo },
  { name: 'Nasty', src: nasty },
  { name: 'Elfbar', src: elfbar },
];

export default function FeaturedBrands() {
  return (
    <div className=" py-6 overflow-hidden">
      <h2 className="bg-black text-white text-center text-2xl font-bold mb-4 py-2  font-integral">FEATURED BRANDS</h2>
      <div className="whitespace-nowrap animate-scroll flex gap-10 items-center">
        {brands.map((brand, idx) => (
          <Image
            key={idx}
            src={brand.src}
            alt={brand.name}
            width={100}
            height={50}
            className="inline-block"
          />
        ))}
        {/* Duplicate for seamless scroll */}
        {brands.map((brand, idx) => (
          <Image
            key={`duplicate-${idx}`}
            src={brand.src}
            alt={brand.name}
            width={100}
            height={50}
            className="inline-block repeat-infinite"
          />
        ))}
      </div>
    </div>
  );
}
