/**
 * Faz-1 fixture tutarlılık testleri — lib/data/shapes.js typedef'leri
 * ile mocks/data/*.json fixtures'ının uyumunu doğrular.
 *
 * Kapsam: News, Event, Council, WorkingGroup, SearchIndexEntry/SearchIndex,
 * SlugKind. TS migrasyonu YOKTUR; saf JS/JSDoc.
 *
 * İncelenen fiili şekiller (2026-11-09, faz-6 ile güncellendi):
 * - haberler.json:    6 News (slug,title,date,tag,img,contentImg,desc,content)
 * - etkinlikler.json: 6 Event (slug,title,time,location,img,contentImg,desc)
 * - meclisler.json:    5 Council, detail.goals kullanır (focusAreas DEĞİL)
 * - calisma-gruplari.json: 22 WorkingGroup, detail.focusAreas kullanır
 *
 * Faz-6 temizliği: mocks/data/content.json (haberler birebir kopya +
 * güncel olmayan img yolları) ve haberler_test.json ({"test": true})
 * silindi; ContentFile doğrulaması bu fazda kaldırıldı.
 *
 * SearchIndexEntry burada eski searchData.js nesnesiyle doğrulanmaz;
 * faz-2 buildSearchIndex() planlanan şekli { slug, kind, title, href, text }
 * fixture'lardan türetilen girdilerle doğrulanır.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import haberlerJson from "@/mocks/data/haberler.json";
import etkinliklerJson from "@/mocks/data/etkinlikler.json";
import meclislerJson from "@/mocks/data/meclisler.json";
import calismaGruplariJson from "@/mocks/data/calisma-gruplari.json";

// JSON içe aktarmada CJS/ESM farkına karşı zarif unwrap (smoke.test.js ile aynı desen)
const unwrap = (mod) => {
  if (Array.isArray(mod)) return mod;
  if (mod && typeof mod === "object" && "default" in mod) return mod.default;
  return mod;
};

const haberler = unwrap(haberlerJson);
const etkinlikler = unwrap(etkinliklerJson);
const meclisler = unwrap(meclislerJson);
const calismaGruplari = unwrap(calismaGruplariJson);

// ---------- yardımcı doğrulayıcılar (typedef alan listeleri) ----------

const NEWS_KEYS = ["slug", "title", "date", "tag", "img", "contentImg", "desc", "content"];
const EVENT_KEYS = ["slug", "title", "time", "location", "img", "contentImg", "desc"];
const COUNCIL_KEYS = ["id", "slug", "title", "shortTitle", "subTitle", "description", "link", "img", "detail"];
const WG_KEYS = COUNCIL_KEYS;
const COUNCIL_DETAIL_KEYS = ["about", "goals", "activities", "projects"];
const WG_DETAIL_KEYS = ["about", "focusAreas", "activities", "projects"];
const DETAIL_ITEM_KEYS = ["title", "desc"];
const SEARCH_ENTRY_KEYS = ["slug", "kind", "title", "href", "text"];

const SLUG_KINDS = ["haberler", "etkinlikler", "meclisler", "calisma-gruplari"];

/** Boş olmayan string (subTitle hariç tüm metin alanları için) */
function assertNonEmptyString(value) {
  expect(typeof value).toBe("string");
  expect(value.length).toBeGreaterThan(0);
}

/** Kesin anahtar kümesi — eksik ve fazla alanı yakalar */
function assertExactKeys(obj, expectedKeys) {
  expect(typeof obj).toBe("object");
  expect(obj).not.toBeNull();
  expect(Object.keys(obj).sort()).toEqual([...expectedKeys].sort());
}

/** Yinelenen değerleri yakalar */
function assertUnique(values) {
  const seen = new Set();
  const duplicates = [];
  for (const v of values) {
    if (seen.has(v)) duplicates.push(v);
    seen.add(v);
  }
  expect(duplicates).toEqual([]);
}

function assertDetailItem(item) {
  assertExactKeys(item, DETAIL_ITEM_KEYS);
  assertNonEmptyString(item.title);
  assertNonEmptyString(item.desc);
}

/** News şekli tam doğrulama — tek kayıt veya liste için */
function assertNews(item) {
  assertExactKeys(item, NEWS_KEYS);
  for (const key of NEWS_KEYS) assertNonEmptyString(item[key]);
}

