"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Ekonomi() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="ÇALIŞMA GRUPLARI"
          title="Ekonomi ve İstihdam"
          breadcrumbs={["Çalışma Grupları", "Ekonomi ve İstihdam"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Ekonomi ve İstihdam çalışma grubu, yerel ekonomiye katkı
                    sağlayan projeler geliştirir, istihdamı destekler ve
                    girişimciliği teşvik eder.
                  </p>
                  <p>
                    Grubumuz, Sarıyer’in ekonomik kalkınması için sürdürülebilir
                    projeler üretir.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Yerel Ekonomi:</strong> Yerel üreticileri ve
                    esnafı desteklemek.
                  </p>
                  <p>
                    <strong>İstihdam:</strong> İstihdam fırsatları yaratmak.
                  </p>
                  <p>
                    <strong>Girişimcilik:</strong> Girişimcilik ekosistemini
                    güçlendirmek.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Girişimcilik Atölyeleri, İstihdam Fuarları, Esnaf Destek Programları ve Kısa Mesleki Eğitimler düzenliyoruz.</p>
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
                <div className="panel-head"><h3>Yerel Üretici Pazarı</h3></div>
                <p>Sarıyer’deki yerel üreticilerin ve esnafların ürünlerini tanıtabileceği, satış yapabileceği pazar düzenlemeleri.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Girişimcilik Atölyeleri</h3></div>
                <p>Genç ve kadın girişimcilere yönelik iş planı, finans yönetimi ve dijital pazarlama eğitimleri.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>İstihdam Fuarları</h3></div>
                <p>Yerel işverenlerle iş arayanları buluşturan, istihdam fırsatları yaratan yıllık istihdam fuarları.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
