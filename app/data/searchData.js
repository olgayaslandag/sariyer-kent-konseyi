import haberler from "./haberler.json";
import etkinlikler from "./etkinlikler.json";
import calismaGruplari from "./calisma-gruplari.json";
import meclisler from "./meclisler.json";

const normalize = (text) =>
  text
    .replace(/<[^>]+>/g, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/”/g, '"')
    .replace(/“/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const buildText = (item) => {
  const parts = [item.title, item.desc];
  if (item.content) parts.push(item.content);
  if (item.about) parts.push(item.about);
  if (item.description) parts.push(item.description);
  if (item.link) parts.push(item.link);
  if (Array.isArray(item.focusAreas))
    parts.push(item.focusAreas.map((x) => `${x.title} ${x.desc}`).join(" "));
  if (Array.isArray(item.activities)) parts.push(item.activities);
  if (Array.isArray(item.projects))
    parts.push(item.projects.map((x) => `${x.title} ${x.desc}`).join(" "));
  if (Array.isArray(item.goals))
    parts.push(item.goals.map((x) => `${x.title} ${x.desc}`).join(" "));
  return normalize(parts.join(" "));
};

const buildItems = (records, type, hrefBuilder) =>
  records.map((r) => {
    const href = hrefBuilder(r);
    return {
      type,
      title: r.title,
      href,
      text: buildText(r),
      raw: r,
    };
  });

export const searchItems = [
  ...buildItems(haberler, "Haber", (r) => `/haberler/${r.slug}`),
  ...buildItems(etkinlikler, "Etkinlik", (r) => `/etkinlikler/${r.slug}`),
  ...buildItems(calismaGruplari, "Çalışma Grubu", (r) => `/calisma-gruplari/${r.slug}`),
  ...buildItems(meclisler, "Meclis", (r) => `/meclisler/${r.slug}`),
];

export const search = (query) => {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);
  return searchItems
    .map((item) => {
      let score = 0;
      const text = item.text;
      tokens.forEach((token) => {
        if (text.includes(token)) score += 1;
        if (item.title.toLowerCase().includes(token)) score += 3;
      });
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
};
