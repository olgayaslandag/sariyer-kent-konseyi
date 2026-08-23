"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Egitim() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="ÇALIŞMA GRUPLARI"
          title="Eğitim ve Gençlik"
          breadcrumbs={["Çalışma Grupları", "Eğitim ve Gençlik"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Eğitim ve Gençlik çalışma grubu, gençlerin eğitim
                    imkanlarını genişletmek, beceri kazandırmak ve aktif
                    vatandaşlık bilinci aşılamak için çalışır.
                  </p>
                  <p>
                    Grubumuz, eğitimde eşitlik ve kaliteyi artırmak,
                    gençlerin potansiyelini en üst düzeye çıkarmak için
                    projeler üretir.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Erişilebilir Eğitim:</strong> Tüm gençlere
                    eğitim imkanı sunmak.
                  </p>
                  <p>
                    <strong>Beceri Kazandırma:</strong> Mesleki ve sosyal
                    beceri eğitimleri.
                  </p>
                  <p>
                    <strong>Vatandaşlık:</strong> Aktif vatandaşlık bilinci
                    aşılamak.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Eğitim Atölyeleri, Gençlik Zirvesi, Mentorluk Programları, Burs ve Ödül Törenleri ile gençlerle birlikteyiz.</p>
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
                <div className="panel-head"><h3>Gençlik Mentorluk Programı</h3></div>
                <p>Deneyimli profesyonellerin gençlere rehberlik ettiği, kariyer hedeflerini belirlemelerini sağlayan program.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Dijital Okuryazlık Atölyeleri</h3></div>
                <p>Gençlere dijital araçları etkin kullanmayı, içerik üretmeyi ve dijital güvenliği öğreten atölyeler.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Burs ve Ödül Programı</h3></div>
                <p>Akademik başarılı ve sosyal proje geliştiren gençlere burs ve ödül desteği sağlayan program.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
