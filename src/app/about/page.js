"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-[85%] md:w-1/2 mx-auto px-6 py-16 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Σχετικά με την Εφαρμογή
      </h1>

      <section className="mb-10 space-y-4 text-lg">
        <p>
          Αυτή η εφαρμογή δημιουργήθηκε με σκοπό την{" "}
          <span className="font-bold">εκπαιδευτική προβολή</span> του
          <span className="font-bold"> Συντάγματος της Ελλάδας</span>.
        </p>
        <p>
          Στόχος είναι να παρουσιάζονται τα άρθρα του Συντάγματος με έναν{" "}
          <span className="font-bold">καθαρό, σύγχρονο</span> και
          <span className="font-bold"> ευανάγνωστο</span> τρόπο, κατάλληλο για
          μελέτη και κατανόηση.
        </p>
        <p>
          Η εμπειρία σχεδιάστηκε με έμφαση στην αισθητική και την απλότητα,
          προσφέροντας έναν φιλικό τρόπο περιήγησης στο περιεχόμενο.
        </p>
      </section>

      <section className="mb-10 text-lg">
        <h2 className="text-2xl font-bold italic mb-2">Σημαντική Σημείωση</h2>
        <p>
          Η εφαρμογή <span className="font-semibold underline">ΔΕΝ</span>{" "}
          αποτελεί επίσημη νομική πηγή. Βασίζεται στο αυθεντικό κείμενο του
          Συντάγματος, όπως έχει δημοσιευθεί από τη Βουλή των Ελλήνων.{" "}
          <a
            href="https://www.hellenicparliament.gr/UserFiles/f3c70a23-7696-49db-9148-f24dce6a27c8/FEK%20211-A-24-12-2019%20NEO%20SYNTAGMA.pdf"
            target="_blank"
            className="text-blue-700 underline mt-2 mx-auto italic inline-block hover:text-blue-900 transition"
          >
            (Επίσημο PDF του Συντάγματος)
          </a>
        </p>
      </section>

      <p className="text-center italic text-gray-600 mt-16">
        📜 Με σεβασμό στο Σύνταγμα. Με στόχο τη γνώση.
      </p>
    </main>
  );
}
