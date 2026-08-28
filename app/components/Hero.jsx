"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    eyebrow: "SARIYER KENT KONSEYİ",
    title: "Birlikte Düşünüyor,<br/>Sarıyer'i Birlikte Geliştiriyoruz.",
    lead: "Katılımcı demokrasi kültürüyle<br/>Sarıyer’in ortak akıl platformu.",
    bg: "/img/sariyer_sahil00.jpg",
    alt: "Sarıyer sahil görünümü",
  },
  {
    eyebrow: "SÖZ SENDE SARIYER",
    title: "Sarıyer için<br/>bir fikrin mi var?",
    lead: "Fikrini, önerini ve projeni<br/>bizimle paylaş.",
    bg: "/img/sariyer_sahil01.jpg",
    alt: "Sarıyer fikir platformu",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="hero">
      <div className="slider">
        {slides.map((slide, index) => (
          <div className={`slide ${index === currentSlide ? "active" : ""}`} key={index}>
            <img
              className="hero-bg"
              src={encodeURI(slide.bg)}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : undefined}
            />
            <div className="hero-overlay" />
            <div className="container hero-inner">
              <div className="hero-content">
                <p className="eyebrow light">{slide.eyebrow}</p>
                <h1 dangerouslySetInnerHTML={{ __html: slide.title }} />
                <p className="hero-lead" dangerouslySetInnerHTML={{ __html: slide.lead }} />
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a className="btn btn-primary" href="/hakkimizda">Hakkımızda →</a>
                  <a className="btn btn-outline-light" href="/iletisim">Bize Katılın →</a>
                </div>
              </div>
              <div className="hero-card">
                <strong>
                  Birlikte<br/>Daha Güçlüyüz
                </strong>
                <p>Sarıyer’in geleceğini birlikte şekillendiriyoruz.</p>
                <span className="round-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-arrow prev" onClick={prevSlide} aria-label="Önceki">
        <i className="fa-solid fa-chevron-left" />
      </button>
      <button className="slider-arrow next" onClick={nextSlide} aria-label="Sonraki">
        <i className="fa-solid fa-chevron-right" />
      </button>
      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentSlide ? "active" : ""}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
