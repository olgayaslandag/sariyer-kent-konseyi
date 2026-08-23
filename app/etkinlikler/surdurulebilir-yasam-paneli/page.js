"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

const item = {
  title: "Sarıyer’de Sürdürülebilir Yaşam Paneli",
  time: "14:00 - 17:00",
  location: "Sarıyer Kültür Merkezi",
  img: "/img/sariyer-surdurulebilir-yasam-paneli.jpg",
  desc: "Sürdürülebilir yaşam konularında uzmanlar, vatandaşlar ve belediye temsilcileri bir araya geldi."
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
