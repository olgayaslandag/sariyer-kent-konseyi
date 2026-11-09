import Link from "next/link";
import Navbar from "../components/Navbar";
import { getCouncils, getNews, getWorkingGroups } from "../../lib/data/index.js";
import { getSiteUrl } from "../../lib/data/config.js";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'Haberler | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi haberleri, duyurular ve güncel gelişmeler.',
  alternates: { canonical: `${getSiteUrl()}/haberler` },
};

export default async function Haberler() {
  const [news, navGroups, navCouncils] = await Promise.all([
    getNews(),
    getWorkingGroups(),
    getCouncils(),
  ]);

  return (
    <>
      <Navbar navGroups={navGroups} navCouncils={navCouncils} />
      <main>
        <PageHeader eyebrow="BİLGİ" title="Haberler" breadcrumbs={["Haberler"]} />
        <section className="section">
          <div className="container">
            <div className="masonry">
              {news.map((item, index) => (
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
