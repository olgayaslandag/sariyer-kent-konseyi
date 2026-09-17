"use client";

import Link from "next/link";
import councilsData from "../data/meclisler.json";

export default function Councils() {
  return (
    <section className="section" style={{paddingTop:12}}>
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">MECLİSLERİMİZ</p><h2>Güçlü Bir Sarıyer İçin Birlikteyiz</h2></div><Link className="text-link" href="/meclisler">Tüm Meclisler →</Link></div>
        <div className="council-grid">
          {councilsData.map((c) => (
            <Link className="council-card" href={c.link} key={c.slug}>
              <img src={c.img} alt={c.title} />
              <div>
                <strong>
                  {c.shortTitle}
                  <br />
                  {c.subTitle}
                </strong>
                <p>{c.description}</p>
              </div>
            </Link>
          ))}
          <Link className="council-card other" href="/meclisler"><strong>Diğer Meclisler</strong><span>→</span></Link>
        </div>
      </div>
    </section>
  );
}
