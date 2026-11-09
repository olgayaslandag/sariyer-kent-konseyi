"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * SearchResultsClient (client) — faz-4: tam arama dizini client
 * bundle'ında tutulmuyor; sonuçlar server'dan props ile gelir
 * (initialResults). Yeni sorguda server sayfasına router.push
 * ile gidilir, sonuçlar server'da yeniden hesaplanır.
 * @param {{ initialQuery: string, initialResults: Array<{ slug: string, kind: string, title: string, href: string, text: string, type: string, score: number }> }} props
 */
export default function SearchResultsClient({ initialQuery, initialResults }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [inputValue, setInputValue] = useState(initialQuery);

  // Server props değişince (router.push ile yeni q geldiğinde) senkronla
  useEffect(() => {
    setQuery(initialQuery);
    setInputValue(initialQuery);
    setResults(initialResults);
  }, [initialQuery, initialResults]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      router.push(`/arama?q=${encodeURIComponent(trimmed)}`);
    },
    [inputValue, router]
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="search-page-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ara..."
          className="search-page-input"
        />
        <button type="submit" className="btn btn-primary">Ara</button>
      </form>

      {results.length === 0 ? (
        <p className="search-empty">Sonuç bulunamadı.</p>
      ) : (
        <div className="masonry">
          {results.map((item, index) => (
            <a href={item.href} className="news-card masonry-item" key={item.href + index}>
              <div className="news-card-body">
                <span className="tag">{item.type}</span>
                <h3>{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
