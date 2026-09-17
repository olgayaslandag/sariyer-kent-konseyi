"use client";

import Link from "next/link";
import groupsData from "../data/calisma-gruplari.json";

const workAreas = groupsData.slice(0, 8).map((g) => [
  g.id,
  g.shortTitle,
  g.subTitle,
  g.img,
  g.link,
]);

export default function WorkAreas() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">HİZMET ALANLARIMIZ</p><h2>Çalışma Alanlarımız</h2></div>
          <small className="section-intro">Kentimizin yaşam kalitesini artırmak için birçok alanda ortak akılla çözüm üretmeye devam ediyoruz.</small>
          <Link className="text-link" href="/calisma-gruplari">Tüm Alanlar →</Link>
        </div>
        <div className="work-grid">
          {workAreas.map(([n, a, b, img, link]) => (
            <Link className="image-card" href={link} key={n}>
              <img src={img} alt={n ? `${n} çalışma alanı` : 'Çalışma alanı'} loading="lazy" />
              <div>
                <span>{n}</span>
                <h3>
                  {a}
                  {b && <br />}
                  {b}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
