"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Engelli() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="MECLİSLERİMİZ"
          title="Engelli Meclisi"
          breadcrumbs={["Meclislerimiz", "Engelli Meclisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Engelli Meclisi, engelli bireylerin kent yaşamındaki
                    erişilebilirlik sorunlarına çözüm üretmek ve kapsayıcı bir
                    kent inşa etmek amacıyla çalışır.
                  </p>
                  <p>
                    Meclisimiz, engelli bireylerin ve ailelerinin sesini
                    yerel yönetime taşır.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>AMAÇLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Erişilebilirlik:</strong> Kamu alanlarının engelli
                    bireyler için erişilebilir olmasını sağlamak.
                  </p>
                  <p>
                    <strong>Farkındalık:</strong> Engelli hakları konusunda
                    toplumsal farkındalık yaratmak.
                  </p>
                  <p>
                    <strong>Proje Üretimi:</strong> Kapsayıcı kent projeleri
                    geliştirmek.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Erişilebilirlik Denetimleri, Engelli Hakları Seminerleri, Spor Etkinlikleri ve Kapsayıcı Tasarım Atölyeleri düzenliyoruz.</p>
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
                <div className="panel-head"><h3>Erişilebilir Kent Projesi</h3></div>
                <p>Sarıyer’deki kamusal alanların engelli bireyler için erişilebilir olması için denetimler ve projeler ürettik.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Engelli Hakları Seminerleri</h3></div>
                <p>Engelli bireyler, aileleri ve kamu çalışanları için düzenlenen haklar seminerleri ve farkındalık çalışmaları.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Kapsayıcı Spor Etkinlikleri</h3></div>
                <p>Engelli bireylerin spora katılımını teşvik eden, engelli dostu spor etkinlikleri ve turnuvalar.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
