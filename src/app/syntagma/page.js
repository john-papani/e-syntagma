"use client";
import React, { useState } from "react";
import Articles from "../Components/Articles";
import ArticleNav from "../Components/ArticleNav";
import ScrollToTop from "../Components/ScrollToTop";
export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div>
      <main className="min-h-screen p-6 relative flex">
        <ArticleNav isSearching={isSearching} />
        <div className="flex-1 md:ml-64">
          <Articles isSearching={isSearching} setIsSearching={setIsSearching} />
          <ScrollToTop />
        </div>
      </main>
    </div>
  );
}
