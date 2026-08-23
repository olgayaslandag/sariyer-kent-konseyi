"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const management = [
  {
    name: "Ahmet Yılmaz",
    title: "Başkan",
    desc: "Sarıyer Kent Konseyi Başkanı olarak, kentin sesini en üst düzeyde duyurmak için çalışıyoruz.",
    img: "/img/sariyer-genel-kurul.jpg"
  },
  {
    name: "Elif Demir",
    title: "Genel Sekreter",
    desc: "Konseyin tüm faaliyetlerini koordine ediyor, yönetim süreçlerini yürütüyoruz.",
    img: "/img/sariyer-fikir-platformu.jpg"
  },
  {
    name: "Mehmet Kaya",
    title: "Sayman",
    desc: "Şeffaf mali yönetim ile konseyin kaynaklarını en verimli şekilde kullanıyoruz.",
    img: "/img/sariyer-kare-1.jpg"
  }
];

export default function Yonetim() {
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
          eyebrow="KENT KONSEYİ"
          title="Yönetim"
          breadcrumbs={["Yönetim"]}
        />
        <section className="section">
          <div className="container">
            <small className="section-intro" style={{ display: "block", marginBottom: 24 }}>
              Sarıyer Kent Konseyi’nin yönetimi, şeffaflık ve hesap verebilirlik
              ilkeleriyle hizmetinizdedir.
            </small>
            <div className="content-grid">
              {management.map((item, index) => (
                <article className="content-panel" key={index}>
                  <div style={{ height: 160, borderRadius: 7, overflow: "hidden", marginBottom: 12 }}>
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="panel-head">
                    <div>
                      <h3>{item.name}</h3>
                      <small>{item.title}</small>
                    </div>
                  </div>
                  <div style={{ lineHeight: 1.8, marginTop: 8 }}>
                    <p>{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">YÖNETİM PRENSİBİMİZ</p><h2>Nasıl Yönetiyoruz?</h2></div>
            </div>
            <div className="process-grid">
              {[["01","Şeffaflık","Tüm kararlar ve harcamalar kamuoyuyla paylaşılır."],["02","Hesap Verebilirlik","Düzenli raporlar ve denetimler ile hesap veririz."],["03","Katılımcılık","Vatandaşların sürece tam katılımını sağlarız."],["04","Sürdürülebilirlik","Uzun vadeli, kalıcı çözümler üretiriz."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
