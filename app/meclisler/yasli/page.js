"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Yasli() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="MECLİSLERİMİZ"
          title="Yaşlılar Meclisi"
          breadcrumbs={["Meclislerimiz", "Yaşlılar Meclisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Yaşlılar Meclisi, yaşlı bireylerin yaşam kalitesini artırmak,
                    sosyal dayanışmayı güçlendirmek ve yaşlıların ihtiyaçlarını
                    dinlemek amacıyla çalışır.
                  </p>
                  <p>
                    Meclisimiz, yaşlıların aktif vatandaşlık rolünü destekler.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>AMAÇLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Yaşam Kalitesi:</strong> Yaşlıların sağlıklı ve
                    aktif yaşamasını desteklemek.
                  </p>
                  <p>
                    <strong>Sosyal Dayanışma:</strong> Yalnızlığı azaltmak,
                    sosyal etkinlikler organize etmek.
                  </p>
                  <p>
                    <strong>Erişilebilirlik:</strong> Yaşlı dostu alanlar ve
                    hizmetler geliştirmek.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Sağlık Taramaları, Sosyal Buluşmalar, Hobi Atölyeleri, Yaşlılar Günü etkinlikleri ve rehberlik programlarıyla yaşlılarımızla buluşuyoruz.</p>
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
                <div className="panel-head"><h3>Yaşlı Dostu Kent Projesi</h3></div>
                <p>Sarıyer’de yaşlılar için erişilebilir, güvenli ve konforlu alanlar yaratmak amacıyla geliştirilen proje.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sağlık Tarama Programı</h3></div>
                <p>Yaşlıların sağlığını izlemek ve erken teşhis imkanı sunmak için düzenlenen ücretsiz sağlık taramaları.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sosyal Buluşmalar</h3></div>
                <p>Yaşlıların sosyal çevrelerini genişletmesi, yeni dostluklar kurması için düzenlenen çay, sohbet ve eğlence etkinlikleri.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
