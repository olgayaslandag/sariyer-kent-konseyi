/**
 * @file tests/msw/server.js — MSW Node sunucusu (faz-8 / vitest)
 *
 * `setupServer(...handlers)` ile global fetch'i Node seviyesinde keser
 * (msw/node). Browser service-worker kaydı GEREKTİRMEZ; yalnızca
 * `tests/data-http-msw.test.js` içinde kullanılır.
 *
 * Kullanım:
 *   import { server } from "./msw/server.js";
 *   beforeAll(() => server.listen());
 *   afterEach(() => server.resetHandlers());
 *   afterAll(() => server.close());
 */

import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

/** Paylaşılan MSW sunucu örneği (test dosyası başına tek örnek). */
export const server = setupServer(...handlers);
