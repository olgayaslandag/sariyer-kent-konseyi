/**
 * Faz-8 thin mock route testleri — app/api altındaki route.js GET handler'ları.
 *
 * - Handler'lar NextResponse yerine global `Response.json()` döndürür,
 *   bu yüzden Next sunucusu olmadan doğrudan çağrılabilir (Node 22+).
 * - Route'lar lib/data/sources/mock.js'ten beslenir; DATA_SOURCE=http
 *   iken bile kendi API_BASE_URL'ine düşüp döngüye girmezler (http
 *   akışının mock kökü olduklarını doğrular).
 * - Gövdeler mocks/data fixture'larıyla birebir (uzunluk + ilk slug),
 *   Cache-Control başlığı ve content-type kontrolü.
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { GET as getHaberler } from "@/app/api/haberler/route.js";
import { GET as getEtkinlikler } from "@/app/api/etkinlikler/route.js";
import { GET as getMeclisler } from "@/app/api/meclisler/route.js";
import { GET as getCalismaGruplari } from "@/app/api/calisma-gruplari/route.js";

afterEach(() => {
  vi.unstubAllEnvs();
});

const readRoute = (rel) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

describe("thin mock route'lar — gövde sözleşmesi", () => {
  it("/api/haberler 6 kayıt döner; content-type JSON", async () => {
    const res = await getHaberler();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(res.headers.get("cache-control")).toContain("public");
    const body = await res.json();
    expect(body).toHaveLength(6);
    expect(body[0].slug).toBe("sariyerde-yesil-alanlar-artiyor");
  });

  it("/api/etkinlikler 6 kayıt döner", async () => {
    const res = await getEtkinlikler();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(6);
    expect(body[0].slug).toBe("yasli-gunu-bulusmasi");
  });

  it("/api/meclisler 5 kayıt döner", async () => {
    const res = await getMeclisler();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(5);
    expect(body[0].slug).toBe("genclik");
  });

  it("/api/calisma-gruplari 22 kayıt döner", async () => {
    const res = await getCalismaGruplari();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(22);
    expect(body[0].slug).toBe("cevre");
  });
});

describe("thin mock route'lar — döngü/izolasyon guard'ları", () => {
  it("DATA_SOURCE=http iken bile mock döndürür (kendi API_BASE_URL'ine düşmez)", async () => {
    vi.stubEnv("DATA_SOURCE", "http");
    vi.stubEnv("API_BASE_URL", "http://localhost:3000/api");
    const res = await getHaberler();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(6);
  });

  it("route dosyaları JSON import etmez; sadece sources/mock.js import eder", () => {
    const files = [
      "../app/api/haberler/route.js",
      "../app/api/etkinlikler/route.js",
      "../app/api/meclisler/route.js",
      "../app/api/calisma-gruplari/route.js",
    ];
    for (const f of files) {
      const src = readRoute(f);
      expect(/from\s+["'][^"']*sources\/mock\.js["']/.test(src)).toBe(true);
      expect(/from\s+["'][^"']*lib\/data\/index\.js["']/.test(src)).toBe(false);
      expect(/from\s+["'][^"']*\.json["']/.test(src)).toBe(false);
    }
  });
});
