/**
 * @file lib/data/sources/http.js — HTTP veri kaynağı iskeleti (faz-2)
 *
 * DATA_SOURCE=http iken index.js bu modülün fonksiyonlarını çağırır.
 * Bu fazda fonksiyonel CMS değildir — yalnızca public API sözleşmesinin
 * (getNews/getEvents/getCouncils/getWorkingGroups + *BySlug + getSlugs +
 * buildSearchIndex) fetch tabanlı karşılıklarını, hata semantiğini ve
 * endpoint-map sözleşmesini kanıtlamak için minimal iskelettir.
 * Tam HTTP davranışı (tekil kayıt endpoint'leri, cache/retry, sözleşme
 * validasyonu) faz-8'de netleşecek.
 *
 * Varsayımlar (sözleşme kanıtı):
 * - API_BASE_URL + path iskeleti: GET ${API_BASE_URL}/haberler,
 *   /etkinlikler, /meclisler, /calisma-gruplari (liste endpoint'leri).
 *   JSON import ETMEZ (kabul kriteri); veri global fetch ile alınır.
 * - Liste endpoint'leri dizi döner (News[]/Event[]/...). Tekil kayıt
 *   iskeleti liste + slug filtresiyle çalışır (404 ayrımı faz-8'de).
 * - API_BASE_URL tanımlı değilse (boş string) somut Error fırlatılır;
 *   ağ/HTTP hataları path ve durum bilgisiyle yeniden fırlatılır.
 * - *BySlug: bulunamazsa null (mock ile aynı semantike). buildSearchIndex
 *   dört listeyi paralel çeker ve mock ile birebir aynı
 *   SearchIndexEntry şeklini üretir.
 *
 * Not: global fetch Node 22+ ve Next.js runtime'da hazırdır. Testlerde
 * vi.stubGlobal('fetch', ...) ile sahte uygulanabilir.
 */

import { getConfig } from "../config.js";

/** kind kodundan liste endpoint yoluna */
const KIND_PATHS = Object.freeze({
  news: "/haberler",
  events: "/etkinlikler",
  councils: "/meclisler",
  "working-groups": "/calisma-gruplari",
});

/** SlugKind (Türkçe) karşılığı — buildSearchIndex/getSlugs geçişi için */
const KIND_TO_SLUG_KIND = Object.freeze({
  news: "haberler",
  events: "etkinlikler",
  councils: "meclisler",
  "working-groups": "calisma-gruplari",
});

/** getSlugs girişi: İngilizce (plan) + Türkçe (SlugKind) iki sözlük de geçerli */
const KIND_ALIASES = Object.freeze({
  news: "news",
  haberler: "news",
  events: "events",
  etkinlikler: "events",
  councils: "councils",
  meclisler: "councils",
  "working-groups": "working-groups",
  "calisma-gruplari": "working-groups",
});

/**
 * @param {string} kind
 * @returns {"news"|"events"|"councils"|"working-groups"}
 */
function normalizeKind(kind) {
  if (typeof kind !== "string") {
    throw new TypeError(
      `getSlugs(kind) kind string olmalı, alınan: ${typeof kind}. ` +
        `Beklenen: 'news'|'haberler'|'events'|'etkinlikler'|'councils'|'meclisler'|'working-groups'|'calisma-gruplari'.`,
    );
  }
  const normalized = KIND_ALIASES[kind.trim().toLowerCase()];
  if (!normalized) {
    throw new TypeError(
      `getSlugs(kind) bilinmeyen kind: ${JSON.stringify(kind)}. ` +
        `Beklenen: 'news'|'haberler'|'events'|'etkinlikler'|'councils'|'meclisler'|'working-groups'|'calisma-gruplari'.`,
    );
  }
  return normalized;
}

/**
 * API_BASE_URL + path ile JSON çeker; hata fırlatır.
 * @param {string} path — örn. '/haberler'
 */
async function fetchJson(path) {
  const { apiBaseUrl } = getConfig();
  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL tanımlı değil. DATA_SOURCE=http için env'de API_BASE_URL gerekli (örn. https://api.example.com veya /api).",
    );
  }
  const url = `${apiBaseUrl}${path}`;
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`HTTP kaynak ${url} alınamadı: ${error?.message ?? String(error)}`);
  }
  if (!response.ok) {
    throw new Error(
      `HTTP kaynak ${url} ${response.status} ile başarısız oldu (${response.statusText || "bilinmeyen durum"}).`,
    );
  }
  return response.json();
}

