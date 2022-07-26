const cacheName = "cache-v1";
const resourcesToPrecache = [
  "index.html",
  "/assets/css/index.css",
  "/assets/images/angel.webp",
];

self.addEventListener("install", (event) => {
  console.log("installed");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activate event");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request)
  .then(cachedResponse => {
    return cachedResponse || fetch(event.request)
  })
  )
});
