# Sarıyer Kent Konseyi — Next.js

Bootstrap tasarımının Next.js App Router ile yeniden yapılandırılmış sürümüdür.

## Stack

- Next.js 16.4.5
- React 19
- App Router (SSG prerender)
- Merkezi `app/globals.css`
- Yerel görseller: `public/img/` (her içerik türünün kendi görselleri; placeholder CDN kullanılmıyor)

## Kurulum

```bash
npm install
npm run dev
```

Sonra `http://localhost:3000` adresini açın.

Production:

```bash
npm run build
npm start
```

## Mimari — veri katmanı (`lib/data`)

Uygulama verisini tek katmandan okur; sayfa ve bileşenler JSON dosyasını
doğrudan import etmez.

```
lib/data/
├── config.js          # DATA_SOURCE / API_BASE_URL / SITE_URL çözümleme
├── shapes.js          # JSDoc @typedef (News, Event, Council, WorkingGroup, SearchIndex)
├── index.js           # Public API — tek giriş noktası (async)
└── sources/
    ├── mock.js        # mocks/data/*.json okur (JSON okuyan TEK modül)
    └── http.js        # DATA_SOURCE=http iken API_BASE_URL üzerinden fetch

mocks/data/
├── haberler.json
├── etkinlikler.json
├── meclisler.json
└── calisma-gruplari.json
```

Veri akışı:

```
page.js (server, async)
  └── lib/data/index.js ── DATA_SOURCE=mock ──> sources/mock.js ──> mocks/data/*.json
                         ── DATA_SOURCE=http  ──> sources/http.js ──> API_BASE_URL
  └── <HomeClient props={...} /> ("use client", sadece props render eder)
```

Public API (`lib/data/index.js`, tamamı async):

```js
getNews() / getNewsBySlug(slug)
getEvents() / getEventsBySlug(slug)
getCouncils() / getCouncilBySlug(slug)
getWorkingGroups() / getWorkingGroupBySlug(slug)
getSlugs(kind)       // kind: 'news'|'haberler'|'events'|'etkinlikler'|'councils'|'meclisler'|'working-groups'|'calisma-gruplari'
buildSearchIndex()   // server-side arama indeksi → app/data/searchData.js runSearch() ile skorlanır
```

### mock ↔ http geçişi

`DATA_SOURCE` env değişkeni kaynağı seçer (varsayılan `mock`):