/** Event şekli tam doğrulama */
function assertEvent(item) {
  assertExactKeys(item, EVENT_KEYS);
  for (const key of EVENT_KEYS) assertNonEmptyString(item[key]);
}

/** Council + CouncilDetail tam doğrulama */
function assertCouncil(item) {
  assertExactKeys(item, COUNCIL_KEYS);
  assertNonEmptyString(item.id);
  assertNonEmptyString(item.slug);
  assertNonEmptyString(item.title);
  assertNonEmptyString(item.shortTitle);
  expect(typeof item.subTitle).toBe("string"); // boş olabilir
  assertNonEmptyString(item.description);
  assertNonEmptyString(item.link);
  assertNonEmptyString(item.img);
  expect(item.link).toBe(`/meclisler/${item.slug}`);
  assertExactKeys(item.detail, COUNCIL_DETAIL_KEYS);
  assertNonEmptyString(item.detail.about);
  assertNonEmptyString(item.detail.activities); // string, dizi değil
  expect(Array.isArray(item.detail.goals)).toBe(true);
  expect(item.detail.goals.length).toBeGreaterThan(0);
  for (const g of item.detail.goals) assertDetailItem(g);
  expect(Array.isArray(item.detail.projects)).toBe(true);
  expect(item.detail.projects.length).toBeGreaterThan(0);
  for (const p of item.detail.projects) assertDetailItem(p);
}

/** WorkingGroup + WorkingGroupDetail tam doğrulama */
function assertWorkingGroup(item) {
  assertExactKeys(item, COUNCIL_KEYS);
  assertNonEmptyString(item.id);
  assertNonEmptyString(item.slug);
  assertNonEmptyString(item.title);
  assertNonEmptyString(item.shortTitle);
  expect(typeof item.subTitle).toBe("string"); // boş olabilir (sanat, spor)
  assertNonEmptyString(item.description);
  assertNonEmptyString(item.link);
  assertNonEmptyString(item.img);
  expect(item.link).toBe(`/calisma-gruplari/${item.slug}`);
  assertExactKeys(item.detail, WG_DETAIL_KEYS);
  assertNonEmptyString(item.detail.about);
  assertNonEmptyString(item.detail.activities); // string, dizi değil
  expect(Array.isArray(item.detail.focusAreas)).toBe(true);
  expect(item.detail.focusAreas.length).toBeGreaterThan(0);
  for (const f of item.detail.focusAreas) assertDetailItem(f);
  expect(Array.isArray(item.detail.projects)).toBe(true);
  expect(item.detail.projects.length).toBeGreaterThan(0);
  for (const p of item.detail.projects) assertDetailItem(p);
}

/** SearchIndexEntry şekli tam doğrulama */
function assertSearchEntry(entry) {
  assertExactKeys(entry, SEARCH_ENTRY_KEYS);
  assertNonEmptyString(entry.slug);
  expect(SLUG_KINDS).toContain(entry.kind);
  assertNonEmptyString(entry.title);
  assertNonEmptyString(entry.href);
  expect(entry.href).toBe(`/${entry.kind}/${entry.slug}`);
  assertNonEmptyString(entry.text);
}

/**
 * Beklenen indeksi fixture'lardan üret (faz-2 buildSearchIndex mantığı):
 * her kayıttan { slug, kind, title, href, text } türetilir.
 */
function buildExpectedIndex() {
  const entries = [];
  const push = (item, kind, text) =>
    entries.push({ slug: item.slug, kind, title: item.title, href: `/${kind}/${item.slug}`, text });
  for (const n of haberler) push(n, "haberler", `${n.title} ${n.desc} ${n.content}`);
  for (const e of etkinlikler) push(e, "etkinlikler", `${e.title} ${e.desc} ${e.location}`);
  for (const m of meclisler)
    push(m, "meclisler", `${m.title} ${m.description} ${m.detail.about} ${m.detail.activities}`);
  for (const g of calismaGruplari)
    push(g, "calisma-gruplari", `${g.title} ${g.description} ${g.detail.about} ${g.detail.activities}`);
  return entries;
}

// ---------- shapes.js: typedef varlığı ve sıfır runtime ----------

const shapesPath = fileURLToPath(new URL("../lib/data/shapes.js", import.meta.url));
const shapesSrc = readFileSync(shapesPath, "utf8");

