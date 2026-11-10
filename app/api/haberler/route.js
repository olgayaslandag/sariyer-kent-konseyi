/**
 * @file app/api/haberler/route.js — thin mock route (faz-8)
 *
 * GET /api/haberler → News[] (mocks/data/haberler.json üzerinden).
 *
 * - Salt-okunur, DB yok; veri `lib/data/sources/mock.js`'ten gelir
 *   (JSON import yasağı korunur: bu dosya JSON okumaz).
 * - `lib/data/index.js` KULLANILMAZ — bilerek. index.js DATA_SOURCE=http
 *   iken sources/http.js'e (yani bu route'un kendisinin de yaşadığı
 *   API_BASE_URL'e) düşer ve sonsuz döngü oluşur. Mock route daima
 *   mock kaynağını döndürür; http.js de API_BASE_URL=(...)/api iken
 *   buradan beslenir.
 * - http.js sözleşmesiyle birebir: {API_BASE_URL}/haberler → dizi.
 *   (Örn. DATA_SOURCE=http, API_BASE_URL=http://localhost:3000/api)
 * - Next App Router route handler; GET dışında metod yok (405 Next varsayılan).
 */

import { getNews } from "../../../lib/data/sources/mock.js";

/** Thin mock verisi build'de statikleşir; runtime'da DB/enrichment yok. */
export const dynamic = "force-dynamic";

/** GET /api/haberler → News[] */
export async function GET() {
  const items = await getNews();
  return Response.json(items, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
    },
  });
}
