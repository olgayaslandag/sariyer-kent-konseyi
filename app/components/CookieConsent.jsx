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

  if (!visible) return null;

  return (
    <aside className="cookie-consent" role="dialog" aria-label="Çerez bildirimi">
      <div className="cookie-consent-inner">
        <div className="cookie-consent-content">
          <div className="cookie-consent-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5 12.5a8.5 8.5 0 1 1-9-9 3.5 3.5 0 0 0 9 9Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="13" r="1" fill="currentColor" />
              <circle cx="12" cy="17" r="1" fill="currentColor" />
              <circle cx="14" cy="9" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <strong>Çerezleri kullanıyoruz</strong>
            <p>
              Sitemizin güvenli ve doğru şekilde çalışması için gerekli çerezleri kullanıyoruz.{" "}
              <a href="/gizlilik-politikasi" className="cookie-consent-link">Gizlilik Politikası</a>{" "}
              hakkında bilgi alabilirsiniz.
            </p>
          </div>
        </div>
        <div className="cookie-consent-actions">
          <button type="button" className="cookie-consent-reject" onClick={reject}>Reddediyorum</button>
          <button type="button" className="cookie-consent-accept" onClick={accept}>Onaylıyorum</button>
        </div>
      </div>
    </aside>
  );
}
