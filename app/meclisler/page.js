import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import councilsData from "../data/meclisler.json";

export const metadata = {
  title: 'Meclislerimiz | Sarıyer Kent Konseyi',
  description: 'Sarıyer\'in farklı kesimlerini temsil eden meclislerimiz. Gençlik, kadın, engelli meclisleri ve daha fazlası.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/meclisler' },
};

export default function Meclisler() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="MECLİSLERİMİZ"
          title="Meclislerimiz"
          breadcrumbs={["Meclislerimiz"]}
        />
        <section className="section">
          <div className="container">
            <small className="section-intro" style={{ display: "block", marginBottom: 24 }}>
              Sarıyer’in farklı kesimlerini temsil eden meclislerimiz ile kentin
              her noktasından gelen önerileri değerlendiriyoruz. Her meclis,
              kendi alanında uzmanlaşmış çalışmalar yürütür.
            </small>
            <div className="council-grid">
              {councilsData.map((c) => (
                <Link className="council-card" href={c.link} key={c.id}>
                  <img src={c.img} alt={c.title} />
                  <div>
                    <strong>
                      {c.shortTitle}
                      <br />
                      {c.subTitle}
                    </strong>
                    <p>{c.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">ÇALIŞMA PRENSİBİMİZ</p><h2>Nasıl Çalışıyoruz?</h2></div>
            </div>
            <div className="process-grid">
              {[["01","Fikir Toplama","Her meclis, kendi kesiminden gelen fikirleri toplar."],["02","Değerlendirme","Fikirler meclis toplantılarında tartışılır ve değerlendirilir."],["03","Öneri Geliştirme","Somut proje ve öneriler geliştirilir."],["04","Hayata Geçirme","Onaylanan projeler hayata geçirilir ve takip edilir."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
