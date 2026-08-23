import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import content from "../../../data/content.json";

export async function generateStaticParams() {
  return content.etkinlikler.map((item) => ({
    slug: item.slug,
  }));
}

export default function EtkinlikDetay({ params }) {
  const item = content.etkinlikler.find((e) => e.slug === params.slug);

  if (!item) {
    return null;
  }

  return (
    <>
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
