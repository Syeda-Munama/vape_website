// import type { Metadata } from "next";

// import "./globals.css";
// import Navbar from "@/components/header";
// import Footer from "@/components/footer";
// import { CartProvider } from "@/context/CartContext";
// import favicon from "@/app/public/lOGO.png"
// import NavbarWrapper from "@/components/navbar-wrapper";

// import { SupabaseProvider } from "@/lib/supabase-provider"



// export const metadata: Metadata = {
//   title: "Vaping World | UK’s Premier Online Vape Shop",
//   description:
//     "Shop the best vape kits, e-liquids, disposable vapes at Vaping World. Fast UK delivery, great prices, and top brands you can trust.",
//   keywords: [
//     "vape shop",
//     "vaping UK",
//     "e-liquids",
//     "disposable vapes",
//     "nicotine salts",
//     "vape kits",
//     "buy vapes online",
//     "vaping world"
//   ],
//   authors: [{ name: "Vaping World Team", url: "https://vapingworld.co.uk" }],
//   creator: "Vaping World",
//   publisher: "Vaping World",
//   robots: "index, follow",
//   openGraph: {
//     title: "Vaping World | UK’s Premier Online Vape Shop",
//     description:
//       "Explore top-rated vape kits, e-liquids, and accessories at Vaping World. Discover deals and fast delivery across the UK.",
//     url: "https://vapingworld.co.uk",
//     siteName: "Vaping World",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Vaping World | UK’s Premier Online Vape Shop",
//     description:
//       "Shop quality vape kits, e-liquids, and more from top UK brands. Great prices, fast shipping.",
//     creator: "@vapingworlduk", // if you have a Twitter handle
//   },
// };


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href={favicon.src} />
        
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        
//       </head>
//       <body
//         // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <SupabaseProvider>
//         <CartProvider>
//           < NavbarWrapper/>
//           {children}
//           <Footer />
//         </CartProvider>
//         </SupabaseProvider>
//       </body>
//     </html>
//   );
// }
// import type React from "react"
// import type { Metadata } from "next"

// import "./globals.css"
// import Footer from "@/components/footer"
// import { CartProvider } from "@/context/CartContext"
// import favicon from "@/app/public/lOGO.webp"
// import { AuthProvider } from "@/context/AuthContext"
// import { Toaster } from "@/components/ui/toaster"
// import Navbar from "@/components/header"
// import AgeVerification from "@/components/AgeVerification"


// export const metadata: Metadata = {
//   title: "Vaping World | UK's Premier Online Vape Shop",
//   description:
//     "Shop the best vape kits, e-liquids, disposable vapes at Vaping World. Fast UK delivery, great prices, and top brands you can trust.",
//   keywords: [
//     "vape shop",
//     "vaping UK",
//     "e-liquids",
//     "disposable vapes",
//     "nicotine salts",
//     "vape kits",
//     "buy vapes online",
//     "vaping world",
//   ],
//   authors: [{ name: "Vaping World Team", url: "https://vapingworld.co.uk" }],
//   creator: "Vaping World",
//   publisher: "Vaping World",
//   robots: "index, follow",
//   openGraph: {
//     title: "Vaping World | UK's Premier Online Vape Shop",
//     description:
//       "Explore top-rated vape kits, e-liquids, and accessories at Vaping World. Discover deals and fast delivery across the UK.",
//     url: "https://vapingworld.co.uk",
//     siteName: "Vaping World",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Vaping World | UK's Premier Online Vape Shop",
//     description: "Shop quality vape kits, e-liquids, and more from top UK brands. Great prices, fast shipping.",
//     creator: "@vapingworlduk", // if you have a Twitter handle
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href={favicon.src} />
       
//          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </head>
//       <body>
//          <AuthProvider>
//           <CartProvider>
//             <AgeVerification/>
//             <Navbar />
//             {children}
//             <Footer />
//             <Toaster />
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/CartContext";
import favicon from "@/app/public/lOGO.webp";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/header";
// import AgeVerification from "@/components/AgeVerification";

export const metadata: Metadata = {
  title: "Vaping World | UK's Premier Online Vape Shop",
  description:
    "Shop the best vape kits, e-liquids, disposable vapes at Vaping World. Fast UK delivery, great prices, and top brands you can trust.",
  keywords: [
    "vape shop",
    "vaping UK",
    "e-liquids",
    "disposable vapes",
    "nicotine salts",
    "vape kits",
    "buy vapes online",
    "vaping world",
  ],
  authors: [{ name: "Vaping World Team", url: "https://vapingworld.co.uk" }],
  creator: "Vaping World",
  publisher: "Vaping World",
  robots: "index, follow",
  openGraph: {
    title: "Vaping World | UK's Premier Online Vape Shop",
    description:
      "Explore top-rated vape kits, e-liquids, and accessories at Vaping World. Discover deals and fast delivery across the UK.",
    url: "https://vapingworld.co.uk",
    siteName: "Vaping World",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaping World | UK's Premier Online Vape Shop",
    description: "Shop quality vape kits, e-liquids, and more from top UK brands. Great prices, fast shipping.",
    creator: "@vapingworlduk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Preload font files */}
        <link
          rel="preload"
          href="/fonts/Satoshi-Light.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IntegralCF-ExtraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            {/* <AgeVerification /> */}
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}