/**
 * Aranabilir metin üretir (mock.js ile aynı kural — kopya bilerek az).
 * @param {Array<unknown>} parts
 * @returns {string}
 */
function toSearchText(parts) {
  return parts
    .filter((p) => typeof p === "string")
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @template T
 * @param {T[]} items
 * @param {unknown} slug
 * @returns {T|null}
 */
function findBySlug(items, slug) {
  if (typeof slug !== "string" || !slug.trim()) return null;
  const needle = slug.trim();
  return items.find((item) => item.slug === needle) ?? null;
}

/** @returns {Promise<News[]>} */
export async function getNews() {
  return fetchJson(KIND_PATHS.news);
}

/**
 * @param {string} slug
 * @returns {Promise<News|null>}
 */
export async function getNewsBySlug(slug) {
  const items = await getNews();
  return findBySlug(Array.isArray(items) ? items : [], slug);
}

/** @returns {Promise<Event[]>} */
export async function getEvents() {
  return fetchJson(KIND_PATHS.events);
}

/**
 * @param {string} slug
 * @returns {Promise<Event|null>}
 */
export async function getEventsBySlug(slug) {
  const items = await getEvents();
  return findBySlug(Array.isArray(items) ? items : [], slug);
}

/** @returns {Promise<Council[]>} */
export async function getCouncils() {
  return fetchJson(KIND_PATHS.councils);
}

/**
 * @param {string} slug
 * @returns {Promise<Council|null>}
 */
export async function getCouncilBySlug(slug) {
  const items = await getCouncils();
  return findBySlug(Array.isArray(items) ? items : [], slug);
}

/** @returns {Promise<WorkingGroup[]>} */
export async function getWorkingGroups() {
  return fetchJson(KIND_PATHS["working-groups"]);
}

/**
 * @param {string} slug
 * @returns {Promise<WorkingGroup|null>}
 */
export async function getWorkingGroupBySlug(slug) {
  const items = await getWorkingGroups();
  return findBySlug(Array.isArray(items) ? items : [], slug);
}

/**
 * İstenen koleksiyonun slug listesi (liste endpoint'ini çeker, slug'ları eşler).
 * @param {string} kind
 * @returns {Promise<string[]>}
 */
export async function getSlugs(kind) {
  const normalized = normalizeKind(kind);
  const items =
    normalized === "news"
      ? await getNews()
      : normalized === "events"
        ? await getEvents()
        : normalized === "councils"
          ? await getCouncils()
          : await getWorkingGroups();
  return (Array.isArray(items) ? items : []).map((item) => item.slug);
}

/**
 * Sunucu tarafı arama indeksi — dört listeyi paralel çeker.
 * @returns {Promise<SearchIndex>}
 */
export async function buildSearchIndex() {
  const [newsRaw, eventsRaw, councilsRaw, workingGroupsRaw] = await Promise.all([
    getNews(),
    getEvents(),
    getCouncils(),
    getWorkingGroups(),
  ]);
  const news = Array.isArray(newsRaw) ? newsRaw : [];
  const events = Array.isArray(eventsRaw) ? eventsRaw : [];
  const councils = Array.isArray(councilsRaw) ? councilsRaw : [];
  const workingGroups = Array.isArray(workingGroupsRaw) ? workingGroupsRaw : [];

  const entries = [];
  for (const n of news) {
    entries.push({
      slug: n.slug,
      kind: KIND_TO_SLUG_KIND.news,
      title: n.title,
      href: `/${KIND_TO_SLUG_KIND.news}/${n.slug}`,
      text: toSearchText([n.title, n.desc, n.content]),
    });
  }
  for (const e of events) {
    entries.push({
      slug: e.slug,
      kind: KIND_TO_SLUG_KIND.events,
      title: e.title,
      href: `/${KIND_TO_SLUG_KIND.events}/${e.slug}`,
      text: toSearchText([e.title, e.desc, e.location]),
    });
  }
  for (const c of councils) {
    entries.push({
      slug: c.slug,
      kind: KIND_TO_SLUG_KIND.councils,
      title: c.title,
      href: `/${KIND_TO_SLUG_KIND.councils}/${c.slug}`,
      text: toSearchText([c.title, c.description, c.detail?.about, c.detail?.activities]),
    });
  }
  for (const g of workingGroups) {
    entries.push({
      slug: g.slug,
      kind: KIND_TO_SLUG_KIND["working-groups"],
      title: g.title,
      href: `/${KIND_TO_SLUG_KIND["working-groups"]}/${g.slug}`,
      text: toSearchText([g.title, g.description, g.detail?.about, g.detail?.activities]),
    });
  }
  return entries;
}
