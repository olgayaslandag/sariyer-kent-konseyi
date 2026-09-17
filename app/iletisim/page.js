import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'İletişim | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi ile iletişime geçin. Merkez Mah. Darüşşafaka Cad. No: 33 Sarıyer/İstanbul. Tel: 0212 242 00 00.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/iletisim' },
};

export default function Iletisim() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="BİZİMLE İLETİŞİME GEÇİN"
          title="İletişim"
          breadcrumbs={["İletişim"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>ADRES</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>Merkez Mah. Darüşşafaka Cad. No: 33</p>
                  <p>Sarıyer / İstanbul</p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>TELEFON</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>0212 242 00 00</p>
                  <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>E-POSTA</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>info@sariyerkentkonseyi.org</p>
                  <p>Genel bilgi ve başvurular için yazabilirsiniz.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">BİZE KATILIN</p><h2>Fikir ve Önerileriniz</h2></div>
            </div>
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
              <p>
                Sarıyer’in geleceği için fikir, öneri ve projelerinizi bizimle
                paylaşabilirsiniz. Her öneri değerlendirmeye alınır ve
                ilgili çalışma grubuna iletilir.
              </p>
              <p>
                Kent konseyimize katılmak, çalışma gruplarında yer almak ve
                Sarıyer’i birlikte geliştirmek için bizimle iletişime geçin.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
