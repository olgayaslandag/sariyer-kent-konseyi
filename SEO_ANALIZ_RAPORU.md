# SEO ANALİZ RAPORU — Sarıyer Kent Konseyi

**Tarih:** 2026-09-17  
**Proje:** Next.js 16 + React 19 (App Router)  
**Analiz Kapsamı:** Tüm route'lar ve paylaşılan bileşenler

---

## ÖZET

Proje genelinde **kritik SEO eksiklikleri** bulunmaktadır. Arama motorları ve sosyal medya paylaşımları için temel meta etiketleri, yapısal veri, sitemap ve robots.txt tamamen eksik. Çoğu sayfa benzersiz title/description taşımamaktadır. H hiyerarşisi ve erişilebilirlik (alt attribute) kısmen bozulmuştur.

---

## 1. TITLE & META DESCRIPTION

### Bulgular

| Dosya | Durum | Açıklama |
|---|---|---|
| `app/layout.js` | ⚠️ Kısmi | Sadece kök layout'ta site-wide title/description var. |
| `app/page.js` | ❌ Eksik | `metadata` export YOK. Tüm home page için kök layout title'ı kullanılıyor. |
| `app/iletisim/page.js` | ❌ Eksik | metadata export yok |
| `app/gizlilik-politikasi/page.js` | ❌ Eksik | metadata export yok |
| `app/kvkk/page.js` | ❌ Eksik | metadata export yok |
| `app/kullanim-sartlari/page.js` | ❌ Eksik | metadata export yok |
| `app/videolar/page.js` | ❌ Eksik | metadata export yok |
| `app/galeri/page.js` | ❌ Eksik | metadata export yok |
| `app/raporlar/page.js` | ❌ Eksik | metadata export yok |
| `app/arama/page.js` | ⚠️ Kısmi | Dinamik title var ama `metadata` export ile dönülmüyor |
| `app/meclisler/page.js` | ❌ Eksik | metadata export yok |
| `app/etkinlikler/page.js` | ❌ Eksik | metadata export yok |
| `app/calisma-gruplari/page.js` | ❌ Eksik | metadata export yok |
| `app/haberler/page.js` | ❌ Eksik | metadata export yok |
| `app/meclisler/[slug]/page.js` | ❌ Eksik | metadata export yok |
| `app/etkinlikler/[slug]/page.js` | ❌ Eksik | metadata export yok |
| `app/calisma-gruplari/[slug]/page.js` | ❌ Eksik | metadata export yok |
| `app/haberler/[slug]/page.js` | ❌ Eksik | metadata export yok |
| `app/kurumsal/vizyon-misyon/page.js` | ❌ Eksik | metadata export yok |
| `app/kurumsal/hakkimizda/page.js` | ❌ Eksik | metadata export yok |
| `app/kurumsal/yonetim/page.js` | ❌ Eksik | metadata export yok |
| `app/kurumsal/ic-yonerge/page.js` | ❌ Eksik | metadata export yok |
| `app/kurumsal/yonetmelik/page.js` | ❌ Eksik | metadata export yok |

**Toplam:** 21 sayfa eksik metadata export içeriyor. Sadece kök layout site-wide title/description sağlıyor.

---

## 2. OPEN GRAPH & TWITTER CARDS

### Bulgular

Tüm sayfalarda **OG ve Twitter Card meta etiketleri tamamen eksik.**

| Etiket | Durum |
|---|---|
| `og:title` | ❌ Hiçbir sayfada yok |
| `og:description` | ❌ Hiçbir sayfada yok |
| `og:image` | ❌ Hiçbir sayfada yok |
| `og:url` | ❌ Hiçbir sayfada yok |
| `og:type` | ❌ Hiçbir sayfada yok |
| `twitter:title` | ❌ Hiçbir sayfada yok |
| `twitter:description` | ❌ Hiçbir sayfada yok |
| `twitter:image` | ❌ Hiçbir sayfada yok |

**Etki:** Sosyal medya paylaşımlarında link önizlemesi düzgün çalışmaz. Paylaşılan linklerde görsel, başlık ve açıklama boş görünür.

---

## 3. CANONICAL URL

### Bulgular

Tüm sayfalarda **canonical URL meta etiketi eksik.**

