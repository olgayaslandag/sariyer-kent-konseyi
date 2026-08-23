"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export default function KullanimSartlari() {
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
          eyebrow="YASAL"
          title="Kullanım Şartları"
          breadcrumbs={["Kullanım Şartları"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
              <h2 style={{ marginTop: 0 }}>1. Kabul</h2>
              <p>
                Sarıyer Kent Konseyi web sitesini kullanarak bu kullanım şartlarını
                kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen
                sitemizi kullanmayınız.
              </p>
              <h2>2. İçerik</h2>
              <p>
                Sitede yer alan tüm metin, görsel ve içerikler yasal sorumluluk
                doğurmamaktadır. Bilgilerin doğruluğu için çaba gösterilse de,
                hatalar olabilir.
              </p>
              <h2>3. Kullanıcı Davranışı</h2>
              <p>
                Sitedeki hizmetleri yasal sınırlar içinde ve diğer kullanıcıların
                haklarını ihlal etmeyecek şekilde kullanmayı taahhüt edersiniz.
              </p>
              <h2>4. Değişiklikler</h2>
              <p>
                Kullanım şartları zaman zaman güncellenebilir. Değişiklikler sitede
                yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
