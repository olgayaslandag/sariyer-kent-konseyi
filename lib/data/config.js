/**
 * @file lib/data/config.js — veri katmanı env çözümleme (faz-2)
 *
 * Runtime/env okumanın tek merkezi. Node built-in dışında bağımlılık yok,
 * saf JavaScript. Next.js tarafında yalnızca server tarafı (page.js /
 * generateStaticParams / route handler) kullanılmalıdır; "use client"
 * bileşenler bu modülü import etmez (plan §4.3).
 *
 * Okunan değişkenler:
 *   DATA_SOURCE  — 'mock' (varsayılan) | 'http'
 *                  Boş, geçersiz veya büyük/küçük harf farkı durumunda
 *                  'mock' fallback'i uygulanır (yalnızca 'http' değeri
 *                  http seçer). Build'de ağ bağımlılığını önlemek için
 *                  varsayılan mock'tur; runtime http geçişi env ile yapılır.
 *   API_BASE_URL — headless API kök URL'i (örn. 'https://api.example.com'
 *                  veya '/api'). http kaynağı için gerekir. Boşsa '' döner
 *                  ve http.js somut hata fırlatır. Sondaki '/' temizlenir.
 *   SITE_URL     — canonical/sitemap/metadata için site kökü.
 *                  Varsayılan 'https://sariyerkentkonseyi.org'.
 *                  Boş/geçersiz (http/https dışı veya URL değil) ise
 *                  varsayılan fallback'tir. Sondaki '/' temizlenir.
 *                  NEXT_PUBLIC_SITE_URL okuması bu fazda yok; client
 *                  gereksinimi faz-5'te değerlendirilecek.
 *
 * Tasarım: getConfig() her çağrıda process.env'i taze okur (önbellek yok),
 * böylece testlerde vi.stubEnv ile değişen env anında yansır ve runtime
 * env değişimleri modül ilk yüklenişinde donmaz. Saf çözümleyiciler
 * (resolve*) env nesnesi alarak test edilebilir; get* yardımcıları
 * process.env üzerinden çözer.
 */

/** SITE_URL varsayılanı */
export const DEFAULT_SITE_URL = "https://sariyerkentkonseyi.org";

/** DATA_SOURCE geçerli değerleri */
export const VALID_DATA_SOURCES = Object.freeze(["mock", "http"]);

/**
 * DATA_SOURCE ham değerini geçerli değere indirir.
 * Geçersiz/boş/herhangi bir non-string için 'mock' fallback'i döner.
 * @param {unknown} raw
 * @returns {"mock"|"http"}
 */
export function resolveDataSource(raw) {
  if (typeof raw !== "string") return "mock";
  return raw.trim().toLowerCase() === "http" ? "http" : "mock";
}

/**
 * SITE_URL ham değerini doğrular ve normalize eder.
 * @param {unknown} raw
 * @returns {string}
 */
export function resolveSiteUrl(raw) {
  if (typeof raw !== "string") return DEFAULT_SITE_URL;
  const candidate = raw.trim().replace(/\/+$/, "");
  if (!candidate) return DEFAULT_SITE_URL;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return DEFAULT_SITE_URL;
  } catch {
    return DEFAULT_SITE_URL;
  }
  return candidate;
}

/**
 * API_BASE_URL ham değerini normalize eder.
 * Göreceli path ('/api') geçerli olduğundan URL doğrulaması yapılmaz;
 * boş ise '' (http.js hata fırlatır), sondaki '/' temizlenir.
 * @param {unknown} raw
 * @returns {string}
 */
export function resolveApiBaseUrl(raw) {
  if (typeof raw !== "string") return "";
  return raw.trim().replace(/\/+$/, "");
}

/**
 * Çözümlenmiş veri katmanı konfigürasyonu.
 * @typedef {{dataSource: "mock"|"http", apiBaseUrl: string, siteUrl: string}} DataConfig
 */

/**
 * Saf çözümleyici — verilen env nesnesinden DataConfig üretir.
 * @param {Record<string, string|undefined>} [env] — verilmezse process.env
 * @returns {Readonly<DataConfig>}
 */
export function resolveConfig(env = process.env) {
  const source = env && typeof env === "object" ? env : process.env;
  return Object.freeze({
    dataSource: resolveDataSource(source.DATA_SOURCE),
    apiBaseUrl: resolveApiBaseUrl(source.API_BASE_URL),
    siteUrl: resolveSiteUrl(source.SITE_URL),
  });
}

/**
 * Canlı env'den çözümlenmiş konfigürasyon (her çağrıda taze).
 * @returns {Readonly<DataConfig>}
 */
export function getConfig() {
  return resolveConfig(process.env);
}

/**
 * Yalnızca DATA_SOURCE değerini döndürür — veri katmanı seçimi için.
 * @returns {"mock"|"http"}
 */
export function getDataSource() {
  return getConfig().dataSource;
}

/**
 * Yalnızca SITE_URL değerini döndürür — sitemap/metadata/canonical için.
 * @returns {string}
 */
export function getSiteUrl() {
  return getConfig().siteUrl;
}

/**
 * Yalnızca API_BASE_URL değerini döndürür — http kaynağı için.
 * @returns {string}
 */
export function getApiBaseUrl() {
  return getConfig().apiBaseUrl;
}
