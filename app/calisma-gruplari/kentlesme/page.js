"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Kentlesme() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="ÇALIŞMA GRUPLARI"
          title="Kentleşme ve Planlama"
          breadcrumbs={["Çalışma Grupları", "Kentleşme ve Planlama"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Kentleşme ve Planlama çalışma grubu, Sarıyer’in sürdürülebilir
                    kentleşme, ulaşım, konut ve alan planlaması konularında
                    projeler üretir.
                  </p>
                  <p>
                    Grubumuz, kentin gelecek planlamasında vatandaş
                    katılımını esas alır.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Sürdürülebilir Kentleşme:</strong> Yeşil ve
                    sürdürülebilir kent modelleri.
                  </p>
                  <p>
                    <strong>Ulaşım:</strong> Toplu taşıma ve bisiklet
                    altyapısı geliştirmek.
                  </p>
                  <p>
                    <strong>Konut:</strong> Uygun konut projeleri ve
                    planlaması.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Kent Planlama Çalıştayları, Ulaşım Panelleri, Konut Fikir Yarışmaları ve Halk Katılım Toplantıları düzenliyoruz.</p>
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
                <div className="panel-head"><h3>Sürdürülebilir Ulaşım Planı</h3></div>
                <p>Bisiklet yolları, yaya geçişleri ve toplu taşıma altyapısını iyileştirmek için kapsamlı bir ulaşım planı hazırladık.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Yeşil Kent Projesi</h3></div>
                <p>Kentin her mahalesine yeşil alanlar, parklar ve sosyal yaşam alanları kazandırmak için çalışmalar yürütüyoruz.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Uygun Konut Girişimi</h3></div>
                <p>Orta ve düşük gelirli vatandaşlar için ulaşılabilir konut projeleri üretiyor, konut planlamasına katkı sağlıyoruz.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
