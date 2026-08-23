export default function Process() {
  return (
    <section className="section" style={{paddingTop:8}}>
      <div className="container">
        <div className="process-wrap">
          <div className="section-heading"><div><p className="eyebrow">KENT KONSEYİ NASIL ÇALIŞIR?</p><h2>Ortak Akılla, Birlikte Üretiyoruz</h2></div><a className="text-link" href="/calisma-gruplari">Tüm Süreç →</a></div>
          <div className="process-grid">
            {[["01","Fikir","Sarıyer’in ihtiyaçlarını belirliyor, fikirleri topluyoruz."],["02","Meclisler","Fikirleri meclislerde görüşüyor ve değerlendiriyoruz."],["03","Çalışma Grupları","Uzmanlık alanlarına göre çözüm önerileri geliştiriyoruz."],["04","Proje / Öneri","Projeler üretiyor, hayata geçiriyor ve etkisini izliyoruz."]].map(([n,t,d],i)=><div className="process-item" key={n}><b>{n}</b>{i<3&&<span>→</span>}<h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
