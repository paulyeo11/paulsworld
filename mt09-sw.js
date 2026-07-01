// Offline cache for MT09 (Xinjiang 2026 trip page). Scoped by URL check in
// fetch handler so it never touches other pages on the site.
const CACHE_NAME = 'mt09-offline-v1';

const CORE_ASSETS = [
  '/MT09.html',
  '/img_xj/xj_icon.jpg',
  '/MT09_flight_SIN_XIY.pdf',
  '/MT09_flight_URC_SIN_return.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(CORE_ASSETS.map((url) => cache.add(url).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

function isMt09Asset(url) {
  if (url.pathname === '/MT09.html') return true;
  if (url.pathname.startsWith('/img_xj/')) return true;
  if (url.pathname === '/MT09_flight_SIN_XIY.pdf') return true;
  if (url.pathname === '/MT09_flight_URC_SIN_return.pdf') return true;
  if (url.hostname === 'cdnjs.cloudflare.com') return true;
  if (url.hostname.endsWith('tile.openstreetmap.org')) return true;
  if (url.hostname === 'server.arcgisonline.com') return true;
  if (url.hostname === 'en.wikipedia.org') return true;
  if (url.hostname === 'upload.wikimedia.org') return true;
  if (url.hostname === 'images.unsplash.com') return true;
  return false;
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!isMt09Asset(url)) return; // leave every other page/request untouched

  // Page itself: network-first so Paul gets edits when online, cache when offline.
  if (url.pathname === '/MT09.html') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else (maps tiles, photos, PDFs, Leaflet lib): cache-first,
  // so tiles/photos already seen while online stay available offline.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
