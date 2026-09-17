import HomeClient from "./components/HomeClient";

export const metadata = {
  title: 'Sarıyer Kent Konseyi — Birlikte Düşünen, Birlikte Üreten',
  description: 'Sarıyer Kent Konseyi, katılımcı demokrasi ile kentin geleceğini birlikte tasarlıyor. Meclisler, çalışma grupları ve fikir platformları.',
  alternates: { canonical: 'https://sariyerkentkonseyi.org' },
};

export default function Home() {
  return <HomeClient />;
}
