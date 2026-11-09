/**
 * Faz 0 smoke testi — Vitest altyapısı + @/* path alias doğrulaması.
 * En az bir anlamlı test gereksinimini karşılar: alias çözümlemesi,
 * haberler.json veri şekli ve searchData.js server-side arama mantığı
 * (faz-4: search() artık async — buildSearchIndex üzerinden).
 */
import { describe, it, expect } from "vitest";

// @/* alias ile içe aktarma — vitest.config.mjs resolve.alias doğrulanır
import haberler from "@/mocks/data/haberler.json";
import { search } from "@/app/data/searchData.js";

// JSON içe aktarma CJS/ESM farkına karşı zarif çözüm: dizi ise doğrudan, değilse .default
const haberlerList = Array.isArray(haberler) ? haberler : haberler?.default;

describe("smoke — vitest + @/* alias", () => {
  it("@/* alias haberler.json'u çözümleyebilmeli", () => {
    expect(Array.isArray(haberlerList)).toBe(true);
    expect(haberlerList.length).toBeGreaterThan(0);
  });

  it("haberler girdilerinde slug ve title alanları olmalı", () => {
    for (const item of haberlerList) {
      expect(typeof item.slug).toBe("string");
      expect(item.slug.length).toBeGreaterThan(0);
      expect(typeof item.title).toBe("string");
      expect(item.title.length).toBeGreaterThan(0);
    }
  });

  it("haber slug'ları benzersiz olmalı", () => {
    const slugs = haberlerList.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("search() bilinen sorgu için sonuç döndürmeli", async () => {
    const results = await search("paneli");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThan(0);
  });

  it("search() boş sorguda boş dizi döndürmeli", async () => {
    expect(await search("")).toEqual([]);
    expect(await search("   ")).toEqual([]);
  });
});
