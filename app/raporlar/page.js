"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const reports = [
  "Sarıyer Kent Konseyi Faaliyet Raporu 2023",
  "Sarıyer Kent Konseyi Faaliyet Raporu 2022",
  "Çalışma Grupları Raporu 2024",
  "Çalışma Grupları Değerlendirme Raporu 2024",
  "Sarıyer Kent Vizyonu — Ortak Gelecek",
  "Sarıyer Kent Konseyi Stratejik Plan 2025-2030"
];

export default function Raporlar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <main>
        <PageHeader
          eyebrow="BİLGİ"
          title="Raporlar & Yayınlar"
          breadcrumbs={["Raporlar & Yayınlar"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              {reports.map((report, index) => (
                 <a className="report-row" href="/raporlar" key={index}>
                  <span className="pdf-icon">PDF</span>
                  <span>
                    <strong>{report}</strong>
                    <small>PDF · 4.2 MB</small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
