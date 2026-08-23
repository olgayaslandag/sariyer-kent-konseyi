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
