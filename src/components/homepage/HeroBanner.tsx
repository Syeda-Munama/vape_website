// "use client"

// import { useState, useEffect, useCallback } from "react"
// import Image from "next/image"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import Link from "next/link"

// import banner_green from "@/app/public/banner/banner-green.webp"
// import banner_purple from "@/app/public/banner/banner-purple.webp"
// import banner_orange from "@/app/public/banner/banner-orange.webp"
// import web1 from "@/app/public/banner/web1.jpeg"
// import web2 from "@/app/public/banner/web2.jpeg"
// import web3 from "@/app/public/banner/web3.jpeg"
// import web4 from "@/app/public/banner/web4.jpeg"
// import eliuid from "@/app/public/Category/E-liquid_Mentho.webp"
// import vapekit from "@/app/public/Category/vape-kits.jpg"
// import disposable from "@/app/public/Category/disposable-vape-kit.webp"
// import coil from "@/app/public/Category/smok-nexm-coil.png"
// import pod from "@/app/public/Category/Pod.webp"
// import nicpouch from "@/app/public/Category/StrawberryIce_velo.webp"

// export default function HeroBanner() {
//   const banners = [
//     { src: web1, alt: "Mix and Match promotion" },
//     { src: web2, alt: "2 for £8.99 promotion" },
//     { src: web3, alt: "Mix and Match promotion" },
//     { src: web4, alt: "Vape products" },
//   ]

//   const [currentBanner, setCurrentBanner] = useState(0)

//   const nextBanner = useCallback(() => {
//     setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
//   }, [banners.length])

//   const prevBanner = useCallback(() => {
//     setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
//   }, [banners.length])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextBanner()
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [nextBanner])

//   return (
//     <main className="min-h-screen">
//       {/* Mobile Category Circles */}
//       <div className="md:hidden w-full overflow-x-auto py-4 px-2 bg-white no-scrollbar">
//         <div className="flex space-x-4 min-w-max px-2 font-satoshi">
//           {[
//             { name: "E-liquids", href: "/category/eliquids", icon: eliuid },
//             { name: "Vape Kits", href: "/category/vape-kits", icon: vapekit },
//             { name: "Disposables", href: "/category/disposables", icon: disposable },
//             { name: "Coils", href: "/category/coils", icon: coil },
//             { name: "Pods", href: "/category/pods", icon: pod },
//             { name: "Nic Pouches", href: "/category/nic-pouches", icon: nicpouch },
//           ].map((item, index) => (
//             <Link key={index} href={item.href} className="flex flex-col items-center">
//               <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 mb-1 bg-gray-100 flex items-center justify-center">
//                 <Image src={item.icon} alt={item.name} width={60} height={60} className="object-cover" />
//               </div>
//               <span className="text-xs text-center font-medium">{item.name}</span>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Banner Slider Section */}
//       <section className="relative">
//         <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
//           {banners.map((banner, index) => (
//             <div
//               key={index}
//               className={`transition-opacity duration-500 ${currentBanner === index ? "block" : "hidden"}`}
//             >
//               <Image
//                 src={banner.src}
//                 alt={banner.alt}
//                 width={1600}
//                 height={795}
//                 className="object-cover w-full h-full rounded-lg"
//                 priority
//               />
//             </div>
//           ))}

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevBanner}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-colors"
//             aria-label="Previous banner"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <button
//             onClick={nextBanner}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-colors"
//             aria-label="Next banner"
//           >
//             <ChevronRight size={24} />
//           </button>

//           {/* Dots Indicator */}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
//             {banners.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentBanner(index)}
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   currentBanner === index ? "bg-white" : "bg-white/50"
//                 }`}
//                 aria-label={`Go to banner ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Promotional Banners */}
//       <section className="py-8">
//         <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
//             <Image src={banner_green} alt="Mix and Match promotion" fill className="object-cover rounded-lg" priority />
//           </div>
//           <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
//             <Image src={banner_purple} alt="2 for £8.99 promotion" fill className="object-cover rounded-lg" priority />
//           </div>
//           <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
//             <Image src={banner_orange} alt="Mix and Match promotion" fill className="object-cover rounded-lg" priority />
//           </div>
//         </div>
//       </section>

