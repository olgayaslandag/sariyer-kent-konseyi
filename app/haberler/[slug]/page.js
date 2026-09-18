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

  const parseDate = (str) => {
    const months = {
      'Ocak': 0, 'Şubat': 1, 'Mart': 2, 'Nisan': 3, 'Mayıs': 4, 'Haziran': 5,
      'Temmuz': 6, 'Ağustos': 7, 'Eylül': 8, 'Ekim': 9, 'Kasım': 10, 'Aralık': 11,
    };
    const parts = str.split(' ');
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const related = newsData
    .filter((h) => h.tag === item.tag && h.slug !== item.slug)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 3);

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
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="panel-head">
              <h2>Aynı Kategorideki Haberler</h2>
              <Link href="/haberler">Tüm Haberler →</Link>
            </div>
            <div className="news-rows">
              {related.map((h, i) => (
                <Link href={`/haberler/${h.slug}`} key={h.slug} className="news-row">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>
                    <strong>{h.title}</strong>
                    <small>{h.date} · {h.tag}</small>
                  </span>
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