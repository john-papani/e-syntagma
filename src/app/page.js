"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-white via-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Το Σύνταγμα της Ελλάδας
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4">
          Ανακάλυψε το θεμέλιο του πολιτεύματος της χώρας μας.
        </p>
        <p className="text-base text-gray-500 mb-8">
          Περιηγήσου στα άρθρα του Συντάγματος, κατανόησε τα δικαιώματα και τις υποχρεώσεις που καθορίζουν τη λειτουργία της Ελληνικής Δημοκρατίας.
        </p>

        <button
          onClick={() => router.push("/syntagma")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300"
        >
          Δες τα Άρθρα
        </button>
      </div>
    </div>
  );
}
