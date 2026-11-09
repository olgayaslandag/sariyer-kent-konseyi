/**
 * @file lib/data/shapes.js — JSDoc @typedef tanımları (faz-1)
 *
 * Bu dosya SADECE tip bildirimi içerir; çalışma anında kod üretmez.
 * Kaynak: mocks/data/*.json dosyalarının fiili şekli (inceleme: 2026-11-09,
 * faz-6 temizliği ile güncellendi).
 *
 * Bulunduğu şekliyle gerçek veriyle doğrulanmış notlar:
 *   1. Meclisler (Council) detayı `goals` kullanır; çalışma grupları
 *      (WorkingGroup) detayı `focusAreas` kullanır. Yani bu iki tip
 *      gövde olarak aynıdır fakat detay içindeki liste alanı farklıdır.
 *      Sayfalar da bunu bekler: meclisler/[slug] -> detail.goals,
 *      calisma-gruplari/[slug] -> detail.focusAreas.
 *   2. `activities` her iki detayda da dizi değil, tek parçalı metin
 *      (string) şeklindedir.
 *   3. `id` alanları sayısal değil, sıfırla dolu string değerlerdir
 *      ("01", "02", …).
 *   4. `subTitle` boş string olabilir (Sanat ve Spor girdileri).
 *      Tek kelimelik başlıklarda kısa başlık ile aynı değer tekrarlanır.
 *   5. Haber `date` alanı ISO tarih değil, Türkçe insan dili tarih
 *      metnidir ("20 Nisan 2024"). Haber `content` HTML metnidir.
 *   6. Faz-6 temizliği: `mocks/data/content.json` ({ haberler, etkinlikler }
 *      sarmalayıcısı) silindi. İçerik analizi: haberler dizisi haberler.json
 *      ile birebir aynı; etkinlik slug kümeleri aynı fakat img/contentImg
 *      yolları farklıydı (kopyadaki genel /img/sariyer-kare-* yolları,
 *      canlı etkinlikler.json'daki özgül /img/etkinlik-*-detay.jpg
 *      yollarıyla değiştirilmişti). Canlı kaynak haberler.json +
 *      etkinlikler.json'dur; sarmalayıcı kopya ölüydü, tekrarı önlemek
 *      için silindi. `haberler_test.json` ({"test": true}) da aynı fazda
 *      silindi.
 *   7. Mevcut app/data/searchData.js içindeki arama nesnesi bu tip ile
 *      aynı değildir. Eski şekil { type, title, href, text, raw } olup
 *      `type` insan dilinde Türkçe etikettir ("Haber", "Etkinlik",
 *      "Çalışma Grubu", "Meclis"). Buradaki SearchIndexEntry faz-2
 *      buildSearchIndex() çıktısını tanımlar: { slug, kind, title,
 *      href, text } ve `kind` bir SlugKind değeridir.
 *
 * Kullanım notu: faz-2'deki kontrat bu adları kullanacaktır
 * (News, Event, Council, WorkingGroup, SearchIndexEntry, SearchIndex,
 * SlugKind). Hiçbir çalışma zamanı davranışı burada yoktur.
 */

/**
 * Koleksiyon türünü ve ilgili sayfa kökünü belirtir.
 * Değerler app/ altındaki dizin adlarıyla birebir eşleşir.
 * @typedef {'haberler'|'etkinlikler'|'meclisler'|'calisma-gruplari'} SlugKind
 */

/**
 * Meclis/çalışma grubu detay listelerindeki tekil öğe.
 * Her iki koleksiyonda da aynı { title, desc } şeklindedir.
 * @typedef {{title: string, desc: string}} DetailItem
 */

/**
 * Meclis (Council) detay gövdesi — kaynak: mocks/data/meclisler.json
 * 5 girdinin hepsi bu şekildedir. Liste alanı `goals` şeklindedir.
 * @typedef {{
 *   about: string,
 *   goals: DetailItem[],
 *   activities: string,
 *   projects: DetailItem[]
 * }} CouncilDetail
 */

/**
 * Çalışma grubu (WorkingGroup) detay gövdesi —
 * kaynak: mocks/data/calisma-gruplari.json (22 girdi).
 * Liste alanı `focusAreas` şeklindedir (Council'daki `goals`
 * karşılığıdır).
 * @typedef {{
 *   about: string,
 *   focusAreas: DetailItem[],
 *   activities: string,
 *   projects: DetailItem[]
 * }} WorkingGroupDetail
 */

/**
 * Haber girdisi — kaynak: mocks/data/haberler.json (6 girdi).
 * `content` HTML metni içerir; `date` insan dili Türkçe tarihtir.
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   date: string,
 *   tag: string,
 *   img: string,
 *   contentImg: string,
 *   desc: string,
 *   content: string
 * }} News
 */

/**
 * Etkinlik girdisi — kaynak: mocks/data/etkinlikler.json (6 girdi).
 * `time` saat aralığı metnidir ("10:00 - 12:00").
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   time: string,
 *   location: string,
 *   img: string,
 *   contentImg: string,
 *   desc: string
 * }} Event
 */

/**
 * Meclis — kaynak: mocks/data/meclisler.json (5 girdi).
 * `id` sıfırla dolu stringdir. `subTitle` boş olabilir.
 * `link` değeri /meclisler/{slug} kalıbındadır.
 * @typedef {{
 *   id: string,
 *   slug: string,
 *   title: string,
 *   shortTitle: string,
 *   subTitle: string,
 *   description: string,
 *   link: string,
 *   img: string,
 *   detail: CouncilDetail
 * }} Council
 */

/**
 * Çalışma grubu — kaynak: mocks/data/calisma-gruplari.json (22 girdi).
 * Gövde Council ile aynıdır; fark detay içindeki liste adından gelir.
 * `link` değeri /calisma-gruplari/{slug} kalıbındadır.
 * @typedef {{
 *   id: string,
 *   slug: string,
 *   title: string,
 *   shortTitle: string,
 *   subTitle: string,
 *   description: string,
 *   link: string,
 *   img: string,
 *   detail: WorkingGroupDetail
 * }} WorkingGroup
 */

/**
 * Arama indeksi girdisi — faz-2 buildSearchIndex() çıktısı.
 * `kind` ilgili kaydın SlugKind değeridir; `href` ise /{kind}/{slug}
 * kalıbındadır (ör. /haberler/{slug}). `text` aranabilir birleşik
 * metindir. Eski arama nesnesiyle (type/raw) karıştırılmamalıdır.
 * @typedef {{
 *   slug: string,
 *   kind: SlugKind,
 *   title: string,
 *   href: string,
 *   text: string
 * }} SearchIndexEntry
 */

/**
 * Sunucu tarafı arama için birleşik indeks.
 * @typedef {SearchIndexEntry[]} SearchIndex
 */


