import Link from "next/link";
import Navbar from "../components/Navbar";
import { getCouncils, getEvents, getWorkingGroups } from "../../lib/data/index.js";
import { getSiteUrl } from "../../lib/data/config.js";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'Etkinlikler | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi etkinlikleri, paneller, toplantılar ve sosyal etkinlikler.',
  alternates: { canonical: `${getSiteUrl()}/etkinlikler` },
};

export default async function Etkinlikler() {
  const [events, navGroups, navCouncils] = await Promise.all([
    getEvents(),
    getWorkingGroups(),
    getCouncils(),
  ]);

  return (
    <>
      <Navbar navGroups={navGroups} navCouncils={navCouncils} />
      <main>
        <PageHeader eyebrow="BİLGİ" title="Etkinlikler" breadcrumbs={["Etkinlikler"]} />
        <section className="section">
          <div className="container">
            <div className="masonry">
              {events.map((item, index) => (
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
