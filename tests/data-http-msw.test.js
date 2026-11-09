/**
 * Faz-8 MSW testleri — DATA_SOURCE=http akışını mock service ile uçtan uca.
 *
 * Fark: önceki data-index.test.js http.js'i `vi.stubGlobal('fetch', ...)`
 * ile sahte fetch'ledi; burada gerçek fetch, msw/node sunucusu
 * (tests/msw/) tarafından kesilir. http.js -> fetch -> MSW -> mocks/data
 * zinciri doğrulanır; endpoint/path sözleşmesi {API_BASE_URL}/haberler
 * vb. MSW handler'larıyla eşleşir.
 */

import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from "vitest";
import { http, HttpResponse } from "msw";

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
import { server } from "./msw/server.js";
import { TEST_API_BASE_URL } from "./msw/handlers.js";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  vi.stubEnv("DATA_SOURCE", "http");
  vi.stubEnv("API_BASE_URL", TEST_API_BASE_URL);
  vi.stubEnv("SITE_URL", "");
});

afterEach(() => {
  server.resetHandlers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterAll(() => {
  server.close();
});

describe("MSW — DATA_SOURCE=http liste akışı (gerçek fetch, mock service)", () => {
  it("getNews MSW üzerinden 6 kayıt döner (haberler endpoint'i)", async () => {
    const news = await getNews();
    expect(news).toHaveLength(6);
    expect(news[0].slug).toBe("sariyerde-yesil-alanlar-artiyor");
  });

  it("getEvents MSW üzerinden 6 kayıt döner", async () => {
    const events = await getEvents();
    expect(events).toHaveLength(6);
    expect(events[0].slug).toBe("yasli-gunu-bulusmasi");
  });

  it("getCouncils MSW üzerinden 5 kayıt döner", async () => {
    const councils = await getCouncils();
    expect(councils).toHaveLength(5);
    expect(councils[0].slug).toBe("genclik");
  });

  it("getWorkingGroups MSW üzerinden 22 kayıt döner", async () => {
    const groups = await getWorkingGroups();
    expect(groups).toHaveLength(22);
    expect(groups[0].slug).toBe("cevre");
  });
});

describe("MSW — *BySlug liste+filtre üzerinden (tekil endpoint yok)", () => {
  it("getNewsBySlug geçerli slug'da kayıt, yoksa null", async () => {
    const item = await getNewsBySlug("sariyerde-yesil-alanlar-artiyor");
    expect(item?.slug).toBe("sariyerde-yesil-alanlar-artiyor");
    expect(await getNewsBySlug("olmayan-slug")).toBeNull();
    expect(await getNewsBySlug("")).toBeNull();
  });

  it("getEventsBySlug / getCouncilBySlug / getWorkingGroupBySlug aynı kural", async () => {
    await expect(getEventsBySlug("yasli-gunu-bulusmasi")).resolves.toMatchObject({
      slug: "yasli-gunu-bulusmasi",
    });
    await expect(getCouncilBySlug("genclik")).resolves.toMatchObject({ slug: "genclik" });
    await expect(getWorkingGroupBySlug("cevre")).resolves.toMatchObject({ slug: "cevre" });
    await expect(getEventsBySlug("yok")).resolves.toBeNull();
    await expect(getCouncilBySlug("yok")).resolves.toBeNull();
    await expect(getWorkingGroupBySlug("yok")).resolves.toBeNull();
  });
});

describe("MSW — getSlugs + buildSearchIndex", () => {
  it("getSlugs 4 koleksiyonda da MSW verisinden slug listesi döner", async () => {
    expect(await getSlugs("haberler")).toHaveLength(6);
    expect(await getSlugs("etkinlikler")).toHaveLength(6);
    expect(await getSlugs("meclisler")).toHaveLength(5);
    expect(await getSlugs("calisma-gruplari")).toHaveLength(22);
    expect(await getSlugs("news")).toEqual(await getSlugs("haberler"));
    expect(await getSlugs("working-groups")).toEqual(await getSlugs("calisma-gruplari"));
  });

  it("buildSearchIndex 39 girdi döner; kind/href şekli mock ile aynı", async () => {
    const index = await buildSearchIndex();
    expect(index).toHaveLength(39);
    const counts = {};
    for (const entry of index) {
      expect(Object.keys(entry).sort()).toEqual(["href", "kind", "slug", "text", "title"]);
      expect(entry.href).toBe(`/${entry.kind}/${entry.slug}`);
      counts[entry.kind] = (counts[entry.kind] || 0) + 1;
    }
    expect(counts).toEqual({
      haberler: 6,
      etkinlikler: 6,
      meclisler: 5,
      "calisma-gruplari": 22,
    });
  });
});

describe("MSW — hata semantiği (http.js yeniden fırlatır)", () => {
  it("500 durumunda http.js durum bilgili hata fırlatır", async () => {
    server.use(
      http.get(`${TEST_API_BASE_URL}/haberler`, () =>
        HttpResponse.json({ error: "sunucu hatası" }, { status: 500 }),
      ),
    );
    await expect(getNews()).rejects.toThrowError(/500/);
  });

  it("404 durumunda http.js durum bilgili hata fırlatır", async () => {
    server.use(
      http.get(`${TEST_API_BASE_URL}/etkinlikler`, () =>
        HttpResponse.json({ error: "bulunamadı" }, { status: 404 }),
      ),
    );
    await expect(getEvents()).rejects.toThrowError(/404/);
  });

  it("ağ hatasında http.js 'alınamadı' hatası fırlatır", async () => {
    server.use(
      http.get(`${TEST_API_BASE_URL}/meclisler`, () => HttpResponse.error()),
    );
    await expect(getCouncils()).rejects.toThrowError(/alınamadı/);
  });
});

describe("MSW — API_BASE_URL sözleşmesi", () => {
  it("sondaki '/' temizlenir; MSW handler'ı yine eşleşir", async () => {
    vi.stubEnv("API_BASE_URL", `${TEST_API_BASE_URL}/`);
    const news = await getNews();
    expect(news).toHaveLength(6);
  });
});
