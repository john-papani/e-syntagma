"use client";

import React, { useRef } from "react";
import articles from "../../../../public/syntagma.json"; // adjust path if needed

function findArticleByNumber(articles, number) {
  return articles.filter((article) =>
    article.title.includes(`Άρθρο ${number}`)
  );
}

function parseArticleNumber(articleNumber) {
  const match = articleNumber.match(/^(\d+)([a-zα-ω]?)$/i);
  if (!match) return { number: NaN, suffix: "" };

  const number = parseInt(match[1], 10);
  const suffix = match[2] ? "A" : "";

  return number + suffix;
}

function capitalizeArticleNumber(articleNumber) {
  const match = articleNumber.match(/^(\d+)([a-zα-ω]*)$/i);
  if (!match) return articleNumber;

  const digits = match[1];
  const letters = match[2];

  return digits + (letters ? letters.toUpperCase() : "");
}

export default function ArticlePage({ params }) {
  const pdfRef = useRef(null);
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
      </div>

      <div
        className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:max-w-3xl mx-auto space-y-6"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          {article.title.split(" - ")[0]} — {article.title.split(" - ")[2]}
        </h2>

        <p className="text-sm md:text-base text-gray-500 space-x-2">
          <a
            href={`https://www.hellenicparliament.gr/Vouli-ton-Ellinon/To-Politevma/Syntagma/article-${parseArticleNumber(
              capitalId
            )}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Πηγή
          </a>
          <span>• {article.date}</span>
        </p>

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
