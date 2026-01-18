const STATIC_CACHE = "static-v1"
const PAGE_CACHE = "pages-v1"
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/og-image.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((c) => c.addAll(STATIC_ASSETS)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((k) => (![STATIC_CACHE, PAGE_CACHE].includes(k) ? caches.delete(k) : undefined))),
      ),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const req = event.request
  const url = new URL(req.url)

  // Only handle GET
  if (req.method !== "GET") return

  // Static assets: cache-first
  if (
    STATIC_ASSETS.includes(url.pathname) ||
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/public/")
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(req).then(
          (cached) =>
            cached ||
            fetch(req).then((res) => {
              cache.put(req, res.clone())
              return res
            }),
        ),
      ),
    )
    return
  }

  // Pages/API: network-first with fallback
  event.respondWith(
    fetch(req)
      .then((res) => {
        const clone = res.clone()
        caches.open(PAGE_CACHE).then((cache) => cache.put(req, clone))
        return res
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("/"))),
  )
})
