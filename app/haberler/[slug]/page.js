import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import ScrollToTop from "../../components/ScrollToTop";
import newsData from "../../data/haberler.json";

export async function generateStaticParams() {
  return newsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = newsData.find((h) => h.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Sarıyer Kent Konseyi`,
    description: item.desc,
    alternates: { canonical: `https://sariyerkentkonseyi.org/haberler/${slug}` },
  };
}

export default async function HaberDetay({ params }) {
  const { slug } = await params;
  const item = newsData.find((h) => h.slug === slug);

  if (!item) {
    return null;
  }

  return (
    <>
      <ScrollToTop />
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