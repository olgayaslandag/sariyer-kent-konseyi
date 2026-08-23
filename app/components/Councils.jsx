const councils = [
  ["Gençlik","Meclisi","https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Kadın","Meclisi","https://images.pexels.com/photos/601170/pexels-photo-601170.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Çocuk","Meclisi","https://images.pexels.com/photos/25748912/pexels-photo-25748912.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Engelli","Meclisi","https://images.pexels.com/photos/2245218/pexels-photo-2245218.jpeg?auto=compress&cs=tinysrgb&w=520"],
  ["Yaşlılar","Meclisi","https://images.pexels.com/photos/12085752/pexels-photo-12085752.jpeg?auto=compress&cs=tinysrgb&w=520"]
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
