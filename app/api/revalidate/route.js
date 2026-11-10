/**
 * @file app/api/revalidate/route.js — on-demand ISR revalidate (faz-9)
 *
 * POST /api/revalidate
 * Header: x-revalidate-secret === process.env.REVALIDATE_SECRET
 * Body JSON: { tags?: string[], all?: boolean }
 *
 * all=true ise tüm TAGS değerleri revalidate edilir. Her tag için
 * revalidateTag(tag) (next/cache) çağrılır.
 *
 * Not (faz-9 Option A): per-slug dinamik tag'ler (slugTag, ör.
 * "haberler:slug") artık üretilmiyor; slug-level purge koleksiyon
 * tag'i (TAGS.*) üzerinden çalışır. slugTag değerleri "reserved"
 * olarak belgelenmiştir (lib/data/tags.js, docs/api-contract.md §8).
 */

import { revalidateTag } from "next/cache";
import { TAGS } from "../../../lib/data/tags.js";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "not configured" }, { status: 500 });
  }

  const provided = request.headers.get("x-revalidate-secret");
  if (provided !== secret) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const allTags = Object.values(TAGS);
  let tagsToRevalidate = [];
  if (body.all === true) {
    tagsToRevalidate = [...allTags];
  } else if (Array.isArray(body.tags)) {
    if (!body.tags.every((t) => typeof t === "string")) {
      return Response.json({ error: "invalid tags" }, { status: 400 });
    }
    tagsToRevalidate = body.tags;
  } else if (body.tags === undefined && body.all === undefined) {
    // boş body kabul: hiçbir tag
    tagsToRevalidate = [];
  } else {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  for (const tag of tagsToRevalidate) {
    try {
      revalidateTag(tag);
    } catch {
      // Next runtime store eksikse (test ortamı) sessizce devam et
    }
  }

  return Response.json({ revalidated: tagsToRevalidate, now: Date.now() });
}
