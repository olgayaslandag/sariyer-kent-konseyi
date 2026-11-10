/**
 * @file lib/data/index.js — veri katmanı public API (faz-9)
 *
 * ISR + on-demand revalidate: her public fonksiyon unstable_cache
 * (next/cache) ile sarılır. tags: liste için [TAGS.X]; tekil (slug)
 * kayıtlar da ilgili koleksiyon tag'i ([TAGS.X]) altında tutulur.
 * Per-slug dinamik tag'ler (slugTag) şu an desteklenmiyor — slug-level
 * purge, koleksiyon tag'i üzerinden çalışır (Option A). revalidate: 3600.
 */

import { unstable_cache, cacheTag } from "next/cache";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";

import { getConfig } from "./config.js";
import { TAGS } from "./tags.js";
import {
  getNews as getNewsMock,
  getNewsBySlug as getNewsBySlugMock,
  getEvents as getEventsMock,
  getEventsBySlug as getEventsBySlugMock,
  getCouncils as getCouncilsMock,
  getCouncilBySlug as getCouncilBySlugMock,
  getWorkingGroups as getWorkingGroupsMock,
  getWorkingGroupBySlug as getWorkingGroupBySlugMock,
  getSlugs as getSlugsMock,
  buildSearchIndex as buildSearchIndexMock,
} from "./sources/mock.js";
import {
  getNews as getNewsHttp,
  getNewsBySlug as getNewsBySlugHttp,
  getEvents as getEventsHttp,
  getEventsBySlug as getEventsBySlugHttp,
  getCouncils as getCouncilsHttp,
  getCouncilBySlug as getCouncilBySlugHttp,
  getWorkingGroups as getWorkingGroupsHttp,
  getWorkingGroupBySlug as getWorkingGroupBySlugHttp,
  getSlugs as getSlugsHttp,
  buildSearchIndex as buildSearchIndexHttp,
} from "./sources/http.js";

export { clearMockCache } from "./sources/mock.js";

function useHttp() {
  return getConfig().dataSource === "http";
}

function hasIncrementalCache() {
  try {
    const store = workAsyncStorage.getStore();
    if (store && store.incrementalCache) return true;
  } catch {
    // ignore
  }
  if (globalThis && globalThis.__incrementalCache) return true;
  return false;
}

const REVALIDATE = 3600;

// Uncached implementations (env-aware dispatch)
async function getNewsImpl() {
  return useHttp() ? getNewsHttp() : getNewsMock();
}
async function getNewsBySlugImpl(slug) {
  return useHttp() ? getNewsBySlugHttp(slug) : getNewsBySlugMock(slug);
}
async function getEventsImpl() {
  return useHttp() ? getEventsHttp() : getEventsMock();
}
async function getEventsBySlugImpl(slug) {
  return useHttp() ? getEventsBySlugHttp(slug) : getEventsBySlugMock(slug);
}
async function getCouncilsImpl() {
  return useHttp() ? getCouncilsHttp() : getCouncilsMock();
}
async function getCouncilBySlugImpl(slug) {
  return useHttp() ? getCouncilBySlugHttp(slug) : getCouncilBySlugMock(slug);
}
async function getWorkingGroupsImpl() {
  return useHttp() ? getWorkingGroupsHttp() : getWorkingGroupsMock();
}
async function getWorkingGroupBySlugImpl(slug) {
  return useHttp() ? getWorkingGroupBySlugHttp(slug) : getWorkingGroupBySlugMock(slug);
}
async function getSlugsImpl(kind) {
  return useHttp() ? getSlugsHttp(kind) : getSlugsMock(kind);
}
async function buildSearchIndexImpl() {
  return useHttp() ? buildSearchIndexHttp() : buildSearchIndexMock();
}

function collectionTagForKind(kind) {
  const k = String(kind ?? "").trim().toLowerCase();
  if (k === "news" || k === "haberler") return TAGS.NEWS;
  if (k === "events" || k === "etkinlikler") return TAGS.EVENTS;
  if (k === "councils" || k === "meclisler") return TAGS.COUNCILS;
  if (k === "working-groups" || k === "calisma-gruplari") return TAGS.WORKING_GROUPS;
  return TAGS.NEWS;
}

