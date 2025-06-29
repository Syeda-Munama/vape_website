'use client';

import Image from 'next/image';
import Link from 'next/link';
import img1 from "@/app/public/banner/banner-43.webp"
import img2 from "@/app/public/banner/banner-44.webp"
import img3 from "@/app/public/banner/banner-46.webp"
import img4 from "@/app/public/banner/banner-47.webp"

const categories = [
  {
    title: 'VAPE KITS',
    image: img1,
    href: '/category/vape-kits',
  },
  {
    title: 'E-LIQUIDS',
    image: img3,
    href: '/category/eliquids',
  },
  {
    title: 'DISPOSABLES',
    image: img2,
    href: '/category/disposables',
  },
  {
    title: 'PODS',
    image: img4,
    href: '/category/pods',
  },
];

export default function CategoryCards() {
  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
  {categories.map((cat, idx) => (
    <div
      key={idx}
      className="relative w-[250px] h-48 rounded-[30px] overflow-hidden shadow-lg"
    >
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0  p-4 flex flex-col justify-between">
        <div>
          <p className="text-white text-sm font-satoshi">Discover</p>
          <h3 className="text-white text-xl font-bold font-integral">{cat.title}</h3>
        </div>
        <Link href={cat.href} className="text-white text-sm underline underline-offset-4">
          Shop →
        </Link>
      </div>
    </div>
  ))}
</div>

  );
}
