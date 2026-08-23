"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

const item = {
  title: "Sürdürülebilir Yaşam Paneli Tamamlandı",
  date: "8 Mayıs 2024",
  tag: "HABER",
  img: "/img/sariyer-surdurulebilir-yasam-paneli.jpg",
  desc: "Sürdürülebilir yaşam panelinde vatandaşlarımızın yoğun ilgisiyle çalışmalarımız tamamlandı."
};

export default function HaberDetay() {
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
        <PageHeader eyebrow={item.tag} title={item.title} breadcrumbs={["Haberler", item.title]} />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel" style={{ gridColumn: "1 / -1" }}>
                <img className="featured-img" src={item.img} alt={item.title} loading="lazy" />
                <div className="news-text">
                  <span className="tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <small>{item.date}</small>
                  <p>{item.desc}</p>
                  <Link className="read-more" href="/haberler">← Tüm Haberler</Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
