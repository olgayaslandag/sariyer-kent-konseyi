"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/**
 * SearchOverlay (client) — faz-4: tam arama dizini client bundle'ında
 * tutulmuyor; bu bileşen yalnızca yönlendirme input'udur. Gönderimde
 * server-side arama sayfasına (/arama?q=...) router.push yapılır.
 */
export default function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
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
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsOpen(true));
      });
    } else if (isRendered) {
      setIsOpen(false);
    }
  }, [open, mounted]);

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
    handleClose();
    router.push(`/arama?q=${encodeURIComponent(trimmed)}`);
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
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button className="search-btn" type="submit" aria-label="Ara">
              <i className="fa-solid fa-magnifying-glass nav-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
