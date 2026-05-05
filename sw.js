const CACHE = 'yanteks-v4';
const DATA_CACHE = 'yanteks-data-v4';

const BASE_PATH = '/yanteks_pro'; // GitHub Pages alt dizin
const STATIC = [
  BASE_PATH + '/index.html',
  BASE_PATH + '/musteriler.html',
  BASE_PATH + '/fiyatlar.html',
  BASE_PATH + '/fiyatteklifleri.html',
  BASE_PATH + '/donusturucu.html',
  BASE_PATH + '/manifest.json'
];

const CDN = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      for (const url of STATIC) {
        try { await cache.add(url); } catch (err) { console.warn('[SW] Statik cache hatasi:', url, err); }
      }
      for (const url of CDN) {
        try {
          const res = await fetch(url);
          if (res.ok) await cache.put(url, res);
        } catch (err) { console.warn('[SW] CDN cache hatasi:', url, err); }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))  // tüm eski cache'leri sil
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  const method = e.request.method;

  if (url.includes('supabase.co')) {
    if (method === 'GET') {
      e.respondWith(
        fetch(e.request.clone())
          .then(res => {
            if (res.ok) {
              const clone = res.clone();
              caches.open(DATA_CACHE).then(c => c.put(e.request, clone));
            }
            return res;
          })
          .catch(async () => {
            const cached = await caches.match(e.request);
            if (cached) return cached;
            return new Response(
              JSON.stringify({ data: [], error: null, _offline: true }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          })
      );
    } else {
      e.respondWith(
        fetch(e.request).catch(() =>
          new Response(
            JSON.stringify({ data: null, error: { message: 'Cevrimdisi: Bu islem internet gerektirir.' }, _offline: true }),
            { headers: { 'Content-Type': 'application/json' } }
          )
        )
      );
    }
    return;
  }

  if (url.endsWith('.html') || url.endsWith('/') || url === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const networkFetch = fetch(e.request)
          .then(res => {
            if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
            return res;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  if (url.includes('cdn.jsdelivr') || url.includes('cdnjs.cloudflare') || url.includes('fonts.g')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        });
      })
    );
    return;
  }

  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
