import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import ScrollToTop from "../../components/ScrollToTop";
import eventsData from "../../data/etkinlikler.json";

export async function generateStaticParams() {
  return eventsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = eventsData.find((e) => e.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Sarıyer Kent Konseyi`,
    description: item.desc,
    alternates: { canonical: `https://sariyerkentkonseyi.org/etkinlikler/${slug}` },
  };
}

export default async function EtkinlikDetay({ params }) {
  const { slug } = await params;
  const item = eventsData.find((e) => e.slug === slug);

  if (!item) {
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <PageHeader eyebrow="ETKİNLİK" title={item.title} breadcrumbs={["Etkinlikler", item.title]} />
        <section className="section">
          <div className="container">
            <article>
              <img className="detail-hero-img" src={item.img} alt={item.title} loading="lazy" />
              <div className="detail-content">
                <div className="event-meta-box">
                  <p><strong>Saat:</strong> {item.time}</p>
                  <p><strong>Yer:</strong> {item.location}</p>
                </div>
                <div className="detail-text">
                  <p>{item.desc}</p>
                  <img className="detail-content-img" src={item.contentImg} alt={item.title} loading="lazy" />
                </div>
                <Link className="read-more detail-back-link" href="/etkinlikler">← Tüm Etkinlikler</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}