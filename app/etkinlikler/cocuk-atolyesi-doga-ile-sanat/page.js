"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

const item = {
  title: "Çocuk Atölyesi: Doğa ile Sanat",
  time: "11:00 - 13:00",
  location: "Sarıyer Belediyesi Ek Hizmet Binası",
  img: "/img/sariyer-kare-4.jpg",
  desc: "Çocukların doğayla bağ kurmasını ve sanat yaparak öğrenmesini sağlayan atölye çalışması."
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
