 "use client";

import { useState, useEffect } from "react";

const workAreas = [
  ["01","Çevre ve","Sürdürülebilirlik","https://images.pexels.com/photos/30748783/pexels-photo-30748783.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["02","Eğitim ve","Gençlik","https://images.pexels.com/photos/31864453/pexels-photo-31864453.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["03","Sağlık ve","Sosyal Hizmetler","https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["04","Kültür ve","Sanat","https://images.pexels.com/photos/8409286/pexels-photo-8409286.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["05","Kentleşme ve","Planlama","https://images.pexels.com/photos/14187552/pexels-photo-14187552.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["06","Ekonomi ve","İstihdam","https://images.pexels.com/photos/11267632/pexels-photo-11267632.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["07","Engelli ve","Erişilebilirlik","https://images.pexels.com/photos/8415586/pexels-photo-8415586.jpeg?auto=compress&cs=tinysrgb&w=800"],
  ["08","Çocuk ve","Aile","https://images.pexels.com/photos/8944248/pexels-photo-8944248.jpeg?auto=compress&cs=tinysrgb&w=800"],
];

const councils = [
  ["Gençlik","Meclisi","https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Kadın","Meclisi","https://images.pexels.com/photos/601170/pexels-photo-601170.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Çocuk","Meclisi","https://images.pexels.com/photos/25748912/pexels-photo-25748912.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Engelli","Meclisi","https://images.pexels.com/photos/2245218/pexels-photo-2245218.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Yaşlılar","Meclisi","https://images.pexels.com/photos/12085752/pexels-photo-12085752.jpeg?auto=compress&cs=tinysrgb&w=520"]
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (key) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const slides = [
    {
      eyebrow: "SARIYER KENT KONSEYİ",
      title: "Birlikte Düşünüyor,<br/>Sarıyer'i Birlikte Geliştiriyoruz.",
      lead: "Katılımcı demokrasi kültürüyle<br/>Sarıyer’in ortak akıl platformu.",
      bg: "https://images.pexels.com/photos/29231327/pexels-photo-29231327.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Sarıyer sahil görünümü"
    },
    {
      eyebrow: "SÖZ SENDE SARIYER",
      title: "Sarıyer için<br/>bir fikrin mi var?",
      lead: "Fikrini, önerini ve projeni<br/>bizimle paylaş.",
      bg: "https://images.pexels.com/photos/38359478/pexels-photo-38359478.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Sarıyer fikir platformu"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".section-heading").forEach(el => observer.observe(el));

    const processItems = document.querySelectorAll(".process-item");
    processItems.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(el);
    });

    document.querySelectorAll(".content-panel").forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const eventRows = document.querySelectorAll(".event-row");
    eventRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const reportRows = document.querySelectorAll(".report-row");
    reportRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const newsRows = document.querySelectorAll(".news-row");
    newsRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const imageCards = document.querySelectorAll(".work-grid .image-card");
    imageCards.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const councilCards = document.querySelectorAll(".council-grid .council-card");
    councilCards.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const ideaContent = document.querySelector(".idea-content");
    if (ideaContent) observer.observe(ideaContent);

    const galleryItems = document.querySelectorAll(".gallery-grid .gallery-item");
    galleryItems.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });

    const handleClickOutside = (e) => {
      if (!e.target.closest(".nav-item")) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);

  return (
    <>
      <header className="site-header">
        <nav className="navbar">
          <div className="container nav-inner">
            <a className="brand" href="#">
              <img className="brand-img" src="/img/logo.png" alt="Sarıyer Kent Konseyi"/>
            </a>
            <button className="nav-toggle" aria-label="Menüyü aç" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(prev => !prev)}>☰</button>
            {isMobileMenuOpen && <div className="nav-overlay open" onClick={() => { setIsMobileMenuOpen(false); setOpenDropdown(null); }}/>}
            <div className={`nav${isMobileMenuOpen ? ' open' : ''}`}>
                  <div className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown('kent-konseyi')}>Kent Konseyi <i className="fa-solid fa-chevron-down nav-icon"/></a>
                    <div className={`dropdown-menu${openDropdown === 'kent-konseyi' ? ' active' : ''}`}><a href="#" className="dropdown-item">Hakkımızda</a><a href="#" className="dropdown-item">Vizyon & Misyon</a><a href="#" className="dropdown-item">Yönetim</a><a href="#" className="dropdown-item">Yönetmelik</a></div>
                  </div>
                  <div className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown('meclisler')}>Meclislerimiz <i className="fa-solid fa-chevron-down nav-icon"/></a>
                    <div className={`dropdown-menu${openDropdown === 'meclisler' ? ' active' : ''}`}><a href="#" className="dropdown-item">Gençlik Meclisi</a><a href="#" className="dropdown-item">Kadın Meclisi</a><a href="#" className="dropdown-item">Çocuk Meclisi</a><a href="#" className="dropdown-item">Engelli Meclisi</a><a href="#" className="dropdown-item">Yaşlılar Meclisi</a></div>
                  </div>
                  <div className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown('calisma-gruplari')}>Çalışma Grupları <i className="fa-solid fa-chevron-down nav-icon"/></a>
                    <div className={`dropdown-menu${openDropdown === 'calisma-gruplari' ? ' active' : ''}`}><a href="#" className="dropdown-item">Çevre ve Sürdürülebilirlik</a><a href="#" className="dropdown-item">Eğitim ve Gençlik</a><a href="#" className="dropdown-item">Sağlık ve Sosyal Hizmetler</a><a href="#" className="dropdown-item">Kültür ve Sanat</a><a href="#" className="dropdown-item">Kentleşme ve Planlama</a><a href="#" className="dropdown-item">Ekonomi ve İstihdam</a></div>
                  </div>
                  <a href="#haberler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Haberler</a>
                  <a href="#etkinlikler" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Etkinlikler</a>
                  <a href="#raporlar" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Raporlar &amp; Yayınlar</a>
                  <a href="#iletisim" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>İletişim</a>
                  <a href="#" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}><i className="fa-solid fa-magnifying-glass nav-icon"/></a>
                  <a className="nav-link join" href="#katil" onClick={() => setIsMobileMenuOpen(false)}>Bize Katılın →</a>
                </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="slider">
            {slides.map((slide, index) => (
              <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
                <img className="hero-bg" src={encodeURI(slide.bg)} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : undefined}/>
                <div className="hero-overlay"/>
                <div className="container hero-inner">
                  <div className="hero-content">
                    <p className="eyebrow light">{slide.eyebrow}</p>
                    <h1 dangerouslySetInnerHTML={{ __html: slide.title }}/>
                    <p className="hero-lead" dangerouslySetInnerHTML={{ __html: slide.lead }}/>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <a className="btn btn-primary" href="#hakkimizda">Hakkımızda →</a>
                      <a className="btn btn-outline-light" href="#katil">Bize Katılın →</a>
                    </div>
                  </div>
                  <div className="hero-card">
                    <strong>Birlikte<br/>Daha Güçlüyüz</strong>
                    <p>Sarıyer’in geleceğini birlikte şekillendiriyoruz.</p>
                    <span className="round-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-arrow prev" onClick={prevSlide} aria-label="Önceki">
            <i className="fa-solid fa-chevron-left"/>
          </button>
          <button className="slider-arrow next" onClick={nextSlide} aria-label="Sonraki">
            <i className="fa-solid fa-chevron-right"/>
          </button>
          <div className="hero-dots">
            {slides.map((_, index) => (
              <span key={index} className={index === currentSlide ? 'active' : ''} onClick={() => goToSlide(index)}/>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">HİZMET ALANLARIMIZ</p><h2>Çalışma Alanlarımız</h2></div>
              <small className="section-intro">Kentimizin yaşam kalitesini artırmak için birçok alanda ortak akılla çözüm üretmeye devam ediyoruz.</small>
              <a className="text-link" href="#">Tüm Alanlar →</a>
            </div>
            <div className="work-grid">
              {workAreas.map(([n,a,b,img]) => <a className="image-card" href="#" key={n}><img src={img} alt=""/><div><span>{n}</span><h3>{a}<br/>{b}</h3></div></a>)}
            </div>
          </div>
        </section>

        <section className="section" style={{paddingTop:12}}>
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">MECLİSLERİMİZ</p><h2>Güçlü Bir Sarıyer İçin Birlikteyiz</h2></div><a className="text-link" href="#">Tüm Meclisler →</a></div>
            <div className="council-grid">
              {councils.map(([a,b,img],i)=><a className="council-card" href="#" key={a}><img src={img} alt=""/><strong>{a}<br/>{b}</strong></a>)}
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
            <div className="idea-banner"><img src="https://images.pexels.com/photos/25596066/pexels-photo-25596066.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="" loading="lazy"/><div className="idea-overlay"/><div className="idea-content"><p className="eyebrow light">SÖZ SENDE SARIYER</p><h2>Sarıyer için<br/>bir fikrin mi var?</h2><p>Fikrini, önerini ve projeni bizimle paylaş.</p><a className="btn btn-light" href="#katil">Fikrini Paylaş →</a></div></div>
          </div>
        </section>

        <section className="section" style={{paddingTop:0}} id="haberler">
          <div className="container">
            <div className="content-grid">
              <article className="content-panel"><div className="panel-head"><h2>HABERLER</h2><a href="#">Tüm Haberler →</a></div><div className="news-feature"><img className="featured-img" src="https://images.pexels.com/photos/12127176/pexels-photo-12127176.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" loading="lazy"/><div className="news-text"><span className="tag">DUYURU</span><h3>Sarıyer Kent Konseyi Genel Kurulu Gerçekleştirildi</h3><small>12 Mayıs 2024</small><p>Genel kurulumuz geniş katılımla tamamlandı. Yeni dönem çalışma programımız belirlendi.</p><a className="read-more" href="#">Devamını Oku →</a></div></div><div className="news-row"><b>02</b><span><strong>Sürdürülebilir Yaşam Paneli Tamamlandı</strong><small>8 Mayıs 2024 · Haber</small></span></div><div className="news-row"><b>03</b><span><strong>Kent Gençliği Proje Yarışması Başladı</strong><small>3 Mayıs 2024 · Etkinlik</small></span></div><div className="news-row"><b>04</b><span><strong>Çocuk Hakları Sempozyumu</strong><small>28 Nisan 2024 · Duyuru</small></span></div></article>
              <article className="content-panel" id="etkinlikler"><div className="panel-head"><h2>ETKİNLİKLER</h2><a href="#">Tüm Etkinlikler →</a></div><div className="event-feature"><img src="https://images.pexels.com/photos/32401052/pexels-photo-32401052.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" loading="lazy"/><div className="event-text"><h3>Sarıyer’de Sürdürülebilir Yaşam Paneli</h3><p>14:00 - 17:00 · Sarıyer Kültür Merkezi</p><a className="btn btn-light" href="#" style={{padding:"0.5rem",fontSize:"0.7rem"}}>Detaylar →</a></div></div><div className="event-row"><b>01</b><span><strong>Çocuk Atölyesi: Doğa ile Sanat</strong><small>11:00 - 13:00 · Sarıyer Belediyesi Ek Hizmet Binası</small></span></div><div className="event-row"><b>02</b><span><strong>Gençlik Atölyesi: Fotoğraf ve Video</strong><small>10:00 - 12:00 · Sarıyer Gençlik Merkezi</small></span></div><div className="event-row"><b>03</b><span><strong>Kadın Dayanışması: Sağlık ve Spor</strong><small>13:00 - 15:00 · Sarıyer Spor Salonu</small></span></div><div className="event-row"><b>04</b><span><strong>Kent Söyleşileri: Katılımcı Demokrasi</strong><small>14:00 - 16:00 · Sarıyer Kültür Merkezi</small></span></div></article>
              <article className="content-panel" id="raporlar"><div className="panel-head"><h2>RAPORLAR &amp; YAYINLAR</h2><a href="#">Tüm Yayınlar →</a></div>{["Sarıyer Kent Konseyi Faaliyet Raporu 2023","Sarıyer Kent Konseyi Faaliyet Raporu 2022","Çalışma Grupları Raporu 2024","Çalışma Grupları Değerlendirme Raporu 2024","Sarıyer Kent Vizyonu — Ortak Gelecek","Sarıyer Kent Konseyi Stratejik Plan 2025-2030"].map(x=><a className="report-row" href="#" key={x}><span className="pdf-icon">PDF</span><span><strong>{x}</strong><small>PDF · 4.2 MB</small></span></a>)}</article>
            </div>
            <div className="gallery-strip"><div className="panel-head"><h2>SARIYER'DEN KARELER</h2><a href="#">Tüm Galeri →</a></div><div className="gallery-grid">{["https://images.pexels.com/photos/12127176/pexels-photo-12127176.jpeg?auto=compress&cs=tinysrgb&w=500","https://images.pexels.com/photos/28579551/pexels-photo-28579551.jpeg?auto=compress&cs=tinysrgb&w=500","https://images.pexels.com/photos/30748783/pexels-photo-30748783.jpeg?auto=compress&cs=tinysrgb&w=500","https://images.pexels.com/photos/32401052/pexels-photo-32401052.jpeg?auto=compress&cs=tinysrgb&w=500","https://images.pexels.com/photos/26844076/pexels-photo-26844076.jpeg?auto=compress&cs=tinysrgb&w=500","https://images.pexels.com/photos/11267632/pexels-photo-11267632.jpeg?auto=compress&cs=tinysrgb&w=500"].map((src,i)=><div className="gallery-item" key={i}><img src={src} alt="" loading="lazy"/></div>)}</div></div>
          </div>
        </section>

        <section className="newsletter" id="katil">
          <div className="container"><div className="newsletter-inner">            <div className="newsletter-icon"><svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg></div><div><h2>Haber Bültenimize Katılın</h2><p>Çalışmalarımızdan ve etkinliklerimizden haberdar olmak için bültenimize abone olun.</p></div><form className="newsletter-form" onSubmit={(e)=>{e.preventDefault();if(email){setSubscribed(true);setEmail("")}}}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-posta adresiniz" required/><button className="btn btn-light">Abone Ol →</button></form></div></div>
        </section>
        {subscribed && <div onClick={()=>setSubscribed(false)} style={{position:"fixed",right:20,bottom:20,zIndex:2000,background:"#fff",color:"var(--ink)",padding:"14px 18px",borderRadius:8,boxShadow:"0 12px 40px rgba(0,0,0,.2)",cursor:"pointer"}}>Bülten aboneliğiniz için teşekkürler.</div>}
      </main>

      <footer className="footer" id="iletisim">
        <div className="container">
          <div className="footer-grid">
            <div><a className="brand" href="#"><img className="brand-img" src="/img/logo-white.png" alt="Sarıyer Kent Konseyi"/></a><div className="socials"><a href="#">f</a><a href="#">𝕏</a><a href="#">◎</a><a href="#">▶</a><a href="#">in</a></div></div>
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
