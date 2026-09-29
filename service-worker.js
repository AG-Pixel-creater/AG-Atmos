const CACHE_NAME = "ag-atmos-shell-v2";
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./map.html",
  "./css/styles.css",
  "./css/index.css",
  "./css/map.css",
  "./js/main.js",
  "./js/index.js",
  "./js/map.js",
  "./manifest.json",
  "./assets/icons/icon.ico"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const isApi = /open-meteo\.com|rainviewer\.com/.test(url.hostname);
  if (isApi) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      const copy = response.clone();
      if (response.ok && url.origin === self.location.origin) {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
