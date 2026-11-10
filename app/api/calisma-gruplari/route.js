/**
 * @file app/api/calisma-gruplari/route.js — thin mock route (faz-8)
 *
 * GET /api/calisma-gruplari → WorkingGroup[]
 * (mocks/data/calisma-gruplari.json üzerinden).
 *
 * - Salt-okunur, DB yok; veri `lib/data/sources/mock.js`'ten gelir
 *   (bu dosya JSON okumaz — import yasağı korunur).
 * - `lib/data/index.js` KULLANILMAZ — bilerek. index.js DATA_SOURCE=http
 *   iken sources/http.js'e düşer; mock route daima mock kaynağını
 *   döndürür, döngü oluşmaz.
 * - http.js sözleşmesiyle birebir: {API_BASE_URL}/calisma-gruplari → dizi.
 */

import { getWorkingGroups } from "../../../lib/data/sources/mock.js";

/** Thin mock verisi build'de statikleşir; runtime'da DB/enrichment yok. */
export const dynamic = "force-dynamic";

/** GET /api/calisma-gruplari → WorkingGroup[] */
export async function GET() {
  const items = await getWorkingGroups();
  return Response.json(items, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
    },
  });
}
