import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import groupsData from "../data/calisma-gruplari.json";

export const metadata = {
  title: 'Çalışma Grupları | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi çalışma grupları. Uzmanlık alanlarında fikir üreten, analiz yapan ve öneriler sunan gruplar.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/calisma-gruplari' },
};

export default function CalismaGruplari() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KENT KONSEYİ NASIL ÇALIŞIR?"
          title="Çalışma Grupları"
          subtitle="Her grup, uzmanlık alanında fikir üretir, analiz yapar ve kentin geleceğine yönelik somut öneriler sunar. Gruplarımız, vatandaşların katılımıyla çalışır."
          breadcrumbs={["Çalışma Grupları"]}
        />
        <section className="section">
          <div className="container">
            <div className="work-grid">
              {groupsData.map((g) => (
                <Link className="image-card" href={g.link} key={g.id}>
                  <img src={g.img} alt={g.title} />
                  <div>
                    <span>{g.id}</span>
                    <h3>{g.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">SÜRECİMİZ</p><h2>Nasıl Çalışıyoruz?</h2></div>
            </div>
            <div className="process-grid">
              {[["01","Fikir Toplama","Vatandaşlardan ve meclislerden fikir topluyoruz."],["02","Analiz","Uzmanlar ve çalışma grupları analiz yapıyor."],["03","Öneri Geliştirme","Somut proje ve öneriler geliştiriyoruz."],["04","Hayata Geçirme","Projeleri hayata geçirip etkisini izliyoruz."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
