import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import eventsData from "../data/etkinlikler.json";

export const metadata = {
  title: 'Etkinlikler | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi etkinlikleri, paneller, toplantılar ve sosyal etkinlikler.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/etkinlikler' },
};

export default function Etkinlikler() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="BİLGİ" title="Etkinlikler" breadcrumbs={["Etkinlikler"]} />
        <section className="section">
          <div className="container">
            <div className="masonry">
              {eventsData.map((item, index) => (
                <Link href={`/etkinlikler/${item.slug}`} className="news-card masonry-item" key={item.slug}>
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
