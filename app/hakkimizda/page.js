"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export default function Hakkimizda() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KENT KONSEYİ"
          title="Hakkımızda"
          breadcrumbs={["Hakkımızda"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>BİZ KİMİZ?</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Sarıyer Kent Konseyi, Sarıyer’de katılımcı demokrasiyi
                    güçlendirmek, kentin sorunlarına ortak akılla çözüm üretmek
                    ve yerel yönetim ile vatandaşlar arasında köprü kurmak
                    amacıyla kurulmuş bir platformdur.
                  </p>
                  <p>
                    Kent konseylerinin temelinde “herkesin sesi duyulsun”
                    ilkesi yatar. Fikirleri topluyor, meclislerde tartışıyor,
                    çalışma gruplarıyla çözüm önerileri geliştiriyor ve
                    projeleri hayata geçiriyoruz.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>MİSYONUMUZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Sarıyer’de yerel yönetim ile vatandaşlar arasında köprü
                    kurarak, şeffaf ve hesap verebilir bir yapıyla hizmet
                    sunmak.
                  </p>
                  <p>
                    Her kesimden gelen önerileri dinlemek, analiz etmek ve
                    kentin geleceğini birlikte şekillendirmek.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>VİZYONUMUZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Katılımcı demokrasinin kalbinde yer alan, her vatandaşın
                    sesini duyan, kentin geleceğini birlikte tasarladığımız,
                    sürdürülebilir, adil ve erişilebilir bir Sarıyer’i inşa
                    etmek.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">DEĞERLERİMİZ</p><h2>Bizi Yönlendiren Değerler</h2></div>
            </div>
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h3>Katılımcılık</h3></div>
                <p>Herkesin fikrinin değerini bilir, sürece herkesten destek alırız. Tüm vatandaşlarımızın sesini duymak için çalışırız.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Şeffaflık</h3></div>
                <p>Tüm çalışmalarımızı kamuoyuyla paylaşır, hesap veririz. Karar alma süreçlerimiz herkese açıktır.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sürdürülebilirlik</h3></div>
                <p>Doğayı ve kaynakları gelecek nesiller için koruruz. Uzun vadeli düşünerek, kalıcı çözümler üretiriz.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Eşitlik</h3></div>
                <p>Her vatandaşın eşit haklara sahip olduğuna inanırız. Kesimler arası fırsat eşitliği için çalışırız.</p>
              </article>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">NASIL BAŞLADI?</p><h2>Kısa Bir Tarihçe</h2></div>
            </div>
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
              <p>
                Sarıyer Kent Konseyi, vatandaşların kent yaşamına daha fazla
                katılımını sağlamak amacıyla kuruldu. İlk günden itibaren,
                fikirleri toplamak, meclisler kurmak ve çalışma gruplarıyla
                projeler geliştirmek temel çalışma prensibi oldu.
              </p>
              <p>
                Bugün, yüzlerce gönüllü, onlarca proje ve birçok başarılı
                etkinlikle Sarıyer’in geleceğini şekillendirmeye devam
                ediyoruz.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
