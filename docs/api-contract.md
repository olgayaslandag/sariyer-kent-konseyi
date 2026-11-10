# API Sözleşmesi — Sarıyer Kent Konseyi

Bu belge, projenin gelecekte bağlanacağı **gerçek (headless) API**'nın
uyması gereken sözleşmeyi tanımlar. Kaynak doğruluk sırası:

1. `lib/data/shapes.js` (JSDoc `@typedef` — `News`, `Event`, `Council`,
   `WorkingGroup`, `CouncilDetail`, `WorkingGroupDetail`, `DetailItem`)
2. `mocks/data/*.json` (fiili fixture şekli)
3. `lib/data/sources/http.js` (endpoint-map ve fetch semantiği)
4. `app/api/*` (thin mock route'lar — salt-okunur, aynı sözleşmeyi döner)

> Amaç: `DATA_SOURCE=http` modunda `lib/data/sources/http.js`'in beklediği
> şekli ve `lib/data/shapes.js` typedef'lerini birebir karşılayan bir API
> inşa etmek. Bu belge **kod içermez**; yalnızca sözleşme ve kararları
> belgeler.

---

## 1. Temel kurallar

- **Base URL:** `API_BASE_URL` (`lib/data/config.js` → `resolveApiBaseUrl`).
  Örnek: `https://api.example.com` veya göreceli `/api`. Sondaki `/`
  temizlenir; path'ler köke eklenir.
- **İçerik türü:** `application/json; charset=utf-8`.
- **Metod:** Tüm okuma uçları `GET`. Revalidate ucu `POST /api/revalidate`.
- **Liste uçları dizi döner** (`News[]`, `Event[]`, `Council[]`,
  `WorkingGroup[]`). Tekil uç nesne döner veya `404`.
- **Alan adları birebir** (`camelCase`) korunur; typedef'teki alan kümesi
  tamdır (eksik/fazla alan üretici tarafında kaçınılmalıdır). İstemci
  bilinmeyen alanları görmezden gelebilir.
- **Tüm değerler string**'dir (sayısal alan yok). `id` sıfırla dolu
  string'dir (`"01"`, `"02"`, …).
- **Slug** URL-güvenli, benzersiz string'dir; koleksiyon içinde tekrar
  etmez.
- **Hata semantiği** (`http.js` ile uyumlu):
  - `404` → kayıt bulunamadı (tekil uç).
  - `4xx/5xx` → istek başarısız; istemci path + durum bilgisiyle hata
    fırlatır.
  - Ağ hatası → somut `Error` (mesajda URL yer alır).

---

## 2. Endpoint listesi (5 uç)

| # | Metod | Yol | Yanıt | Kayıt sayısı (mock) |
|---|-------|-----|-------|---------------------|
| 1 | `GET` | `/haberler` | `News[]` | 6 |
| 2 | `GET` | `/haberler/:slug` | `News` (tekil) veya `404` | — |
| 3 | `GET` | `/etkinlikler` | `Event[]` | 6 |
| 4 | `GET` | `/meclisler` | `Council[]` | 5 |
| 5 | `GET` | `/calisma-gruplari` | `WorkingGroup[]` | 22 |

Notlar:

- Yol segmentleri Türkçe ve `lib/data/sources/http.js` `KIND_PATHS` ile
  birebir eşleşir (`/haberler`, `/etkinlikler`, `/meclisler`,
  `/calisma-gruplari`).
- `:slug` path parametresi URL-kodlanmış slug değeridir.
- Tekil uç şu an yalnızca **haberler** için sözleşmede tanımlıdır; diğer
  koleksiyonlar için de aynı `/meclisler/:slug`,
  `/calisma-gruplari/:slug`, `/etkinlikler/:slug` kalıbı gelecekte
  eklenebilir (istemci şu an liste + slug filtresiyle çözer).
- Sayfalama (pagination) v1'de yoktur; uçlar tüm kayıtları döner.

---

## 3. Tipler ve zorunlu alanlar

### 3.1 `News` (`mocks/data/haberler.json`, 6 kayıt)

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `slug` | `string` | evet | benzersiz |
| `title` | `string` | evet | |
| `date` | `string` | evet | bkz. §6.1 (tarih kararı) |
| `tag` | `string` | evet | ör. `HABER`, `DUYURU`, `ETKİNLİK` |
| `img` | `string` | evet | kapak görseli yolu/URL'i (bkz. §6.2) |
| `contentImg` | `string` | evet | detay görseli yolu/URL'i |
| `desc` | `string` | evet | kısa özet |
| `content` | `string` | evet | HTML metni (bkz. §6.3) |

### 3.2 `Event` (`mocks/data/etkinlikler.json`, 6 kayıt)

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `slug` | `string` | evet | benzersiz |
| `title` | `string` | evet | |
| `time` | `string` | evet | saat aralığı metni, ör. `"10:00 - 12:00"` |
| `location` | `string` | evet | mekân adı |
| `img` | `string` | evet | kapak görseli |
| `contentImg` | `string` | evet | detay görseli |
| `desc` | `string` | evet | açıklama |

> Event kaydında tarih alanı yoktur; tarih/saat bilgisi `time` içinde
> saat aralığı olarak gelir. Gerektiğinde gelecekte `date` (ISO) eklenebilir
> (§6.1).

### 3.3 `Council` (`mocks/data/meclisler.json`, 5 kayıt)

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `id` | `string` | evet | sıfırla dolu, ör. `"01"` (sayısal değil) |
| `slug` | `string` | evet | benzersiz |
| `title` | `string` | evet | ör. `"Gençlik Meclisi"` |
| `shortTitle` | `string` | evet | ör. `"Gençlik"` |
| `subTitle` | `string` | evet | boş string olabilir (`""`) |
| `description` | `string` | evet | |
| `link` | `string` | evet | `/meclisler/{slug}` kalıbı |
| `img` | `string` | evet | görsel yolu/URL'i |
| `detail` | `CouncilDetail` | evet | bkz. §3.5 |

### 3.4 `WorkingGroup` (`mocks/data/calisma-gruplari.json`, 22 kayıt)

Gövde `Council` ile aynı alan kümesidir; fark yalnızca `detail` içindeki
liste alanının adından gelir (`focusAreas`).

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `id` | `string` | evet | sıfırla dolu |
| `slug` | `string` | evet | benzersiz |
| `title` | `string` | evet | |
| `shortTitle` | `string` | evet | |
| `subTitle` | `string` | evet | boş string olabilir (`sanat`, `spor`) |
| `description` | `string` | evet | |
| `link` | `string` | evet | `/calisma-gruplari/{slug}` kalıbı |
| `img` | `string` | evet | görsel yolu/URL'i |
| `detail` | `WorkingGroupDetail` | evet | bkz. §3.6 |

### 3.5 `CouncilDetail`

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `about` | `string` | evet | |
| `goals` | `DetailItem[]` | evet | en az 1 öğe |
| `activities` | `string` | evet | **tek parçalı metin**, dizi değil |
| `projects` | `DetailItem[]` | evet | en az 1 öğe |

### 3.6 `WorkingGroupDetail`

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `about` | `string` | evet | |
| `focusAreas` | `DetailItem[]` | evet | en az 1 öğe |
| `activities` | `string` | evet | **tek parçalı metin**, dizi değil |
| `projects` | `DetailItem[]` | evet | en az 1 öğe |

### 3.7 `DetailItem`

| Alan | Tip | Zorunlu |
|------|-----|---------|
| `title` | `string` | evet |
| `desc` | `string` | evet |

---

## 4. Kritik ayrım ve kurallar

1. **`Council.detail.goals` vs `WorkingGroup.detail.focusAreas`:**
   - Meclisler `goals`, çalışma grupları `focusAreas` kullanır.
   - Gövde alanları aynıdır; fark yalnızca detay içindeki liste alanının
     adından gelir.
   - Sayfalar buna göre okur: `meclisler/[slug]` → `detail.goals`,
     `calisma-gruplari/[slug]` → `detail.focusAreas`.
   - İki alan birbirinin yerine kullanılmaz; API her koleksiyon için kendi
     alanını döndürmelidir.

2. **`id` string'dir** (sayısal değil). Sıfırla dolu değerler (`"01"`).
   İstemci sayıya çevirmez.

3. **`activities` string'dir** (dizi değil). Noktalı/virgüllü tek metin.

4. **`subTitle` boş string olabilir** (Sanat, Spor girdileri). Tip string
   kalır, null/undefined kabul edilmez.

5. **`link` kalıbı:**
   - Meclis: `/meclisler/{slug}`
   - Çalışma grubu: `/calisma-gruplari/{slug}`

6. **Kesin anahtar kümesi:** Testler (`tests/shapes-fixture.test.js`)
   `assertExactKeys` ile eksik/fazla alanları yakalar. API üreticisi
   typedef'teki alan kümesini tam olarak döndürmelidir.

---

## 5. next.config — görsel uzak kalıp (remotePatterns) notu

Mevcut `next.config.mjs`:

```js
const nextConfig = {
  images: { unoptimized: true },
  turbopack: {},
};
```

- Mock modda görseller göreceli yollardır (`/img/...`); `remotePatterns`
  gerekmez.
- Gerçek API **absolute URL** döndürmeye başladığında (§6.2) ve `next/image`
  kullanılıyorsa, kaynak host'lar `images.remotePatterns`'a eklenmelidir:

```js
const nextConfig = {
  images: {
    unoptimized: true, // veya false (optimizasyon açık)
    remotePatterns: [
      { protocol: "https", hostname: "api.example.com" },
      { protocol: "https", hostname: "cdn.example.com" },
    ],
  },
  turbopack: {},
};
```

- `unoptimized: true` iken remotePatterns zorunlu değildir; ancak görsel
  optimizasyonu açılırsa (`false`) zorunlu hale gelir.
- Host listesi ortamdan (env) türetilip build-time enjekte edilebilir;
  aksi halde rebuild gerekir (bkz. `SITE_URL` deseni).

---

## 6. Açık şekil kararları ve öneriler

### 6.1 Tarih formatı

- **Mevcut:** `News.date` Türkçe insan dili metnidir
  (`"20 Nisan 2024"`). `Event`'te tarih alanı yoktur; saat aralığı `time`
  içinde gelir (`"10:00 - 12:00"`).
- **Karar (öneri):** Gelecek API tarihleri **ISO 8601** (`YYYY-MM-DD`)
  string olarak döndürmelidir. Görüntüleme biçimlendirme istemci/UI
  katmanında (locale) yapılmalıdır.
- **Gerekçe:** Sıralama, filtreleme ve i18n güvenilirliği; Türkçe metin
  ayrıştırma hatalarını önler.
- **Geçiş:** Mock fixture'lar mevcut haliyle kalır; http modunda bir adapter
  veya API tarafında ISO dönüşümü yapılabilir. `Event` için gerekirse ayrı
  `date` (ISO) alanı eklenebilir (mevcut `time` korunur).

### 6.2 Görsel URL formatı

- **Mevcut:** Göreceli yollar (`/img/...`).
- **Karar (öneri):** Gelecek API görselleri **absolute URL**
  (`https://...`) olarak döndürmelidir.
- **Gerekçe:** Headless API ve frontend farklı origin'lerde olabilir;
  CDN/host ayrımı netleşir.
- **Geçiş:** Mock modda göreceli yol korunur; http modunda absolute URL.
  `next.config` `remotePatterns` güncellemesi §5'e bakın.

### 6.3 İçerik temsili (`News.content`)

- **Mevcut:** `content` HTML metnidir (`<p>`, `<h2>`, …).
- **Karar (öneri):** v1'de **HTML string** korunsun; istemci tarafında
  sanitize edilerek (DOMPurify) render edilsin. Yapısal blok dizisi
  (`{type, data}`) alternatifi daha güvenli ve taşınabilir olsa da mevcut
  render ve fixture'larla migration maliyeti yüksektir.
- **Gerekçe:** Mevcut sayfa render'ı ve fixture'lar HTML ile uyumlu;
  minimal değişiklik.
- **Not:** HTML seçeneği XSS riski taşır; API/istemci tarafında sanitize
  zorunludur. İleride blok formatına geçiş için sürümleme (`contentFormat`)
  alanı eklenebilir.

---

## 7. On-demand revalidate (`POST /api/revalidate`)

Uygulama içi route (`app/api/revalidate/route.js`).

- **Metod:** `POST`
- **Header:** `x-revalidate-secret: <REVALIDATE_SECRET>`
- **Gövde (JSON):** `{ tags?: string[], all?: boolean }`
  - `all: true` → tüm tag'ler revalidate edilir.
  - `tags: string[]` → yalnızca belirtilen tag'ler.
  - Her iki alan da yoksa → hiçbir tag (200, boş liste).
- **Yanıt:** `200 { revalidated: string[], now: number }`
- **Hatalar:**
  - `400` — geçersiz gövde/tag tipi
  - `401` — secret eksik/yanlış
  - `500` — `REVALIDATE_SECRET` tanımlı değil

Örnek:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"all": true}'

