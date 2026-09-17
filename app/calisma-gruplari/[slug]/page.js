import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import ScrollToTop from "../../components/ScrollToTop";
import groupsData from "../../data/calisma-gruplari.json";

export async function generateStaticParams() {
  return groupsData.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const group = groupsData.find((g) => g.slug === slug);
  if (!group) return {};
  return {
    title: `${group.title} | Sarıyer Kent Konseyi`,
    description: group.detail?.about?.slice(0, 160) || group.title,
    alternates: { canonical: `https://sariyerkentkonseyi.org/calisma-gruplari/${slug}` },
  };
}

export default async function CalismaGrubuDetay({ params }) {
  const { slug } = await params;
  const group = groupsData.find((g) => g.slug === slug);

  if (!group) {
    notFound();
  }

  const { detail } = group;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="ÇALIŞMA GRUPLARI"
          title={group.title}
          breadcrumbs={["Çalışma Grupları", group.title]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>HAKKIMIZDA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>{detail.about}</p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ODAK ALANLARIMIZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  {detail.focusAreas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.desc}
                    </p>
                  ))}
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>ETKİNLİKLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>{detail.activities}</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
               <div><p className="eyebrow">PROJELERİMİZ</p><h2>Son Projeler</h2></div>
            </div>
            <div className="content-grid">
              {detail.projects.map((p) => (
                <article className="content-panel" key={p.title}>
                  <div className="panel-head"><h3>{p.title}</h3></div>
                  <p>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}