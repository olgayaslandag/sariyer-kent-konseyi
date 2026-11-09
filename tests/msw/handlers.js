/**
 * @file tests/msw/handlers.js — MSW handler tanımları (faz-8)
 *
 * DATA_SOURCE=http akışını gerçek ağ yerine mock service ile test eder.
 * http.js -> fetch -> MSW (msw/node) -> bu handler'lar -> mocks/data.
 *
 * - Handler kökü `TEST_API_BASE_URL`'dir; testler API_BASE_URL env'ini
 *   aynısına sabitler, böylece http.js'in `${API_BASE_URL}/haberler`
 *   iskeleti uçtan uca doğrulanır (vi.stubGlobal('fetch') yerine).
 * - Veri, prod fixture'larından gelir: response gövdesi mocks/data/*.json
 *   ile birebir aynıdır (kopya elle tutulmaz).
 * - Hata senaryoları (500/404/ağ hatası) test içinde `server.use()` ile
 *   override edilir; varsayılan handler'lar her zaman 200 + dizi döner.
 */

import { http, HttpResponse } from "msw";

import haberlerJson from "@/mocks/data/haberler.json";
import etkinliklerJson from "@/mocks/data/etkinlikler.json";
import meclislerJson from "@/mocks/data/meclisler.json";
import calismaGruplariJson from "@/mocks/data/calisma-gruplari.json";

/**
 * Testlerde kullanılan sahte headless API kökü.
 * MSW testleri `API_BASE_URL` env'ini bu değere eşitler.
 * @type {string}
 */
export const TEST_API_BASE_URL = "https://api.example.com";

// JSON import CJS/ESM zarif unwrap (tests/smoke.test.js ile aynı desen)
const unwrapList = (mod) => {
  if (Array.isArray(mod)) return mod;
  if (mod && typeof mod === "object" && "default" in mod && Array.isArray(mod.default)) {
    return mod.default;
  }
  return [];
};

const haberler = unwrapList(haberlerJson);
const etkinlikler = unwrapList(etkinliklerJson);
const meclisler = unwrapList(meclislerJson);
const calismaGruplari = unwrapList(calismaGruplariJson);

/**
 * Varsayılan handler'lar — http.js sözleşmesinin 4 liste endpoint'i.
 * @type {import("msw").HttpHandler[]}
 */
export const handlers = [
  http.get(`${TEST_API_BASE_URL}/haberler`, () => HttpResponse.json(haberler)),
  http.get(`${TEST_API_BASE_URL}/etkinlikler`, () => HttpResponse.json(etkinlikler)),
  http.get(`${TEST_API_BASE_URL}/meclisler`, () => HttpResponse.json(meclisler)),
  http.get(`${TEST_API_BASE_URL}/calisma-gruplari`, () =>
    HttpResponse.json(calismaGruplari),
  ),
];
