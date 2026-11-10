/**
 * @file lib/data/sources/mock.js — mock veri kaynağı (faz-9)
 *
 * Tek JSON okuma noktası: mocks/data/*.json dosyalarını çağrı anında
 * (fs/promises) okuyan TEK modül. Statik import yok; dosya mtime
 * değişmişse cache yenilenir.
 *
 * Module-level Map cache: filePath → { mtimeMs, data }.
 * Export: clearMockCache(), readMockJson(filePath) (test için).
 */

import { readFile, stat } from "node:fs/promises";
import path from "node:path";

// JSON import ESM/CJS farkına karşı zarif unwrap (tests ile aynı desen:
// dizi ise doğrudan, .default sarmalıysa içindeki dizi)
const unwrapList = (mod) => {
  if (Array.isArray(mod)) return mod;
  if (mod && typeof mod === "object" && "default" in mod && Array.isArray(mod.default)) {
    return mod.default;
  }
  return [];
};

const cache = new Map();

function resolveMockPath(filePath) {
  if (typeof filePath !== "string" || !filePath.trim()) {
    throw new TypeError("readMockJson(filePath) filePath string olmalı.");
  }
  const trimmed = filePath.trim();
  if (path.isAbsolute(trimmed)) return trimmed;
  // Sadece dosya adı verilmişse mocks/data altına çöz.
  if (!trimmed.includes("/") && !trimmed.includes("\\")) {
    return path.join(process.cwd(), "mocks", "data", trimmed);
  }
  return path.join(process.cwd(), trimmed);
}

function shallowClone(value) {
  if (Array.isArray(value)) {
    return value.map((item) =>
      item && typeof item === "object" && !Array.isArray(item)
        ? { ...item }
        : Array.isArray(item)
          ? [...item]
          : item,
    );
  }
  if (value && typeof value === "object") return { ...value };
  return value;
}

export async function readMockJson(filePath) {
  const resolved = resolveMockPath(filePath);

  let mtimeMs;
  try {
    const st = await stat(resolved);
    mtimeMs = st.mtimeMs;
  } catch (err) {
    throw err;
  }

  const cached = cache.get(resolved);
  if (cached && cached.mtimeMs === mtimeMs) {
    return shallowClone(cached.data);
  }

  let raw;
  try {
    raw = await readFile(resolved, "utf8");
  } catch (err) {
    throw err;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw err;
  }

  const data = unwrapList(parsed);
  cache.set(resolved, { mtimeMs, data });
  return shallowClone(data);
}

export function clearMockCache() {
  cache.clear();
}

const FILES = {
  news: "haberler.json",
  events: "etkinlikler.json",
  councils: "meclisler.json",
  workingGroups: "calisma-gruplari.json",
};

async function loadList(fileName) {
  const filePath = path.join(process.cwd(), "mocks", "data", fileName);
  const data = await readMockJson(filePath);
  return Array.isArray(data) ? data : [];
}

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

function toSearchText(parts) {
  return parts
    .filter((p) => typeof p === "string")
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findBySlug(items, slug) {
  if (typeof slug !== "string" || !slug.trim()) return null;
  const needle = slug.trim();
  return items.find((item) => item.slug === needle) ?? null;
}

export async function getNews() {
  const haberler = await loadList(FILES.news);
  return [...haberler];
}

export async function getNewsBySlug(slug) {
  const haberler = await loadList(FILES.news);
  const found = findBySlug(haberler, slug);
  return found ? { ...found } : null;
}

export async function getEvents() {
  const etkinlikler = await loadList(FILES.events);
  return [...etkinlikler];
}

export async function getEventsBySlug(slug) {
  const etkinlikler = await loadList(FILES.events);
  const found = findBySlug(etkinlikler, slug);
  return found ? { ...found } : null;
}

export async function getCouncils() {
  const meclisler = await loadList(FILES.councils);
  return [...meclisler];
}

export async function getCouncilBySlug(slug) {
  const meclisler = await loadList(FILES.councils);
  const found = findBySlug(meclisler, slug);
  return found ? { ...found } : null;
}

export async function getWorkingGroups() {
  const calismaGruplari = await loadList(FILES.workingGroups);
  return [...calismaGruplari];
}

export async function getWorkingGroupBySlug(slug) {
  const calismaGruplari = await loadList(FILES.workingGroups);
  const found = findBySlug(calismaGruplari, slug);
  return found ? { ...found } : null;
}

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
