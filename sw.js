/* Metals Vault — service worker
   Stratégie : app-shell précaché + stale-while-revalidate pour le même-origine.
   Les appels d'API (gold-api / er-api) passent directement au réseau. */
const CACHE = 'mv-shell-v3';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Ne pas intercepter les APIs externes : on veut toujours des prix frais.
  if (url.origin !== self.location.origin) return;

  // App-shell : stale-while-revalidate.
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => cached || cache.match('./index.html'));
        return cached || network;
      })
    )
  );
});
