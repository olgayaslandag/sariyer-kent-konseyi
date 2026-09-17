"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const asilListe = [
  "Ali Haydar ASLAN",
  "Ömer Ertuğrul YILDIZ",
  "Hasan YILMAZ",
  "Adem ÇOBAN",
  "Aslıhan EĞİLMEZ",
  "Turan ALTUN",
  "Serdar GÖKER",
  "Ayşe Demir ÜNLÜ",
  "Emin AKDEMİR",
  "Sezai KAYA",
  "Mustafa CİVAK",
  "Ali Kadir MUTLU",
  "Hürriyet UZUN",
  "B.Tülin HATTAT",
  "Makbule Ebru YAŞAR",
  "Naci GÜNDAY",
  "H. Murat LEHİMLER",
  "İlkut ULUĞTUĞ",
  "Oğuzhan GÖKYILDIZ",
  "Emine BÜYÜKBALKAN"
];

const yedekListe = [
  "Selma SEÇGİN",
  "Ercan EKER",
  "Bayram ÖZSOY",
  "Sencer TELCİ",
  "Ezgi Özdal YARLIHAN",
  "Şahin KIZILASLAN",
  "İsmail ÜNLÜ"
];

const engelliTemsilcisi = "Mahmut Kement";

export default function Yonetim() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KURUMSAL"
          title="Yönetim Kurulu"
          breadcrumbs={["Kurumsal", "Yönetim Kurulu"]}
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
              Aşağıda, konsey yönetiminde görev alan yürütme kurulu üyelerini
              bulabilirsiniz. Her üye, kendi uzmanlık alanında konsey faaliyetlerini yönlendirir
              ve vatandaşların ihtiyaçlarını karşılamak için çalışır.
              Yürütme kurulu, düzenli toplantılar ve çalışma grupları aracılığıyla
              ilçenin sosyal, kültürel, ekonomik ve çevresel konularında
              projeler üretir, bu projelerin hayata geçirilmesini takip eder
              ve sonuçları kamuoyuyla paylaşır.
            </p>

            <h2 style={{ marginTop: 40 }}>Asil Liste</h2>
            <div className="board-grid">
              {asilListe.map((name, index) => (
                <div className="board-card" key={`asil-${index}`}>
                  <div className="board-card-body">
                    <strong>{name}</strong>
                    <span className="board-role">Yürütme Kurulu Üyesi</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: 60 }}>Yedek Liste</h2>
            <div className="board-grid">
              {yedekListe.map((name, index) => (
                <div className="board-card" key={`yedek-${index}`}>
                  <div className="board-card-body">
                    <strong>{name}</strong>
                    <span className="board-role">Yedek Üye</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: 60 }}>Engelli Temsilcisi</h2>
            <div className="board-grid">
              <div className="board-card">
                <div className="board-card-body">
                  <strong>{engelliTemsilcisi}</strong>
                  <span className="board-role">Engelli Temsilcisi</span>
                </div>
              </div>
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
