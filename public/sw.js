// const cacheName = "cache-v1";
// const resourcesToPrecache = [
//   "index.html",
//   "/assets/css/index.css",
//   "/assets/images/angel.webp",
//   "https://images.unsplash.com/photo-1599564139043-bc29b0909b6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=604&q=80"
// ];

// self.addEventListener("install", (event) => {
//   console.log("installed");
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(resourcesToPrecache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("activate event");
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(caches.match(event.request)
//   .then(cachedResponse => {
//     return cachedResponse || fetch(event.request)
//   })
//   )
// });