```html
<link rel="canonical" href="..." />
```

**Etki:** Arama motorları için sayfanın tek bir doğru adresi belirtilmemiş olur. Duplicate content riski oluşur.

---

## 4. STRUCTURED DATA / SCHEMA.ORG

### Bulgular

Tüm sayfalarda **yapısal veri (JSON-LD) tamamen eksik.**

**Önerilen schema türleri:**
- `Organization` (tüm sayfalar için temel)
- `WebSite` + `SearchAction` (arama sayfası için)
- `Article` / `NewsArticle` (haberler, etkinlikler için)
- `WebPage` / `AboutPage` (hakkımızda, vizyon-misyon için)

---

## 5. TEKNİK SEO DOSYALARI

### Bulgular

| Dosya | Durum |
|---|---|
| `public/sitemap.xml` | ❌ Eksik |
| `public/robots.txt` | ❌ Eksik |

**Etki:** Arama motorları siteyi düzgün tarayamaz, tüm sayfalar indekslenemez.

---

## 6. HİYERARŞİ (HEADING STRUCTURE)

### Bulgular

**Ana Sayfa (`app/page.js`) — ⚠️ Sorunlu**

```jsx
// Hero.jsx satır 52
<h1 dangerouslySetInnerHTML={{ __html: slide.title }} />
```
- Slider'da her slide için ayrı `<h1>` kullanılıyor. Aynı sayfada birden fazla H1 var.
- Bu durum SEO açısından sorunlu. Sayfada tek bir H1 olmalı.

**Diğer sayfalar — ✅ Genel olarak uyumlu**
- `PageHeader.jsx` her sayfada `<h1>` üretiyor.
- İçerik bölümlerinde `<h2>` ve `<h3>` kullanılıyor.
- Hiyerarşi genel olarak korunmuş.

**Sorunlu detaylar:**
- `app/meclisler/[slug]/page.js` satır 63: `style={{ marginBottom: 16 }}` inline style ile H2 kullanılıyor — sorun değil ama stil ile yönetilmeli.
- `app/calisma-gruplari/[slug]/page.js` satır 63: Aynı durum.
- `app/kurumsal/ic-yonerge/page.js` satır 21: `<h2 style={{ marginTop: 0 }}>` inline style.

---

## 7. IMG ALT ATTRIBUTES

### Bulgular

**Eksik/Boş alt attribute'ler:**

| Dosya | Satır | Durum | Açıklama |
|---|---|---|---|
| `app/components/WorkAreas.jsx` | 26 | ⚠️ Boş | `<img src={img} alt="" />` — dekoratif olabilir ama doğrulanmalı |
| `app/components/NewsEvents.jsx` | 22 | ⚠️ Boş | `<img className="featured-img" ... alt="" />` — dekoratif olabilir |
| `app/components/NewsEvents.jsx` | 47 | ⚠️ Boş | `<img src={featuredEvent?.img} alt="" />` — dekoratif olabilir |
| `app/components/NewsEvents.jsx` | 90 | ⚠️ Boş | `<img src={src} alt="" />` — galeri strip, dekoratif olabilir |
| `app/components/IdeaBanner.jsx` | 5 | ⚠️ Boş | `<img src="/img/fikir-ver-banner.jpg" alt="" />` — dekoratif olabilir |

**Doğru kullanılanlar:**
- `Navbar.jsx` satır 68: `alt="Sarıyer Kent Konseyi"` ✅
- `Hero.jsx` satır 44: `alt={slide.alt}` ✅
- `Councils.jsx` satır 14: `alt={c.title}` ✅
- `Meclisler/[slug]` satır 31: `alt={item.title}` ✅
- `Etkinlikler/[slug]` satır 31, 39: `alt={item.title}` ✅
- `CalismaGruplari/[slug]` satır 27: `alt={g.title}` ✅
- `Haberler/[slug]` satır 31, 39: `alt={item.title}` ✅
- `Galeri/page.js` satır 33: `alt={`Galeri ${i + 1}`}` ⚠️ Sayısal, açıklayıcı değil

---

## 8. LINK TITLE ATTRIBUTES

### Bulgular

Tüm projede **hiçbir linkte `title` attribute kullanılmamıştır.**

