"use client";

import { useState, useEffect } from "react";

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
          <a className="brand" href="#">
            <img className="brand-img" src="/img/logo.png" alt="Sarıyer Kent Konseyi" />
          </a>
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
                <a href="#" className="dropdown-item">Hakkımızda</a>
                <a href="#" className="dropdown-item">Vizyon & Misyon</a>
                <a href="#" className="dropdown-item">Yönetim</a>
                <a href="#" className="dropdown-item">Yönetmelik</a>
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
                <a href="#" className="dropdown-item">Gençlik Meclisi</a>
                <a href="#" className="dropdown-item">Kadın Meclisi</a>
                <a href="#" className="dropdown-item">Çocuk Meclisi</a>
                <a href="#" className="dropdown-item">Engelli Meclisi</a>
                <a href="#" className="dropdown-item">Yaşlılar Meclisi</a>
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
                <a href="#" className="dropdown-item">Çevre ve Sürdürülebilirlik</a>
                <a href="#" className="dropdown-item">Eğitim ve Gençlik</a>
                <a href="#" className="dropdown-item">Sağlık ve Sosyal Hizmetler</a>
                <a href="#" className="dropdown-item">Kültür ve Sanat</a>
                <a href="#" className="dropdown-item">Kentleşme ve Planlama</a>
                <a href="#" className="dropdown-item">Ekonomi ve İstihdam</a>
              </div>
            </div>
            <a href="#haberler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Haberler</a>
            <a href="#etkinlikler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Etkinlikler</a>
            <a href="#raporlar" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Raporlar &amp; Yayınlar</a>
            <a href="#iletisim" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>İletişim</a>
            <a href="#" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa-solid fa-magnifying-glass nav-icon" />
            </a>
            <a className="nav-link join" href="#katil" onClick={() => setIsMobileMenuOpen(false)}>Bize Katılın →</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
