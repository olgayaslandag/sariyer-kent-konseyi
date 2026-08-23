"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Cevre() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="ÇALIŞMA GRUPLARI"
          title="Çevre ve Sürdürülebilirlik"
          breadcrumbs={["Çalışma Grupları", "Çevre ve Sürdürülebilirlik"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Çevre ve Sürdürülebilirlik çalışma grubu, Sarıyer’in doğal
                    kaynaklarını korumak, yeşil alanları artırmak ve
                    sürdürülebilir bir yaşam kültürü yaymak için çalışır.
                  </p>
                  <p>
                    Grubumuz, iklim değişikliği, atık yönetimi, enerji
                    verimliliği ve biyolojik çeşitlilik konularında
                    çözüm önerileri geliştirir.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Yeşil Alanlar:</strong> Kent içi yeşil alanların
                    artırılması ve korunması.
                  </p>
                  <p>
                    <strong>Atık Yönetimi:</strong> Sıfır atık hedefleri ve
                    geri dönüşüm projeleri.
                  </p>
                  <p>
                    <strong>Enerji Verimliliği:</strong> Yenilenebilir enerji
                    kullanımını teşvik etmek.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Ağaç Dikim Etkinlikleri, Sürdürülebilir Yaşam Paneli, Sıfır Atık Atölyeleri ve Bisiklet Turları düzenliyoruz.</p>
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
                <div className="panel-head"><h3>Sarıyer’i Yeşillendirme</h3></div>
                <p>Kent içi yeşil alanların artırılması ve ağaçlandırma çalışmalarıyla Sarıyer’i daha yaşanabilir hale getirmek.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sıfır Atık Projesi</h3></div>
                <p>Geri dönüşüm, kompost ve azaltma odaklı uygulamalarla sıfır atık hedefine ulaşmak için çalışmalar yürütüyoruz.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Bisiklet Dostu Kent</h3></div>
                <p>Bisiklet yolları ve bisiklet paylaşım sistemleri için projeler üretiyor, sürdürülebilir ulaşımı destekliyoruz.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
