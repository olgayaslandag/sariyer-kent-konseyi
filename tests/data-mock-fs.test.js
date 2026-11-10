/**
 * Faz-9 mock FS read testleri — lib/data/sources/mock.js FS'ten okur.
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from "vitest";
import { readFile, writeFile, unlink, stat, mkdir } from "node:fs/promises";
import path from "node:path";

import { getNews, clearMockCache as clearMockCacheIndex } from "@/lib/data/index.js";
import { getNews as getNewsMock, clearMockCache as clearMockCacheMock, readMockJson } from "@/lib/data/sources/mock.js";

const DATA_DIR = path.join(process.cwd(), "mocks", "data");
const NEWS_FILE = path.join(DATA_DIR, "haberler.json");
const BACKUP_FILE = path.join("/tmp/opencode", "haberler.json.bak");
const TEMP_FILE = path.join(DATA_DIR, "_tmp_mock_fs_test.json");

beforeAll(async () => {
  await mkdir("/tmp/opencode", { recursive: true });
});

beforeEach(() => {
  vi.stubEnv("DATA_SOURCE", "mock");
  vi.stubEnv("API_BASE_URL", "");
  vi.stubEnv("SITE_URL", "");
  clearMockCacheMock();
  clearMockCacheIndex();
});

afterEach(() => {
  vi.unstubAllEnvs();
  clearMockCacheMock();
  clearMockCacheIndex();
});

async function backupNews() {
  const content = await readFile(NEWS_FILE, "utf8");
  await writeFile(BACKUP_FILE, content, "utf8");
}

async function restoreNews() {
  try {
    const content = await readFile(BACKUP_FILE, "utf8");
    await writeFile(NEWS_FILE, content, "utf8");
  } catch {
    // ignore
  }
  clearMockCacheMock();
  clearMockCacheIndex();
}

describe("mock FS read — getNews()", () => {
  it("getNews() 6 kayıt döner (FS'ten okunur)", async () => {
    const news = await getNews();
    expect(Array.isArray(news)).toBe(true);
    expect(news).toHaveLength(6);
    for (const n of news) {
      expect(typeof n.slug).toBe("string");
      expect(typeof n.title).toBe("string");
    }
  });

  it("mock source getNews() de 6 kayıt döner", async () => {
    const news = await getNewsMock();
    expect(news).toHaveLength(6);
  });

  it("slug'lar benzersizdir", async () => {
    const news = await getNews();
    const slugs = news.map((n) => n.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBe(6);
  });

  it("readMockJson FS'ten okur ve shallow clone döner", async () => {
    const data = await readMockJson("haberler.json");
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(6);
    data.push({ slug: "mutated" });
    const again = await readMockJson("haberler.json");
    expect(again).toHaveLength(6);
  });
});

describe("clearMockCache export", () => {
  it("index.js clearMockCache export eder (fonksiyon)", () => {
    expect(typeof clearMockCacheIndex).toBe("function");
  });

  it("mock source clearMockCache export eder (fonksiyon)", () => {
    expect(typeof clearMockCacheMock).toBe("function");
  });

  it("clearMockCache sonrası okuma yine çalışır", async () => {
    const first = await readMockJson("haberler.json");
    expect(first).toHaveLength(6);
    clearMockCacheMock();
    const second = await readMockJson("haberler.json");
    expect(second).toHaveLength(6);
  });
});

describe("FS tazeliği — temp JSON + clearMockCache", () => {
  it("temp JSON dosyası yazılır, readMockJson FS'ten okur, temizlenir", async () => {
    const payload = [{ slug: "temp-slug", title: "Temp" }];
    await writeFile(TEMP_FILE, JSON.stringify(payload), "utf8");

    try {
      const before = await readMockJson("_tmp_mock_fs_test.json");
      expect(before).toHaveLength(1);
      expect(before[0].slug).toBe("temp-slug");

      const payload2 = [{ slug: "temp-slug-2", title: "Temp2" }, { slug: "x", title: "X" }];
      await writeFile(TEMP_FILE, JSON.stringify(payload2), "utf8");
      clearMockCacheMock();
      const after = await readMockJson("_tmp_mock_fs_test.json");
      expect(after).toHaveLength(2);
      expect(after[0].slug).toBe("temp-slug-2");
    } finally {
      try {
        await unlink(TEMP_FILE);
      } catch {
        // ignore
      }
      clearMockCacheMock();
    }
  });

  it("haberler.json geçici değiştirilince getNews() değişir, geri yüklenir", async () => {
    await backupNews();
    try {
      const original = await getNews();
      const originalLen = original.length;
      expect(originalLen).toBe(6);

      const parsed = JSON.parse(await readFile(NEWS_FILE, "utf8"));
      const base = Array.isArray(parsed) ? parsed : parsed.default || [];
      base.push({ ...base[0], slug: "gecici-test-haber", title: "Geçici Test Haber" });
      await writeFile(NEWS_FILE, JSON.stringify(base, null, 2), "utf8");

      clearMockCacheMock();
      clearMockCacheIndex();

      const updated = await getNews();
      expect(updated).toHaveLength(originalLen + 1);
      expect(updated.some((n) => n.slug === "gecici-test-haber")).toBe(true);

      const again = await getNews();
      expect(again).toHaveLength(originalLen + 1);
    } finally {
      await restoreNews();
    }
  });

  it("geri yükleme sonrası getNews() orijinal 6 kayda döner", async () => {
    const news = await getNews();
    expect(news).toHaveLength(6);
    const slugs = news.map((n) => n.slug);
    expect(new Set(slugs).size).toBe(6);
  });
});

describe("FS okuma kanıtı — stat/mtime", () => {
  it("readMockJson var olmayan dosyada hata fırlatır", async () => {
    await expect(readMockJson("olmayan-dosya.json")).rejects.toThrow();
  });

  it("mocks/data/haberler.json dosyası diskte mevcut", async () => {
    const st = await stat(NEWS_FILE);
    expect(st.isFile()).toBe(true);
    expect(st.size).toBeGreaterThan(0);
  });
});
