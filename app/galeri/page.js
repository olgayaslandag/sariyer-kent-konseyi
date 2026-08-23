"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const images = [
  "/img/sariyer-kare-1.jpg",
  "/img/sariyer-kare-2.jpg",
  "/img/sariyer-kare-3.jpg",
  "/img/sariyer-kare-4.jpg",
  "/img/sariyer-kare-5.jpg",
  "/img/sariyer-kare-6.jpg"
];

export default function Galeri() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="BİLGİ"
          title="Fotoğraf Galerisi"
          breadcrumbs={["Fotoğraf Galerisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="gallery-grid">
              {images.map((src, i) => (
                <div className="gallery-item" key={i}>
                  <img src={src} alt={`Galeri ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
