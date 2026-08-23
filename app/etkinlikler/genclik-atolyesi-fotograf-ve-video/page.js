"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

const item = {
  title: "Gençlik Atölyesi: Fotoğraf ve Video",
  time: "10:00 - 12:00",
  location: "Sarıyer Gençlik Merkezi",
  img: "/img/sariyer-kare-5.jpg",
  desc: "Gençlere fotoğraf ve video çekim teknikleri ücretsiz olarak sunulan atölye."
};

export default function EtkinlikDetay() {
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
        <PageHeader eyebrow="ETKİNLİK" title={item.title} breadcrumbs={["Etkinlikler", item.title]} />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel" style={{ gridColumn: "1 / -1" }}>
                <img className="featured-img" src={item.img} alt={item.title} loading="lazy" />
                <div className="event-text">
                  <h3>{item.title}</h3>
                  <p>{item.time} · {item.location}</p>
                  <p>{item.desc}</p>
                  <Link className="read-more" href="/etkinlikler">← Tüm Etkinlikler</Link>
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
