"use client";

import { useState, useCallback } from "react";
import { search } from "../data/searchData";

export default function SearchResultsClient({ initialQuery, initialResults }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      setQuery(trimmed);
      setResults(search(trimmed));
    },
    [inputValue]
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
