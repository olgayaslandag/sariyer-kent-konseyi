# Build Özet Raporu — Sarıyer Kent Konseyi CMS/headless refactor

- **Proje:** Sarıyer Kent Konseyi — CMS/headless refactor
- **Stack:** Next.js 16.4.5, React 19, JavaScript (TS yok), npm, App Router, SSG, Docker node:22-alpine
- **Tarih:** 2026-11-09 (phase-0..phase-7); 2026-11-10 (phase-8, phase-9, phase-10)
- **Son durum:** Build tamamlandı — teslim onayı (phase-7 qa-report sonucu). Faz-8 (opsiyonel, ayrı PR) tamamlandı — **done** (backend-api-agent, 2026-11-10). Faz-9 (ISR + on-demand revalidate + mock FS read) tamamlandı — **done** (backend-api-agent, 2026-11-10). Faz-10 (API sözleşme dokümantasyonu) tamamlandı — **done** (general, 2026-11-10).

## Proje özeti

Site, dağınık `app/data/*.json` importları yerine **tek veri katmanı (`lib/data`)** üzerinden besleniyor. Tüm `page.js` dosyaları `async` + `await lib/data` modeline geçti; client component'ler yalnızca prop alıyor. `SITE_URL` hard-coded URL'ler env'den besleniyor. Render çıktısı refactor öncesi baseline ile birebir (onaylı D1–D4 farkları hariç). Phase-8 ile `app/api/{haberler,etkinlikler,meclisler,calisma-gruplari}/route.js` thin mock route'ları eklendi ve `DATA_SOURCE=http` akışı MSW ile uçtan uca test ediliyor. Phase-9 ile `lib/data/index.js` `unstable_cache` (revalidate:3600) ile sarıldı, mock source fs/promises ile okur (mtime cache + clearMockCache) ve `POST /api/revalidate` on-demand purge eklendi. Phase-10 ile `docs/api-contract.md` + README API Sözleşmesi bölümü (açık kararlar: tarih ISO, görsel absolute, içerik HTML) eklendi.

## Mimari — lib/data katmanı

| Dosya | Rol |
|---|---|
| `lib/data/config.js` | Env çözümleme: `DATA_SOURCE` (mock/http), `API_BASE_URL`, `SITE_URL`. **Site-URL default tek kaynak: `DEFAULT_SITE_URL`** — kod içindeki tek hard-coded site URL burası. |
| `lib/data/shapes.js` | JSDoc `@typedef` tanımları: News, Event, Council, WorkingGroup, SearchIndex, SlugKind. |
| `lib/data/index.js` | Async public API: `getNews/getNewsBySlug`, `getEvents/getEventsBySlug`, `getCouncils/getCouncilBySlug`, `getWorkingGroups/getWorkingGroupBySlug`, `getSlugs(kind)`, `buildSearchIndex`. |
| `lib/data/sources/mock.js` | `DATA_SOURCE=mock` implementasyonu; üretimde JSON import yapan **tek dosya**. |
| `lib/data/sources/http.js` | HTTP kaynağı (`DATA_SOURCE=http` akışı); phase-8'de MSW ile test edildi. |
| `app/api/{haberler,etkinlikler,meclisler,calisma-gruplari}/route.js` | Phase-8 thin mock route'lar: `GET`, `dynamic="force-static"`, `lib/data/sources/mock.js`'ten beslenir (JSON import yok), `lib/data/index.js` kullanılmaz (döngü guard). |
| `mocks/data/*.json` | 4 canlı fixture: haberler, etkinlikler, meclisler, calisma-gruplari (ölü kopyalar temizlendi). |
| `app/data/searchData.js` | `runSearch`/`normalize` server-side arama yardımcıları (ölü `searchIndex` export kaldırıldı). |

Kural: tek import noktası `lib/data/index.js`; `import '../data/x.json'` ile bypass yasak, `"use client"` dosyalar JSON import etmez, veri props ile iner.

## Faz tablosu + durumlar

