"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Genclik() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="MECLİSLERİMİZ"
          title="Gençlik Meclisi"
          breadcrumbs={["Meclislerimiz", "Gençlik Meclisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Gençlik Meclisi, Sarıyer’in geleceğini şekillendirecek gençlerin
                    sesini en üst düzeyde duyurmak için kurulmuştur. 18-30 yaş
                    arasındaki gençlerin katılımıyla çalışmalarımızı yürütüyoruz.
                  </p>
                  <p>
                    Meclisimiz, fikir üretme, proje geliştirme ve toplumsal etki
                    alanlarında aktif rol oynuyor.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>AMAÇLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Katılımcılık:</strong> Gençlerin kent yaşamındaki
                    rolünü artırmak.
                  </p>
                  <p>
                    <strong>Proje Üretimi:</strong> Gençlik odaklı somut projeler
                    geliştirmek.
                  </p>
                  <p>
                    <strong>Eğitim:</strong> Beceri kazandırma ve liderlik
                    eğitimleri sunmak.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Gençlik Atölyeleri, Fotoğraf ve Video Yarışması, Kent Gençliği Zirvesi, Sürdürülebilir Yaşam Paneli ve daha birçok etkinlikle gençlerle buluşuyoruz.</p>
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
                <div className="panel-head"><h3>Gençlik Liderliği Programı</h3></div>
                <p>Gençlere liderlik becerileri kazandıran, toplumsal proje üretmelerini sağlayan kapsamlı bir programdır.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Fotoğraf ve Video Yarışması</h3></div>
                <p>Sarıyer’i farklı bakış açısıyla görselleştiren, genç fotoğrafçı ve videocu adayların katılımıyla düzenlenen yarışma.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Kent Gençliği Zirvesi</h3></div>
                <p>Yıllık olarak düzenlenen zirvede gençler, kentin sorunlarını tartışıyor ve ortak çözüm önerileri geliştiriyor.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
