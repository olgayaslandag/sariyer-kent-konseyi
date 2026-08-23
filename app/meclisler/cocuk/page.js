"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Cocuk() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="MECLİSLERİMİZ"
          title="Çocuk Meclisi"
          breadcrumbs={["Meclislerimiz", "Çocuk Meclisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Çocuk Meclisi, çocukların haklarını savunmak, ihtiyaçlarını
                    dinlemek ve onların sesini kent politikalarında duyurmak
                    amacıyla kurulmuştur.
                  </p>
                  <p>
                    Meclisimiz, 6-14 yaş arası çocukların katılımıyla çalışmalar
                    yürütür.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>AMAÇLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Haklarını Savunmak:</strong> Çocuk haklarına önem
                    vermek.
                  </p>
                  <p>
                    <strong>Güvenli Alanlar:</strong> Çocuklar için güvenli ve
                    erişilebilir alanlar yaratmak.
                  </p>
                  <p>
                    <strong>Eğitim:</strong> Eğlenerek öğrenme ortamları
                    sağlamak.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Çocuk Atölyeleri, Doğa ile Sanat, Çocuk Hakları Sempozyumu, Oyun Alanları Projeleri ve yarışmalarla çocuklarla buluşuyoruz.</p>
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
                <div className="panel-head"><h3>Çocuk Dostu Kent Projesi</h3></div>
                <p>Sarıyer’de çocuklar için güvenli, erişilebilir ve eğlenceli alanlar yaratmak amacıyla hayata geçirilen proje.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Doğa ile Sanat Atölyesi</h3></div>
                <p>Çocukların doğayla bağ kurmasını ve sanat yaparak öğrenmesini sağlayan düzenli atölye çalışmaları.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Çocuk Hakları Sempozyumu</h3></div>
                <p>Çocuk hakları konusunda farkındalık artırmak, paydaşları bir araya getirmek amacıyla düzenlenen yıllık sempozyum.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
