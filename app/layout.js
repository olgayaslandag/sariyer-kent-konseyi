import '../public/css/style.css';

export const metadata = {
  title: 'Sarıyer Kent Konseyi',
  description: 'Birlikte Düşünen, Birlikte Üreten, Birlikte Yaşayan Sarıyer'
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
