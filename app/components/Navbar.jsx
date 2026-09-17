"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import groupsData from "../data/calisma-gruplari.json";
import councilsData from "../data/meclisler.json";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDropdown = (key) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });

    const handleClickOutside = (e) => {
      if (!e.target.closest(".nav-item")) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen, setOpenDropdown, setIsMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const menuGroups = groupsData.slice(0, 8);

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="container nav-inner">
          <Link className="brand" href="/">
            <img className="brand-img" src="/img/logo.svg" alt="Sarıyer Kent Konseyi" />
          </Link>
          <button
            className="nav-toggle"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
          {isMobileMenuOpen && (
            <div
              className="nav-overlay open"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
              }}
            />
          )}
          <div className={`nav${isMobileMenuOpen ? " open" : ""}`}>
            <div className="nav-item">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={toggleDropdown("kurumsal")}
              >
                Kurumsal <i className="fa-solid fa-chevron-down nav-icon" />
              </a>
              <div
                className={`dropdown-menu${
                  openDropdown === "kurumsal" ? " active" : ""
                }`}
              >
                <Link href="/hakkimizda" className="dropdown-item">Hakkımızda</Link>
                <Link href="/vizyon-misyon" className="dropdown-item">Vizyon & Misyon</Link>
                <Link href="/yonetim" className="dropdown-item">Yönetim Kurulu</Link>
                <Link href="/yonetmelik" className="dropdown-item">Yönetmelik</Link>
                <Link href="/ic-yonerge" className="dropdown-item">İç Yönerge</Link>
              </div>
            </div>
            <div className="nav-item">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={toggleDropdown("meclisler")}
              >
                Meclislerimiz <i className="fa-solid fa-chevron-down nav-icon" />
              </a>
              <div
                className={`dropdown-menu${
                  openDropdown === "meclisler" ? " active" : ""
                }`}
              >
                {councilsData.map((c) => (
                  <Link href={c.link} className="dropdown-item" key={c.id}>
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="nav-item">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={toggleDropdown("calisma-gruplari")}
              >
                Çalışma Grupları <i className="fa-solid fa-chevron-down nav-icon" />
              </a>
              <div
                className={`dropdown-menu${
                  openDropdown === "calisma-gruplari" ? " active" : ""
                }`}
              >
                {menuGroups.map((g) => (
                  <Link href={g.link} className="dropdown-item" key={g.id}>
                    {g.title}
                  </Link>
                ))}
                <Link href="/calisma-gruplari" className="dropdown-item">Tümü</Link>
              </div>
            </div>
            <Link href="/haberler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Haberler</Link>
            <Link href="/etkinlikler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Etkinlikler</Link>
            <Link href="/raporlar" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Raporlar &amp; Yayınlar</Link>
            <Link href="/iletisim" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
            <button className="nav-link" onClick={() => setIsSearchOpen(true)} aria-label="Arama">
              <i className="fa-solid fa-magnifying-glass nav-icon" />
            </button>
            <Link className="nav-link join" href="/iletisim" onClick={() => setIsMobileMenuOpen(false)}>Bize Katılın →</Link>
          </div>
        </div>
      </nav>
      <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
