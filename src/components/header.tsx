
"use client";
import { useCart } from "@/context/CartContext"; // 👈 Import this at the top

import { useState } from "react";
import { VscChevronDown, VscChromeClose } from "react-icons/vsc";
import { BsCart2 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/public/lOGO.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cart } = useCart(); // 👈 Add this inside the component

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: "E-liquid", href: "/category/e-liquid" },
    { name: "Vape Kits", href: "/category/vape-kits" },
    { name: "Disposables", href: "/category/disposable" },
    { name: "Coil", href: "/category/coils" },
    { name: "Pods", href: "/category/pod" },
    { name: "Nic Pouches", href: "/category/nic-pouches" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="relative flex items-center justify-center w-full h-10 bg-black text-white text-[14px] font-satoshi">
        Get 20% on your first order. &nbsp;
        <span className="underline cursor-pointer">Sign up now!</span>
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close banner"
          className="absolute right-5 max-md:hidden"
        >
          <VscChromeClose />
        </button>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-5 md:px-10 bg-white flex items-center justify-between shadow-sm">
        {/* Logo & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl md:hidden"
            aria-label="Toggle menu"
          >
            <HiMenuAlt3 />
          </button>
          <Link href="/">
            <Image
              src={logo}
              alt="Vaping World Logo"
              width={120}
              height={20}
              className="ml-16"
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <form className="hidden md:flex flex-1 max-w-xl mx-6 relative">
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full p-2 pl-10 rounded-full bg-[#f0f0f0] border border-gray-300 shadow-inner"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </form>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Link href="/cart" className="flex items-center">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <BsCart2 className="h-7 w-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <Button variant="ghost" size="icon" aria-label="User">
            <FaRegUserCircle className="h-9 w-9" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="hidden md:flex w-full bg-[#dbdbdb] px-10 py-6 text-sm justify-between font-satoshi font-semibold">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            {item.name} <VscChevronDown />
          </Link>
        ))}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col gap-4 px-5 py-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name} <VscChevronDown />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Search Bar */}
          <div className="px-5 pb-4">
            <form className="relative w-full">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full p-2 pl-10 rounded-full border border-gray-300"
              />
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}


