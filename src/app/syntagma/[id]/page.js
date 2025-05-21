"use client";
import React from "react";
import articles from "../../../../public/syntagma.json"; // Adjust the path as necessary

function findArticleByNumber(articles, number) {
  return articles.filter((article) =>
    article.title.includes(`Άρθρο ${number}`)
  );
}
function capitalizeArticleNumber(articleNumber) {
  // Separate digits and letters
  const match = articleNumber.match(/^(\d+)([a-zα-ω]*)$/i);
  if (!match) return articleNumber; // no match, return as is

  const digits = match[1]; // e.g. "5"
  const letters = match[2]; // e.g. "α"

  if (letters) {
    return digits + letters.toUpperCase();
  }
  return digits;
}

export default function ArticlePage({ params }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const capitalId = capitalizeArticleNumber(decodeURIComponent(id)) || "";
  const article = findArticleByNumber(articles, capitalId)[0];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">Άρθρο δεν βρέθηκε.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] px-4 pt-2 pb-10">
      <div className="flex justify-between items-center md:px-5">
        <button
          onClick={() => window.history.back()}
          className="left-4 text-sm hover:bg-blue-500 hover:text-black font-semibold py-2 mb-3 px-4 rounded-lg shadow-md bg-black text-blue-300 transition duration-300"
        >
          Επιστροφή
        </button>
        <button
          onClick={() => alert("To pdf δεν είναι διαθέσιμο προς το παρόν")}
          className="right-4 text-sm hover:bg-blue-500 hover:text-black font-semibold py-2 mb-3 px-4 rounded-lg shadow-md bg-black text-blue-300 transition duration-300"
        >
          Εκτύπωση σε PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:max-w-3xl mx-auto space-y-6">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          {article.title.split(" - ")[0]} — {article.title.split(" - ")[2]}
        </h2>

        {/* Source Info */}
        <p className="text-sm md:text-base text-gray-500 space-x-2">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Πηγή
          </a>
          <span>• {article.date}</span>
        </p>

        {/* Content */}
        <ul className="space-y-4 text-justify text-sm md:text-base text-gray-800">
          {article.content.map((paragraph, i) =>
            paragraph === "Καταργείται" ? (
              <li key={i} className="text-red-600 font-semibold italic">
                {paragraph}
              </li>
            ) : (
              <li key={i}>{paragraph}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
