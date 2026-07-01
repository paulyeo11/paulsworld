/* Service worker — offline support for MT10 (Japan Trip 2026)
   Cache-first for precached trip assets, network-first (with cache fallback)
   for everything else, so other pages on the site are unaffected. */
const CACHE_NAME = 'mt10-japan-offline-v1';
const PRECACHE_URLS = [
  '/MT10.html',
  '/MT10-day1.html',
  '/MT10-earthquake.html',
  '/japan-icon.png',
  '/img_MT10/immigration-qr-code.png',
  '/img_MT10/hokkaido-tips.png',
  '/japan-immigration-qr-code.pdf',
  '/japan-boarding-pass-SQ632.pdf',
  '/japan-return-flight-SQ633.pdf',
  '/toyota-car-rental-confirmation.pdf',
  '/bilingual.js',
  '/view-counter.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(PRECACHE_URLS.map(function(url) {
        return cache.add(url).catch(function() { /* skip assets that fail to fetch at install time */ });
      }));
    }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  var url = event.request.url;
  var isPrecached = PRECACHE_URLS.indexOf(url) !== -1 || PRECACHE_URLS.indexOf(new URL(url).pathname) !== -1;

  if (isPrecached) {
    // Cache-first for the trip's own assets — guarantees offline viewing.
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        var network = fetch(event.request).then(function(resp) {
          if (resp && resp.ok) {
            var clone = resp.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
          }
          return resp;
        }).catch(function() { return cached; });
        return cached || network;
      })
    );
    return;
  }

  // Everything else (other pages, map tiles, etc.) — network-first, cache fallback.
  event.respondWith(
    fetch(event.request).then(function(resp) {
      if (resp && resp.ok && event.request.url.indexOf(self.location.origin) === 0) {
        var clone = resp.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
      }
      return resp;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
