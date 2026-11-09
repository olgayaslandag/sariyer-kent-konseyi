# Sarıyer Kent Konseyi — CMS/Hazırlık Refaktörü Proje Planı

> **Proje:** `/home/olgay/projects/SKK`
> **Durum:** Onaylanmış plan — Build Agent devrine hazır
> **Tarih:** 2026-11-09
> **Teknoloji:** Next.js 16.4.5, React 19, JavaScript (TS yok), App Router, npm, SSG prerender, Docker `node:22-alpine`

---

## 1. Amaç ve Kapsam

**Amaç:** CMS/headless hazırlık — repository/adapter katmanı kurarak veri kaynağını
`DATA_SOURCE` env ile değiştirilebilir hale getirmek. TS'ye geçiş **yok**, saf
JavaScript + JSDoc `@typedef` ile devam edilecek.

**Kapsam (tamamı dahil):**
- `DATA_SOURCE` / `API_BASE_URL` ile mock ↔ http geçişi
- `SITE_URL` env (build-time ARG/ENV)
- Ölü dosya temizliği
- Vitest kurulumu ve fixture tutarlılık testleri
- README güncelleme
- Server-side arama korunması

**Kapsam dışı:**
- TypeScript migrasyonu
- Elasticsearch entegrasyonu
- Prettier konfigürasyonu (bu fazda yok)
- Paket yöneticisi değişimi (npm'de kalınacak)

---

## 2. Kullanıcı Kararları

| Konu | Karar |
|------|-------|
| Proje amacı | CMS/headless'e hazırlık (repository/adapter + `DATA_SOURCE` env) |
| Tip sistemi | JSDoc `@typedef`, JS devam (TS'ye geçiş yok) |
| Kapsam | `SITE_URL` env, ölü dosya temizliği, vitest, README — hepsi dahil |
| Paket yöneticisi | npm'de kal |
| `SITE_URL` stratejisi | Build-time ARG/ENV |
| Arama | Server-side arama |

---

## 3. Mevcut Durum (Tespit)

- `app/data/*.json` dosyaları 14 import noktasından doğrudan import ediliyor:
  - `haberler.json`, `etkinlikler.json`, `meclisler.json`, `calisma-gruplari.json`
  - `content.json` (~26 KB), `haberler_test.json`, `searchData.js`
- `app/components/*` içinde `"use client"` dosyalar JSON import ediyor
  (Navbar, Councils, NewsEvents, WorkAreas vb.)
- `https://sariyerkentkonseyi.org` string'i ~30 noktada hard-coded
- `jsconfig.json` minimal (`{"jsx": "preserve"}`), path alias yok
- `package.json`'da vitest/test script yok, `lint` scripti `next lint` ile sınırlı
- `Dockerfile`: `node:22-alpine`, `npm ci`, `RUN npm run build`, ARG yok
- `docker-compose.yml`: ARG/ENV passthrough yok
- Node paritesi: yerel geliştirme duruma göre farklılık gösterebilir (26 varsayımı),
  CI/Docker 22 — vitest sürümü Node 22 uyumlu seçilecek

---

## 4. Hedef Mimari

### 4.1 Yeni Katman

```
lib/data/
├── config.js          # DATA_SOURCE + API_BASE_URL + SITE_URL çözümleme
├── shapes.js          # JSDoc @typedef tanımları (News, Event, Council, WG...)
├── index.js           # Public API — tek giriş noktası, async
└── sources/
    ├── mock.js        # mocks/data/*.json dosyalarından okur (tek import noktası)
    └── http.js        # DATA_SOURCE=http iken API_BASE_URL üzerinden fetch

mocks/data/
├── haberler.json
├── etkinlikler.json
├── meclisler.json
└── calisma-gruplari.json
```

### 4.2 Public Interface (async)

```js
// lib/data/index.js
getNews()                  -> News[]
getNewsBySlug(slug)        -> News | null
getEvents()                -> Event[]
getEventsBySlug(slug)      -> Event | null
getCouncils()              -> Council[]
getCouncilBySlug(slug)     -> Council | null
getWorkingGroups()         -> WorkingGroup[]
getWorkingGroupBySlug(slug)-> WorkingGroup | null
getSlugs(kind)             -> string[]  // kind: 'news' | 'events' | 'councils' | 'working-groups'
buildSearchIndex()         -> SearchIndex  // server-side arama için
```

**Kural:** `from '../data/*.json'` import sadece `sources/mock.js` içinde kalır.
Hiçbir `page.js` / component JSON import etmez. `"use client"` dosyalar veri
import etmez — veri `page.js` (server) tarafından prop olarak aktarılır.

### 4.3 Veri Akışı

```
page.js (server, async)
  └── lib/data/index.js  ── DATA_SOURCE=mock  ──> sources/mock.js  ──> mocks/data/*.json
                         ── DATA_SOURCE=http   ──> sources/http.js  ──> API_BASE_URL
  └── <HomeClient props={...} />  ("use client", sadece props render eder)
```

### 4.4 Env

| Değişken | Nerede | Açıklama |
|----------|--------|----------|
| `DATA_SOURCE` | build-time / runtime | `mock` (varsayılan) veya `http` |
| `API_BASE_URL` | build-time | headless API kök URL'i |
| `SITE_URL` | build-time ARG/ENV | Canonical/sitemap/metadata için tek kaynak |
| `NEXT_PUBLIC_SITE_URL` | build-time | Client bileşenlerinde gerekiyorsa (öncelikli değil) |

---

## 5. Faz Planı

| Faz | İş | Agent | Bağımlılık | Çıktı |
|-----|----|-------|-------------|-------|
| **0** | Vitest (Node 22 uyumlu) + `jsconfig` paths `@/*` | frontend-coder-agent | — | `vitest` kurulu, `npm run test` çalışıyor |
| **1** | `lib/data/shapes.js` typedef + fixture tutarlılık testi | technical-architect-agent | 0 | `shapes.js` + test yeşil |
| **2** | `lib/data/` sözleşmesi + `sources/mock.js` + `config.js` | backend-api-agent | 1 | Interface çalışıyor (mock) |
| **Baseline** | SSG HTML çıktısı baseline (refactor öncesi) | qa-tester-agent | 2 (mock hazır) | `.next/` HTML snapshot + dosya hash listesi |
| **3** | `mocks/data` taşıma + 12 import noktası güncellemesi | frontend-coder-agent | Baseline | Tek import noktası |
| **4** | `page.js` async + HomeClient props shell + client JSON import temizliği | frontend-coder-agent | 3 | Client'lar JSON import etmiyor |
| **5** | `SITE_URL` env 30 nokta + Dockerfile ARG + compose | backend-api-agent | 4 | Hard-coded URL sıfır |
| **6** | Ölü dosya temizliği + README güncelleme | code-cleaner-agent | 5 | `haberler_test.json` vb. temiz |
| **7** | HTML diff + a11y + responsive doğrulama | qa-tester-agent | 6 | Diff temiz, testler yeşil |
| **8 (opsiyonel)** | `app/api` thin mock + MSW | backend-api-agent | 7 | Phase 8 ayrı PR'da |

**Sıralama notu:** Fazlar 0→7 kesin sırayla, 8 opsiyonel ve ayrı PR. Baseline,
Faz 3 öncesi alınmalı; aksi halde diff doğrulanamaz.

### Faz Detayları

**Faz 0 — Test altyapısı:** Node 22 ile uyumlu Vitest sürümü seç (`vitest@^3`
veya Node 22'de doğrulanan en yeni), `package.json`'a `"test": "vitest run"`
ekle, `jsconfig.json`'a `"paths": { "@/*": ["./*"] }` ve `baseUrl: "."` ekle.

**Faz 1 — Şekiller:** `News`, `Event`, `Council`, `WorkingGroup`, `SearchIndex`,
`SlugKind` typedef'leri. Fixture test: mocks/data JSON şemalarının typedef
alanlarıyla uyumu; eksik/zorunlu alan kontrolü.

**Faz 2 — Sözleşme:** `config.js` (env çözümleme), `index.js` (seçici mantık),
`sources/mock.js` (JSON okuma + slug/indeks mantığı). `http.js` iskeleti
(meta-data stub veya minimal fetcher) — tam HTTP Faz 8'de.

**Baseline:** `npm run build` sonrası `.next/server/app/**/*.html` çıktısını
kopyala, dosya listesini ve hash'leri `qa-baseline/` altında sakla.

**Faz 3 — Taşıma:** `app/data/*.json` → `mocks/data/`, 12 import noktası
`lib/data` üzerinden okuyacak şekilde geçiş. Bu fazda henüz async değil;
sadece import kaynağı değişir (davranış koruma).

**Faz 4 — Async:** Tüm `page.js` dosyaları `async` + `await get*()`.
`HomeClient` ve diğer client componentler prop alıyor; `Navbar`, `Councils`,
`NewsEvents`, `WorkAreas` içindeki JSON importlar silinip props'a bağlanıyor.
`app/data/searchData.js` → `buildSearchIndex()` ile değiştiriliyor
(server-side arama korunuyor).

**Faz 5 — SITE_URL:** ~30 hard-coded `https://sariyerkentkonseyi.org` noktasını
`SITE_URL` env'den besle (`sitemap.js`, `robots.js`, `metadata`/`canonical`,
OG URL'leri). `Dockerfile`: `ARG SITE_URL` + `ENV SITE_URL=$SITE_URL`,
`compose`: `args: SITE_URL` passthrough.

**Faz 6 — Temizlik:** `haberler_test.json`, kullanılmayan `content.json`
kopyaları, ölü `searchData` exportları silinir. README: mimari, env tablosu,
`DATA_SOURCE` kullanımı, test komutları, geliştirme akışı güncellenir.

**Faz 7 — Doğrulama:** Baseline HTML diff (sadece beklenen farklar), a11y
(axe/klavye navigasyonu), responsive (360px / 768px / 1280px), `npm run build`
+ `npx vitest run` yeşil.

**Faz 8 (opsiyonel):** `app/api/*` thin route'lar + MSW ile http senaryosu
testi; ayrı PR, bu planın merge koşulu değil.

---

## 6. Kabul Kriterleri

1. **Ölçülebilir:** `from '../data/*.json'` import **sıfır** — sadece
   `lib/data/sources/mock.js` içinde JSON import mevcut.
2. **Ölçülebilir:** `DATA_SOURCE=http` + `API_BASE_URL` ayarlandığında
   tek dosya değişmeden uygulama çalışır (http.js üzerinden).
3. **Ölçülebilir:** `"use client"` dosyalar veri/JSON import **etmez** (grep ile doğrulanır).
4. **Ölçülebilir:** `https://sariyerkentkonseyi.org` string'i kod içinde **sıfır**
   (sadece `.env.example`, README ve varsayılan fallback'te olabilir).
5. **Ölçülebilir:** `npm run build` + `npx vitest run` **yeşil**, baseline ile
   HTML diff **temiz** (beklenen diff'ler listelenir ve onaylanır).

---

## 7. Riskler

| Risk | Etki | Önlem |
|------|------|-------|
| **Node paritesi 26 vs 22** | Yerelde geçen test Docker'da kırılabilir | Vitest Node 22 ile CI'da koşulur; `engines` alanına `>=22` eklenir |
| **content.json 26 KB** | JSON mock'a taşımak bundle/okuma maliyetini artırır | Sadece ihtiyaç duyan modül okur; lazy-load düşünülür |
| **generateStaticParams build ağ bağımlılığı** | `DATA_SOURCE=http` iken build, ağa erişemezse kırılır | http modda `dynamicParams`/fallback politikası tanımlanır; build dokümantasyonu |
| **build'de mock, runtime'da http kuralı** | SSG prerender'da veri build'de gömülür; runtime'da http'ye geçiş ISR gerektirir | Kural: SSG sayfalar build'de mock; http geçişi ISR/refresh ile ayrı fazda |
| **Prettier / Elasticsearch yok** | Format ve arama ölçeklenemez | Her ikisi de kapsam dışı bırakıldı, görev listesinde yok |
| **12+ importer senkron/async dönüşüm** | Client componentlerde veri akışı bozulabilir | Faz 3 (import) ve Faz 4 (async/props) ayrı tutuldu, baseline diff ile doğrulanır |
| **SITE_URL yanlış yapılandırma** | sitemap/canonical yanlış URL üretebilir | Fallback default + Faz 7'de sitemap diff kontrolü |

---

## 8. Dosya ve Rota Değişiklik Özeti

**Yeni dosyalar:**
- `lib/data/config.js`, `lib/data/shapes.js`, `lib/data/index.js`
- `lib/data/sources/mock.js`, `lib/data/sources/http.js`
- `mocks/data/*.json`
- `vitest.config.*` veya `vitest.config.js`
- `memory/project-plan.md`, `memory/tasks.json`
- `qa-baseline/` (build sonrası, gitignore'a eklenir)

**Değişen dosyalar:**
- `app/*/page.js`, `app/*/[slug]/page.js` (async + `lib/data`)
- `app/components/HomeClient.jsx`, `Navbar`, `Councils`, `NewsEvents`, `WorkAreas`
- `app/sitemap.js`, `app/robots.js`, `app/layout.js` (metadata)
- `app/arama/page.js`, `SearchResultsClient`
- `Dockerfile`, `docker-compose.yml`, `jsconfig.json`, `package.json`, `README.md`

**Silinecek adaylar:** `app/data/*` (taşındıktan sonra), `haberler_test.json`,
eski `searchData.js` exportları (Faz 6'da ölü dosya/onay yapılacak).
