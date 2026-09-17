import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ScrollToTop from "../components/ScrollToTop";
import { search } from "../data/searchData";
import SearchResultsClient from "./SearchResultsClient";

export async function generateMetadata({ searchParams }) {
  const query = searchParams?.q || '';
  if (!query.trim()) {
    return {
      title: 'Arama | Sarıyer Kent Konseyi',
      description: 'Sarıyer Kent Konseyi sitesinde arama yapın.',
      alternates: { canonical: 'https://sariyerkentkonseyi.org/arama' },
    };
  }
  return {
    title: `${query} için sonuçlar | Sarıyer Kent Konseyi`,
    description: `"${query}" arama sonuçları.`,
    alternates: { canonical: 'https://sariyerkentkonseyi.org/arama?q=' + encodeURIComponent(query) },
  };
}

export default async function Arama({ searchParams }) {
  const query = searchParams?.q || "";

  if (!query.trim()) {
    redirect("/");
  }

  const results = search(query);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Arama"
          title={`${query} için sonuçlar`}
          breadcrumbs={["Arama"]}
        />
        <section className="section">
          <div className="container">
            <SearchResultsClient initialQuery={query} initialResults={results} />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
