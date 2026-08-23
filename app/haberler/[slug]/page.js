import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import content from "../../../data/content.json";

export async function generateStaticParams() {
  return content.haberler.map((item) => ({
    slug: item.slug,
  }));
}

export default function HaberDetay({ params }) {
  const item = content.haberler.find((h) => h.slug === params.slug);

  if (!item) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow={item.tag} title={item.title} breadcrumbs={["Haberler", item.title]} />
        <section className="section">
          <div className="container">
            <article>
              <img className="detail-hero-img" src={item.img} alt={item.title} loading="lazy" />
              <div className="detail-content">
                <div className="detail-meta">
                  <span className="tag">{item.tag}</span>
                  <time>{item.date}</time>
                </div>
                <div className="detail-text">
                  <p>{item.desc}</p>
                  <img className="detail-content-img" src={item.contentImg} alt={item.title} loading="lazy" />
                </div>
                <Link className="read-more detail-back-link" href="/haberler">← Tüm Haberler</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
