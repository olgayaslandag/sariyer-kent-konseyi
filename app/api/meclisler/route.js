/**
 * @file app/api/meclisler/route.js — thin mock route (faz-8)
 *
 * GET /api/meclisler → Council[] (mocks/data/meclisler.json üzerinden).
 *
 * - Salt-okunur, DB yok; veri `lib/data/sources/mock.js`'ten gelir
 *   (bu dosya JSON okumaz — import yasağı korunur).
 * - `lib/data/index.js` KULLANILMAZ — bilerek. index.js DATA_SOURCE=http
 *   iken sources/http.js'e düşer; mock route daima mock kaynağını
 *   döndürür, döngü oluşmaz.
 * - http.js sözleşmesiyle birebir: {API_BASE_URL}/meclisler → dizi.
 */

import { getCouncils } from "../../../lib/data/sources/mock.js";

/** Thin mock verisi build'de statikleşir; runtime'da DB/enrichment yok. */
export const dynamic = "force-static";

/** GET /api/meclisler → Council[] */
export async function GET() {
  const items = await getCouncils();
  return Response.json(items, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
    },
  });
}