describe("shapes.js — typedef tanımları ve sıfır runtime", () => {
  it("tüm typedef adlarını tanımlar (News, Event, Council, WorkingGroup, SearchIndexEntry, SearchIndex, SlugKind)", () => {
    for (const name of ["News", "Event", "Council", "WorkingGroup", "SearchIndexEntry", "SearchIndex", "SlugKind"]) {
      expect(shapesSrc.includes(`@typedef`), true);
      expect(new RegExp(`@typedef[^]*\\b${name}\\b`).test(shapesSrc)).toBe(true);
    }
  });

  it("yalnızca yorum içerir — çalışma zamanı kodu üretmez", () => {
    const stripped = shapesSrc
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .trim();
    expect(stripped).toBe("");
  });
});

describe("SlugKind", () => {
  it("dört sayfa kökü değerini kapsar ve fixtures'ta kullanılır", () => {
    expect(SLUG_KINDS).toEqual(["haberler", "etkinlikler", "meclisler", "calisma-gruplari"]);
    const index = buildExpectedIndex();
    expect(new Set(index.map((e) => e.kind))).toEqual(new Set(SLUG_KINDS));
  });
});

// ---------- News ----------

describe("News — mocks/data/haberler.json", () => {
  it("her kayıt News şekline uyar (kesin anahtarlar + string tipler)", () => {
    expect(Array.isArray(haberler)).toBe(true);
    expect(haberler.length).toBeGreaterThan(0);
    for (const item of haberler) assertNews(item);
  });

  it("slug değerleri benzersizdir", () => {
    assertUnique(haberler.map((n) => n.slug));
  });
});

// ---------- Event ----------

describe("Event — mocks/data/etkinlikler.json", () => {
  it("her kayıt Event şekline uyar (kesin anahtarlar + string tipler)", () => {
    expect(Array.isArray(etkinlikler)).toBe(true);
    expect(etkinlikler.length).toBeGreaterThan(0);
    for (const item of etkinlikler) assertEvent(item);
  });

  it("slug değerleri benzersizdir", () => {
    assertUnique(etkinlikler.map((e) => e.slug));
  });
});

// ---------- Council ----------

describe("Council — mocks/data/meclisler.json", () => {
  it("her kayıt Council şekline uyar (detail.goals, activities string, link kalıbı)", () => {
    expect(Array.isArray(meclisler)).toBe(true);
    expect(meclisler.length).toBeGreaterThan(0);
    for (const item of meclisler) assertCouncil(item);
  });

  it("slug ve id değerleri benzersizdir", () => {
    assertUnique(meclisler.map((m) => m.slug));
    assertUnique(meclisler.map((m) => m.id));
  });
});

// ---------- WorkingGroup ----------

describe("WorkingGroup — mocks/data/calisma-gruplari.json", () => {
  it("her kayıt WorkingGroup şekline uyar (detail.focusAreas, activities string, link kalıbı)", () => {
    expect(Array.isArray(calismaGruplari)).toBe(true);
    expect(calismaGruplari.length).toBeGreaterThan(0);
    for (const item of calismaGruplari) assertWorkingGroup(item);
  });

  it("slug ve id değerleri benzersizdir", () => {
    assertUnique(calismaGruplari.map((g) => g.slug));
    assertUnique(calismaGruplari.map((g) => g.id));
  });

  it("subTitle boş string kalabilir (sanat ve spor tek kelimelik başlıklar)", () => {
    const empties = calismaGruplari.filter((g) => g.subTitle === "");
    expect(empties.map((g) => g.slug)).toEqual(["sanat", "spor"]);
    for (const g of calismaGruplari) expect(typeof g.subTitle).toBe("string");
  });
});

// ---------- SearchIndexEntry / SearchIndex ----------

describe("SearchIndexEntry / SearchIndex — fixture türevi indeks", () => {
  it("her indeks girdisi SearchIndexEntry şekline uyar (slug, kind, title, href, text)", () => {
    const index = buildExpectedIndex();
    expect(index.length).toBe(haberler.length + etkinlikler.length + meclisler.length + calismaGruplari.length);
    for (const entry of index) assertSearchEntry(entry);
  });

  it("indeks dört türün tamamını kapsar ve toplam 39 girdiyi içerir", () => {
    const index = buildExpectedIndex();
    const counts = {};
    for (const e of index) counts[e.kind] = (counts[e.kind] || 0) + 1;
    expect(counts).toEqual({ haberler: 6, etkinlikler: 6, meclisler: 5, "calisma-gruplari": 22 });
    expect(index.length).toBe(39);
  });
});
