/**
 * @file app/api/etkinlikler/route.js — thin mock route (faz-8)
 *
 * GET /api/etkinlikler → Event[] (mocks/data/etkinlikler.json üzerinden).
 *
 * - Salt-okunur, DB yok; veri `lib/data/sources/mock.js`'ten gelir
 *   (bu dosya JSON okumaz — import yasağı korunur).
 * - `lib/data/index.js` KULLANILMAZ — bilerek. index.js DATA_SOURCE=http
 *   iken sources/http.js'e düşer; mock route daima mock kaynağını
 *   döndürür, döngü oluşmaz.
 * - http.js sözleşmesiyle birebir: {API_BASE_URL}/etkinlikler → dizi.
 */

import { getEvents } from "../../../lib/data/sources/mock.js";

/** Thin mock verisi build'de statikleşir; runtime'da DB/enrichment yok. */
export const dynamic = "force-dynamic";

/** GET /api/etkinlikler → Event[] */
export async function GET() {
  const items = await getEvents();
  return Response.json(items, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
    },
  });
}
