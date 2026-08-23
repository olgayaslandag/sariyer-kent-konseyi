const councils = [
  ["Gençlik","Meclisi","/img/meclis-genclik.jpg"],
  ["Kadın","Meclisi","/img/meclis-kadin.jpg"],
  ["Çocuk","Meclisi","/img/meclis-cocuk.jpg"],
  ["Engelli","Meclisi","/img/meclis-engelli.jpg"],
  ["Yaşlılar","Meclisi","/img/meclis-yasli.jpg"]
];

export default function Councils() {
  return (
    <section className="section" style={{paddingTop:12}}>
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">MECLİSLERİMİZ</p><h2>Güçlü Bir Sarıyer İçin Birlikteyiz</h2></div><a className="text-link" href="#">Tüm Meclisler →</a></div>
        <div className="council-grid">
          {councils.map(([a,b,img],i)=><a className="council-card" href="#" key={a}><img src={img} alt=""/><strong>{a}<br/>{b}</strong></a>)}
          <a className="council-card other" href="#"><strong>Diğer Meclisler</strong><span>→</span></a>
        </div>
      </div>
    </section>
  );
}
