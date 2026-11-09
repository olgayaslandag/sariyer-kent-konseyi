import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ScrollToTop from "../components/ScrollToTop";
import { buildSearchIndex } from "../../lib/data/index.js";
import { getCouncils, getWorkingGroups } from "../../lib/data/index.js";
import { getSiteUrl } from "../../lib/data/config.js";
import { runSearch } from "../data/searchData";
import SearchResultsClient from "./SearchResultsClient";

export async function generateMetadata({ searchParams }) {
  const resolved = (await searchParams) ?? {};
  const query = resolved.q || '';
  if (!query.trim()) {
    return {
      title: 'Arama | Sarıyer Kent Konseyi',
      description: 'Sarıyer Kent Konseyi sitesinde arama yapın.',
      alternates: { canonical: `${getSiteUrl()}/arama` },
    };
  }
  return {
    title: `${query} için sonuçlar | Sarıyer Kent Konseyi`,
    description: `"${query}" arama sonuçları.`,
    alternates: { canonical: `${getSiteUrl()}/arama?q=${encodeURIComponent(query)}` },
  };
}

export default async function Arama({ searchParams }) {
  const resolved = (await searchParams) ?? {};
  const query = resolved.q || "";

  if (!query.trim()) {
    redirect("/");
  }

  // Server-side arama (faz-4): dizin lib/data buildSearchIndex()'ten
  // kurulur, skorlama server'da yapılır; client yalnızca props render eder.
  const [navGroups, navCouncils, index] = await Promise.all([
    getWorkingGroups(),
    getCouncils(),
    buildSearchIndex(),
  ]);
  const results = runSearch(index, query);

  return (
    <>
      <Navbar navGroups={navGroups} navCouncils={navCouncils} />
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
