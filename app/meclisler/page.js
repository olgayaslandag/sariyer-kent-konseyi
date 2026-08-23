"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const councils = [
  ["Gençlik","Meclisi","/img/meclis-genclik.jpg","Gençlik sesini Kent Konseyi'ne taşımak için çalışır.","/meclisler/genclik"],
  ["Kadın","Meclisi","/img/meclis-kadin.jpg","Kadınların kent yaşamındaki rolünü güçlendirir.","/meclisler/kadin"],
  ["Çocuk","Meclisi","/img/meclis-cocuk.jpg","Çocukların haklarını ve ihtiyaçlarını savunur.","/meclisler/cocuk"],
  ["Engelli","Meclisi","/img/meclis-engelli.jpg","Erişilebilir kent için projeler üretir.","/meclisler/engelli"],
  ["Yaşlılar","Meclisi","/img/meclis-yasli.jpg","Yaşlıların yaşam kalitesini artırmak için çalışır.","/meclisler/yasli"]
];

export default function Meclisler() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="MECLİSLERİMİZ"
          title="Meclislerimiz"
          breadcrumbs={["Meclislerimiz"]}
        />
        <section className="section">
          <div className="container">
            <small className="section-intro" style={{ display: "block", marginBottom: 24 }}>
              Sarıyer’in farklı kesimlerini temsil eden meclislerimiz ile kentin
              her noktasından gelen önerileri değerlendiriyoruz. Her meclis,
              kendi alanında uzmanlaşmış çalışmalar yürütür.
            </small>
            <div className="council-grid">
              {councils.map(([a,b,img,desc,link],i)=>(
                <a className="council-card" href={link} key={a}>
                  <img src={img} alt={a + " " + b} />
                  <div>
                    <strong>{a}<br/>{b}</strong>
                    <p>{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">ÇALIŞMA PRENSİBİMİZ</p><h2>Nasıl Çalışıyoruz?</h2></div>
            </div>
            <div className="process-grid">
              {[["01","Fikir Toplama","Her meclis, kendi kesiminden gelen fikirleri toplar."],["02","Değerlendirme","Fikirler meclis toplantılarında tartışılır ve değerlendirilir."],["03","Öneri Geliştirme","Somut proje ve öneriler geliştirilir."],["04","Hayata Geçirme","Onaylanan projeler hayata geçirilir ve takip edilir."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
