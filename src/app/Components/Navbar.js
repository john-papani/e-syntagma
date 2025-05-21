"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const navigate = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 tracking-wide cursor-pointer hover:opacity-80 transition"
        >
          e-Syntagma
        </h1>

        {/* Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 border-t md:border-0 shadow-md md:shadow-none`}
        >
          <button
            onClick={() => navigate("/about")}
            className={`block py-2 md:py-0 text-base font-medium ${
              isActive("/about")
                ? "text-blue-700"
                : "text-gray-700 hover:text-blue-600"
            } transition`}
          >
            Σχετικά
          </button>
          {/* Μπορείς να προσθέσεις κι άλλα links εδώ */}
        </nav>
      </div>
    </header>
  );
}
