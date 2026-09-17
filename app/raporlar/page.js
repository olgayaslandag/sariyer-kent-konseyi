import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: 'Raporlar & Yayınlar | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi faaliyet raporları, stratejik planlar ve çalışma grubu raporları.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/raporlar' },
};

const reports = [
  "Sarıyer Kent Konseyi Faaliyet Raporu 2023",
  "Sarıyer Kent Konseyi Faaliyet Raporu 2022",
  "Çalışma Grupları Raporu 2024",
  "Çalışma Grupları Değerlendirme Raporu 2024",
  "Sarıyer Kent Vizyonu — Ortak Gelecek",
  "Sarıyer Kent Konseyi Stratejik Plan 2025-2030"
];

export default function Raporlar() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="BİLGİ"
          title="Raporlar & Yayınlar"
          breadcrumbs={["Raporlar & Yayınlar"]}
        />
        <section className="section">
          <div className="container">
            <div className="content-grid">
               {reports.map((report, index) => (
                  <a className="report-row" href={`/raporlar/${encodeURIComponent(report.toLowerCase().replace(/[^a-z0-9ığüşöç]+/g, '-').replace(/^-+|-+$/g, ''))}.pdf`} key={index} download>
                   <span className="pdf-icon">PDF</span>
                   <span>
                     <strong>{report}</strong>
                     <small>PDF</small>
                   </span>
                 </a>
               ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
