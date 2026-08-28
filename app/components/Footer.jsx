import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" id="iletisim">
      <div className="container">
        <div className="footer-grid">
          <div><Link className="brand" href="/"><img className="brand-img" src="/img/logo.svg" alt="Sarıyer Kent Konseyi"/></Link><div className="socials"><a href="#">f</a><a href="#">𝕏</a><a href="#">◎</a><a href="#">▶</a><a href="#">in</a></div></div>
          <div><h3>KENT KONSEYİ</h3><Link href="/hakkimizda">Kent Konseyi Hakkında</Link><Link href="/meclisler">Meclislerimiz</Link><Link href="/calisma-gruplari">Çalışma Grupları</Link><Link href="/yonetmelik">Yönetmelik</Link><Link href="/iletisim">İletişim</Link></div>
          <div><h3>BİLGİ</h3><Link href="/haberler">Haberler</Link><Link href="/etkinlikler">Etkinlikler</Link><Link href="/raporlar">Raporlar &amp; Yayınlar</Link><Link href="/galeri">Fotoğraf Galerisi</Link><Link href="/videolar">Video Galerisi</Link></div>
          <div><h3>İLETİŞİM</h3><p>Merkez Mah. Darüşşafaka Cad.<br/>No: 33 Sarıyer / İstanbul</p><p>0212 242 00 00</p><p>info@sariyerkentkonseyi.org</p></div>
        </div>
        <div className="footer-bottom"><span>© 2024 Sarıyer Kent Konseyi. Tüm hakları saklıdır.</span><div><Link href="/kvkk">KVKK</Link><Link href="/gizlilik-politikasi">Gizlilik Politikası</Link><Link href="/kullanim-sartlari">Kullanım Şartları</Link></div></div>
      </div>
    </footer>
  );
}
