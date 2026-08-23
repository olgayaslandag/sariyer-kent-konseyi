"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const news = [
  { slug: "sariyer-kent-konseyi-genel-kurulu-gerceklestirildi", title: "Sarıyer Kent Konseyi Genel Kurulu Gerçekleştirildi", date: "12 Mayıs 2024", tag: "DUYURU", img: "/img/sariyer-genel-kurul.jpg", desc: "Genel kurulumuz geniş katılımla tamamlandı. Yeni dönem çalışma programımız belirlendi." },
  { slug: "surdurulebilir-yasam-paneli-tamamlandi", title: "Sürdürülebilir Yaşam Paneli Tamamlandı", date: "8 Mayıs 2024", tag: "HABER", img: "/img/sariyer-surdurulebilir-yasam-paneli.jpg", desc: "Sürdürülebilir yaşam panelinde vatandaşlarımızın yoğun ilgisiyle çalışmalarımız tamamlandı." },
  { slug: "kent-gencligi-proje-yarismasi-basladi", title: "Kent Gençliği Proje Yarışması Başladı", date: "3 Mayıs 2024", tag: "ETKİNLİK", img: "/img/sariyer-kare-2.jpg", desc: "Gençlerin proje fikirlerini paylaşabileceği, yarışmaya katılabileceği platform açıldı." },
  { slug: "cocuk-haklari-sempozyumu", title: "Çocuk Hakları Sempozyumu", date: "28 Nisan 2024", tag: "DUYURU", img: "/img/sariyer-kare-3.jpg", desc: "Çocuk hakları konusunda farkındalık artırmak amacıyla düzenlenen sempozyum tamamlandı." },
  { slug: "sariyerde-yesil-alanlar-artiyor", title: "Sarıyer’de Yeşil Alanlar Artıyor", date: "20 Nisan 2024", tag: "HABER", img: "/img/sariyer-kare-1.jpg", desc: "Kent içi yeşil alanlar yatırımlarla genişletiliyor." },
  { slug: "kadin-dayanismasi-saglik-ve-spor", title: "Kadın Dayanışması: Sağlık ve Spor", date: "15 Nisan 2024", tag: "ETKİNLİK", img: "/img/sariyer-kare-4.jpg", desc: "Kadınların sağlıklı yaşam bilincini artırmak amacıyla düzenlenen panel ve spor etkinliği." }
];

export default function Haberler() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="BİLGİ" title="Haberler" breadcrumbs={["Haberler"]} />
        <section className="section">
          <div className="container">
            <div className="masonry">
              {news.map((item, index) => (
                <Link href={`/haberler/${item.slug}`} className="news-card masonry-item" key={index}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="news-card-body">
                    <span className="tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <small>{item.date}</small>
                    <p>{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
