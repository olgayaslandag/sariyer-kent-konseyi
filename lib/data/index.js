/**
 * @file lib/data/index.js — veri katmanı public API (faz-2)
 *
 * Tek giriş noktası: page.js / generateStaticParams / route handler'lar
 * asla sources/*.js'i doğrudan kullanmaz, buradan import eder.
 * Seçim her çağrıda getConfig().dataSource üzerinden yapılır (önbellek
 * yok): 'http' -> sources/http.js, aksi halde -> sources/mock.js.
 * DATA_SOURCE varsayılanı 'mock' olduğundan build'de generateStaticParams
 * ağa bağımlı olmaz; runtime http geçişi env ile olur.
 *
 * JSON import ETMEZ (kabul kriteri) — JSON okuma yalnızca
 * sources/mock.js içindedir. Bu fazda (faz-3) mevcut page.js'ler
 * mocks/data/*.json'u doğrudan kullanır; faz-4'te async page.js'ler
 * buraya bağlanacak.
 *
 * Tüm fonksiyonlar async'tir.
 */

import { getConfig } from "./config.js";
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

/** @returns {boolean} işlem http kaynağına mı gitmeli? */
function useHttp() {
  return getConfig().dataSource === "http";
}

/** @returns {Promise<News[]>} */
export async function getNews() {
  return useHttp() ? getNewsHttp() : getNewsMock();
}

/**
 * @param {string} slug
 * @returns {Promise<News|null>}
 */
export async function getNewsBySlug(slug) {
  return useHttp() ? getNewsBySlugHttp(slug) : getNewsBySlugMock(slug);
}

/** @returns {Promise<Event[]>} */
export async function getEvents() {
  return useHttp() ? getEventsHttp() : getEventsMock();
}

/**
 * @param {string} slug
 * @returns {Promise<Event|null>}
 */
export async function getEventsBySlug(slug) {
  return useHttp() ? getEventsBySlugHttp(slug) : getEventsBySlugMock(slug);
}

/** @returns {Promise<Council[]>} */
export async function getCouncils() {
  return useHttp() ? getCouncilsHttp() : getCouncilsMock();
}

/**
 * @param {string} slug
 * @returns {Promise<Council|null>}
 */
export async function getCouncilBySlug(slug) {
  return useHttp() ? getCouncilBySlugHttp(slug) : getCouncilBySlugMock(slug);
}

/** @returns {Promise<WorkingGroup[]>} */
export async function getWorkingGroups() {
  return useHttp() ? getWorkingGroupsHttp() : getWorkingGroupsMock();
}

/**
 * @param {string} slug
 * @returns {Promise<WorkingGroup|null>}
 */
export async function getWorkingGroupBySlug(slug) {
  return useHttp() ? getWorkingGroupBySlugHttp(slug) : getWorkingGroupBySlugMock(slug);
}

/**
 * İstenen koleksiyonun slug listesi.
 * @param {string} kind — 'news'|'haberler'|'events'|'etkinlikler'|
 *                          'councils'|'meclisler'|'working-groups'|'calisma-gruplari'
 * @returns {Promise<string[]>}
 */
export async function getSlugs(kind) {
  return useHttp() ? getSlugsHttp(kind) : getSlugsMock(kind);
}

/** @returns {Promise<SearchIndex>} */
export async function buildSearchIndex() {
  return useHttp() ? buildSearchIndexHttp() : buildSearchIndexMock();
}
