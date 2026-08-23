const workAreas = [
  ["01","Çevre ve","Sürdürülebilirlik","/img/calisma-alani-cevre-surdurulebilirlik.jpg"],
  ["02","Eğitim ve","Gençlik","/img/calisma-alani-egitim-genclik.jpg"],
  ["03","Sağlık ve","Sosyal Hizmetler","/img/calisma-alani-saglik-sosyal-hizmetler.jpg"],
  ["04","Kültür ve","Sanat","/img/calisma-alani-kultur-sanat.jpg"],
  ["05","Kentleşme ve","Planlama","/img/calisma-alani-kentlesme-planlama.jpg"],
  ["06","Ekonomi ve","İstihdam","/img/calisma-alani-ekonomi-istihdam.jpg"],
  ["07","Engelli ve","Erişilebilirlik","/img/calisma-alani-engelli-erisebilirlik.jpg"],
  ["08","Çocuk ve","Aile","/img/calisma-alani-cocuk-aile.jpg"],
];

export default function WorkAreas() {
  return (
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
  );
}
