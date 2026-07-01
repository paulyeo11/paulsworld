// Paul's World — offline service worker
// Lets the homepage (and any page/image the visitor has opened) keep working with no network.
const CACHE_NAME = 'paulsworld-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/bilingual.js',
  '/view-counter.js',
  '/manifest.webmanifest',
  '/annapurna-hero.jpg',
  '/encourage_card.jpg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        PRECACHE_URLS.map((url) => cache.add(url).catch(() => {}))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate for same-origin GET requests: serve from cache instantly
// when available, refresh the cache in the background when online, and fall back
// to whatever is cached (or the offline shell) when the network is unreachable.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => null);

        if (cached) {
          network.catch(() => {});
          return cached;
        }

        return network.then((res) => {
          if (res) return res;
          if (req.mode === 'navigate') return cache.match('/index.html');
          return Response.error();
        });
      })
    )
  );
});
