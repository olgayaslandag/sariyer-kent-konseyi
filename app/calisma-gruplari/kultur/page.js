"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Kultur() {
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
          eyebrow="ÇALIŞMA GRUPLARI"
          title="Kültür ve Sanat"
          breadcrumbs={["Çalışma Grupları", "Kültür ve Sanat"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Kültür ve Sanat çalışma grubu, Sarıyer’in kültürel kimliğini
                    zenginleştirmek, sanatın erişilebilirliğini artırmak ve
                    yerel kültürel mirası korumak için çalışır.
                  </p>
                  <p>
                    Grubumuz, kültürel çeşitliliği destekler ve sanatın her
                    kesim tarafından erişilebilir olmasını sağlar.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Kültürel Miras:</strong> Yerel kültürel mirası
                    korumak ve yaşatmak.
                  </p>
                  <p>
                    <strong>Sanat Erişimi:</strong> Sanatın her kesime
                    erişilebilir olmasını sağlamak.
                  </p>
                  <p>
                    <strong>Çeşitlilik:</strong> Kültürel çeşitliliği desteklemek
                    ve kutlamak.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Sergiler, Sanat Atölyeleri, Kültür Festivalleri, Hikaye Anlatımı ve Fotoğraf Yarışmaları düzenliyoruz.</p>
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
                <div className="panel-head"><h3>Sarıyer Kültür Festivali</h3></div>
                <p>Yerel sanatçıları, halkı ve kültürel mirası bir araya getiren, herkesin katılımıyla düzenlenen festival.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sanat Atölyeleri</h3></div>
                <p>Resim, heykel, fotoğraf ve el işi atölyeleri ile sanatın her kesime erişilmesini sağlayan ücretsiz çalışmalar.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Kültürel Miras Koruma</h3></div>
                <p>Sarıyer’in tarihi ve kültürel mirasını korumak, belgeleme ve sergileme çalışmaları yürütüyoruz.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