| Faz | İçerik | Durum |
|---|---|---|
| phase-0 | vitest@^3.2.7 + jsconfig `@/*` + tests/smoke.test.js (5 test) | done |
| phase-1 | lib/data/shapes.js + tests/shapes-fixture.test.js (17 test; faz-6 sonrası 14) | done |
| phase-2 | lib/data/config.js + index.js + sources/mock.js + sources/http.js + tests (data-config 10, data-index 20) | done |
| phase-baseline | qa-baseline/app-html 61 dosya + manifest.sha256 | done |
| phase-3 | mocks/data taşıma (6 JSON) + 12 import noktası güncellemesi | done |
| phase-4 | page.js async + HomeClient props + server-side arama (build 61/61 + 52/52) | done |
| phase-5 | SITE_URL env (25 dosya/28 nokta) + Dockerfile ARG + compose (build+test yeşil, grep sıfır) | done |
| phase-6 | haberler_test.json + content.json silindi, README güncellendi (49/49 + 61/61) | done |
| phase-7 | HTML diff (60/61 görünür-içerik eşit, D1–D4), a11y/responsive geçti, server-side arama doğrulandı | done |
| phase-8 | (Opsiyonel) app/api thin mock + MSW — ayrı PR (4 route + MSW, 2026-11-10) | done |
| phase-9 | ISR + on-demand revalidate (mock FS read + unstable_cache + /api/revalidate, 2026-11-10) | done |
| phase-10 | (Opsiyonel) API sözleşme dokümantasyonu (docs/api-contract.md + README, 2026-11-10) | done |

## Test/build sonuçları (son)

