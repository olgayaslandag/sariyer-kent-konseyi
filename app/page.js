 "use client";

import { useState } from "react";

const workAreas = [
  ["01","Çevre ve","Sürdürülebilirlik","Çevre"],
  ["02","Eğitim ve","Gençlik","Eğitim"],
  ["03","Sağlık ve","Sosyal Hizmetler","Sağlık"],
  ["04","Kültür ve","Sanat","Kültür"],
  ["05","Kentleşme ve","Planlama","Kentleşme"],
  ["06","Ekonomi ve","İstihdam","Ekonomi"],
  ["07","Engelli ve","Erişilebilirlik","Erişilebilirlik"],
  ["08","Çocuk ve","Aile","Çocuk ve Aile"],
];

const councils = [
  ["Gençlik","Meclisi"],["Kadın","Meclisi"],["Çocuk","Meclisi"],
  ["Engelli","Meclisi"],["Yaşlılar","Meclisi"]
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <header className="site-header">
        <nav className="navbar">
          <div className="container nav-inner">
            <a className="brand" href="#">
              <span className="brand-mark">≈</span>
              <span className="brand-copy"><small>SARIYER</small><strong>KENT KONSEYİ</strong><em>Birlikte Düşünen, Birlikte Üreten, Birlikte Yaşayan Sarıyer</em></span>
            </a>
            <button className="nav-toggle" aria-label="Menüyü aç">☰</button>
            <div className="nav">
              <a className="active" href="#">Anasayfa</a>
              <a href="#">Kent Konseyi⌄</a><a href="#">Meclislerimiz⌄</a><a href="#">Çalışma Grupları⌄</a>
              <a href="#haberler">Haberler</a><a href="#etkinlikler">Etkinlikler</a><a href="#raporlar">Raporlar &amp; Yayınlar</a>
              <a href="#iletisim">İletişim</a><a href="#">⌕</a><a className="join" href="#katil">Bize Katılın →</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <img className="hero-bg" src="https://placehold.co/1920x720/jpg?text=Sarıyer+Bosphorus" alt="Sarıyer sahil görünümü"/>
          <div className="hero-overlay"/>
          <div className="container hero-inner">
            <div className="hero-content">
              <p className="eyebrow light">SARIYER KENT KONSEYİ</p>
              <h1>Birlikte Düşünüyor,<br/>Sarıyer'i Birlikte Geliştiriyoruz.</h1>
              <p className="hero-lead">Katılımcı demokrasi kültürüyle<br/>Sarıyer’in ortak akıl platformu.</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <a className="btn btn-primary" href="#hakkimizda">Hakkımızda →</a>
                <a className="btn btn-outline-light" href="#katil">Bize Katılın →</a>
              </div>
            </div>
            <div className="hero-card"><strong>Birlikte<br/>Daha Güçlüyüz</strong><p>Sarıyer’in geleceğini birlikte şekillendiriyoruz.</p><span className="round-arrow">→</span></div>
            <div className="hero-dots"><span className="active"/><span/><span/></div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">HİZMET ALANLARIMIZ</p><h2>Çalışma Alanlarımız</h2></div>
              <p className="section-intro">Kentimizin yaşam kalitesini artırmak için birçok alanda ortak akılla çözüm üretmeye devam ediyoruz.</p>
              <a className="text-link" href="#">Tüm Alanlar →</a>
            </div>
            <div className="work-grid">
              {workAreas.map(([n,a,b,img]) => <a className="image-card" href="#" key={n}><img src={`https://placehold.co/800x520/jpg?text=${encodeURIComponent(img)}`} alt=""/><div><span>{n}</span><h3>{a}<br/>{b}</h3></div></a>)}
            </div>
          </div>
        </section>

        <section className="section" style={{paddingTop:12}}>
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">MECLİSLERİMİZ</p><h2>Güçlü Bir Sarıyer İçin Birlikteyiz</h2></div><a className="text-link" href="#">Tüm Meclisler →</a></div>
            <div className="council-grid">
              {councils.map(([a,b],i)=><a className="council-card" href="#" key={a}><img src={`https://placehold.co/520x420/jpg?text=${encodeURIComponent(a)}`} alt=""/><strong>{a}<br/>{b}</strong></a>)}
              <a className="council-card other" href="#"><strong>Diğer Meclisler</strong><span>→</span></a>
            </div>
          </div>
        </section>

        <section className="section" style={{paddingTop:8}}>
          <div className="container">
            <div className="process-wrap">
              <div className="section-heading"><div><p className="eyebrow">KENT KONSEYİ NASIL ÇALIŞIR?</p><h2>Ortak Akılla, Birlikte Üretiyoruz</h2></div><a className="text-link" href="#">Tüm Süreç →</a></div>
              <div className="process-grid">
                {[["01","Fikir","Sarıyer’in ihtiyaçlarını belirliyor, fikirleri topluyoruz."],["02","Meclisler","Fikirleri meclislerde görüşüyor ve değerlendiriyoruz."],["03","Çalışma Grupları","Uzmanlık alanlarına göre çözüm önerileri geliştiriyoruz."],["04","Proje / Öneri","Projeler üretiyor, hayata geçiriyor ve etkisini izliyoruz."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{paddingTop:0}}>
          <div className="container">
            <div className="idea-banner"><img src="https://placehold.co/1400x600/jpg?text=Söz+Sende+Sarıyer" alt=""/><div className="idea-overlay"/><div className="idea-content"><p className="eyebrow light">SÖZ SENDE SARIYER</p><h2>Sarıyer için<br/>bir fikrin mi var?</h2><p>Fikrini, önerini ve projeni bizimle paylaş.</p><a className="btn btn-light" href="#katil">Fikrini Paylaş →</a></div></div>
          </div>
        </section>

        <section className="section" style={{paddingTop:0}} id="haberler">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel"><div className="panel-head"><h2>HABERLER</h2><a href="#">Tüm Haberler →</a></div><img className="featured-img" src="https://placehold.co/900x560/jpg?text=Haber" alt=""/><span className="tag">DUYURU</span><h3>Sarıyer Kent Konseyi Genel Kurulu Gerçekleştirildi</h3><small>12 Mayıs 2024</small><p>Genel kurulumuz geniş katılımla tamamlandı. Yeni dönem çalışma programımız belirlendi.</p><a className="read-more" href="#">Devamını Oku →</a></article>
              <article className="content-panel" id="etkinlikler"><div className="panel-head"><h2>ETKİNLİKLER</h2><a href="#">Tüm Etkinlikler →</a></div><div className="event-feature"><img src="https://placehold.co/900x420/jpg?text=Sürdürülebilir+Yaşam" alt=""/><div className="event-text"><h3>Sarıyer’de Sürdürülebilir Yaşam Paneli</h3><p>14:00 - 17:00 · Sarıyer Kültür Merkezi</p><a className="btn btn-light" href="#">Detaylar →</a></div></div><div className="event-row"><b>01</b><span><strong>Çocuk Atölyesi: Doğa ile Sanat</strong><small>11:00 - 13:00 · Sarıyer Belediyesi Ek Hizmet Binası</small></span></div><div className="event-row"><b>08</b><span><strong>Kent Söyleşileri: Katılımcı Demokrasi</strong><small>14:00 - 16:00 · Sarıyer Kültür Merkezi</small></span></div></article>
              <article className="content-panel" id="raporlar"><div className="panel-head"><h2>RAPORLAR &amp; YAYINLAR</h2><a href="#">Tüm Yayınlar →</a></div>{["Sarıyer Kent Konseyi Faaliyet Raporu 2023","Çalışma Grupları Raporu 2024","Sarıyer Kent Vizyonu — Ortak Gelecek"].map(x=><a className="report-row" href="#" key={x}><span className="pdf-icon">PDF</span><span><strong>{x}</strong><small>PDF · 4.2 MB</small></span></a>)}</article>
            </div>
            <div className="gallery-strip"><div className="panel-head"><h2>SARIYER'DEN KARELER</h2><a href="#">Tüm Galeri →</a></div><div className="gallery-grid">{Array.from({length:6},(_,i)=><img key={i} src={`https://placehold.co/500x500/jpg?text=Sarıyer+${i+1}`} alt=""/>)}</div></div>
          </div>
        </section>

        <section className="newsletter" id="katil">
          <div className="container"><div className="newsletter-inner"><div className="newsletter-icon">✉</div><div><h2>Haber Bültenimize Katılın</h2><p>Çalışmalarımızdan ve etkinliklerimizden haberdar olmak için bültenimize abone olun.</p></div><form className="newsletter-form" onSubmit={(e)=>{e.preventDefault();if(email){setSubscribed(true);setEmail("")}}}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-posta adresiniz" required/><button className="btn btn-light">Abone Ol →</button></form></div></div>
        </section>
        {subscribed && <div onClick={()=>setSubscribed(false)} style={{position:"fixed",right:20,bottom:20,zIndex:2000,background:"#fff",color:"var(--ink)",padding:"14px 18px",borderRadius:8,boxShadow:"0 12px 40px rgba(0,0,0,.2)",cursor:"pointer"}}>Bülten aboneliğiniz için teşekkürler.</div>}
      </main>

      <footer className="footer" id="iletisim">
        <div className="container">
          <div className="footer-grid">
            <div><a className="brand" href="#"><span className="brand-mark">≈</span><span className="brand-copy"><small style={{color:"#fff"}}>SARIYER</small><strong style={{color:"#fff"}}>KENT KONSEYİ</strong><em style={{color:"#a8b1c5"}}>Birlikte Düşünen, Birlikte Üreten,<br/>Birlikte Yaşayan Sarıyer</em></span></a><div className="socials"><a href="#">f</a><a href="#">𝕏</a><a href="#">◎</a><a href="#">▶</a><a href="#">in</a></div></div>
            <div><h3>KENT KONSEYİ</h3><a href="#">Kent Konseyi Hakkında</a><a href="#">Meclislerimiz</a><a href="#">Çalışma Grupları</a><a href="#">Yönetmelik</a><a href="#">İletişim</a></div>
            <div><h3>BİLGİ</h3><a href="#">Haberler</a><a href="#">Etkinlikler</a><a href="#">Raporlar &amp; Yayınlar</a><a href="#">Fotoğraf Galerisi</a><a href="#">Video Galerisi</a></div>
            <div><h3>İLETİŞİM</h3><p>Merkez Mah. Darüşşafaka Cad.<br/>No: 33 Sarıyer / İstanbul</p><p>0212 242 00 00</p><p>info@sariyerkentkonseyi.org</p></div>
          </div>
          <div className="footer-bottom"><span>© 2024 Sarıyer Kent Konseyi. Tüm hakları saklıdır.</span><div><a href="#">KVKK</a><a href="#">Gizlilik Politikası</a><a href="#">Kullanım Şartları</a></div></div>
        </div>
      </footer>
    </>
  );
}
