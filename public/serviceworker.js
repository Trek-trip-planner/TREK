const cacheName = 'version-1';
const urlsToCache = ['./index.html','./style.css'];
const self = this;
console.log('this', self)
//Install ServiceWorker
self.addEventListener('install', async (event)=> {
  console.log('Opened cache');
  const cache = await caches.open(cacheName);
  console.log('cache',cache)
  await cache.addAll(urlsToCache);
  return self.skipWaiting();
})

//Listen to requests
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // console.log('url',url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}

//Activate the SeviceWorker

self.addEventListener('activate', (event) => {
  self.clients.claim();
});
