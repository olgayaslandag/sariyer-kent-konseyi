import HomeClient from "./components/HomeClient";
import { getNews, getEvents, getCouncils, getWorkingGroups } from "../lib/data/index.js";
import { getSiteUrl } from "../lib/data/config.js";

export const metadata = {
  title: 'Sarıyer Kent Konseyi — Birlikte Düşünen, Birlikte Üreten',
  description: 'Sarıyer Kent Konseyi, katılımcı demokrasi ile kentin geleceğini birlikte tasarlıyor. Meclisler, çalışma grupları ve fikir platformları.',
  alternates: { canonical: getSiteUrl() },
};

export default async function Home() {
  // Faz-4: veri lib/data async API'sinden server'da yüklenir, HomeClient'a
  // props olarak iner (client bundle'a JSON gömülmez).
  const [workingGroups, councils, news, events] = await Promise.all([
    getWorkingGroups(),
    getCouncils(),
    getNews(),
    getEvents(),
  ]);
  return (
    <HomeClient
      navGroups={workingGroups}
      navCouncils={councils}
      workingGroups={workingGroups}
      councils={councils}
      news={news}
      events={events}
    />
  );
}
