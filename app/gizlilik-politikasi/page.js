"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export default function GizlilikPolitikasi() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="YASAL"
          title="Gizlilik Politikası"
          breadcrumbs={["Gizlilik Politikası"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
              <h2 style={{ marginTop: 0 }}>1. Giriş</h2>
              <p>
                Sarıyer Kent Konseyi olarak, kullanıcılarımızın gizliliğini korumak
                en öncelikli görevlerimizden biridir. Bu politika, web sitemizi
                kullanırken hangi verilerin toplandığını ve nasıl kullanıldığını
                açıklamaktadır.
              </p>
              <h2>2. Çerezler</h2>
              <p>
                Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler
                kullanmaktadır. Tarayıcı ayarlarınız üzerinden çerezleri
                engelleyebilirsiniz.
              </p>
              <h2>3. Üçüncü Taraf Hizmetleri</h2>
              <p>
                Sitemizde üçüncü taraf hizmet sağlayıcıların (örneğin analytics
                sağlayıcıları) çerezleri yer alabilir. Bu hizmet sağlayıcıların
                kendi gizlilik politikaları geçerlidir.
              </p>
              <h2>4. Veri Güvenliği</h2>
              <p>
                Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı
                güvenlik önlemleri alınmaktadır.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
