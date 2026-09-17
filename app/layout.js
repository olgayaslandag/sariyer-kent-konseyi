import '../public/css/style.css';
import ScrollReveal from "./components/ScrollReveal";
import CookieConsent from "./components/CookieConsent";
import Preloader from "./components/Preloader";

export const metadata = {
  metadataBase: new URL('https://sariyerkentkonseyi.org'),
  title: {
    default: 'Sarıyer Kent Konseyi',
    template: '%s | Sarıyer Kent Konseyi',
  },
  description: 'Birlikte Düşünen, Birlikte Üreten, Birlikte Yaşayan Sarıyer',
  openGraph: {
    title: 'Sarıyer Kent Konseyi',
    description: 'Birlikte Düşünen, Birlikte Üreten, Birlikte Yaşayan Sarıyer',
    url: 'https://sariyerkentkonseyi.org',
    siteName: 'Sarıyer Kent Konseyi',
    images: ['/img/og-default.jpg'],
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarıyer Kent Konseyi',
    description: 'Birlikte Düşünen, Birlikte Üreten, Birlikte Yaşayan Sarıyer',
    images: ['/img/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://sariyerkentkonseyi.org',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/img/icon.svg" />
        <link rel="apple-touch-icon" href="/img/icon.svg" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
      </head>
      <body>
        <Preloader />
        {children}
        <ScrollReveal />
        <CookieConsent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const skipUrls = ['/', '/iletisim'];
                function triggerPreloader() {
                  window.dispatchEvent(new Event('preloader-start'));
                  setTimeout(function() {
                    window.dispatchEvent(new Event('preloader-complete'));
                  }, 500);
                }
                document.addEventListener('click', function(e) {
                  const link = e.target.closest('a');
                  if (!link) return;
                  const href = link.getAttribute('href');
                  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
                  if (skipUrls.includes(href)) return;
                  if (e.target.closest('button, [role="button"], input, textarea, select')) return;
                  triggerPreloader();
                });
                window.addEventListener('beforeunload', triggerPreloader);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
