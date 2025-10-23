import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Github, Instagram, Twitter, Truck, MapPin} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-satoshi">
      <main className="flex-1">
        {/* Why Choose Us Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-8 font-integral">WHY CHOOSE US?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free UK Delivery */}
              <div className="border rounded-lg p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                  <Truck className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-1">FREE UK DELIVERY</h3>
                <p className="text-gray-600">On orders over £35</p>
              </div>

              {/* Exceptional Service */}
              <div className="border rounded-lg p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-yellow-400">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-1">EXCEPTIONAL SERVICE</h3>
                <div className="flex items-center">
                  <span className="mr-2">Excellent</span>
                  <span className="text-green-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="ml-1 font-semibold">Trustpilot</span>
                </div>
              </div>

              {/* Customer Support */}
              <div className="border rounded-lg p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 21a1 1 0 0 1-2 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="8" r="6" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-1">CUSTOMER SUPPORT</h3>
                <p className="text-gray-600">Reach out to us</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full font-satoshi">
        {/* Newsletter Section */}
        <div className="bg-black text-white px-6 py-10 md:py-14 rounded-xl max-w-6xl mx-auto -mb-24 z-10 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left max-w-md font-integral">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Input type="email" placeholder="Enter your email address" className="bg-white text-black rounded-full" />
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full">Subscribe to Newsletter</Button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="bg-[#F0F0F0] px-6 pt-28 pb-12 relative z-0">
          <div className="container mx-auto max-w-6xl">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold mb-4 block font-integral text-left">
                VAPING WORLD
              </Link>
              <p className="flex items-center text-gray-600 mb-4 text-left">
                <MapPin className="mr-2"/>Mediself Limited
Unit 1 Springfield Industrial Estate,
Preston,
PR1 7JD.
              </p>
              <div className="flex justify-start gap-4">
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 mt-8">
              <div>
                <h3 className="font-semibold mb-4 text-left">COMPANY</h3>
                <div className="flex flex-col gap-3 text-gray-600 text-left">
                  <Link href="#">About</Link>
                  <Link href="#">Features</Link>
                  <Link href="#">Works</Link>
                  <Link href="#">Career</Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-left">HELP</h3>
                <div className="flex flex-col gap-3 text-gray-600 text-left">
                  <Link href="#">Customer Support</Link>
                  <Link href="#">Delivery Details</Link>
                  <Link href="#">Terms &amp; Conditions</Link>
                  <Link href="#">Privacy Policy</Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-left">FAQ</h3>
                <div className="flex flex-col gap-3 text-gray-600 text-left">
                  <Link href="#">Account</Link>
                  <Link href="#">Manage Deliveries</Link>
                  <Link href="#">Orders</Link>
                  <Link href="#">Payments</Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-left">RESOURCES</h3>
                <div className="flex flex-col gap-3 text-gray-600 text-left">
                  <Link href="#">Free eBooks</Link>
                  <Link href="#">Development Tutorial</Link>
                  <Link href="#">How to - Blog</Link>
                  <Link href="#">Youtube Playlist</Link>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm text-center md:text-left mb-4 md:mb-0">
                VapingWorld © 2000-2023. All Rights Reserved
              </p>
              <div className="flex gap-3 justify-center md:justify-start">
               
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
