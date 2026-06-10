/**
 * service-worker.js — Tacarigua Digital PWA
 *
 * Estrategia:
 *  • App shell (HTML, JS, CSS, imágenes propias) → Cache-first, luego red
 *  • Teselas de mapa (OSM, ESRI, Leaflet CDN) → Stale-while-revalidate + cache perpetuo
 *  • Peticiones a la API → Network-first, fallback a caché
 *  • Navegación offline → /index.html desde caché
 */

const CACHE_VERSION = 'v8';
const SHELL_CACHE   = `tacarigua-shell-${CACHE_VERSION}`;
const TILES_CACHE   = `tacarigua-tiles-${CACHE_VERSION}`;
const API_CACHE     = `tacarigua-api-${CACHE_VERSION}`;

// Número máximo de teselas guardadas (~50 MB para zoom 10-17 de Tacarigua)
const MAX_TILES = 3000;

// ── Recursos del app shell ────────────────────────────────────
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/historia.html',
  '/cultura.html',
  '/biblioteca.html',
  '/geografia.html',
  '/sociedad.html',
  '/nosotros.html',
  '/manifest.json',
  '/vite.svg',
  '/offline.html',
  '/TacariguaGeografía.pdf',
];

// ── Dominios de teselas de mapa ───────────────────────────────
const TILE_ORIGINS = [
  'tile.openstreetmap.org',
  'a.tile.openstreetmap.org',
  'b.tile.openstreetmap.org',
  'c.tile.openstreetmap.org',
  'server.arcgisonline.com',   // ESRI World Imagery (segundo mapa)
  'basemaps.cartocdn.com',     // Nombres y calles sobre satélite
  'raw.githubusercontent.com', // iconos de marcadores Leaflet
  'cdnjs.cloudflare.com',      // sombra de marcadores Leaflet
  'unpkg.com',
];

// ── Helpers ───────────────────────────────────────────────────
function isTileRequest(url) {
  return TILE_ORIGINS.some(origin => url.hostname.endsWith(origin));
}

function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

// ── INSTALL: pre-cachea el shell ──────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpia cachés obsoletas ────────────────────────
self.addEventListener('activate', (event) => {
  const valid = new Set([SHELL_CACHE, TILES_CACHE, API_CACHE]);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !valid.has(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: enrutador de estrategias ──────────────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Teselas de mapa → Stale-While-Revalidate con cuota
  if (isTileRequest(url)) {
    event.respondWith(handleTile(event.request));
    return;
  }

  // 2. API → Network-first, fallback caché
  if (isApiRequest(url)) {
    event.respondWith(handleApi(event.request));
    return;
  }

  // 3. Todo lo demás (app shell, assets) → Cache-first, fallback red → offline
  event.respondWith(handleShell(event.request));
});

// ── Estrategia: Teselas ───────────────────────────────────────
async function handleTile(request) {
  const cache = await caches.open(TILES_CACHE);
  const cached = await cache.match(request);

  // Revalida en background si ya está en caché
  const networkFetch = fetch(request)
    .then(async response => {
      if (response.ok) {
        // Aplica cuota: si hay demasiadas teselas, borra las más antiguas
        const keys = await cache.keys();
        if (keys.length >= MAX_TILES) {
          const toDelete = keys.slice(0, keys.length - MAX_TILES + 1);
          await Promise.all(toDelete.map(k => cache.delete(k)));
        }
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Revalida silenciosamente, pero responde desde caché de inmediato
    networkFetch.catch(() => {});
    return cached;
  }

  // No está en caché: espera la red
  const networkResponse = await networkFetch;
  if (networkResponse) return networkResponse;

  // Fallback: tesela gris 1×1 px transparente
  return new Response(
    new Uint8Array([
      0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,
      0x44,0x52,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x01,0x08,0x02,0x00,0x00,
      0x00,0x90,0x77,0x53,0xde,0x00,0x00,0x00,0x0c,0x49,0x44,0x41,0x54,0x08,
      0xd7,0x63,0xd8,0xd8,0xd8,0x00,0x00,0x00,0x04,0x00,0x01,0xa3,0x55,0x59,
      0xb2,0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82,
    ]),
    { headers: { 'Content-Type': 'image/png' } }
  );
}

// ── Estrategia: API ───────────────────────────────────────────
async function handleApi(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(API_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response(JSON.stringify({ error: 'Sin conexión' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503,
    });
  }
}

// ── Estrategia: App shell ─────────────────────────────────────
async function handleShell(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then(async response => {
      if (response.ok) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  // En desarrollo/actualizaciones frecuentes, el problema típico es:
  // el SW devuelve HTML/JS/CSS viejo desde caché.
  // Solución: estrategia network-first para navegaciones (mode=navigate)
  // y para cualquier recurso tipo HTML.
  const isNavigate = request.mode === 'navigate';
  const acceptHeader = request.headers.get('accept') || '';
  const isHtml = acceptHeader.includes('text/html');
  if (isNavigate || isHtml) {

    const networkResponse = await networkFetch;
    if (networkResponse) return networkResponse;

    // Fallback: si la red falla, usamos caché (o offline)
    if (cached) return cached;
    return caches.match('/index.html') || caches.match('/offline.html');
  }

  // Para el resto de assets del shell: cache-first con revalidación en background
  if (cached) {
    networkFetch.catch(() => {});
    return cached;
  }

  const networkResponse = await networkFetch;
  if (networkResponse) return networkResponse;

  return request.mode === 'navigate'
    ? caches.match('/index.html') || caches.match('/offline.html')
    : caches.match('/offline.html');
}

