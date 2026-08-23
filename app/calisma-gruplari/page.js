"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const groups = [
  ["01","Çevre ve Sürdürülebilirlik","Kentin doğal kaynaklarını korumak, yeşil alanları artırmak ve sürdürülebilir yaşamı teşvik etmek için çalışır.","/calisma-gruplari/cevre","/img/calisma-alani-cevre-surdurulebilirlik.jpg"],
  ["02","Eğitim ve Gençlik","Gençlerin eğitim imkanlarını genişletmek, beceri kazandırmak ve aktif vatandaşlık bilinci aşılamak için çalışır.","/calisma-gruplari/egitim","/img/calisma-alani-egitim-genclik.jpg"],
  ["03","Sağlık ve Sosyal Hizmetler","Halk sağlığını iyileştirmek, erişilebilir sosyal hizmetler sunmak ve destek mekanizmalarını güçlendirmek için çalışır.","/calisma-gruplari/saglik","/img/calisma-alani-saglik-sosyal-hizmetler.jpg"],
  ["04","Kültür ve Sanat","Kentin kültürel kimliğini zenginleştirmek, sanatın erişilebilirliğini artırmak ve yerel kültürel mirası korumak için çalışır.","/calisma-gruplari/kultur","/img/calisma-alani-kultur-sanat.jpg"],
  ["05","Kentleşme ve Planlama","Sürdürülebilir kentleşme, ulaşım, konut ve alan planlaması konularında projeler üretir.","/calisma-gruplari/kentlesme","/img/calisma-alani-kentlesme-planlama.jpg"],
  ["06","Ekonomi ve İstihdam","Yerel ekonomiye katkı sağlayan projeler geliştirir, istihdamı destekler ve girişimciliği teşvik eder.","/calisma-gruplari/ekonomi","/img/calisma-alani-ekonomi-istihdam.jpg"]
];

export default function CalismaGruplari() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KENT KONSEYİ NASIL ÇALIŞIR?"
          title="Çalışma Grupları"
          breadcrumbs={["Çalışma Grupları"]}
        />
        <section className="section">
          <div className="container">
            <small className="section-intro" style={{ display: "block", marginBottom: 24 }}>
              Her grup, uzmanlık alanında fikir üretir, analiz yapar ve
              kentin geleceğine yönelik somut öneriler sunar. Gruplarımız,
              vatandaşların katılımıyla çalışır.
            </small>
            <div className="work-grid">
              {groups.map(([n,t,d,link,img])=>(
                <a className="image-card" href={link} key={n}>
                  <img src={img} alt={t} />
                  <div>
                    <span>{n}</span>
                    <h3>{t}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">SÜRECİMİZ</p><h2>Nasıl Çalışıyoruz?</h2></div>
            </div>
            <div className="process-grid">
              {[["01","Fikir Toplama","Vatandaşlardan ve meclislerden fikir topluyoruz."],["02","Analiz","Uzmanlar ve çalışma grupları analiz yapıyor."],["03","Öneri Geliştirme","Somut proje ve öneriler geliştiriyoruz."],["04","Hayata Geçirme","Projeleri hayata geçirip etkisini izliyoruz."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
