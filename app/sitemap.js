/**
 * app/sitemap.js — faz-4: eski modül yükleme kaldırıldı; dinamik URL'ler
 * lib/data async API'sinden (getNews/getEvents/getCouncils/
 * getWorkingGroups) üretilir. DATA_SOURCE=http iken de çalışır.
 */
import { getNews, getEvents, getCouncils, getWorkingGroups } from "../lib/data/index.js";
import { getSiteUrl } from "../lib/data/config.js";

const BASE_URL = getSiteUrl();

const staticRoutes = [
  '/',
  '/iletisim',
  '/gizlilik-politikasi',
  '/videolar',
  '/galeri',
  '/meclisler',
  '/etkinlikler',
  '/calisma-gruplari',
  '/haberler',
  '/raporlar',
  '/kullanim-sartlari',
  '/kvkk',
  '/arama',
  '/kurumsal/vizyon-misyon',
  '/kurumsal/hakkimizda',
  '/kurumsal/yonetim',
  '/kurumsal/ic-yonerge',
  '/kurumsal/yonetmelik',
];

export default async function sitemap() {
  const now = new Date();

  const [news, events, councils, workingGroups] = await Promise.all([
    getNews(),
    getEvents(),
    getCouncils(),
    getWorkingGroups(),
  ]);

  const dynamicRoutes = [
    ...councils.map((item) => ({
      url: `${BASE_URL}/meclisler/${item.slug}`,
      lastModified: now,
    })),
    ...events.map((item) => ({
      url: `${BASE_URL}/etkinlikler/${item.slug}`,
      lastModified: now,
    })),
    ...workingGroups.map((item) => ({
      url: `${BASE_URL}/calisma-gruplari/${item.slug}`,
      lastModified: now,
    })),
    ...news.map((item) => ({
      url: `${BASE_URL}/haberler/${item.slug}`,
      lastModified: now,
    })),
  ];

  const routes = [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...dynamicRoutes,
  ];

  return routes;
}
