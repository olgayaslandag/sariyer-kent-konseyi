/**
 * @file lib/data/tags.js — ISR cache tag sabitleri (faz-9)
 *
 * unstable_cache (next/cache) ve on-demand revalidate route tarafından
 * paylaşılan cache tag adları. Tag adları Türkçe path segmentleriyle
 * uyumludur; slugTag() ile tekil kayıt tag'i üretilir.
 */

export const TAGS = Object.freeze({
  NEWS: "haberler",
  EVENTS: "etkinlikler",
  COUNCILS: "meclisler",
  WORKING_GROUPS: "calisma-gruplari",
  SEARCH: "arama",
});

/**
 * Tekil kayıt için cache tag üretir.
 *
 * Not (faz-9 Option A): per-slug dinamik tag'ler şu an ISR katmanında
 * uygulanmıyor (cacheTag yalnızca "use cache" içinde çalışır). Bu
 * fonksiyon gelecekte (Option B / cacheComponents geçişi) kullanılmak
 * üzere saklıdır ("reserved for future use"). Slug-level purge şu an
 * koleksiyon tag'i (TAGS.*) üzerinden çalışır.
 *
 * @param {string} kind — koleksiyon kind'ı (örn. "haberler")
 * @param {string} slug — kayıt slug'ı
 * @returns {string}
 */
export function slugTag(kind, slug) {
  return `${kind}:${String(slug ?? "").trim()}`;
}
