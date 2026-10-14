const CACHE_NAME = "dusunce-defteri-v2";

// Helper to resolve paths relative to Service Worker location
function resolveRelativeUrl(relPath) {
  try {
    return new URL(relPath, self.location.href).pathname;
  } catch {
    return relPath;
  }
}

// Initial assets to cache on install
const RELATIVE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icon-512.png",
  "./icon-192.png",
  "./apple-touch-icon.png",
  "./favicon.png",
  "./favicon-32.png"
];

// Install event: cache initial assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const urlsToCache = RELATIVE_ASSETS.map((p) => resolveRelativeUrl(p));
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn("Düşünce Defteri SW: Bazı statik dosyalar önbelleğe alınamadı:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Stale-While-Revalidate pattern with offline support
self.addEventListener("fetch", (event) => {
  // Only handle GET requests and same-origin URLs
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Firebase APIs and external APIs to prevent breaking database sync
  if (
    event.request.url.includes("firestore.googleapis.com") || 
    event.request.url.includes("googleapis.com") ||
    event.request.url.includes("/api/")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in the background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => { /* Offline fallback */ });
        
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
      }).catch(() => {
        // Fallback for navigation requests (SPA support)
        if (event.request.mode === "navigate") {
          return caches.match(resolveRelativeUrl("./index.html")) || caches.match(resolveRelativeUrl("./"));
        }
      });
    })
  );
});
