"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  const dismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <div className="container cookie-consent-inner">
        <p className="cookie-consent-text">
          Bu web sitesi, hizmetlerimizi sunmak ve deneyiminizi iyileştirmek için çerezler kullanır. Detaylı bilgi için{" "}
          <a href="/gizlilik-politikasi" className="cookie-consent-link">Gizlilik Politikamızı</a> ziyaret edin.
        </p>
        <div className="cookie-consent-actions">
          <button className="btn btn-primary" onClick={accept}>Kabul Et</button>
          <button className="btn btn-outline" onClick={reject}>Reddet</button>
          <button className="btn btn-ghost" onClick={dismiss}>İptal</button>
        </div>
      </div>
    </div>
  );
}
