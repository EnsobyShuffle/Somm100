const SCOPE = self.registration.scope;
const CACHE = `somm100-static-v3:${SCOPE}`;
const OFFLINE = new URL('offline.html', SCOPE).href;
const ASSETS = ['offline.html', 'icon-192.png', 'icon-512.png'].map(path => new URL(path, SCOPE).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('somm100-static-') && key.endsWith(`:${SCOPE}`) && key !== CACHE)
    .map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' && event.request.url.startsWith(SCOPE)) {
    event.respondWith(fetch(event.request).catch(() => caches.open(CACHE).then(cache => cache.match(OFFLINE))));
  }
});
