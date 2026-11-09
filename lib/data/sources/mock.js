/**
 * @file lib/data/sources/mock.js — mock veri kaynağı (faz-2)
 *
 * Tek JSON okuma noktası: mocks/data/*.json dosyalarını okuyan TEK modül.
 * Faz-3'te bu importlar mocks/data/*.json'a taşındı; taşınma yalnızca
 * bu dosyanın import yollarını etkiler (index.js/config.js/http.js JSON
 * import etmez — kabul kriteri).
 *
 * Tüm fonksiyonlar async'tir (index.js async public API ile uyumlu).
 * Bu fazda (faz-3) sayfalar hâlâ mocks/data/*.json'a göreli path
 * ile doğrudan import eder; bu katman yeni sözleşmeyi mock modda
 * kanıtlamak için vardır (faz-4'te page.js'ler buraya bağlanacak).
 *
 * Dönüş semantiği:
 * - Liste fonksiyonları (getNews/getEvents/getCouncils/getWorkingGroups)
 *   dizinin sığ kopyasını döner; çağıran dizi üzerinde oynayamaz.
 * - *BySlug fonksiyonları bulunamazsa null döner (throw yok).
 *   slug non-string/boş ise null döner; karşılaştırma öncesi trim'lenir.
 * - getSlugs(kind) bilinmeyen kind için TypeError fırlatır.
 * - buildSearchIndex() faz-1 typedef'ine göre
 *   SearchIndexEntry[] { slug, kind, title, href, text } döner
 *   (kind = SlugKind: 'haberler'|'etkinlikler'|'meclisler'|'calisma-gruplari',
 *   href = /{kind}/{slug}). Eski searchData.js şekli (type/raw) DEĞİL.
 *
 * kind sözlüğü getSlugs için İKİ sözlüğü de kabul eder:
 *   'news'|'haberler' -> haberler, 'events'|'etkinlikler' -> etkinlikler,
 *   'councils'|'meclisler' -> meclisler,
 *   'working-groups'|'calisma-gruplari' -> çalışma grupları.
 * (plan §4.2 İngilizce kind adlarını, shapes.js SlugKind Türkçe adları
 * tanımlar; ikisi de desteklenir.)
 */

import haberlerJson from "../../../mocks/data/haberler.json";
import etkinliklerJson from "../../../mocks/data/etkinlikler.json";
import meclislerJson from "../../../mocks/data/meclisler.json";
import calismaGruplariJson from "../../../mocks/data/calisma-gruplari.json";

// JSON import ESM/CJS farkına karşı zarif unwrap (tests ile aynı desen:
// dizi ise doğrudan, .default sarmalıysa içindeki dizi)
const unwrapList = (mod) => {
  if (Array.isArray(mod)) return mod;
  if (mod && typeof mod === "object" && "default" in mod && Array.isArray(mod.default)) {
    return mod.default;
  }
  return [];
};

const haberler = unwrapList(haberlerJson);
const etkinlikler = unwrapList(etkinliklerJson);
const meclisler = unwrapList(meclislerJson);
const calismaGruplari = unwrapList(calismaGruplariJson);

/**
 * kind girdisini birleşik iç koda indirir.
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
  const key = kind.trim().toLowerCase();
  const fullMap = {
    news: "news",
    haberler: "news",
    events: "events",
    etkinlikler: "events",
    councils: "councils",
    meclisler: "councils",
    "working-groups": "working-groups",
    "calisma-gruplari": "working-groups",
  };
  const normalized = fullMap[key];
  if (!normalized) {
    throw new TypeError(
      `getSlugs(kind) bilinmeyen kind: ${JSON.stringify(kind)}. ` +
        `Beklenen: 'news'|'haberler'|'events'|'etkinlikler'|'councils'|'meclisler'|'working-groups'|'calisma-gruplari'.`,
    );
  }
  return normalized;
}

/**
 * Aranabilir metin üretir: HTML etiketlerini boşlukla değiştirir,
 * whitespace'i tek boşluğa indirger. Büyük/küçük harf korunur;
 * sorgu tarafı normalizasyon faz-4'te karşılığıdır.
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
  return [...haberler];
}

/**
 * @param {string} slug
 * @returns {Promise<News|null>}
 */
export async function getNewsBySlug(slug) {
  const found = findBySlug(haberler, slug);
  return found ? { ...found } : null;
}

/** @returns {Promise<Event[]>} */
export async function getEvents() {
  return [...etkinlikler];
}

/**
 * @param {string} slug
 * @returns {Promise<Event|null>}
 */
export async function getEventsBySlug(slug) {
  const found = findBySlug(etkinlikler, slug);
  return found ? { ...found } : null;
}

/** @returns {Promise<Council[]>} */
export async function getCouncils() {
  return [...meclisler];
}

/**
 * @param {string} slug
 * @returns {Promise<Council|null>}
 */
export async function getCouncilBySlug(slug) {
  const found = findBySlug(meclisler, slug);
  return found ? { ...found } : null;
}

/** @returns {Promise<WorkingGroup[]>} */
export async function getWorkingGroups() {
  return [...calismaGruplari];
}

/**
 * @param {string} slug
 * @returns {Promise<WorkingGroup|null>}
 */
export async function getWorkingGroupBySlug(slug) {
  const found = findBySlug(calismaGruplari, slug);
  return found ? { ...found } : null;
}

/**
 * İstenen koleksiyonun slug listesi.
 * @param {string} kind — 'news'|'haberler'|'events'|'etkinlikler'|
 *                          'councils'|'meclisler'|'working-groups'|'calisma-gruplari'
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
  return items.map((item) => item.slug);
}

/**
 * Sunucu tarafı arama indeksi (SearchIndex = SearchIndexEntry[]).
 * Sıra: haberler, etkinlikler, meclisler, calisma-gruplari.
 * @returns {Promise<SearchIndex>}
 */
export async function buildSearchIndex() {
  const [news, events, councils, workingGroups] = await Promise.all([
    getNews(),
    getEvents(),
    getCouncils(),
    getWorkingGroups(),
  ]);

  const entries = [];
  for (const n of news) {
    entries.push({
      slug: n.slug,
      kind: "haberler",
      title: n.title,
      href: `/haberler/${n.slug}`,
      text: toSearchText([n.title, n.desc, n.content]),
    });
  }
  for (const e of events) {
    entries.push({
      slug: e.slug,
      kind: "etkinlikler",
      title: e.title,
      href: `/etkinlikler/${e.slug}`,
      text: toSearchText([e.title, e.desc, e.location]),
    });
  }
  for (const c of councils) {
    entries.push({
      slug: c.slug,
      kind: "meclisler",
      title: c.title,
      href: `/meclisler/${c.slug}`,
      text: toSearchText([c.title, c.description, c.detail?.about, c.detail?.activities]),
    });
  }
  for (const g of workingGroups) {
    entries.push({
      slug: g.slug,
      kind: "calisma-gruplari",
      title: g.title,
      href: `/calisma-gruplari/${g.slug}`,
      text: toSearchText([g.title, g.description, g.detail?.about, g.detail?.activities]),
    });
  }
  return entries;
}
