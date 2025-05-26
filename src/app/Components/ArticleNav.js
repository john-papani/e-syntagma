"use client"; // if using app/ structure, otherwise not needed

import { useEffect, useState, useRef } from "react";
import articles from "../../../public/syntagma.json";

export default function ArticleNav({ isSearching }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const [isVisible, setIsVisible] = useState(true);
  const hasDisappearedRef = useRef(false); // track if it has already disappeared

  useEffect(() => {
    if (isSearching && !hasDisappearedRef.current) {
      setIsVisible(false); 
      hasDisappearedRef.current = true; // block future changes
    }
  }, [isSearching]);

  // Scroll handler to update active article index based on scrollY
  useEffect(() => {
    const sections = articles.map((_, i) =>
      document.getElementById(`article-${i}`)
    );

    function onScroll() {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveIndex((prev) => (prev !== i ? i : prev));
          break;
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const activeItem = itemRefs.current[activeIndex];
    if (!container || !activeItem) return;

    const padding = 250; // px from top/bottom

    const itemTop = activeItem.offsetTop;
    const itemBottom = itemTop + activeItem.offsetHeight;
    const visibleTop = container.scrollTop + padding;
    const visibleBottom =
      container.scrollTop + container.clientHeight - padding;

    // Scroll up if above visible range
    if (itemTop < visibleTop) {
      container.scrollTo({
        top: itemTop - padding,
        behavior: "smooth",
      });
    }
    // Scroll down if below visible range
    else if (itemBottom > visibleBottom) {
      container.scrollTo({
        top: itemBottom - container.clientHeight + padding,
        behavior: "smooth",
      });
    }
  }, [activeIndex, isSearching]);

  // Scroll to article on nav click
  const scrollToArticle = (i) => {
    const section = document.getElementById(`article-${i}`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      ref={containerRef}
      className={`
    fixed left-0 top-1/2 -translate-y-1/2 ml-2 pt-2 rounded-2xl overflow-y-auto 
    bg-white shadow w-[10%] h-[75vh] md:block
    transition-all duration-500 ease-in-out
    ${
      isVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-full pointer-events-none"
    }
  `}
    >
      <div className="space-y-2">
        <ul className="space-y-1 px-2">
          {articles.map((article, i) => (
            <li key={i} ref={(el) => (itemRefs.current[i] = el)}>
              <button
                onClick={() => scrollToArticle(i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition 
              ${
                i === activeIndex
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              >
                <p className="font-bold">{article.title.split(" - ")[0]}</p>
                <p>{article.title.split(" - ")[2]}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
