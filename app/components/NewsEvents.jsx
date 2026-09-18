"use client";

import Link from "next/link";
import eventsData from "../data/etkinlikler.json";
import newsData from "../data/haberler.json";

export default function NewsEvents() {
  const featuredEvent = eventsData[0];
  const eventRows = eventsData.slice(1, 5);
  const featuredNews = newsData[0];
  const newsRows = newsData.slice(1, 5);

  return (
    <section className="section" style={{ paddingTop: 0 }} id="haberler">
      <div className="container">
        <div className="content-grid">
          <article className="content-panel">
            <div className="panel-head">
              <h2>HABERLER</h2>
              <Link href="/haberler">Tüm Haberler →</Link>
            </div>
            <Link href={`/haberler/${featuredNews?.slug}`} className="news-feature">
              <img className="featured-img" src={featuredNews?.img} alt={featuredNews?.title || 'Haber görseli'} loading="lazy" />
              <div className="news-text">
                <span className="tag">{featuredNews?.tag}</span>
                <h3>{featuredNews?.title}</h3>
                <small>{featuredNews?.date}</small>
              </div>
            </Link>
            <div className="news-rows">
              {newsRows.map((item, i) => (
                <Link href={`/haberler/${item.slug}`} key={item.slug} className="news-row">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.date} · {item.tag}</small>
                  </span>
                </Link>
              ))}
            </div>
          </article>
          <article className="content-panel" id="etkinlikler">
            <div className="panel-head">
              <h2>ETKİNLİKLER</h2>
              <Link href="/etkinlikler">Tüm Etkinlikler →</Link>
            </div>
            <Link href={`/etkinlikler/${featuredEvent?.slug}`} className="event-feature">
              <img src={featuredEvent?.img} alt={featuredEvent?.title || 'Etkinlik görseli'} loading="lazy" />
              <div className="event-text">
                <h3>{featuredEvent?.title}</h3>
                <p>{featuredEvent?.time} · {featuredEvent?.location}</p>
              </div>
            </Link>
            <div className="event-rows">
              {eventRows.map((item, i) => (
                <Link href={`/etkinlikler/${item.slug}`} key={item.slug} className="event-row">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.time} · {item.location}</small>
                  </span>
                </Link>
              ))}
            </div>
          </article>
          <article className="content-panel" id="raporlar">
            <div className="panel-head">
              <h2>RAPORLAR &amp; YAYINLAR</h2>
              <Link href="/raporlar">Tüm Yayınlar →</Link>
            </div>
            {["Sarıyer Kent Konseyi Faaliyet Raporu 2023", "Sarıyer Kent Konseyi Faaliyet Raporu 2022", "Çalışma Grupları Raporu 2024", "Çalışma Grupları Değerlendirme Raporu 2024", "Sarıyer Kent Vizyonu — Ortak Gelecek", "Sarıyer Kent Konseyi Stratejik Plan 2025-2030"].map((x) => (
              <a className="report-row" href="/raporlar" key={x}>
                <span className="pdf-icon">PDF</span>
                <span>
                  <strong>{x}</strong>
                  <small>PDF · 4.2 MB</small>
                </span>
              </a>
            ))}
          </article>
        </div>

        <div className="gallery-strip">
          <div className="panel-head">
            <h2>SARIYER'DEN KARELER</h2>
            <Link href="/galeri">Tüm Galeri →</Link>
          </div>
          <div className="gallery-grid">
            {["/img/sariyer-kare-1.jpg", "/img/sariyer-kare-2.jpg", "/img/sariyer-kare-3.jpg", "/img/sariyer-kare-4.jpg", "/img/sariyer-kare-5.jpg", "/img/sariyer-kare-6.jpg"].map((src, i) => (
              <div className="gallery-item" key={i}>
                 <img src={src} alt="Sarıyer kareleri" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}