- `mock` — `mocks/data/*.json` (build'de ağ bağımlılığı yok).
- `http` — `API_BASE_URL` köküne `GET /haberler`, `/etkinlikler`,
  `/meclisler`, `/calisma-gruplari` istekleri (`sources/http.js`).

SSG sayfaları veriyi build'de gömer; `http` modda build ağa erişir.
Runtime'da kaynak değiştirmek için image yeniden build edilir.

### Thin mock API (`app/api/*`)

Uygulamanın kendi içinde, salt-okunur, DB'siz mock headless API:

```text
GET /api/haberler         -> News[]          (6 kayıt)
GET /api/etkinlikler      -> Event[]         (6 kayıt)
GET /api/meclisler        -> Council[]       (5 kayıt)
GET /api/calisma-gruplari -> WorkingGroup[]  (22 kayıt)
```

- Her route `lib/data/sources/mock.js`'ten beslenir (JSON import etmez);
  `lib/data/index.js` bilerek kullanılmaz — yoksa `DATA_SOURCE=http`
  iken route, kendi `API_BASE_URL`'ine düşüp döngüye girerdi.
- `sources/http.js` sözleşmesiyle birebir: `{API_BASE_URL}/haberler`
  vb. → dizi (`Cache-Control: public, s-maxage=60, ...`, `force-static`).
- Kullanım — kendi API'nizden beslenmek için:

```bash
DATA_SOURCE=http API_BASE_URL=http://localhost:3000/api npm run build
# veya runtime dinamik sayfalar (/arama) için:
DATA_SOURCE=http API_BASE_URL=http://localhost:3000/api npm start
curl http://localhost:3000/api/haberler
```

Doğrulama: `DATA_SOURCE=http` üretim sunucusunda dinamik `/arama?q=çevre`
`http.js -> /api/* -> route handler` zinciri üzerinden 200 döner;
route'lar http modunda bile mock (döngü yok).

## API Sözleşmesi

Gelecekte bağlanacak gerçek (headless) API'nin uyması gereken sözleşme
`docs/api-contract.md` dosyasında belgelenmiştir. Kısa özet:

- **5 uç:** `GET /haberler`, `GET /haberler/:slug`, `GET /etkinlikler`,
  `GET /meclisler`, `GET /calisma-gruplari`.
- **Tipler:** `News`, `Event`, `Council`, `WorkingGroup` — zorunlu alanlar
  `lib/data/shapes.js` ile birebir.
- **Ayrım:** Meclis `detail.goals`, çalışma grubu `detail.focusAreas`;
  `id` string, `activities` string, `DetailItem {title, desc}`.
- **Açık kararlar:** tarih ISO, görsel absolute URL, içerik HTML (bkz.
  doküman §6).
- **Revalidate:** `POST /api/revalidate`, header `x-revalidate-secret`,
  gövde `{tags|all}`; tag sözlüğü §8.
### ISR + on-demand revalidate (faz-9)

Veri katmanı (`lib/data/index.js`) `unstable_cache` (next/cache) ile
sarılır: `revalidate: 3600` (1 saat) ISR, tag'ler `lib/data/tags.js`'te
tanımlıdır (`haberler`, `etkinlikler`, `meclisler`, `calisma-gruplari`,
`arama` + `slugTag(kind, slug)`).

On-demand purge için:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"all": true}'
# veya seçili tag'ler:
# -d '{"tags": ["haberler", "haberler:ornek-slug"]}'
```

- Secret eksik/yanlışsa 401/500; başarılı 200 + `{ revalidated, now }`.
- `mocks/data/*.json` değişikliği mtime üzerinden algılanır
  (`sources/mock.js` Map cache); `clearMockCache()` (index.js re-export)
  ile temizlenebilir.

### Path alias

`jsconfig.json` `@/*` aliası (`"baseUrl": "."`, `"paths": { "@/*": ["./*"] }`):
`@/lib/data/index.js`, `@/mocks/data/haberler.json` gibi importlar desteklenir.

### Katkıcı kuralı — veri katmanını bypass etme

- **Tek import noktası `lib/data/index.js`'dir.** Sayfa (`page.js`) ve
  server bileşenleri veriyi `await get*()` / `buildSearchIndex()` ile buradan alır.
- `import haberler from '../data/x.json'` (veya `@/mocks/data/*.json`)
  yazma: sayfa/component içinde JSON import yasaktır. JSON okuma yalnızca
  `lib/data/sources/mock.js` içindedir.
- `"use client"` bileşenler veri/JSON import etmez; veri server `page.js`
  tarafından prop olarak aktarılır (`Navbar`, `Councils`, `NewsEvents`,
  `WorkAreas` vb.). Yeni veri ihtiyacı, önce `lib/data/index.js`'e
  fonksiyon eklenerek karşılanır.
- `app/data/searchData.js` server-only arama yardımcısıdır; yalnızca
  server tarafı (`app/arama/page.js`) import eder.

## Env değişkenleri

`cp .env.example .env.local` ile başlayın. `.env*` dosyaları `.gitignore`'dadır.

| Değişken       | Varsayılan / Örnek                          | Nerede / Ne zaman                                   | Açıklama |
|----------------|----------------------------------------------|-----------------------------------------------------|----------|
| `DATA_SOURCE`  | `mock` (`mock` \| `http`)                    | build-time / runtime                                | Veri kaynağı seçimi. Geçersiz/boş değer `mock` fallback'idir. |
| `API_BASE_URL` | _(boş)_ e.g. `https://api.example.com` veya `/api` | build-time (yalnızca `http` modda gerekir)     | Headless API kök URL'i. Boşsa http kaynağı hata fırlatır. Sondaki `/` temizlenir. |
| `SITE_URL`     | `https://sariyerkentkonseyi.org`             | **build-time ARG/ENV**                              | Canonical/sitemap/robots/metadata/OG için tek kaynak. SSG'de gömülür; değiştirmek için rebuild gerekir. Geçersiz/boşsa varsayılan fallback'tir. |
| `REVALIDATE_SECRET` | `dev-secret-change-in-prod` | runtime | On-demand ISR revalidate için `POST /api/revalidate` `x-revalidate-secret` header değeri. Ayarlanmazsa endpoint 500 döner. |

### Docker ile SITE_URL

`Dockerfile` build-time `ARG SITE_URL` + `ENV SITE_URL=${SITE_URL}` içerir
(değer verilmezse `lib/data/config.js` varsayılanı uygulanır):

```bash
docker build --build-arg SITE_URL=https://ornek.com -t sariyer-ozel .
# veya
SITE_URL=https://ornek.com docker compose up --build -d
```

Uygulama `http://localhost:3001` adresinde çalışır. Durdurmak için:

```bash
docker compose down
```

### Docker

```bash
docker compose up --build -d
```

## Testler

Vitest ile fixture tutarlılık, veri katmanı sözleşme ve server-side arama
testleri `tests/` altındadır (`vitest.config.mjs`, Node `>=22`):

```bash
npm run test        # vitest run (tek seferlik)
npx vitest run      # eşdeğer — aynı komut
```

Kapsam:

- `tests/shapes-fixture.test.js` — `mocks/data/*.json` fixture'larının
  `lib/data/shapes.js` typedef'leriyle uyumu.
- `tests/data-index.test.js` — `lib/data/index.js` async sözleşmesi,
  `DATA_SOURCE=http` dispatch, JSON import izolasyonu (tek okuma noktası).
- `tests/data-config.test.js` — env çözümleme (`DATA_SOURCE`/`SITE_URL`/`API_BASE_URL`).
- `tests/smoke.test.js` — `@/*` alias + server-side arama (`app/data/searchData.js`).
- `tests/data-http-msw.test.js` — `DATA_SOURCE=http` akışını MSW
  (`msw/node`, `tests/msw/`) mock service ile uçtan uca: gerçek fetch
  MSW tarafından kesilir, 4 liste + `*BySlug` + `getSlugs` +
  `buildSearchIndex` ve 500/404/ağ hatası senaryoları.
- `tests/api-routes.test.js` — `app/api/*/route.js` GET handler'ları:
  gövde sözleşmesi (200 + uzunluk + Cache-Control) ve http modda
  döngü yok guard'ı (route'lar JSON/index import etmez).

## Proje yapısı (özet)

```
app/                  # App Router sayfaları + components
  data/searchData.js  # server-only arama (runSearch + search)
  api/                # thin mock API (haberler/etkinlikler/meclisler/calisma-gruplari)
lib/data/             # veri katmanı (bkz. yukarıda)
mocks/data/           # mock JSON fixture'ları (tek canlı kopya)
tests/                # vitest testleri (+ tests/msw MSW handler/server)
qa-baseline/          # faz-7 HTML diff baseline'ı (silme — faz-7'de kullanılır)
```

## Not

- Tip sistemi JSDoc `@typedef`'dir (`lib/data/shapes.js`); TypeScript migrasyonu yoktur.
- Lint: `npm run lint` (`next lint`).
- Node: geliştirme için Node `>=22` gerekir (`package.json` → `engines`).
