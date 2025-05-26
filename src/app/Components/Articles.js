"use client";
import { useEffect, useState } from "react";
import articles from "../../../public/syntagma.json";
import { useRouter } from "next/navigation";

export default function Articles({ isSearching, setIsSearching }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const normalize = (str) =>
    str
      .normalize("NFD") // Decompose accented letters
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .toLowerCase(); // Make it lowercase

  const filteredArticles = articles.filter((article) => {
    const fullText = article.title + " " + article.content.join(" ");
    return normalize(fullText).includes(normalize(query));
  });

  const exportNumberArticle = (index) => {
    const article = articles[index];
    const title = article.title.split(" - ")[0];
    const number = title.split(" ")[1].toLowerCase();
    return number;
  };

  function parseArticleNumber(articleNumber) {
    const match = articleNumber.match(/^(\d+)([a-zα-ω]?)$/i);
    if (!match) return { number: NaN, suffix: "" };

    const number = parseInt(match[1], 10);
    const suffix = match[2] ? "A" : "";

    return number + suffix;
  }

  return (
    <div className="md:max-w-3xl w-[95%] mx-auto space-y-6">
      <div className="my-5 z-10 ">
        <input
          type="text"
          placeholder="Αναζήτηση άρθρων..."
          value={query}
          // disabled
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setIsSearching(value.trim() !== "");
          }}
          className="w-full px-4  py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Δεν βρέθηκαν αποτελέσματα.
        </p>
      ) : (
        filteredArticles.map((article, index) => (
          <div
            key={index}
            id={`article-${index}`}
            className="bg-white rounded-xl shadow-xl   p-2 md:p-6 space-y-3 scroll-mt-24"
          >
            <h2 className="text-base md:text-xl font-bold text-gray-800">
              {article.title.split(" - ")[0]} - {article.title.split(" - ")[2]}
            </h2>
            <p>
              <a
                href={`https://www.hellenicparliament.gr/Vouli-ton-Ellinon/To-Politevma/Syntagma/article-${parseArticleNumber(
                  exportNumberArticle(index)
                )}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline md:text-sm text-xs"
              >
                Πηγή
              </a>
              <span className="text-xs md:text-sm text-gray-500">
                {" - "}
                {article.date}
              </span>
            </p>

            <ul className="list-none list-inside text-gray-700 space-y-1 text-justify md:text-base text-sm max-h-[40vh] overflow-y-auto px-1">
              {article.content.map((paragraph, i) =>
                paragraph === "Καταργείται" ? (
                  <li key={i} className="text-red-500 font-bold italic p-2">
                    {paragraph}
                  </li>
                ) : (
                  <li key={i}>{paragraph}</li>
                )
              )}
            </ul>
            <button
              onClick={() =>
                router.push(`/syntagma/${exportNumberArticle(index)}`)
              }
              className="text-blue-600 hover:underline text-sm italic"
            >
              Δες το άρθρο
            </button>
          </div>
        ))
      )}
    </div>
  );
}
