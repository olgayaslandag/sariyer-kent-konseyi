"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const videos = [
  { title: "Sarıyer Kent Konseyi Tanıtım Filmi", duration: "03:42", desc: "Konseyin misyonu, vizyonu ve çalışmalarını anlatan tanıtım filmi." },
  { title: "Gençlik Meclisi Röportajı", duration: "05:18", desc: "Gençlik Meclisi üyelerinin deneyimlerini ve projelerini anlattığı röportaj." },
  { title: "Sürdürülebilir Yaşam Paneli Kaydı", duration: "01:24", desc: "Sürdürülebilir yaşam panelinde yapılan sunumların ve tartışmaların kaydı." },
  { title: "Kent Konseyi Genel Kurulu 2024", duration: "12:07", desc: "2024 yılı Genel Kurulu’nda yaşananlar, kararlar ve yeni dönem hedefleri." }
];

export default function Videolar() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="BİLGİ"
          title="Video Galerisi"
          breadcrumbs={["Video Galerisi"]}
          bgImage="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80"
        />
        <section className="section">
          <div className="container">
            <small className="section-intro" style={{ display: "block", marginBottom: 24 }}>
              Sarıyer Kent Konseyi’nin çalışmaları, etkinlikleri ve röportajlarını
              video galerimizden izleyebilirsiniz.
            </small>
            <div className="content-grid">
              {videos.map((video, index) => (
                <article className="content-panel" key={index}>
                  <div className="panel-head">
                    <h3>{video.title}</h3>
                    <small>{video.duration}</small>
                  </div>
                  <p>{video.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
