"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function Yonetmelik() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KURUMSAL"
          title="Yönetmelik"
          breadcrumbs={["Kurumsal", "Yönetmelik"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
              <h2 style={{ marginTop: 0 }}>Amaç ve Kapsam</h2>
              <p>
                Sarıyer Kent Konseyi’nin faaliyetleri, usulleri ve yapısı
                ilgili yönetmelik çerçevesinde şekillenir. Yönetmelik; kentin
                demokratik katılım sürecini yönetmek, karar alma
                mekanizmalarını düzenlemek ve şeffaflığı esas almak üzere
                hazırlanmıştır.
              </p>
              <h2>Çalışma Usulleri</h2>
              <p>
                Kent Konseyi, çalışma grupları, meclisler ve genel kurul
                yoluyla karar alma süreçlerini yürütür. Tüm süreçler
                şeffaf, hesap verebilir ve katılımcı ilkelerle yönlendirilir.
              </p>
              <h2>Şeffaflık ve Hesap Verebilirlik</h2>
              <p>
                Tüm faaliyetlerimiz, harcamalar ve kararlar kamuoyuyla
                paylaşılır. Denetim ve raporlama mekanizmaları ile
                hesap verebilirlik sağlanır.
              </p>
              <h2>Katılımcılık</h2>
              <p>
                Vatandaşların fikir ve önerileri, çalışma grupları ve
                meclisler aracılığıyla değerlendirilir. Herkesin sesini
                duymak temel ilkemizdir.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
