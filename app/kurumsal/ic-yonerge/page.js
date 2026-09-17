import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export const metadata = {
  title: 'İç Yönerge | Sarıyer Kent Konseyi',
  description: 'Sarıyer Kent Konseyi iç yönergesi. Amaç, kapsam, organlar ve çalışma ilkeleri.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org/kurumsal/ic-yonerge' },
};

export default function IcYonerge() {

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="KURUMSAL"
          title="İç Yönerge"
          breadcrumbs={["Kurumsal", "İç Yönerge"]}
        />
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 1000, margin: "0 auto", lineHeight: 1.9 }}>
               <h2>Sarıyer Kent Konseyi İç Yönergesi (9 Nisan 2026)</h2>

              <h3>BİRİNCİ BÖLÜM - Amaç, Kapsam, Dayanak ve Tanımlar</h3>

              <h4>Amaç</h4>
              <p>
                <strong>MADDE 1 –</strong> Bu Yönerge, Sarıyer Kent yaşamında, kent vizyonunun ve hemşerilik bilincinin geliştirilmesi,
                kentin hak ve hukukunun korunması, sürdürülebilir kalkınma, çevreye duyarlılık, sosyal yardımlaşma ve dayanışma,
                saydamlık hesap sorma ve hesap verme, katılım, yönetişim ve yerinden yönetim ilkelerini hayata geçirmeye çalışmak,
                sürdürülebilir kalkınma ve sürdürülebilir kent yaratma amacı ile Sarıyer kenti sorunlarını ele almak, yerel yönetimlere
                ve karar alma süreçlerine halkın katılımını sağlamak, kentin kalkınma/gelişim ve eylem planlarını hazırlamak,
                bu planların hayata geçirilmesini sağlamak, yerel demokrasinin gelişim ve yerleşimine katkıda bulunmak,
                sonuç odaklı çalışma kültürünü geliştirmek üzere hazırlanmıştır.
              </p>

              <h4>Kapsam</h4>
              <p>
                <strong>MADDE 2 –</strong> (1) Bu Yönerge, Sarıyer Kent Konseyinin oluşumu, organları, görevleri,
                çalışma ilkeleri ile meclisler ve çalışma gruplarının işleyişini kapsar.
              </p>

              <h4>Dayanak</h4>
              <p>
                <strong>MADDE 3 –</strong> (1) Bu Yönerge, 3/7/2005 tarihli ve 5393 sayılı Belediye Kanununun 76. maddesi ile
                8/10/2006 tarihli ve 26313 sayılı Resmî Gazete’de yayımlanan Kent Konseyi Yönetmeliğine dayanılarak hazırlanmıştır.
              </p>

              <h4>Tanımlar</h4>
              <p>
                <strong>MADDE 4 –</strong> (1) Bu Yönergede geçen;
                <br />a) Belediye: Sarıyer Belediyesini,
                <br />b) Kent Konseyi: Sarıyer Kent Konseyini,
                <br />c) Genel Kurul: Kent Konseyinin en yetkili organını,
                <br />ç) Yürütme Kurulu: Kent Konseyinin icra organını,
                <br />d) Meclisler: Yerel yönetimlerin ve halkın katılımını sağlayarak, kentin gelişimi ve sorunlarına çözüm üretmek amacıyla oluşturulan,
                kentteki tüm bireylerin, toplulukların ve sivil toplum kuruluşlarının görüş ve önerilerini dikkate alarak, demokratik bir katılım modeline sahip
                kent konseyi organıdır.
                <br />e) Çalışma Grupları: Kent Konseyi’nin faaliyet alanlarıyla ilgili belirli konularda derinlemesine çalışmalar yapmak ve öneriler
                geliştirmek amacıyla oluşturulan geçici veya sürekli gruplardır.
                <br />f) Sekretarya: Konseyin büro ve yazışma işlerini yürüten yapıyı,
                <br />g) Genel Sekreter: Kent Konseyi çalışmalarını koordine eden kişiyi,
                <br />h) Yönetmelik: Kent Konseyi Yönetmeliğini,
                <br />i) Yerel gündem 21 programı: Birleşmiş Milletler Rio Yeryüzü Zirvesinde 1992 yılında kabul edilen ve 21 inci yüzyılın
                gündemini belirleyen Gündem 21 başlıklı Eylem Planının 28 inci bölümü uyarınca, yerel yönetimlerin öncülüğünde,
                sivil toplumun ve diğer ortakların, birlikte kendi sorunlarını ve önceliklerini belirleyerek, kentleri için Yerel Gündem 21 olarak
                adlandırılan 1997 yılından itibaren uygulanan Türkiye Yerel Gündem 21 Programını ifade eder.
              </p>

              <hr style={{ margin: "40px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

              <h3>İKİNCİ BÖLÜM - Kent Konseyi Oluşumu, Görevleri ve Çalışma İlkeleri</h3>

              <h4>Sarıyer Kent Konseyinin Oluşumu</h4>
              <p>
                <strong>Madde 5 -</strong> Kent Konseyleri belediye teşkilatı olan yerlerde, mahalli idareler genel seçim sonuçlarını izleyen 3 ay içinde,
                8 inci maddede belirtilen üyelerden oluşur. Kent konseyi genel kurulu ilk toplantısını yapmak üzere belediye başkanının çağrısı ile toplanır.
                Belediye başkanının başkanlığında toplanan genel kurul, toplantıyı idare etmek üzere üyeleri arasından en az üç kişiden oluşan divan kurulunu seçer.
                Divan kurulunun oluşturulmasından sonra, kent konseyi yürütme kurulu ve kent konseyi başkanı seçilir.
              </p>

              <h4>Sarıyer Kent Konseyi Görevleri</h4>
              <p>
                <strong>MADDE 6</strong>
              </p>
              <ul>
                <li>Sarıyer ilçesinin kültürel, sanatsal ve toplumsal zenginliğini artırmaya yönelik projeler geliştirmek, etkinlikler düzenleyerek
                ilçenin tarihsel ve kültürel değerlerini koruma ve tanıtma amaçlı etkinlikler düzenlemek</li>
                <li>İlçedeki engelliler, yaşlılar ve diğer sosyal grupların sorunlarına duyarlı, yaşam kalitelerini arttırıcı sosyal hizmet projelerini
                geliştirerek, psiko-sosyal destek, bağımlılık ile mücadele ve sağlık taramaları gibi toplumsal hizmet alanlarında rehberlik sağlamak.</li>
                <li>Sarıyer halkının kent yönetimine katılımını artırmak amacıyla kamuoyu oluşturma çalışmaları yaparak, sosyal adalet, eşitlik ve
                dayanışmayı teşvik edici programlar ve eğitimler düzenlemek.</li>
                <li>Sarıyer ilçesindeki kentsel dönüşüm süreçlerine dair halkın katılımını sağlamak, yerel halkın görüş ve ihtiyaçlarını belediye ile
                paylaşmak, şehir planlaması, altyapı iyileştirmeleri, ulaşım projeleri ve çevre düzenlemeleri konusunda öneriler geliştirmek.</li>
                <li>Yerel halkın güvenliğini, sağlığını ve yaşam kalitesini artırmaya yönelik projeleri desteklemek.</li>
                <li>Sarıyer’in ekonomik kalkınmasına yönelik stratejiler geliştirmek, sürdürülebilir kalkınma projelerini desteklemek, çevre dostu ve
                sürdürülebilir yaşam biçimlerinin teşvik edilmesi amacıyla, iklim değişikliği ve çevre kirliliği gibi konularda farkındalık yaratıcı
                faaliyetler düzenlemek.</li>
                <li>Sarıyer’de yeşil alanlar, kıyı ve deniz alanlarını, balıkçılık, doğal yaşam alanları ve biyolojik çeşitliliğin korunması için projeler
                geliştirmek ve uygulamak.</li>
                <li>Sarıyer’in doğal afetlere (deprem, sel, yangın vb.) karşı hazırlığını güçlendirmek amacıyla afet öncesinde ve sonrasında yapılacaklar
                ile ilgili gerek sivil toplum kuruluşları gerek kamu kurum ve kuruluşları ile koordinasyon sağlamak.</li>
                <li>Gençlik Meclisi ile işbirliği içinde, gençlerin karar alma süreçlerine katılımını artırmaya yönelik etkinlikler yaparak gençlerin
                eğitimine, kültürel ve sosyal gelişimine yönelik projeler düzenlemek.</li>
                <li>Sarıyer’de halk sağlığına yönelik projeler geliştirmek, sağlık hizmetlerine erişimi artıracak çalışmalar yapmak.</li>
                <li>Sarıyer’de çevre kirliliği, atık yönetimi ve geri dönüşüm gibi çevresel sorunlara dair farkındalık yaratmak ve doğal kaynakların
                verimli kullanılmasını sağlamak için eğitimler, seminerler ve kampanyalar düzenlemek, karasal ve deniz ekosistemlerinin korunması
                için yerel projeler geliştirmek ve çevre dostu uygulamaları teşvik etmek.</li>
                <li>Kentin sorunları ve projeleri hakkında halkı bilgilendirmek, şeffaflık ve hesap verebilirlik ilkesine uygun olarak iletişim kanalları
                oluşturmak.</li>
                <li>Sarıyer’deki sosyal medya, yerel basın ve halkla ilişkiler kanalları üzerinden Kent Konseyi’nin faaliyetlerini duyurmak.</li>
                <li>Kentteki sosyal ve kültürel farklılıkları hoşgörü ve anlayışla bir arada yaşama kültürü yaratmak için halkı bilinçlendirici
                etkinlikler düzenlemek.</li>
                <li>Kadınların toplumsal hayata katılımını artırmak, kadın haklarını savunmak ve kadınların yaşam kalitesini yükseltmeye yönelik
                projeler yapmak, aile içi şiddet ve ayrımcılıkla mücadele etmek için rehberlik, eğitim ve psikolojik destek hizmetleri sağlamak,
                kadınların ekonomik ve sosyal hayatta güçlü bir yer edinmesini sağlamak için girişimcilik ve iş gücü desteği sunmak.</li>
                <li>Sarıyer ilçesinde hayvan hakları konusunda kamuoyu oluşturmak ve toplumda farkındalık yaratmak amacıyla okullarda, kamu kurumları
                ve halka seminerler, panel ve eğitim programları düzenlemek. Sarıyer’deki sahipsiz hayvanlar için barınma ve bakım evleri kurmak,
                bu evlerin düzenli olarak denetlenmesini sağlamak ve hayvanların bakımı, tedavisi ve aşıları konusunda sağlık hizmeti sunan mobil
                klinikler ve veterinerlik hizmetleri organize etmek ve bu çalışmalar için gönüllülerle işbirliği yaparak kampanyalar düzenlemek.</li>
                <li>Kent konseyi üyesi olan ve olmayan kuruluşların ulusal veya uluslararası projelerinde paydaş olmak.</li>
              </ul>

              <h4>Sarıyer Kent Konseyi Çalışma İlkeleri</h4>
              <p>
                <strong>MADDE 7</strong>
              </p>
              <p>Sarıyer Kent Konseyi, aşağıdaki temel ilkeler doğrultusunda çalışmalarını sürdürür:</p>
              <ul>
                <li><strong>Kentin Yaşanabilir Bir Geleceğe Taşınmasına Katkı:</strong> YG21 süreci kapsamında, Sarıyer Kent Konseyi, kentine sahip çıkma,
                aktif katılım ve çözümde ortaklık ilkelerine bağlı olarak, Sarıyer’in yaşanabilirliğini artırmayı ve ilçenin geleceğini sürdürülebilir
                şekilde inşa etmeyi hedefler.</li>
                <li><strong>Uluslararası Sözleşmelere ve Temel İlkelere Saygı:</strong> Sarıyer Kent Konseyi, Türkiye Cumhuriyeti'nin imzaladığı ve onayladığı
                Birleşmiş Milletler Zirveleri ve diğer uluslararası sözleşmelerin kent yaşamına yönelik temel ilkelerini hayata geçirmeye çalışır.</li>
                <li><strong>Kent Vizyonu ve Hemşehrilik Bilincinin Geliştirilmesi:</strong> Kent Konseyi, Sarıyer'in vizyonunu belirlerken hemşehrilik bilincini
                ve kent haklarını ön planda tutar. Kentin hak ve hukukunu korur, sürdürülebilir kalkınmayı destekler, çevreye duyarlılık gösterir,
                sosyal yardımlaşma ve dayanışmayı teşvik eder.</li>
                <li><strong>Tarafsızlık ve Ulusal-Güncel Gelişmeleri Gözetme:</strong> Sarıyer Kent Konseyi, uluslararası gelişmeleri ve ülke koşullarını
                dikkate alarak, tarafsız bir yaklaşım benimser ve tüm görüş ve önerilerini bu çerçevede oluşturur.</li>
                <li><strong>Katılımcılık ve Ortak Akıl:</strong> Sarıyer Kent Konseyi, tüm karar süreçlerinde katılımcılığı esas alır ve ortak akıl ile
                uzlaşmayı hedefler. Kentin tüm paydaşlarının fikirlerini alarak, toplumun ihtiyaçlarına yönelik kararlar alınır.</li>
                <li><strong>Değişim ve Yeniliklere Uyum:</strong> Sarıyer Kent Konseyi, değişimi ve yenilikleri önceden fark ederek, bu değişimlere uyum
                sağlar ve sonuç odaklı bir çalışma kültürünü benimser.</li>
              </ul>

              <hr style={{ margin: "40px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

              <h3>ÜÇÜNCÜ BÖLÜM - Kent Konseyi Üyeliği ve Organları</h3>

              <h4>Kent Konseyi Üyeliği</h4>
              <p>
                <strong>MADDE 8 -</strong> Sarıyer Kent Konseyi, merkezi yönetimi, yerel yönetimi, kamu kurumu niteliğindeki meslek kuruluşlarını
                ve sivil toplumu, ortaklık anlayışıyla buluşturmak amacıyla aşağıda belirtilen kişi, kurum ve kuruluş temsilcilerinden oluşur:
              </p>
              <ul>
                <li><strong>a)</strong> Mahallin en büyük mülki idare amiri veya temsilcisi: Sarıyer ilçesinin mülki idare amiri (Kaymakam veya temsilcisi),
                Kent Konseyi'nde yer alır ve ilçenin genel yönetimiyle ilgili sorunların çözülmesine katkı sağlar.</li>
                <li><strong>b)</strong> Sarıyer Belediye Başkanı veya temsilcisi: Sarıyer Belediye Başkanı, Kent Konseyi'nin doğal üyesidir. Başkan,
                Belediye’nin Kent Konseyi ile ilgili tüm faaliyetlerinde yönlendirici rol üstlenir.</li>
                <li><strong>c)</strong> Kamu kurum ve kuruluşları temsilcileri: Kaymakamlık tarafından belirlenecek, sayısı 10’u geçmemek üzere Sarıyer
                ilçesinde bulunan kamu kurumlarının temsilcileri Kent Konseyi'nde yer alır.</li>
                <li><strong>ç)</strong> Mahalle muhtarları: Belediye Başkanı'nın çağrısı üzerine toplanan mahalle muhtarları arasından, toplam muhtar sayısının
                yüzde 30’unu geçmemek ve 20’den az olmamak kaydıyla kendi aralarından seçecekleri temsilciler Kent Konseyi’ne üye olur.</li>
                <li><strong>d)</strong> Siyasi parti temsilcileri: Sarıyer ilçesinde teşkilat kurmuş olan siyasi partiler, Kent Konseyi'nde temsil edilmek üzere
                her parti tarafından birer temsilci seçer.</li>
                <li><strong>e)</strong> Üniversitelerden temsilciler: Sarıyer ilçesinde bulunan üniversitelerden, her bir üniversite ikiden fazla olmamak üzere
                en az bir temsilci gönderir.</li>
                <li><strong>f)</strong> Kamu kurumu niteliğindeki meslek kuruluşları, sendikalar, noterler, barolar ve ilgili dernekler ile vakıflar: Kamu kurumu
                niteliğindeki meslek kuruluşlarının, kamu yararına çalışan derneklerin, sendikaların, noterlerin, baroların, oda ve vakıflarının adreslerinin
                ve/veya temsilcilerinin ikametinin Sarıyer ilçesinde olması gerekmektedir.</li>
                <li><strong>g)</strong> Kent Konseyi tarafından kurulan meclis ve çalışma gruplarının temsilcileri: Sarıyer Kent Konseyi tarafından kurulan
                meclisler ve çalışma gruplarının her biri, kendi aralarından birer temsilci seçerek Kent Konseyi'ne katılır.</li>
              </ul>

              <h4>Organları</h4>
              <p>
                <strong>MADDE 9 –</strong> Sarıyer Kent Konseyi aşağıdaki organlardan oluşur:
                <br />a) Genel Kurul
                <br />b) Yürütme Kurulu
                <br />c) Meclisler ve Çalışma Grupları
                <br />d) Kent Konseyi Başkanı
              </p>

              <h4>Genel Kurul</h4>
              <p>
                <strong>MADDE 10-a –</strong> Genel Kurul, Kent Konseyi Yönetmeliği’nin 8. Maddesine uygun olarak düzenlenen bu yönergenin 8. maddesinde
                sayılan üyelerden oluşur ve Kent Konseyinin en yetkili organıdır.
              </p>
              <p>
                Genel kurul toplantısında salt çoğunluk oluşmadığı taktirde en erken 7 gün içinde genel kurul çağrısı yeniden yapılır.
                Genel Kurul üyeliği her kurum ve kuruluşun, STK ve meslek odalarının karar defterlerinde belirtilen yetki almış üyelerden oluşur.
                (2) Genel Kurul, her yıl Ocak ve Eylül aylarında olmak üzere yılda en az iki defa toplanır.
                (3) Toplantı çağrısı, en az 15 gün önceden gündem ile birlikte üyelerin ve STKların whatsapp ile telefonlarına, e-posta ile ve/veya
                fiziki tebligat adreslerine bildirilir.
              </p>

              <h4>Yürütme Kurulu</h4>
              <p>
                <strong>MADDE- 11</strong>
              </p>
              <p>
                1-Yürütme Kurulu Genel Kurul tarafından birinci dönem için iki, ikinci dönem için üç yıl görev yapmak için seçilen gizli oy açık tasnif ile
                seçilen bir Başkan, 21 asil üye, 2 meclis başkanı olmak üzere 24 asil üyeden oluşur. Ayrıca yürütme kurulu için 7 yedek ve meclis başkanları
                için 2 yedek başkan vekili seçilir. Konseyin icra organıdır.
              </p>
              <p>
                2-Yürütme Kurulunda görev almak isteyen genel kurul üyelerinden, yürütme kurulu üyesi aday olmak istediklerini seçim tarihinin ilanından
                başlayarak en geç seçimden bir hafta öncesi mesai bitimine kadar Konsey Genel Sekreterliğine kurumlarını temsil ettiğini bildiren yetki belgeleri
                ve onaylı yönetim kurulu karar defteri sayfasının sureti ile beraber başvurarak bildirirler.
              </p>
              <p>
                8- Yürütme kurulu 24 asil üyenin yarıdan bir fazlası ile toplanır ve kararlar toplantıya katılanların yarıdan bir fazlası ile alınır.
              </p>

              <h4>Kent Konseyi Başkanı</h4>
              <p>
                <strong>MADDE 11/A –</strong> (1) Kent Konseyi Başkanı, Genel Kurul tarafından seçilir. Görev süresi, Yürütme Kurulunun görev süresi ile paraleldir.
                (2) Seçim gizli oyla yapılır. İlk turda üçte iki, ikinci turda salt çoğunluk, üçüncü turda en çok oy alan aday seçilmiş sayılır.
              </p>
              <p>Kent Konseyi Başkanının Görev ve Sorumlulukları:</p>
              <ul>
                <li>Kent Konseyini kamuoyu ile her türlü kamu ve özel kuruluşlar sivil toplum kuruluşları önünde temsil eder.</li>
                <li>Kent Konseyi Genel Kurulu başkanlığını yapar. Başkan, bu toplantıların düzenli olarak yapılmasını sağlar.</li>
                <li>Meclislerin ve Çalışma Gruplarının etkinliğini takip eder ve gerektiğinde yönlendirme yaparak grupların amaçları doğrultusunda
                çalışmalarını teşvik eder.</li>
                <li>Denetim ve hesap verebilirlik adına, diğer organların ve çalışma gruplarının düzenli raporlama yapmalarını sağlar.</li>
                <li>Yerel yönetimle işbirliği yaparak, kent sorunlarına yönelik politikalar ve projeler geliştirilmesine öncülük eder.</li>
                <li>Kaynak yaratma faaliyetlerine katılır, Belediye ve STK projelerinde paydaşı olarak fon temini konusunda çeşitli stratejiler geliştirir.</li>
                <li>Kent Konseyi'nin halkla ilişkilerini yönetir, toplumun sorunlarını duyurmak ve Kent Konseyi'ne katılımı teşvik etmek amacıyla
                yerel medya, sosyal medya ve diğer iletişim kanallarını etkin bir şekilde kullanır.</li>
              </ul>

              <h4>Meclisler ve Çalışma Grupları</h4>
              <p>
                <strong>MADDE 12-</strong> Meclisler ve çalışma grupları, Sarıyer Kent Konseyi Genel Kurulu tarafından belirlenen tematik alanlara göre kurulur.
                Meclisler ve çalışma grupları kendi görev tanımlarını ve faaliyet alanlarını belirleyerek yürütme kurulunun onayına sunarlar.
              </p>
              <ul>
                <li><strong>12-a)</strong> Kadın, Gençlik, Engelli ve varsa Diğer Meclisler: Kent Konseyi Yürütme Kurulunun belirlediği tarihlerde yapılacak
                seçimli meclis genel kurullarında; yürütme kurulunda görev alacak Kadın, Gençlik, Engelli Meclisleri ve varsa diğer Meclis Başkanları seçilir.</li>
                <li><strong>12-b)</strong> Çalışma Grupları: Sarıyer’deki kurum, kuruluş, STK temsilcileri ile mahalle dernek ve kooperatif temsilcileri ile
                kent içinde yaşayan her kesimden kişinin bireysel katılımı ile kurulur. Çalışma Grupları en az 3 kişiden oluşur, gönüllülük esas alınır.</li>
                <li><strong>12-c)</strong> Meclisler ve çalışma grupları, Sarıyer Kent Konseyi Genel Kurulu tarafından belirlenen tematik alanlara göre kurulur.
                Her bir meclis veya grup, ilgili konularda uzman kişilerden ve gönüllülerden oluşur.</li>
              </ul>

              <hr style={{ margin: "40px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

              <h3>DÖRDÜNCÜ BÖLÜM - Çeşitli ve Son Hükümler</h3>

              <h4>Genel Sekreterlik</h4>
              <p>
                <strong>MADDE 13–</strong> (1) Kent Konseyi sekretarya hizmetleri, Sarıyer Belediyesi tarafından karşılanır. Belediye, Kent Konseyine
                çalışma mekânı, teknik donanım ve yeterli personel desteği sağlar.
                <br />(2) Kent konseyi genel sekreteri, belediye başkanı tarafından önerilen üç aday arasından yürütme kurulu tarafından seçilir.
                <br />(3) Genel Sekreter; Kent Konseyinin yazışma, iletişim, koordinasyon ve büro işlerini ve arşivlemeyi yürütmekle ve korumakla görevli olup,
                Konsey Başkanı ve Yürütme Kuruluna karşı sorumludur.
              </p>

              <h4>Kent Konseyi Genel Sekreterinin Görevleri</h4>
              <ul>
                <li>Kent Konseyi’nin günlük işleyişini yönetir ve tüm idari süreçlerin düzenli bir şekilde işlemesini sağlar.</li>
                <li>Tüm idari belgelerin hazırlanması, yazışmaların yönetilmesi ve kurumsal düzene uygun sayısı verilmiş, konusu, tarafları yazılmış
                evrak dosyalama işlemlerini yerine getirir.</li>
                <li>Kent Konseyi Genel Kurulu ve Yürütme Kurulu toplantıları ile meclis ve çalışma grubu toplantılarının ve Kent Konseyi Başkanın
                talimatlarına uygun olarak diğer etkinliklerin duyuruları ve organizasyonunu yapar.</li>
                <li>Sosyal medya ve dijital platformlarda iletişim stratejilerinin uygulanmasına yardımcı olur ve halkla etkileşimi artırmak için gerekli
                düzenlemeleri yapar.</li>
              </ul>

              <h4>Sekreterya Hizmetleri</h4>
              <p>
                <strong>Madde 14</strong>
                <br />1-Kent Konseyinin sekreterya hizmetleri, ilgili belediye tarafından önerilecek ve yürütme kurulu tarafından kabul edilecek görevliler
                tarafından yerine getirilir.
                <br />2-Sekreterya hizmetlerini yürüten personel, bu çalışmalarında genel sekretere karşı sorumludur.
              </p>

              <h4>Yönerge Çıkarma</h4>
              <p>
                <strong>MADDE 15 –</strong> Kent Konseyi Genel Kurulu bu Yönergeye aykırı olmamak kaydıyla çalışma talimatları çıkarabilir.
                Gerektiğinde bu yönergeyi yeniden düzenleyebilir, yeni yönerge çıkartabilir.
              </p>

              <h4>Kent Konseyi Mali Yapısı</h4>
              <p>
                <strong>MADDE 16</strong> Belediyeler kent konseylerine, bütçelerinde ödenek ayırmak suretiyle ayni ve nakdi yardım yapar, destek sağlar.
                Yürütme kurulunun, onayını almış projeler için gerekli ayni ve nakdi bütçeyi planlamasının her yılın Aralık ayında belediyeye sunulması beklenir.
                Çalışma Grupları kendi olanakları ile çeşitli faaliyetleri ve etkinlikleri yapabilir.
              </p>

              <h4>Yürürlük</h4>
              <p>
                <strong>MADDE 17–</strong> (1) Bu Yönerge, 9 Nisan 2026’yı takip eden genel kurulun yapılması ile ilgili konularda 9 Nisan 2026’dan itibaren
                geçerli olup, diğer konularda bütünüyle ilk seçimli genel kuruldan itibaren yürürlüğe girer.
              </p>

              <h4>Yürütme</h4>
              <p>
                <strong>MADDE 18 –</strong> (1) Bu Yönerge hükümlerini Sarıyer Kent Konseyi Yürütme kurulu yürütür.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
