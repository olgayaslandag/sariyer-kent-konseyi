"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Kadin() {
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
          eyebrow="MECLİSLERİMİZ"
          title="Kadın Meclisi"
          breadcrumbs={["Meclislerimiz", "Kadın Meclisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Kadın Meclisi, Sarıyer’de kadınların kent yaşamındaki rolünü
                    güçlendirmek, eşitlik ve dayanışma temelinde çalışmalar
                    yürütmek amacıyla kurulmuştur.
                  </p>
                  <p>
                    Meclisimiz, kadınların sosyal, kültürel ve ekonomik
                    yaşamdaki katılımını artırmak için projeler üretir.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>AMAÇLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Eşitlik:</strong> Kadınların fırsat eşitliğini
                    savunmak.
                  </p>
                  <p>
                    <strong>Dayanışma:</strong> Kadınlar arası sosyal dayanışma
                    ağını güçlendirmek.
                  </p>
                  <p>
                    <strong>Girişimcilik:</strong> Kadın girişimcilerine destek
                    olmak.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Kadın Sağlığı Seminerleri, Spor ve Hareket Etkinlikleri, Mentörlük Programı, Kadınların Gücü Paneli gibi etkinlikler düzenliyoruz.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">PROJELERİMİZ</p><h2>Son Projeler</h2></div>
            </div>
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h3>Kadın Sağlığı Seminerleri</h3></div>
                <p>Kadınların sağlıklı yaşam bilincini artırmak amacıyla düzenlenen ücretsiz seminerler ve taramalar.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Kadın Girişimciliği Programı</h3></div>
                <p>Kadın girişimcilere yönelik mentörlük, eğitim ve finansman destekleri sağlayan kapsamlı bir program.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Spor ve Hareket Etkinlikleri</h3></div>
                <p>Kadınların spor yapma alışkanlığı kazandırmak için düzenlenen yürüyüş, yoga ve dans etkinlikleri.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
