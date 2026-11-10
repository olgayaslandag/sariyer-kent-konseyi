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
 * @param {string} kind — koleksiyon kind'ı (örn. "haberler")
 * @param {string} slug — kayıt slug'ı
 * @returns {string}
 */
export function slugTag(kind, slug) {
  return `${kind}:${String(slug ?? "").trim()}`;
}