# seçili tag'ler:
# -d '{"tags": ["haberler"]}'  # per-slug tag'ler ("haberler:slug") reserved — şu an etkisiz
```

- Her tag için `revalidateTag(tag)` (`next/cache`) çağrılır.
- ISR temel süresi `revalidate: 3600` (1 saat).

---

## 8. Tag sözlüğü (`lib/data/tags.js`)

| Sabit | Değer | Kapsam |
|-------|-------|--------|
| `TAGS.NEWS` | `haberler` | haber listesi + tekil |
| `TAGS.EVENTS` | `etkinlikler` | etkinlik listesi |
| `TAGS.COUNCILS` | `meclisler` | meclis listesi |
| `TAGS.WORKING_GROUPS` | `calisma-gruplari` | çalışma grubu listesi |
| `TAGS.SEARCH` | `arama` | arama indeksi |

- Tekil kayıt tag'i (reserved): `slugTag(kind, slug)` → `` `${kind}:${slug}` ``
  (ör. `haberler:sariyerde-yesil-alanlar-artiyor`). Faz-9 Option A ile
  per-slug dinamik tag'ler ISR katmanında üretilmiyor; slug-level purge
  koleksiyon tag'i (`haberler`) üzerinden çalışır.
- Liste ve tekil uçlar `[TAGS.X]` (koleksiyon tag'i) ile etiketlenir
  (`lib/data/index.js`). Tekil kayıtlar da ilgili koleksiyon tag'i altında
  tutulur.
- Revalidate isteğinde koleksiyon tag'leri (`haberler`, `etkinlikler`,
  `meclisler`, `calisma-gruplari`, `arama`) kullanılabilir; per-slug
  tag'ler (`haberler:slug`) "reserved" olarak belgelenmiştir ve şu an
  etkisizdir.

---

## 9. Veri kaynağı geçişi (özet)

- `DATA_SOURCE=mock` (varsayılan): `mocks/data/*.json`.
- `DATA_SOURCE=http`: `API_BASE_URL` köküne §2'deki 5 uç istenir; uçlar
  dizi döndürmelidir.
- `http.js` liste endpoint'inden tekil kayıt çözer (liste + slug filtresi);
  gelecek API'de tekil uçlar eklenerek performans iyileştirilebilir.

---

## 10. İlgili dosyalar

- `lib/data/shapes.js` — tip tanımları
- `lib/data/tags.js` — cache tag sabitleri
- `lib/data/config.js` — env çözümleme
- `lib/data/sources/http.js` — endpoint-map
- `app/api/*/route.js` — thin mock route'lar
- `tests/shapes-fixture.test.js`, `tests/api-routes.test.js`,
  `tests/data-http-msw.test.js` — sözleşme testleri