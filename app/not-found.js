"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";

export default function NotFound() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="HATA"
          title="404"
          breadcrumbs={["404"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", lineHeight: 1.9 }}>
              <h2 style={{ marginTop: 0 }}>Sayfa Bulunamadı</h2>
              <p>
                Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
              </p>
              <p>
                Lütfen adresi kontrol edip tekrar deneyin veya ana sayfaya dönün.
              </p>
              <Link href="/" className="btn btn-primary" style={{ marginTop: 24, display: "inline-block" }}>
                Ana Sayfa
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
