import Navbar from "../components/Navbar";
import { getCouncils, getWorkingGroups } from "../../lib/data/index.js";
import { getSiteUrl } from "../../lib/data/config.js";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'KVKK Aydınlatma Metni | Sarıyer Kent Konseyi',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metnimiz. Verileriniz nasıl işleniyor?',
  alternates: { canonical: `${getSiteUrl()}/kvkk` },
};

export default async function Kvkk() {
  const [navGroups, navCouncils] = await Promise.all([
    getWorkingGroups(),
    getCouncils(),
  ]);

  return (
    <>
      <Navbar navGroups={navGroups} navCouncils={navCouncils} />
      <main>
        <PageHeader
          eyebrow="YASAL"
          title="KVKK Aydınlatma Metni"
          breadcrumbs={["KVKK Aydınlatma Metni"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
               <h2>1. Veri Sorumlusu</h2>
              <p>
                Sarıyer Kent Konseyi olarak, kişisel verilerinizin işlenmesinde 6698 sayılı
                Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu
                sıfatıyla hareket ediyoruz.
              </p>
              <h2>2. İşlenen Veriler</h2>
              <p>
                Web sitemizi ziyaret etmeniz sırasında IP adresi, tarayıcı bilgisi,
                ziyaret süreleri ve benzeri teknik veriler işlenebilir. Ayrıca bültene
                abone olmanız durumunda e-posta adresiniz saklanır.
              </p>
              <h2>3. Verilerin İşlenme Amaçları</h2>
              <p>
                Toplanan veriler, web sitesinin işletilmesi, kullanıcı deneyiminin
                iyileştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla
                işlenir.
              </p>
              <h2>4. Haklarınız</h2>
              <p>
                KVKK kapsamında verilerinize erişme, düzeltme, silme ve itiraz etme
                haklarına sahipsiniz. Bu haklarınızı kullanmak için
                info@sariyerkentkonseyi.org adresine başvurabilirsiniz.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
