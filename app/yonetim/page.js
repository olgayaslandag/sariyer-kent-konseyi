"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const board = [
  {
    name: "Ahmet Yılmaz",
    role: "Başkan",
    desc: "Kentin sesini en üst düzeyde duyurmak ve konsey kararlarını yürütmek için sorumludur.",
    img: "/img/sariyer-genel-kurul.jpg"
  },
  {
    name: "Elif Demir",
    role: "Genel Sekreter",
    desc: "Konseyin tüm faaliyetlerini koordine eder, yönetim süreçlerini yürütür.",
    img: "/img/sariyer-fikir-platformu.jpg"
  },
  {
    name: "Mehmet Kaya",
    role: "Sayman",
    desc: "Şeffaf mali yönetim ile konseyin kaynaklarını en verimli şekilde kullanır.",
    img: "/img/sariyer-kare-1.jpg"
  },
  {
    name: "Ayşe Yıldız",
    role: "Gençlik Meclisi Başkanı",
    desc: "Gençlerin sesini konseye taşır, gençlik projelerini yürütür.",
    img: "/img/meclis-genclik.jpg"
  },
  {
    name: "Zeynep Arslan",
    role: "Kadın Meclisi Başkanı",
    desc: "Kadınların haklarını ve katılımını teşvik eden çalışmaları yönetir.",
    img: "/img/meclis-kadin.jpg"
  },
  {
    name: "Mustafa Öz",
    role: "Çevre ve Sürdürülebilirlik Temsilcisi",
    desc: "Kentin çevresel süreçlerini izler, yeşil alan projelerini takip eder.",
    img: "/img/calisma-alani-cevre-surdurulebilirlik.jpg"
  },
  {
    name: "Fatma Demir",
    role: "Sosyal Hizmetler Temsilcisi",
    desc: "Kentin sosyal dayanışma ve hizmet projelerini koordine eder.",
    img: "/img/calisma-alani-saglik-sosyal-hizmetler.jpg"
  },
  {
    name: "Ali Kaya",
    role: "Kültür ve Sanat Temsilcisi",
    desc: "Kültürel etkinlikleri ve sanat projelerini yönetir.",
    img: "/img/calisma-alani-kultur-sanat.jpg"
  },
  {
    name: "Selin Yılmaz",
    role: "Eğitim Temsilcisi",
    desc: "Eğitim ve gençlik projelerini takip eder, okul iş birliklerini yürütür.",
    img: "/img/calisma-alani-egitim-genclik.jpg"
  },
  {
    name: "Burak Şahin",
    role: "Kentleşme ve Planlama Temsilcisi",
    desc: "Kentin planlama ve alan kullanımı süreçlerini izler, vatandaş odaklı çözümler üretir.",
    img: "/img/calisma-alani-kentlesme-planlama.jpg"
  },
  {
    name: "Derya Aydın",
    role: "Ekonomi ve İstihdam Temsilcisi",
    desc: "Yerel ekonomi projelerini ve istihdam desteklerini koordine eder.",
    img: "/img/calisma-alani-ekonomi-istihdam.jpg"
  },
  {
    name: "Emre Yıldırım",
    role: "Halkla İlişkiler Temsilcisi",
    desc: "Konsey ile vatandaşlar arasındaki iletişimi güçlendirir, duyuruları yönetir.",
    img: "/img/sariyer-sahil-manzara.jpg"
  }
];

export default function Yonetim() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KENT KONSEYİ"
          title="Yönetim"
          breadcrumbs={["Yönetim"]}
        />
        <section className="section">
          <div className="container">
            <p>
              Sarıyer Kent Konseyi, ilçenin tüm kesimlerinden gelen temsilcilerin
              katılımıyla oluşturulmuş bir yürütme kurulu ile yönetilir. Kurul,
              konseyin kararlarını uygulamak, faaliyetleri koordine etmek ve
              vatandaşların taleplerini karşılamak amacıyla çalışır. Her üyenin
              uzmanlık alanına göre sorumlulukları vardır ve düzenli olarak
              toplanarak ilçenin geleceğini şekillendiren kararlar alır.
              Yönetim sürecimiz, şeffaflık, hesap verebilirlik ve katılımcılık
              ilkeleri üzerine kuruludur. Tüm faaliyetlerimizde vatandaşlarımızın
              sesini dinlemek, onların ihtiyaçlarını öncelikli tutmak ve
              ilçemizin sürdürülebilir kalkınması için uzun vadeli çalışmalar
              yürütmek temel misyonumuzdur.
            </p>
            <p>
              Aşağıda, konsey yönetiminde görev alan ve her bir alanda
              sorumluluk üstlenen yürütme kurulu üyelerini bulabilirsiniz.
              Her üye, kendi uzmanlık alanında konsey faaliyetlerini yönlendirir
              ve vatandaşların ihtiyaçlarını karşılamak için çalışır.
              Yürütme kurulu, düzenli toplantılar ve çalışma grupları aracılığıyla
              ilçenin sosyal, kültürel, ekonomik ve çevresel konularında
              projeler üretir, bu projelerin hayata geçirilmesini takip eder
              ve sonuçları kamuoyuyla paylaşır.
            </p>
            <div className="board-grid">
              {board.map((item, index) => (
                <div className="board-card" key={index}>
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <div className="board-card-body">
                    <strong>{item.name}</strong>
                    <span className="board-role">{item.role}</span>
                    <p>{item.desc}</p>
                  </div>
                </div>
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