//       {/* Vaping World Section */}
//       <section className="py-12">
//         <div className="container mx-auto px-4 md:px-6">
//           <h2 className="text-3xl font-black mb-4 font-integral">VAPING WORLD</h2>
//           <p className="text-gray-700 max-w-4xl font-satoshi font-semibold">
//             Shopping for vapes online is fast, reliable, and easy. Our UK-based platform brings the top vape brands and
//             flavours to your doorstep. From disposable vapes and refillable vape kits to nic salts and nicotine pouches,
//             our collection is curated to deliver performance, value, and satisfaction. If you're searching for the best
//             deals on vapes in the UK, we've got them all right here.
//           </p>
//         </div>
//       </section>
//     </main>
//   )
// }


"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Head from "next/head"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import banner_green from "@/app/public/banner/banner-green.webp"
import banner_purple from "@/app/public/banner/banner-purple.webp"
import banner_orange from "@/app/public/banner/banner-orange.webp"
import web1 from "@/app/public/banner/web1.webp" // Converted to webp
import web2 from "@/app/public/banner/web2.webp" // Converted to webp
import web3 from "@/app/public/banner/web3.webp" // Converted to webp
import web4 from "@/app/public/banner/web4.webp" // Converted to webp
import eliuid from "@/app/public/Category/E-liquid_Mentho.webp"
import vapekit from "@/app/public/Category/vape-kits.webp" // Converted to webp
import disposable from "@/app/public/Category/disposable-vape-kit.webp"
import coil from "@/app/public/Category/smok-nexm-coil.webp" // Converted to webp
import pod from "@/app/public/Category/Pod.webp"
import nicpouch from "@/app/public/Category/StrawberryIce_velo.webp"

export default function HeroBanner() {
  const banners = [
    { src: web1, alt: "Mix and Match promotion" },
    { src: web2, alt: "2 for £8.99 promotion" },
    { src: web3, alt: "Mix and Match promotion" },
    { src: web4, alt: "Vape products" },
  ]

  const [currentBanner, setCurrentBanner] = useState(0)

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }, [banners.length])

  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }, [banners.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner()
    }, 3000)
    return () => clearInterval(interval)
  }, [nextBanner])

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/banner/web1.webp"
          as="image"
          fetchPriority="high"
        />
      </Head>
      <main className="min-h-screen">
        {/* Mobile Category Circles */}
        <div className="md:hidden w-full overflow-x-auto py-4 px-2 bg-white no-scrollbar">
          <div className="flex space-x-4 min-w-max px-2 font-satoshi">
            {[
              { name: "E-liquids", href: "/category/eliquids", icon: eliuid },
              { name: "Vape Kits", href: "/category/vape-kits", icon: vapekit },
              { name: "Disposables", href: "/category/disposables", icon: disposable },
              { name: "Coils", href: "/category/coils", icon: coil },
              { name: "Pods", href: "/category/pods", icon: pod },
              { name: "Nic Pouches", href: "/category/nic-pouches", icon: nicpouch },
            ].map((item, index) => (
              <Link key={index} href={item.href} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 mb-1 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-cover"
                    sizes="60px"
                    placeholder="blur"
                  />
                </div>
                <span className="text-xs text-center font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Banner Slider Section */}
        <section className="relative">
          <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
            <Image
              src={banners[currentBanner].src}
              alt={banners[currentBanner].alt}
              width={1600}
              height={795}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover w-full h-full rounded-lg"
              placeholder="blur"
              priority={currentBanner === 0}
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-colors"
              aria-label="Previous banner"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-colors"
              aria-label="Next banner"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentBanner === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banners */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
              <Image
                src={banner_green}
                alt="Mix and Match promotion"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover rounded-lg"
                placeholder="blur"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
              <Image
                src={banner_purple}
                alt="2 for £8.99 promotion"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover rounded-lg"
                placeholder="blur"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
              <Image
                src={banner_orange}
                alt="Mix and Match promotion"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover rounded-lg"
                placeholder="blur"
              />
            </div>
          </div>
        </section>

        {/* Vaping World Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-black mb-4 font-integral">VAPING WORLD</h2>
            <p className="text-gray-700 max-w-4xl font-satoshi font-semibold">
              Shopping for vapes online is fast, reliable, and easy. Our UK-based platform brings the top vape brands and
              flavours to your doorstep. From disposable vapes and refillable vape kits to nic salts and nicotine pouches,
              our collection is curated to deliver performance, value, and satisfaction. If you're searching for the best
              deals on vapes in the UK, we've got them all right here.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}