import Navbar from "../components/Navbar";
import { getCouncils, getWorkingGroups } from "../../lib/data/index.js";
import { getSiteUrl } from "../../lib/data/config.js";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'Fotoğraf Galerisi | Sarıyer Kent Konseyi',
  description: 'Sarıyer\'den kareler. Kent konseyimizin çalışmaları ve etkinliklerinden fotoğraflar.',
  alternates: { canonical: `${getSiteUrl()}/galeri` },
};

const images = [
  "/img/sariyer-kare-1.jpg",
  "/img/sariyer-kare-2.jpg",
  "/img/sariyer-kare-3.jpg",
  "/img/sariyer-kare-4.jpg",
  "/img/sariyer-kare-5.jpg",
  "/img/sariyer-kare-6.jpg"
];

export default async function Galeri() {
  const [navGroups, navCouncils] = await Promise.all([
    getWorkingGroups(),
    getCouncils(),
  ]);

  return (
    <>
      <Navbar navGroups={navGroups} navCouncils={navCouncils} />
      <main>
        <PageHeader
          eyebrow="BİLGİ"
          title="Fotoğraf Galerisi"
          breadcrumbs={["Fotoğraf Galerisi"]}
        />
        <section className="section">
          <div className="container">
            <div className="gallery-grid">
              {images.map((src, i) => (
                <div className="gallery-item" key={i}>
                  <img src={src} alt={`Sarıyer kent konseyi galeri fotoğrafı ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
