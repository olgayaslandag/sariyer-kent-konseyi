"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Saglik() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="ÇALIŞMA GRUPLARI"
          title="Sağlık ve Sosyal Hizmetler"
          breadcrumbs={["Çalışma Grupları", "Sağlık ve Sosyal Hizmetler"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Sağlık ve Sosyal Hizmetler çalışma grubu, Sarıyer’de halk
                    sağlığını iyileştirmek, erişilebilir sosyal hizmetler
                    sunmak ve destek mekanizmalarını güçlendirmek için
                    çalışır.
                  </p>
                  <p>
                    Grubumuz, toplumsal dayanışmayı artırmak ve en yalnız
                    kesimlere ulaşmak için projeler geliştirir.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Halk Sağlığı:</strong> Sağlıklı yaşam
                    taramaları ve farkındalık çalışmaları.
                  </p>
                  <p>
                    <strong>Sosyal Destek:</strong> Yalnız kesimlere yönelik
                    destek mekanizmaları.
                  </p>
                  <p>
                    <strong>Erişilebilir Hizmetler:</strong> Sosyal
                    hizmetlerin ulaşılabilirliğini artırmak.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Sağlık Taramaları, Sosyal Destek Seminerleri, Aile Sağlığı Günleri ve Gönüllü Dayanışma Programları düzenliyoruz.</p>
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
                <div className="panel-head"><h3>Halk Sağlığı Taramaları</h3></div>
                <p>Ücretsiz kan şekeri, tansiyon ve kolesterol taramaları ile halk sağlığını korumak ve erken teşhis imkanı sağlamak.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Aile Sağlığı Programı</h3></div>
                <p>Bireylerin ve ailelerin sağlıklı yaşam bilincini artırmak, psikolojik danışmanlık ve aile terapisi imkanı sunmak.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sosyal Destek Ağı</h3></div>
                <p>Yalnız kesimlere yönelik gıda, barınma ve psikolojik destek sağlayan, toplumsal dayanışmayı güçlendiren ağ.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
