import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import ScrollToTop from "../../components/ScrollToTop";
import eventsData from "../../data/etkinlikler.json";

const normalizeSlug = (slug) => {
  try {
    return decodeURIComponent(slug).toLowerCase();
  } catch {
    return String(slug).toLowerCase();
  }
};

export async function generateStaticParams() {
  return eventsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const item = eventsData.find((e) => normalizeSlug(e.slug) === normalizedSlug);
  if (!item) return {};
  return {
    title: `${item.title} | Sarıyer Kent Konseyi`,
    description: item.desc,
    alternates: { canonical: `https://sariyerkentkonseyi.org/etkinlikler/${slug}` },
  };
}

export default async function EtkinlikDetay({ params }) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const item = eventsData.find((e) => normalizeSlug(e.slug) === normalizedSlug);

  if (!item) {
    return (
      <>
        <ScrollToTop />
        <Navbar />
        <main>
          <PageHeader eyebrow="ETKİNLİK" title="Etkinlik Bulunamadı" breadcrumbs={["Etkinlikler", "Bulunamadı"]} />
          <section className="section">
            <div className="container">
              <p>İstenen etkinlik kaydı bulunamadı.</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const related = eventsData
    .filter((e) => e.slug !== item.slug)
    .slice(0, 4);

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
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="panel-head">
              <h2>Son Etkinlikler</h2>
              <Link href="/etkinlikler">Tüm Etkinlikler →</Link>
            </div>
            <div className="event-rows">
              {related.map((h, i) => (
                <Link href={`/etkinlikler/${h.slug}`} key={h.slug} className="event-row">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>
                    <strong>{h.title}</strong>
                    <small>{h.time} · {h.location}</small>
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