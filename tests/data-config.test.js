/**
 * Faz-2 config testleri — lib/data/config.js env çözümleme.
 * Vitest stubEnv ile process.env canlı değişimi doğrular (önbelleksiz getConfig).
 */
import { describe, it, expect, afterEach, vi } from "vitest";

import {
  DEFAULT_SITE_URL,
  getConfig,
  getDataSource,
  getSiteUrl,
  getApiBaseUrl,
  resolveConfig,
  resolveDataSource,
  resolveSiteUrl,
  resolveApiBaseUrl,
} from "@/lib/data/config.js";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveDataSource", () => {
  it("varsayılan 'mock': boş/geçersiz/non-string için fallback", () => {
    expect(resolveDataSource(undefined)).toBe("mock");
    expect(resolveDataSource(null)).toBe("mock");
    expect(resolveDataSource("")).toBe("mock");
    expect(resolveDataSource("   ")).toBe("mock");
    expect(resolveDataSource("cms")).toBe("mock");
    expect(resolveDataSource("MOCK")).toBe("mock");
    expect(resolveDataSource("mock")).toBe("mock");
    expect(resolveDataSource(123)).toBe("mock");
  });

  it("'http' (büyük/küçük harf + boşluk toleransı) seçilir", () => {
    expect(resolveDataSource("http")).toBe("http");
    expect(resolveDataSource("HTTP")).toBe("http");
    expect(resolveDataSource("  http  ")).toBe("http");
  });
});

describe("resolveSiteUrl", () => {
  it("varsayılan https://sariyerkentkonseyi.org", () => {
    expect(DEFAULT_SITE_URL).toBe("https://sariyerkentkonseyi.org");
    expect(resolveSiteUrl(undefined)).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl("")).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl("not-a-url")).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl("ftp://example.com")).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl("javascript:alert(1)")).toBe(DEFAULT_SITE_URL);
  });

  it("geçerli URL korunur, sondaki '/' temizlenir", () => {
    expect(resolveSiteUrl("https://example.com")).toBe("https://example.com");
    expect(resolveSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(resolveSiteUrl("https://example.com///")).toBe("https://example.com");
    expect(resolveSiteUrl("  https://example.com/  ")).toBe("https://example.com");
  });
});

describe("resolveApiBaseUrl", () => {
  it("boş için '' döner (http.js hata fırlatır)", () => {
    expect(resolveApiBaseUrl(undefined)).toBe("");
    expect(resolveApiBaseUrl("")).toBe("");
    expect(resolveApiBaseUrl(42)).toBe("");
  });

  it("sondaki '/' temizlenir, göreceli path korunur", () => {
    expect(resolveApiBaseUrl("/api/")).toBe("/api");
    expect(resolveApiBaseUrl("https://api.example.com/v1/")).toBe(
      "https://api.example.com/v1",
    );
    expect(resolveApiBaseUrl("  /api  ")).toBe("/api");
  });
});

describe("resolveConfig / getConfig", () => {
  it("boş env'de {mock, '', default SITE_URL} döner", () => {
    expect(resolveConfig({})).toEqual({
      dataSource: "mock",
      apiBaseUrl: "",
      siteUrl: DEFAULT_SITE_URL,
    });
  });

  it("tam dolu env okunur", () => {
    expect(
      resolveConfig({
        DATA_SOURCE: "http",
        API_BASE_URL: "https://api.example.com/",
        SITE_URL: "https://sariyer.example/",
      }),
    ).toEqual({
      dataSource: "http",
      apiBaseUrl: "https://api.example.com",
      siteUrl: "https://sariyer.example",
    });
  });

  it("get* yardımcıları canlı process.env'i okur (stubEnv yansır)", () => {
    vi.stubEnv("DATA_SOURCE", "http");
    vi.stubEnv("API_BASE_URL", "https://api.example.com");
    vi.stubEnv("SITE_URL", "https://sariyer.example/");
    expect(getDataSource()).toBe("http");
    expect(getApiBaseUrl()).toBe("https://api.example.com");
    expect(getSiteUrl()).toBe("https://sariyer.example");
    expect(getConfig().dataSource).toBe("http");
  });

  it("getConfig önbelleksizdir: stubEnv değişimi anında görünür", () => {
    vi.stubEnv("DATA_SOURCE", "mock");
    expect(getConfig().dataSource).toBe("mock");
    vi.stubEnv("DATA_SOURCE", "http");
    expect(getConfig().dataSource).toBe("http");
  });
});
