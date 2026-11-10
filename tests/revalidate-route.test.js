/**
 * Faz-9 /api/revalidate route handler testleri.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { POST } from "@/app/api/revalidate/route.js";
import { TAGS } from "@/lib/data/tags.js";

const SECRET = "test-secret";

beforeEach(() => {
  vi.stubEnv("REVALIDATE_SECRET", SECRET);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

function makeRequest(body, headers = {}) {
  const h = { "content-type": "application/json", ...headers };
  const init = { method: "POST", headers: h };
  if (body !== undefined) {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }
  return new Request("http://localhost/api/revalidate", init);
}

describe("/api/revalidate — secret kontrolü", () => {
  it("REVALIDATE_SECRET tanımlı değilse 500 döner", async () => {
    vi.stubEnv("REVALIDATE_SECRET", "");
    const res = await POST(makeRequest({ tags: ["haberler"] }, { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(500);
  });

  it("secret header yoksa 401 döner", async () => {
    const res = await POST(makeRequest({ tags: ["haberler"] }));
    expect(res.status).toBe(401);
  });

  it("yanlış secret 401 döner", async () => {
    const res = await POST(makeRequest({ tags: ["haberler"] }, { "x-revalidate-secret": "wrong" }));
    expect(res.status).toBe(401);
  });
});

describe("/api/revalidate — geçerli istek", () => {
  it("geçerli secret + tags → 200 + revalidated array", async () => {
    const res = await POST(
      makeRequest({ tags: ["haberler", "etkinlikler"] }, { "x-revalidate-secret": SECRET }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.revalidated)).toBe(true);
    expect(body.revalidated).toEqual(["haberler", "etkinlikler"]);
  });

  it("all:true → tüm tag'ler revalidate edilir", async () => {
    const res = await POST(makeRequest({ all: true }, { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(200);
    const body = await res.json();
    const allTags = Object.values(TAGS);
    expect(body.revalidated).toHaveLength(allTags.length);
    for (const t of allTags) {
      expect(body.revalidated).toContain(t);
    }
  });

  it("boş body {} → 200 + boş revalidated array", async () => {
    const res = await POST(makeRequest({}, { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.revalidated).toEqual([]);
  });
});

describe("/api/revalidate — geçersiz body", () => {
  it("bozuk JSON → 400", async () => {
    const res = await POST(makeRequest("{bad json", { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(400);
  });

  it("array body → 400", async () => {
    const res = await POST(makeRequest([1, 2], { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(400);
  });

  it("tags string (array değil) → 400", async () => {
    const res = await POST(makeRequest({ tags: "haberler" }, { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(400);
  });

  it("tags içinde non-string → 400", async () => {
    const res = await POST(makeRequest({ tags: [1, 2] }, { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(400);
  });

  it("all yanlış tip → 400", async () => {
    const res = await POST(makeRequest({ all: "true" }, { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(400);
  });
});