- **Test:** `npm run test` (vitest run) → **90/90 yeşil** (tarihsel bağlam: phase-7 sonrası 49/49; phase-8: 67/67 (+18 → data-http-msw 12 + api-routes 6); phase-9: 90/90 (+23 → data-mock-fs 12 + revalidate-route 11). Toplam 8 test dosyası).
- **Build:** `npm run build` → **yeşil**, exit 0; phase-9'da ISR export'ları ile route'lar 1h revalidate + 1y listelendi, `/api/revalidate` dynamic route üretildi. (Tarihsel: phase-7 sonrası 61/61; phase-8: 65/65 (4 `/api/*` Static dahil).) Route özeti: `/arama ƒ` (dinamik), diğerleri static/SSG.
- Baseline bütünlük: `sha256sum -c` → 61/61 OK (phase-7 zamirinde doğrulandı, tarihsel bağlam).
- Prod doğrulama: `/`, `/haberler`, slug sayfası, arama, `/robots.txt`, `/sitemap.xml` → 200; bilinmeyen → 404. `/arama?q=çevre` → 200 + 8 SSR sonuç; sorgusuz `/arama` → 307 `/` (phase-7 doğrulaması, tarihsel bağlam; phase-8'de src arama runtime http akışı curl ile kanıtlandı).

## Phase-8 — app/api thin mock + MSW (2026-11-10, backend-api-agent) — done

- **Route'lar:** `app/api/{haberler,etkinlikler,meclisler,calisma-gruplari}/route.js` — `GET`, `force-static`, `mock.js`'den beslenir, JSON import yok. **Döngü guard:** route'lar bilerek `lib/data/index.js` kullanmaz; `DATA_SOURCE=http` iken bile mock döner, kendi `API_BASE_URL`'ine düşmez. http.js sözleşmesiyle birebir: `{API_BASE_URL}/haberler` vb. → dizi.
- **MSW:** `devDependency msw@^2.15.0`, `tests/msw/{handlers,server}.js`, `tests/data-http-msw.test.js` (12 test) + `tests/api-routes.test.js` (6 test).
- **Test/build:** **67/67** (49 + 18), **65/65** (61 + 4 `/api/*` Static), `src` arama runtime http akışı curl kanıtlı.
- **Dokümantasyon:** `.env.example` + `README.md` thin mock bölümü güncellendi.
- **Önceki durum (tarihsel bağlam, korundu):** phase-7 sonrası **49/49 + 61/61** (yukarıdaki "Test/build sonuçları (son)" satırında eski sayılar bağlamla anılır; güncel sayılar 67/67 + 65/65).
- **Commit:** Kullanıcı onayıyla commit yapıldı (2026-11-10, conventional: refactor + docs + test + feat(api)). `qa-baseline/` (1,7 MB üretilebilir HTML snapshot), `.opencode/` ve `opencode.json` bu commit dışında bırakıldı; push kararı BUILD primary'de.

## Faz-9 — ISR + on-demand revalidate + mock FS read (2026-11-10, backend-api-agent + frontend-coder-agent + qa-tester-agent) — done

- **ISR cache:** `lib/data/index.js` her public fonksiyon `unstable_cache` (next/cache) ile sarılır; `revalidate: 3600` (1 saat), tag'ler `lib/data/tags.js` (`haberler`, `etkinlikler`, `meclisler`, `calisma-gruplari`, `arama` + `slugTag(kind, slug)`).
- **Mock FS read:** `lib/data/sources/mock.js` çağrı anında `fs/promises` ile okur (statik JSON import yok); module-level `Map` cache `filePath → {mtimeMs, data}`, mtime değişince yenilenir; `clearMockCache()` + `readMockJson(filePath)` export (test için). Shallow clone döner.
- **On-demand revalidate:** `app/api/revalidate/route.js` — `POST`, `x-revalidate-secret` header, gövde `{tags?, all?}`; `revalidateTag(tag)`; 400/401/500 hata kodları; secret yoksa 500, eksik/yanlışsa 401. Test ortamında revalidateTag çağrıları sessizce atlanır (Next runtime store yok), handler yine 200 döner.
- **Test/build:** 90/90 (önceki 67 + data-mock-fs 12 + revalidate-route 11), build exit 0 (ISR export'ları, `/api/revalidate` dynamic).
- **Mock FS tazeliği kanıtı:** temp JSON yazma + `clearMockCache` → `getNews()` değişimi; test sonunda haberler.json orijinal haline geri yüklendi (git status temiz).
- **API sözleşme notu (açık kararlar):** bkz. Faz-10 ve `docs/api-contract.md` §6 — tarih ISO 8601, görsel absolute URL, içerik v1'de HTML string (sanitize zorunlu).

## Faz-10 — (Opsiyonel) API sözleşme dokümantasyonu (2026-11-10, general) — done

- **docs/api-contract.md:** gelecekte bağlanacak headless API'nin sözleşmesi — 5 uç (`GET /haberler`, `/haberler/:slug`, `/etkinlikler`, `/meclisler`, `/calisma-gruplari`), tipler `lib/data/shapes.js` ile birebir, meclis `detail.goals` vs çalışma grubu `detail.focusAreas`, `id` string, `activities` string, `DetailItem {title, desc}`.
- **Açık kararlar (§6):** tarih ISO 8601 (`YYYY-MM-DD`), görsel absolute URL (`https://...`), içerik v1'de HTML string (sanitize zorunlu; blok formatına geçiş için `contentFormat` sürümlemesi).
- **Revalidate:** `POST /api/revalidate` + tag sözlüğü §8; ISR temel süresi 3600 sn.
- **README:** "API Sözleşmesi" bölümü + "ISR + on-demand revalidate (faz-9)" bölümü eklendi.
- **Not:** Opsiyonel dokümantasyon fazı; kod değişikliği yok.

## Beklenen farklar (onaylı, regresyon değil — qa-report §2.2, aynen korundu)

| # | Fark | Gerekçe |
|---|---|---|
| D1 | `arama.html` prerender dosyası yok; `/arama` `ƒ` (dinamik) | Phase-4 server-side arama: `searchParams` + `buildSearchIndex()` + `runSearch()` server'da. Baseline dosyası yalnızca sorgusuz shell idi. |
| D2 | `sitemap.xml.body` yalnızca `<lastmod>` değişti | URL seti/sırası/SITE_URL default aynı; canonical/sitemap bozulması yok. |
| D3 | `_global-error.html` yalnızca build-id | Chunk adları/body aynı; klasik build-chunk farkı. |
| D4 | Tüm sayfalarda ~+40–47 KB boyut (+111–280%) | Görünür DOM aynı; script 17→33, `__next_f.push` 4→21. Her sayfaya navGroups/navCouncils + HomeClient prop flight yükü gömüldü (props mimarisi, build sürümü değil). Performans notu: Lighthouse hedefi faz-7 dışı, ölçülmedi. |

Regresyon: yok. Yeni/fazla route yok, kayıp statik route yok (arama hariç), görünür metin/heading/link/title/canonical değişikliği yok (60/60 eşit).

## Kalan işler

1. **Phase-8 (opsiyonel): TAMAMLANDI (done, 2026-11-10)** — app/api thin mock route'lar + MSW ile `DATA_SOURCE=http` uçtan uca akışı doğrulandı. Commit kullanıcı onayıyla yapıldı (2026-11-10); push kararı BUILD primary'de. `qa-baseline/`, `.opencode/`, `opencode.json` commit dışı.
2. **Not — site-URL default tek kaynak:** `lib/data/config.js` `DEFAULT_SITE_URL` = tek kaynak; sitemap/robots/layout `getSiteUrl()` üzerinden. Hard-coded URL grep'i: yalnız config.js default + yorum (e-posta `info@` adresleri ayrı).
3. **Not — arama bundle:** client bundle'da tam arama dizini taşınmaz. `runSearch`/`buildSearchIndex`/veri blokları JS chunk'larında yok (0 isabet); client yalnızca filtrelenmiş `initialResults` + nav alt kümesini props/flight'ta taşır.
4. **a11y takip önerileri (bloklayıcı değil, pre-existing):** 3 etiketsiz inputa `aria-label`, overlay'e `role="dialog"` + focus-trap, `<a href="#">` dropdown açıcıların `<button>`'a çevrilmesi, skip-to-content bağlantısı.
5. **Arama dili sınırlaması (regresyon değil):** `normalize()` aksan katlama yapmaz; ASCII `"cevre"` sonuç vermez. Faz-4 öncesi de aynı mantık.
6. **Phase-9/10 tamamlandı (2026-11-10):** ISR + on-demand revalidate + mock FS read; API sözleşme dokümantasyonu (`docs/api-contract.md` + README). Test 90/90, build exit 0. Açık kararlar: tarih ISO, görsel absolute URL, içerik HTML (bkz. Faz-10).
7. **Log dosyaları:** `.opencode/memory/code-clean-log.md` ve `.opencode/memory/qa-report.md` (faz-9) özetlenip silindi (2026-11-10).

## Log özetleri (özetlendi ve silindi — 2026-11-10, build-agent)

- `.opencode/memory/code-clean-log.md` (phase-6, code-cleaner-agent) — **silindi**: `mocks/data/haberler_test.json` (15 bayt, fixture-dışı) ve `mocks/data/content.json` (26 760 bayt, ölü kopya) gerekçeli silme; `searchData.js` ölü export temizliği (canlı `runSearch` korundu); `ContentFile` typedef kaldırıldı; README tamamen güncellendi (mimari + env tablosu + test komutları).
- `.opencode/memory/qa-report.md` (phase-9, qa-tester-agent) — **silindi**: 90/90 test (data-mock-fs 12 + revalidate-route 11), build exit 0, ISR export'ları, `/api/revalidate` dynamic, mock FS tazeliği kanıtı; kabul kriterleri yeşil.
- Phase-8 (2026-11-10, backend-api-agent): 4 thin mock route (`app/api/*/route.js`, GET + force-static + mock.js, JSON import yok, döngü guard), `msw@^2.15.0` devDependency + `tests/msw/{handlers,server}.js`, testler 67/67 (data-http-msw 12 + api-routes 6), build 65/65 (4 `/api/*` Static dahil), src arama runtime http akışı curl kanıtlı, `.env.example` + `README.md` thin mock bölümü güncellendi.

## Kabul mührü

- [x] `memory/tasks.json`: phase-0..phase-10 + baseline tümü `done`, JSON valid (python3 -m json.tool doğrulandı, 2026-11-10). Toplam 12 task.
- [x] `npx vitest run` 90/90 (tarihsel: 67/67 → 49/49), `npm run build` exit 0 (tarihsel: 65/65 → 61/61).
- [x] Onaylı D1–D4 dışında fark yok; a11y/responsive regresyonu yok (D1–D4 aynen korundu).
- [x] Commit yapılmadı (BUILD primary kararı); push kararı BUILD primary'de. `qa-baseline/`, `.opencode/`, `opencode.json` commit dışı.
- [x] `.opencode/memory/qa-report.md` (faz-9) ve `code-clean-log.md` özetlenip silindi (2026-11-10).
