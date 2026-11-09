/**
 * @file app/data/searchData.js — server-side arama yardımcısı (faz-4)
 *
 * Faz-3'te bu modül mock veri dosyalarını doğrudan import eden tam
 * arama dizini + senkron search() içeriyordu ve "use client" dosyalar
 * (SearchOverlay, SearchResultsClient) tarafından import ediliyordu.
 * Faz-4'te:
 * - Doğrudan veri dosyası import tamamen kaldırıldı
 *   (tek okuma noktası lib/data/sources/mock.js).
 * - Dizin lib/data buildSearchIndex() üzerinden kurulur (async).
 * - Arama server tarafında app/arama/page.js'de çalışır; sonuçları
 *   props ile SearchResultsClient'a iner.
 * - Bu modül SADECE server tarafında import edilmelidir; client-side
 *   dosyalar bunu import etmez (kabul kriteri).
 *
 * Exportlar (faz-6 temizliği sonrası):
 * - normalize(text)       — metin normalizasyonu (saf fonksiyon)
 * - KIND_LABELS           — SlugKind -> UI etiketi eşlemesi
 * - runSearch(index, q)   — hazır SearchIndex üzerinde skorlamalı arama (saf)
 * - search(query)         — buildSearchIndex() + runSearch() birleşik (async)
 *
 * Faz-6'da ölü `searchIndex()` exportu silindi: hiçbiri tarafından import
 * edilmiyordu ve `search()` onu kullanmadan doğrudan buildSearchIndex()
 * çağırıyordu (gereksiz dolaylı katman). `normalize`/`KIND_LABELS`
 * `runSearch` tarafından aktif kullanıldığı için canlıdır; `search`
 * tests/smoke.test.js tarafından doğrulanır.
 *
 * Dosya server-only kalmıştır: yalnızca server tarafı (app/arama/page.js)
 * import eder; "use client" bileşenler import etmez.
 */

import { buildSearchIndex } from "../../lib/data/index.js";

/**
 * @param {string} text
 * @returns {string}
 */
export const normalize = (text) =>
  String(text ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/”/g, '"')
    .replace(/“/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/**
 * SlugKind (buildSearchIndex) -> kullanıcıya gösterilen Türkçe etiket.
 * @type {Record<string, string>}
 */
export const KIND_LABELS = {
  haberler: "Haber",
  etkinlikler: "Etkinlik",
  calisma_gruplari: "Çalışma Grubu",
  meclisler: "Meclis",
};

/**
 * Hazır SearchIndex üzerinde skorlamalı arama: her token, başlıkta
 * eşleşirse +3, genel metinde eşleşirse +1 puan verir.
 * @param {import("../../lib/data/shapes.js").SearchIndex} index
 * @param {string} query
 * @returns {Array<import("../../lib/data/shapes.js").SearchIndexEntry & { type: string, score: number }>}
 */
export const runSearch = (index, query) => {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);
  return (Array.isArray(index) ? index : [])
    .map((entry) => {
      let score = 0;
      const text = normalize(entry.text ?? "");
      tokens.forEach((token) => {
        if (text.includes(token)) score += 1;
        if (normalize(entry.title ?? "").includes(token)) score += 3;
      });
      return {
        ...entry,
        type: KIND_LABELS[entry.kind] ?? entry.kind,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

/**
 * Birleşik server-side arama: indeksi kurup skorlar.
 * @param {string} query
 * @returns {Promise<Array<import("../../lib/data/shapes.js").SearchIndexEntry & { type: string, score: number }>>}
 */
export async function search(query) {
  const index = await buildSearchIndex();
  return runSearch(index, query);
}
