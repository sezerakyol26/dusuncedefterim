const CACHE_NAME = "dusunce-defteri-v3";

// Helper to resolve paths relative to Service Worker location
function resolveRelativeUrl(relPath) {
  try {
    return new URL(relPath, self.location.href).pathname;
  } catch {
    return relPath;
  }
}

// Initial static assets to cache on install (Icons & Manifest only)
const STATIC_ASSETS = [
  "./manifest.json",
  "./icon.svg",
  "./icon-512.png",
  "./icon-192.png",
  "./apple-touch-icon.png",
  "./favicon.png",
  "./favicon-32.png"
];

// Install event: cache initial static assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const urlsToCache = STATIC_ASSETS.map((p) => resolveRelativeUrl(p));
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn("Düşünce Defteri SW: Bazı statik dosyalar önbelleğe alınamadı:", err);
      });
    })
  );
});

// Activate event: immediately purge old caches (v1, v2, etc.)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Network-First for HTML/Navigations, Cache-First for versioned assets
self.addEventListener("fetch", (event) => {
  // Only handle GET requests and same-origin URLs
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Firebase APIs and backend APIs
  if (
    event.request.url.includes("firestore.googleapis.com") || 
    event.request.url.includes("googleapis.com") ||
    event.request.url.includes("/api/")
  ) {
    return;
  }

  // 1. Navigation requests (HTML pages): NETWORK FIRST
  // This guarantees that after any new deploy, the user always receives the latest HTML
  // referencing the correct JS/CSS hashes, preventing the white screen trap.
  if (event.request.mode === "navigate" || event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback
          const cached = await caches.match(event.request) ||
                         await caches.match(resolveRelativeUrl("./index.html")) ||
                         await caches.match(resolveRelativeUrl("./"));
          if (cached) return cached;
          return new Response(
            "<!doctype html><html lang='tr'><head><meta charset='utf-8'><title>Çevrimdışı</title></head><body style='font-family:sans-serif;text-align:center;padding:40px;'><h2>İnternet Bağlantısı Yok</h2><p>Düşünce Defteri çevrimdışı önbelleğinde bulunamadı. Lütfen internet bağlantınızı kontrol edin.</p></body></html>",
            { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        })
    );
    return;
  }

  // 2. Static assets (JS bundles, CSS, images, fonts): CACHE FIRST with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
