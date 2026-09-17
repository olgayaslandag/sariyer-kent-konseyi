import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'Kullanım Şartları | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi web sitesi kullanım şartları. Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/kullanim-sartlari' },
};

export default function KullanimSartlari() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="YASAL"
          title="Kullanım Şartları"
          breadcrumbs={["Kullanım Şartları"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
               <h2>1. Kabul</h2>
              <p>
                Sarıyer Kent Konseyi web sitesini kullanarak bu kullanım şartlarını
                kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen
                sitemizi kullanmayınız.
              </p>
              <h2>2. İçerik</h2>
              <p>
                Sitede yer alan tüm metin, görsel ve içerikler yasal sorumluluk
                doğurmamaktadır. Bilgilerin doğruluğu için çaba gösterilse de,
                hatalar olabilir.
              </p>
              <h2>3. Kullanıcı Davranışı</h2>
              <p>
                Sitedeki hizmetleri yasal sınırlar içinde ve diğer kullanıcıların
                haklarını ihlal etmeyecek şekilde kullanmayı taahhüt edersiniz.
              </p>
              <h2>4. Değişiklikler</h2>
              <p>
                Kullanım şartları zaman zaman güncellenebilir. Değişiklikler sitede
                yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
