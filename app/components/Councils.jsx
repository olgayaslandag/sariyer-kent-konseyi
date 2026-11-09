"use client";

import Link from "next/link";

/**
 * Councils (client) — meclis verisi props ile server'dan gelir (faz-4).
 * @param {{ councils?: import("../../lib/data/shapes.js").Council[] }} props
 */
export default function Councils({ councils = [] }) {
  return (
    <section className="section" style={{paddingTop:12}}>
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">MECLİSLERİMİZ</p><h2>Güçlü Bir Sarıyer İçin Birlikteyiz</h2></div><Link className="text-link" href="/meclisler">Tüm Meclisler →</Link></div>
        <div className="council-grid">
          {councils.map((c) => (
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
