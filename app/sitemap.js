const BASE_URL = 'https://sariyerkentkonseyi.org';

const staticRoutes = [
  '/',
  '/iletisim',
  '/gizlilik-politikasi',
  '/videolar',
  '/galeri',
  '/meclisler',
  '/etkinlikler',
  '/calisma-gruplari',
  '/haberler',
  '/raporlar',
  '/kullanim-sartlari',
  '/kvkk',
  '/arama',
  '/kurumsal/vizyon-misyon',
  '/kurumsal/hakkimizda',
  '/kurumsal/yonetim',
  '/kurumsal/ic-yonerge',
  '/kurumsal/yonetmelik',
];

const meclisler = require('./data/meclisler.json');
const etkinlikler = require('./data/etkinlikler.json');
const calismaGruplari = require('./data/calisma-gruplari.json');
const haberler = require('./data/haberler.json');

export default async function sitemap() {
  const now = new Date();

  const dynamicRoutes = [
    ...meclisler.map((item) => ({
      url: `${BASE_URL}/meclisler/${item.slug}`,
      lastModified: now,
    })),
    ...etkinlikler.map((item) => ({
      url: `${BASE_URL}/etkinlikler/${item.slug}`,
      lastModified: now,
    })),
    ...calismaGruplari.map((item) => ({
      url: `${BASE_URL}/calisma-gruplari/${item.slug}`,
      lastModified: now,
    })),
    ...haberler.map((item) => ({
      url: `${BASE_URL}/haberler/${item.slug}`,
      lastModified: now,
    })),
  ];

  const routes = [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...dynamicRoutes,
  ];

  return routes;
}