function safeTag(tagFn) {
  try {
    tagFn();
  } catch {
    // ignore outside Next runtime
  }
}

// Cached wrappers
const cachedGetNews = unstable_cache(getNewsImpl, ["getNews"], {
  revalidate: REVALIDATE,
  tags: [TAGS.NEWS],
});

const cachedGetNewsBySlug = unstable_cache(
  async (slug) => getNewsBySlugImpl(slug),
  ["getNewsBySlug"],
  { revalidate: REVALIDATE, tags: [TAGS.NEWS] },
);

const cachedGetEvents = unstable_cache(getEventsImpl, ["getEvents"], {
  revalidate: REVALIDATE,
  tags: [TAGS.EVENTS],
});

const cachedGetEventsBySlug = unstable_cache(
  async (slug) => getEventsBySlugImpl(slug),
  ["getEventsBySlug"],
  { revalidate: REVALIDATE, tags: [TAGS.EVENTS] },
);

const cachedGetCouncils = unstable_cache(getCouncilsImpl, ["getCouncils"], {
  revalidate: REVALIDATE,
  tags: [TAGS.COUNCILS],
});

const cachedGetCouncilBySlug = unstable_cache(
  async (slug) => getCouncilBySlugImpl(slug),
  ["getCouncilBySlug"],
  { revalidate: REVALIDATE, tags: [TAGS.COUNCILS] },
);

const cachedGetWorkingGroups = unstable_cache(getWorkingGroupsImpl, ["getWorkingGroups"], {
  revalidate: REVALIDATE,
  tags: [TAGS.WORKING_GROUPS],
});

const cachedGetWorkingGroupBySlug = unstable_cache(
  async (slug) => getWorkingGroupBySlugImpl(slug),
  ["getWorkingGroupBySlug"],
  { revalidate: REVALIDATE, tags: [TAGS.WORKING_GROUPS] },
);

const cachedGetSlugs = unstable_cache(
  async (kind) => {
    safeTag(() => cacheTag(collectionTagForKind(kind)));
    return getSlugsImpl(kind);
  },
  ["getSlugs"],
  { revalidate: REVALIDATE, tags: [] },
);

const cachedBuildSearchIndex = unstable_cache(
  async () => {
    safeTag(() => cacheTag(TAGS.SEARCH));
    return buildSearchIndexImpl();
  },
  ["buildSearchIndex"],
  { revalidate: REVALIDATE, tags: [TAGS.SEARCH] },
);

// Public API
export async function getNews() {
  if (!hasIncrementalCache()) return getNewsImpl();
  return cachedGetNews();
}

export async function getNewsBySlug(slug) {
  if (!hasIncrementalCache()) return getNewsBySlugImpl(slug);
  return cachedGetNewsBySlug(slug);
}

export async function getEvents() {
  if (!hasIncrementalCache()) return getEventsImpl();
  return cachedGetEvents();
}

export async function getEventsBySlug(slug) {
  if (!hasIncrementalCache()) return getEventsBySlugImpl(slug);
  return cachedGetEventsBySlug(slug);
}

export async function getCouncils() {
  if (!hasIncrementalCache()) return getCouncilsImpl();
  return cachedGetCouncils();
}

export async function getCouncilBySlug(slug) {
  if (!hasIncrementalCache()) return getCouncilBySlugImpl(slug);
  return cachedGetCouncilBySlug(slug);
}

export async function getWorkingGroups() {
  if (!hasIncrementalCache()) return getWorkingGroupsImpl();
  return cachedGetWorkingGroups();
}

export async function getWorkingGroupBySlug(slug) {
  if (!hasIncrementalCache()) return getWorkingGroupBySlugImpl(slug);
  return cachedGetWorkingGroupBySlug(slug);
}

export async function getSlugs(kind) {
  if (!hasIncrementalCache()) return getSlugsImpl(kind);
  return cachedGetSlugs(kind);
}

export async function buildSearchIndex() {
  if (!hasIncrementalCache()) return buildSearchIndexImpl();
  return cachedBuildSearchIndex();
}