Örnek eksiklikler:
- `Navbar.jsx` dropdown link'leri
- `Footer.jsx` link'leri
- `Councils.jsx` council-card link'leri
- `NewsEvents.jsx` tüm `<Link>` elemanları
- `WorkAreas.jsx` image-card link'leri
- `Process.jsx` "Tüm Süreç →" link'i

**Not:** `title` attribute zorunlu değildir ancak erişilebilirlik ve SEO açısından önerilir.

---

## 9. SAYFA BAŞLIĞI (PAGE TITLE) UYUMSUZLUKLARI

### Bulgular

**Tüm sayfalar kök layout title'ını paylaşıyor:**
- Kök layout: `Sarıyer Kent Konseyi`
- Tüm sayfalar için benzersiz title YOK

**Arama sonuçları sayfası (`app/arama/page.js`):**
- Dinamik bir `<h2>` başlığı var: `` `${query} için sonuçlar` ``
- Ancak `<title>` tag'i yine kök layout'tan geliyor.
- Bu durumda arama sonuçları sayfası için özel title eksik.

---

## 10. DİĞER BULGULAR

### 10.1 Loading Strategies
- `loading="lazy"` kullanılıyor (iyi)
- Hero image `fetchPriority="high"` kullanılıyor (iyi)

### 10.2 Breadcrumbs
- `PageHeader.jsx` breadcrumb yapısı var ✅
- `aria-label="Breadcrumb"` eklenmiş ✅

### 10.3 Mobile Menu
- `aria-label` ve `aria-expanded` kullanılıyor ✅
- Escape tuşu ile kapanma ✅

### 10.4 Raporlar Sayfası
- `app/raporlar/page.js` satır 32: Tüm bağlantılar `/raporlar` adresine yönlendiriliyor.
- Gerçek PDF dosyalarına link YOK.
- Bu, kullanıcı deneyimi ve SEO açısından sorunlu.

### 10.5 Footer Sosyal Medya Linkleri
- `Footer.jsx` satır 8: Sosyal medya link'leri `href="#"` ile ayarlanmış.
- Gerçek sosyal medya adresleri YOK.

---

## 11. ÖNCELİK SIRASI

### 🔴 Kritik (acil müdahale gerekli)
1. **Sitemap.xml oluştur** — tüm route'lar için
2. **Robots.txt oluştur**
3. **Tüm sayfalara metadata export ekle** — benzersiz title + description
4. **Open Graph + Twitter Card meta tag'leri ekle**
5. **Canonical URL ekle**

### 🟡 Yüksek Öncelik
6. **Ana sayfada tek H1 kuralını ihlal etme** — slider'da birden fazla H1 var
7. **Resim alt attribute'lerini iyileştir** — dekoratif resimleri belirle, açıklayıcı alt'lar ekle
8. **Raporlar sayfasında gerçek PDF link'leri**
9. **Footer'da sosyal medya link'leri**

### 🟢 Orta Öncelik
10. **Link title attribute'leri ekle** (erişilebilirlik)
11. **Schema.org structured data ekle** (Organization, WebSite, Article)
12. **Inline stilleri düzenli CSS'e taşı**
13. **Galeri sayfasında daha açıklayıcı alt text'ler**

---

## 12. ÖNERİLEN METADATA ŞABLONU

```javascript
// Örnek: app/iletisim/page.js
export const metadata = {
  title: 'İletişim | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi ile iletişime geçin. Adres, telefon ve e-posta bilgileri.',
  openGraph: {
    title: 'İletişim | Sarıyer Kent Konseyi',
    description: 'Sarıyer Kent Konseyi ile iletişime geçin.',
    url: 'https://sariyerkentkonseyi.org/iletisim',
    siteName: 'Sarıyer Kent Konseyi',
    images: ['/img/og-default.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | Sarıyer Kent Konseyi',
    description: 'Sarıyer Kent Konseyi ile iletişime geçin.',
    images: ['/img/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://sariyerkentkonseyi.org/iletisim',
  },
};
```

---

## 13. KULLANILAN ARAÇLAR

- Manuel kod inceleme
- Next.js App Router metadata API analizi
- HTML heading hiyerarşisi kontrolü
- Görsel alt attribute audit
