import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export const metadata = {
  title: 'Vizyon & Misyon | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi vizyonu, misyonu ve değerleri. Sürdürülebilir, adil ve erişilebilir bir Sarıyer için çalışıyoruz.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/kurumsal/vizyon-misyon' },
};

export default function VizyonMisyon() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KURUMSAL"
          title="Vizyon & Misyon"
          breadcrumbs={["Kurumsal", "Vizyon & Misyon"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h2>VİZYON</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Sarıyer Kent Konseyi olarak vizyonumuz; katılımcı demokrasinin
                    kalbinde yer alan, her vatandaşın sesini duyan, kentin
                    geleceğini birlikte tasarladığımız, sürdürülebilir, adil ve
                    erişilebilir bir Sarıyer’i inşa etmektir.
                  </p>
                  <p>
                    Kentimizin doğal güzelliklerini korumak, kültürel mirasımızı
                    yaşatmak ve nesiller arası dayanışmayı sağlamak temel
                    hedeflerimiz arasındadır.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>MİSYON</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    Misyonumuz, Sarıyer’de yerel yönetim ile vatandaşlar
                    arasında köprü kurarak, şeffaf ve hesap verebilir bir
                    yapıyla hizmet sunmaktır.
                  </p>
                  <p>
                    Fikirleri topluyor, meclislerde tartışıyor, çalışma
                    gruplarıyla çözüm önerileri geliştiriyor ve projeleri
                    hayata geçiriyoruz.
                  </p>
                </div>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h2>DEĞERLERİMİZ</h2></div>
                <div style={{ lineHeight: 1.8 }}>
                  <p>
                    <strong>Katılımcılık:</strong> Herkesin fikrinin
                    değerini bilir, sürece herkesten destek alırız.
                  </p>
                  <p>
                    <strong>Şeffaflık:</strong> Tüm çalışmalarımızı
                    kamuoyuyla paylaşır, hesap veririz.
                  </p>
                  <p>
                    <strong>Sürdürülebilirlik:</strong> Doğayı ve kaynakları
                    gelecek nesiller için koruruz.
                  </p>
                  <p>
                    <strong>Eşitlik:</strong> Her vatandaşın eşit haklara
                    sahip olduğuna inanırız.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section" style={{ background: "linear-gradient(135deg,#fafaff,#f0f0ff)" }}>
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">BİZİ YÖNLENDİREN ŞEY</p><h2>İlke ve Hedeflerimiz</h2></div>
            </div>
            <div className="content-grid">
              <article className="content-panel">
                <div className="panel-head"><h3>Herkese Açık Platform</h3></div>
                <p>Tüm vatandaşlarımızın fikir ve önerilerini dinlemek, sürece katılımını sağlamak temel önceliğimizdir.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Şeffaf Karar Alma</h3></div>
                <p>Tüm kararlarımızı, çalışmalarımızı ve harcamalarımızı kamuoyuyla paylaşarak hesap veririz.</p>
              </article>
              <article className="content-panel">
                <div className="panel-head"><h3>Sürdürülebilir Gelecek</h3></div>
                <p>Uzun vadeli düşünerek, gelecek nesiller için yaşanabilir bir kent inşa etmek için çalışırız.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
