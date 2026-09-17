import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import newsData from "../data/haberler.json";

export const metadata = {
  title: 'Haberler | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi haberleri, duyurular ve güncel gelişmeler.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/haberler' },
};

export default function Haberler() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="BİLGİ" title="Haberler" breadcrumbs={["Haberler"]} />
        <section className="section">
          <div className="container">
            <div className="masonry">
              {newsData.map((item, index) => (
                <Link href={`/haberler/${item.slug}`} className="news-card masonry-item" key={item.slug}>
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
