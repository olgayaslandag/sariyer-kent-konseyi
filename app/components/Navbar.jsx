"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  openDropdown,
  setOpenDropdown,
}) {
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

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="container nav-inner">
          <Link className="brand" href="/">
            <img className="brand-img" src="/img/logo.png" alt="Sarıyer Kent Konseyi" />
          </Link>
          <button
            className="nav-toggle"
            aria-label="Menüyü aç"
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
                onClick={toggleDropdown("kent-konseyi")}
              >
                Kent Konseyi <i className="fa-solid fa-chevron-down nav-icon" />
              </a>
              <div
                className={`dropdown-menu${
                  openDropdown === "kent-konseyi" ? " active" : ""
                }`}
              >
                <Link href="/hakkimizda" className="dropdown-item">Hakkımızda</Link>
                <Link href="/vizyon-misyon" className="dropdown-item">Vizyon & Misyon</Link>
                <Link href="/yonetim" className="dropdown-item">Yönetim</Link>
                <Link href="/yonetmelik" className="dropdown-item">Yönetmelik</Link>
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
                <Link href="/meclisler/genclik" className="dropdown-item">Gençlik Meclisi</Link>
                <Link href="/meclisler/kadin" className="dropdown-item">Kadın Meclisi</Link>
                <Link href="/meclisler/cocuk" className="dropdown-item">Çocuk Meclisi</Link>
                <Link href="/meclisler/engelli" className="dropdown-item">Engelli Meclisi</Link>
                <Link href="/meclisler/yasli" className="dropdown-item">Yaşlılar Meclisi</Link>
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
                <Link href="/calisma-gruplari/cevre" className="dropdown-item">Çevre ve Sürdürülebilirlik</Link>
                <Link href="/calisma-gruplari/egitim" className="dropdown-item">Eğitim ve Gençlik</Link>
                <Link href="/calisma-gruplari/saglik" className="dropdown-item">Sağlık ve Sosyal Hizmetler</Link>
                <Link href="/calisma-gruplari/kultur" className="dropdown-item">Kültür ve Sanat</Link>
                <Link href="/calisma-gruplari/kentlesme" className="dropdown-item">Kentleşme ve Planlama</Link>
                <Link href="/calisma-gruplari/ekonomi" className="dropdown-item">Ekonomi ve İstihdam</Link>
              </div>
            </div>
            <Link href="/haberler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Haberler</Link>
            <Link href="/etkinlikler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Etkinlikler</Link>
            <Link href="/raporlar" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Raporlar &amp; Yayınlar</Link>
            <Link href="/iletisim" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
            <Link href="/haberler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa-solid fa-magnifying-glass nav-icon" />
            </Link>
            <Link className="nav-link join" href="/iletisim" onClick={() => setIsMobileMenuOpen(false)}>Bize Katılın →</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
