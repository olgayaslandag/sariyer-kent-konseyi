"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const events = [
  { slug: "surdurulebilir-yasam-paneli", title: "Sarıyer’de Sürdürülebilir Yaşam Paneli", time: "14:00 - 17:00", location: "Sarıyer Kültür Merkezi", img: "/img/sariyer-surdurulebilir-yasam-paneli.jpg", desc: "Sürdürülebilir yaşam konularında uzmanlar, vatandaşlar ve belediye temsilcileri bir araya geldi." },
  { slug: "cocuk-atolyesi-doga-ile-sanat", title: "Çocuk Atölyesi: Doğa ile Sanat", time: "11:00 - 13:00", location: "Sarıyer Belediyesi Ek Hizmet Binası", img: "/img/sariyer-kare-4.jpg", desc: "Çocukların doğayla bağ kurmasını ve sanat yaparak öğrenmesini sağlayan atölye çalışması." },
  { slug: "genclik-atolyesi-fotograf-ve-video", title: "Gençlik Atölyesi: Fotoğraf ve Video", time: "10:00 - 12:00", location: "Sarıyer Gençlik Merkezi", img: "/img/sariyer-kare-5.jpg", desc: "Gençlere fotoğraf ve video çekim teknikleri ücretsiz olarak sunulan atölye." },
  { slug: "kadin-dayanismasi-saglik-ve-spor", title: "Kadın Dayanışması: Sağlık ve Spor", time: "13:00 - 15:00", location: "Sarıyer Spor Salonu", img: "/img/sariyer-kare-6.jpg", desc: "Kadınların sağlıklı yaşam bilincini artırmak amacıyla düzenlenen panel ve spor etkinliği." },
  { slug: "kent-soylesileri-katilimci-demokrasi", title: "Kent Söyleşileri: Katılımcı Demokrasi", time: "14:00 - 16:00", location: "Sarıyer Kültür Merkezi", img: "/img/sariyer-kare-1.jpg", desc: "Katılımcı demokrasi konusunda vatandaşlarımızın görüşlerini dinlediğimiz söyleşi serisi." },
  { slug: "yasli-gunu-bulusmasi", title: "Yaşlılar Günü Buluşması", time: "10:00 - 12:00", location: "Sarıyer Yaşlılar Merkezi", img: "/img/sariyer-kare-2.jpg", desc: "Yaşlılarımızla bir araya geldiğimiz, sohbet ve eğlence dolu gün." }
];

export default function Etkinlikler() {
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
        <PageHeader eyebrow="BİLGİ" title="Etkinlikler" breadcrumbs={["Etkinlikler"]} />
        <section className="section">
          <div className="container">
            <div className="masonry">
              {events.map((item, index) => (
                <Link href={`/etkinlikler/${item.slug}`} className="news-card masonry-item" key={index}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="news-card-body">
                    <span className="tag">ETKİNLİK</span>
                    <h3>{item.title}</h3>
                    <small>{item.time} · {item.location}</small>
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
