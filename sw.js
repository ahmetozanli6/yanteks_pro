const CACHE = 'yanteks-v1';
const DATA_CACHE = 'yanteks-data-v1'; // Veritabanı kopyaları için yeni gizli depo
const STATIC = [
  '/index.html',
  '/musteriler.html', 
  '/notlar.html',
  '/fiyatlar.html',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
];

// Kurulum: statik dosyaları önbelleğe al
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});

// Aktivasyon: eski önbellekleri temizle
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== DATA_CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Araya girme (Proxy) işlemleri
self.addEventListener('fetch', e => {
  const url = e.request.url;
  
  // 1. SUPABASE VERİLERİ İÇİN (İnternet varsa kaydet, yoksa hafızadan getir)
  if (url.includes('supabase.co')) {
    // Sadece "Veri Çekme" (GET) işlemlerinin kopyasını alıyoruz. 
    if (e.request.method === 'GET') {
      e.respondWith(
        fetch(e.request).then(res => {
          // İnternet var, veriyi buluttan aldık. Hemen bir kopyasını telefon hafızasına atıyoruz.
          const resClone = res.clone();
          caches.open(DATA_CACHE).then(cache => cache.put(e.request, resClone));
          return res;
        }).catch(() => {
          // İnternet koptu veya uçak modundayız! Hafızadaki son kopyayı bulup uygulamaya veriyoruz.
          return caches.match(e.request).then(cachedRes => {
            if (cachedRes) return cachedRes;
            return new Response(JSON.stringify({error:'offline'}), {headers:{'Content-Type':'application/json'}});
          });
        })
      );
    } else {
      // Ekleme, silme gibi işlemlerde normal davran (uçak modundayken hata verir, olması gerektiği gibi)
      e.respondWith(fetch(e.request).catch(() => new Response(JSON.stringify({error:'offline'}), {headers:{'Content-Type':'application/json'}})));
    }
    return;
  }
  
  // 2. HTML SAYFALARI (Çevrimdışı kabuk)
  if (url.endsWith('.html') || url === location.origin + '/') {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const network = fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        });
        return cached || network;
      })
    );
    return;
  }
  
  // 3. CDN KAYNAKLARI (JS/CSS)
  if (url.includes('cdn.jsdelivr') || url.includes('cloudflare') || url.includes('fonts.g')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
    );
    return;
  }
  
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});