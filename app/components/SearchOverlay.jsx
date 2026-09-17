"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { search } from "../data/searchData";

const BADGE_LABELS = {
  Haber: "Haber",
  Etkinlik: "Etkinlik",
  "Çalışma Grubu": "Çalışma Grubu",
  Meclis: "Meclis",
};

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      setIsRendered(true);
      setQuery("");
      setResults([]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsOpen(true));
      });
    } else if (isRendered) {
      setIsOpen(false);
    }
  }, [open, mounted]);

  const performSearch = useCallback((value) => {
    const q = value.trim();
    if (!q) {
      setResults([]);
      return;
    }
    setResults(search(q));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("search-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("search-open");
    };
  }, [isOpen, onClose]);

  const handleClose = useCallback(() => {
    onClose();
    setIsOpen(false);
  }, [onClose]);

  const handleFinishClose = useCallback(() => {
    setIsRendered(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    window.location.href = `/arama?q=${encodeURIComponent(trimmed)}`;
  };

  if (!isRendered || !mounted) return null;

  return createPortal(
    <div
      className={`search-overlay${isOpen ? " open" : ""}`}
      onClick={handleClose}
      onTransitionEnd={(e) => {
        if (!isOpen && e.target === e.currentTarget) {
          handleFinishClose();
        }
      }}
    >
      <button
        className="search-overlay-close"
        aria-label="Aramayı kapat"
        onClick={handleClose}
      >
        ×
      </button>

      <div className="search-overlay-inner" onClick={(e) => e.stopPropagation()}>
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-input-row">
            <input
              className="search-input"
              type="text"
              placeholder="Ara..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                performSearch(e.target.value);
              }}
              autoFocus
            />
            <button className="search-btn" type="submit" aria-label="Ara">
              <i className="fa-solid fa-magnifying-glass nav-icon" />
            </button>
          </div>
        </form>

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((item) => (
              <li key={item.href} className="search-result-item">
                <a href={item.href} className="search-result-title" onClick={handleClose}>
                  {item.title}
                </a>
                <span className="search-result-badge">
                  {BADGE_LABELS[item.type] || item.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body
  );
}
