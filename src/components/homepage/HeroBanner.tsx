import Image from "next/image";
import Link from "next/link";
import banner_green from "@/app/public/banner/banner-green.webp";
import banner_purple from "@/app/public/banner/banner-purple.webp";
import banner_orange from "@/app/public/banner/banner-orange.webp";
import vape_bg from "@/app/public/bg-pic.png"

export default function HeroBanner() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              FIND
              <br />
              EVERYTHING
              <br />
              FOR VAPING
            </h1>
            <p className="mt-4 max-w-md text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et
              dolore magna aliqua
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[400px] h-[480px] animate-float transition-transform  ease-in-out hover:scale-105">
  <Image
    src={vape_bg}
    alt="Vape products"
    fill
    className="object-contain rounded-lg"
    priority
  />
</div>



          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      {/* Promotional Banners */}
<section className="py-8">
  <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Banner 1 */}
    <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
      <Image
        src={banner_green}
        alt="Mix and Match promotion"
        fill
        className="object-cover rounded-lg"
        priority
      />
    </div>

    {/* Banner 2 */}
    <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
      <Image
        src={banner_purple}
        alt="2 for £8.99 promotion"
        fill
        className="object-cover rounded-lg"
        priority
      />
    </div>

    {/* Banner 3 */}
    <div className="relative rounded-lg overflow-hidden w-full" style={{ aspectRatio: "600 / 230" }}>
      <Image
        src={banner_orange}
        alt="Mix and Match promotion"
        fill
        className="object-cover rounded-lg"
        priority
      />
    </div>
  </div>
</section>


      {/* Vaping World Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-black mb-4">VAPING WORLD</h2>
          <p className="text-gray-700 max-w-4xl">
            Shopping for vapes online is fast, reliable, and easy. Our UK-based platform brings the top vape brands and
            flavours to your doorstep. From disposable vapes and refillable vape kits to nic salts and nicotine pouches,
            our collection is curated to deliver performance, value, and satisfaction. If you're searching for the best
            deals on vapes in the UK, we've got them all right here.
          </p>
        </div>
      </section>
    </main>
  );
}
