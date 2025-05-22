"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import vouli from "../../public/vouli.jpg"; // Adjust the path as necessary
export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <Image
        width={1000}
        height={1000}
        src={vouli}
        alt="Greek Flag"
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover pt-16 opacity-15"
      />
      <div className="max-w-2xl w-full text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Το Σύνταγμα της Ελλάδας
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4">
          Ανακάλυψε το θεμέλιο του πολιτεύματος της χώρας μας.
        </p>
        <p className="text-base text-gray-500 mb-8">
          Περιηγήσου στα άρθρα του Συντάγματος, κατανόησε τα δικαιώματα και τις
          υποχρεώσεις που καθορίζουν τη λειτουργία της Ελληνικής Δημοκρατίας.
        </p>

        <button
          onClick={() => router.push("/syntagma")}
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300 hover:cursor-pointer"
        >
          Δες τα Άρθρα
        </button>
      </div>
    </div>
  );
}
