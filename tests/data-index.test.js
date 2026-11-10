/**
 * Faz-2 index testleri — lib/data/index.js async public API (mock modda).
 * Kapsam: 10 fonksiyonun tamamı, null/throw semantiği, getSlugs iki
 * sözlüğü, buildSearchIndex SearchIndexEntry şekli + DATA_SOURCE=http
 * dispatch (fetch stub) + JSON import izolasyonu (tek okuma noktası).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  getNews,
  getNewsBySlug,
  getEvents,
  getEventsBySlug,
  getCouncils,
  getCouncilBySlug,
  getWorkingGroups,
  getWorkingGroupBySlug,
  getSlugs,
  buildSearchIndex,
} from "@/lib/data/index.js";

beforeEach(() => {
  vi.stubEnv("DATA_SOURCE", "mock");
  vi.stubEnv("API_BASE_URL", "");
  vi.stubEnv("SITE_URL", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

const SLUG_KINDS = ["haberler", "etkinlikler", "meclisler", "calisma-gruplari"];

describe("async sözleşme — tüm fonksiyonlar promise döner", () => {
  it("10 fonksiyon da thenable döndürür", async () => {
    const calls = [
      getNews(),
      getNewsBySlug("x"),
      getEvents(),
      getEventsBySlug("x"),
      getCouncils(),
      getCouncilBySlug("x"),
      getWorkingGroups(),
      getWorkingGroupBySlug("x"),
      getSlugs("news"),
      buildSearchIndex(),
    ];
    for (const p of calls) {
      expect(p).toBeInstanceOf(Promise);
      expect(typeof p.then).toBe("function");
    }
    await Promise.all(calls);
  });
});

describe("getNews / getNewsBySlug", () => {
  it("getNews 6 kayıt döner", async () => {
    const news = await getNews();
    expect(news).toHaveLength(6);
    expect(news[0].slug).toBe("sariyerde-yesil-alanlar-artiyor");
    for (const n of news) {
      expect(typeof n.slug).toBe("string");
      expect(typeof n.title).toBe("string");
    }
  });

  it("getNewsBySlug geçerli slug'da kayıt döner; yoksa null", async () => {
    const item = await getNewsBySlug("sariyerde-yesil-alanlar-artiyor");
    expect(item).not.toBeNull();
    expect(item.slug).toBe("sariyerde-yesil-alanlar-artiyor");
    expect(await getNewsBySlug("olmayan-slug")).toBeNull();
  });

  it("BySlug boş/non-string slug'da null döner (throw yok)", async () => {
    expect(await getNewsBySlug("")).toBeNull();
    expect(await getNewsBySlug("   ")).toBeNull();
    expect(await getNewsBySlug(null)).toBeNull();
    expect(await getNewsBySlug(undefined)).toBeNull();
  });
});

describe("getEvents / getEventsBySlug", () => {
  it("getEvents 6 kayıt döner", async () => {
    const events = await getEvents();
    expect(events).toHaveLength(6);
    expect(events[0].slug).toBe("yasli-gunu-bulusmasi");
  });

  it("getEventsBySlug geçerli slug'da kayıt döner; yoksa null", async () => {
    const item = await getEventsBySlug("yasli-gunu-bulusmasi");
    expect(item?.slug).toBe("yasli-gunu-bulusmasi");
    expect(await getEventsBySlug("yok")).toBeNull();
  });
});

describe("getCouncils / getCouncilBySlug", () => {
  it("getCouncils 5 kayıt döner; detail.goals dizi, activities string", async () => {
    const councils = await getCouncils();
    expect(councils).toHaveLength(5);
    for (const c of councils) {
      expect(typeof c.id).toBe("string");
      expect(Array.isArray(c.detail.goals)).toBe(true);
      expect(typeof c.detail.activities).toBe("string");
    }
  });

  it("getCouncilBySlug ilk meclisi döner; yoksa null", async () => {
    const item = await getCouncilBySlug("genclik");
    expect(item?.slug).toBe("genclik");
    expect(item?.title).toBe("Gençlik Meclisi");
    expect(await getCouncilBySlug("yok")).toBeNull();
  });
});

describe("getWorkingGroups / getWorkingGroupBySlug", () => {
  it("getWorkingGroups 22 kayıt döner; detail.focusAreas dizi, activities string", async () => {
    const groups = await getWorkingGroups();
    expect(groups).toHaveLength(22);
    for (const g of groups) {
      expect(Array.isArray(g.detail.focusAreas)).toBe(true);
      expect(typeof g.detail.activities).toBe("string");
    }
  });

  it("getWorkingGroupBySlug ilk grubu döner; yoksa null", async () => {
    const item = await getWorkingGroupBySlug("cevre");
    expect(item?.slug).toBe("cevre");
    expect(await getWorkingGroupBySlug("yok")).toBeNull();
  });
});

describe("getSlugs(kind)", () => {
  it("İngilizce kind adlarıyla (plan §4.2) slug listesi döner", async () => {
    expect(await getSlugs("news")).toHaveLength(6);
    expect(await getSlugs("events")).toHaveLength(6);
    expect(await getSlugs("councils")).toHaveLength(5);
    expect(await getSlugs("working-groups")).toHaveLength(22);
  });

  it("Türkçe SlugKind adlarıyla da aynı listeleri döner", async () => {
    expect(await getSlugs("haberler")).toEqual(await getSlugs("news"));
    expect(await getSlugs("etkinlikler")).toEqual(await getSlugs("events"));
    expect(await getSlugs("meclisler")).toEqual(await getSlugs("councils"));
    expect(await getSlugs("calisma-gruplari")).toEqual(await getSlugs("working-groups"));
  });

  it("bilinmeyen kind için TypeError fırlatır", async () => {
    await expect(getSlugs("bilinmeyen")).rejects.toThrowError(TypeError);
    await expect(getSlugs("")).rejects.toThrowError(TypeError);
    await expect(getSlugs(null)).rejects.toThrowError(TypeError);
  });
});

describe("buildSearchIndex()", () => {
  it("39 kayıt döner; her girdi SearchIndexEntry şeklindedir", async () => {
    const index = await buildSearchIndex();
    expect(index).toHaveLength(39);
    for (const entry of index) {
      expect(Object.keys(entry).sort()).toEqual(["href", "kind", "slug", "text", "title"]);
      expect(typeof entry.slug).toBe("string");
      expect(SLUG_KINDS).toContain(entry.kind);
      expect(entry.href).toBe(`/${entry.kind}/${entry.slug}`);
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.text.length).toBeGreaterThan(0);
    }
  });

  it("kind dağılımı {haberler:6, etkinlikler:6, meclisler:5, calisma-gruplari:22}", async () => {
    const index = await buildSearchIndex();
    const counts = {};
    for (const e of index) counts[e.kind] = (counts[e.kind] || 0) + 1;
    expect(counts).toEqual({ haberler: 6, etkinlikler: 6, meclisler: 5, "calisma-gruplari": 22 });
  });

  it("eski searchData şekli (type/raw) taşımaz", async () => {
    const index = await buildSearchIndex();
    for (const e of index) {
      expect(e).not.toHaveProperty("type");
      expect(e).not.toHaveProperty("raw");
    }
  });
});

describe("DATA_SOURCE=http dispatch (sözleşme kanıtı)", () => {
  it("DATA_SOURCE=http + API_BASE_URL yoksa HTTP iskeleti hata fırlatır", async () => {
    vi.stubEnv("DATA_SOURCE", "http");
    vi.stubEnv("API_BASE_URL", "");
    await expect(getNews()).rejects.toThrowError(/API_BASE_URL/);
  });

  it("DATA_SOURCE=http fetch'e düşer (stub fetch ile doğrulanır)", async () => {
    vi.stubEnv("DATA_SOURCE", "http");
    vi.stubEnv("API_BASE_URL", "https://api.example.com");
    const fetchMock = vi.fn(async (url) => ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => [{ slug: "ornek-haber", title: "Örnek Haber" }],
    }));
    vi.stubGlobal("fetch", fetchMock);
    const news = await getNews();
    expect(news).toEqual([{ slug: "ornek-haber", title: "Örnek Haber" }]);
    expect(fetchMock).toHaveBeenCalledWith("https://api.example.com/haberler");
  });

  it("DATA_SOURCE=mock varsayılan fetch'e gitmez (ağ bağımsız build)", async () => {
    vi.stubEnv("DATA_SOURCE", "mock");
    const fetchMock = vi.fn(async () => {
      throw new Error("fetch çağrılmamalı");
    });
    vi.stubGlobal("fetch", fetchMock);
    const news = await getNews();
    expect(news).toHaveLength(6);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("JSON import izolasyonu (tek okuma noktası)", () => {
  const read = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

  it("JSON import yalnızca sources/mock.js içindedir", () => {
    const mockSrc = read("../lib/data/sources/mock.js");
    const indexSrc = read("../lib/data/index.js");
    const configSrc = read("../lib/data/config.js");
    const httpSrc = read("../lib/data/sources/http.js");

    for (const name of ["haberler.json", "etkinlikler.json", "meclisler.json", "calisma-gruplari.json"]) {
      expect(mockSrc.includes(name)).toBe(true);
      expect(indexSrc.includes(name)).toBe(false);
      expect(configSrc.includes(name)).toBe(false);
      expect(httpSrc.includes(name)).toBe(false);
    }
    expect(httpSrc.includes("app/data")).toBe(false);
    expect(indexSrc.includes("app/data")).toBe(false);
    expect(configSrc.includes("app/data")).toBe(false);
  });
});

describe("ISR cache tag (faz-9 Option A)", () => {
  it("lib/data/index.js unstable_cacheTag referansı içermez", () => {
    const indexSrc = readFileSync(fileURLToPath(new URL("../lib/data/index.js", import.meta.url)), "utf8");
    expect(indexSrc.includes("unstable_cacheTag")).toBe(false);
  });

  it("lib/data/index.js cacheTag importunu kullanır", () => {
    const indexSrc = readFileSync(fileURLToPath(new URL("../lib/data/index.js", import.meta.url)), "utf8");
    expect(indexSrc.includes("cacheTag")).toBe(true);
  });
});
