import './globals.css';

export const metadata = {
  title: 'Sarıyer Kent Konseyi',
  description: 'Birlikte Düşünen, Birlikte Üreten, Birlikte Yaşayan Sarıyer'
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
