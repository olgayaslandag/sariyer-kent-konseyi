"use client";

export default function PageHeader({ eyebrow, title, subtitle, breadcrumbs, bgImage }) {
  return (
    <div
      className={`page-header${bgImage ? " page-header-bg" : ""}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Ana Sayfa</a></li>
            {breadcrumbs.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </nav>
        <div className="page-header-content">
          {eyebrow && <p className="eyebrow light">{eyebrow}</p>}
          <h1>{title}</h1>
          {subtitle && <p className="page-header-subtitle" style={{ marginTop: 8, opacity: 0.9 }}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
