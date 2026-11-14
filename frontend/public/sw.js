// Motors USA service worker: offline fallback + cached static assets. Videos are never cached.
const VERSION = "motors-usa-v1";
const OFFLINE = "/offline";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.add(OFFLINE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match(OFFLINE)));
    return;
  }
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || req.headers.has("range")) return;
  if (url.pathname.startsWith("/_next/static/") || /\.(?:webp|png|jpe?g|svg|woff2?)$/.test(url.pathname)) {
    e.respondWith(
      caches.open(VERSION).then((cache) =>
        cache.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; }))
      )
    );
  }
});
