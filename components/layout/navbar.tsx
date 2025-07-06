"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react";
import Link from "next/link";
import NavigationMenuDesktop from "./navigation-menu-desktop";
import Image from "next/image";
import { MYSKILL_LOGO_IMAGE } from "@/lib/images/home";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen);
  const toHomePage = () => {
    router.push("/")
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <Image
          src={MYSKILL_LOGO_IMAGE}
          alt="MySkill Logo"
          width={100}
          height={30}
          className="cursor-pointer"
          onClick={() => toHomePage()}
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <NavigationMenuDesktop/>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-gray-700 font-medium">
          <li className="hover:text-purple-600 cursor-pointer"><Link href="/profile">Profile</Link></li>
        </ul>
      )}
    </nav>
  )
}
