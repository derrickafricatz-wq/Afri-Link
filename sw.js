// Holly Echo - Offline Service Worker (FINAL CLEAN VERSION)

const APP_VERSION = "1.0.11";
const CACHE_NAME = `voiceofgod-${APP_VERSION}`;

/* =========================
   FILES TO CACHE (APP SHELL)
========================= */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./service.js",
  "./seat-dashboard.html",
  "./service-data.js",
  "./bg.js",
  "./books.js",
  "./bookings.js",
  "./verse.js",
  "./ui.js",
  "./market.js",
  "./library.js",
  "./offline.html",
  "./admin.html",
  "./author.html",
  "./dashboard.html",

  /* ICONS */
   "./ball.png",
   "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",

  /* BACKGROUND */

  "./images/d1.jpg",
  "./images/s1.png",
  "./images/de.png",   

  /* BOOK COVERS */
  "./images/er1.jpg",
  "./images/er2.jpg",
  "./images/b20.jpg",
  "./images/vg.jpg",
   

   /* BRAND LOGO*/
  "./images/logo.png",
  "./images/o1.png",
  "./images/o2.jpg",
  "./images/y1.png",
  "./images/y2.jpg",
  "./images/1.png",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/6.jpg",
  "./images/8.jpg",
  "./images/10.jpg",
  "./images/11.jpg",
  "./images/13.jpg",
  "./images/15.jpg",
  "./images/21.jpg",
  "./images/23.jpg",
  "./images/19.jpg",
  "./images/20.jpg",
  "./images/24.jpg",
  "./images/m1.jpg",
  "./images/m3.png",
  "./images/m11.png",
  "./images/m4.png",
  "./images/m10.jpg",
  "./images/m5.jpg",
  "./images/m2.png",
  "./images/m9.jpg",
  "./images/m6.jpg",
  "./images/m7.jpg",
  "./images/m8.png",
   "./images/s2.jpg",
    "./images/s3.jpg",
    "./images/s4.jpg",
    "./images/s5.png",
    "./images/s6.png",
    "./images/s7.png",
    "./images/pr.jpg",
   
   

  /* SCREENSHOTS*/
  "./screenshots/home1.jpg",
  "./screenshots/home.jpg",
  "./screenshots/sponsor.jpg",
  "./screenshots/market.jpg",
  "./screenshots/bookstore.jpg",
  "./screenshots/reader.jpg",
   
  /* BOOKS (PDF)*/
  "./books/voice of god.pdf",
  "./books/spiritual.pdf",
  "./books/wito wa kumtumikia mungu.pdf",
  "./books/siri za mafanikio ya maisha.pdf",
  "./banner.txt"

];

/* =========================
   INSTALL EVENT
========================= */

self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell...");
      return cache.addAll(APP_SHELL);
    })
  );

  // Force new SW to activate immediately
  self.skipWaiting();
});

/* =========================
   ACTIVATE EVENT (FIXED + IMPORTANT)
========================= */

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
    })
  );

  //  CRITICAL: take control immediately
  self.clients.claim();
});

/* =========================
   FETCH STRATEGY (AFYA STYLE OFFLINE)
========================= */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  const requestUrl = event.request.url;

// NEVER CACHE SUPABASE API REQUESTS
if (requestUrl.includes("supabase.co")) {
  event.respondWith(fetch(event.request));
  return;
}

 // VIDEO FIX
if (
  event.request.destination === "video" ||
  requestUrl.endsWith(".mp4")
) {

  event.respondWith(

    caches.match(event.request).then((cached) => {

      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {

        if (response && response.status === 200) {

          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

        }

        return response;

      });

    })

  );

  return;
} 

  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {

      /* 1. CACHE FIRST (FAST OFFLINE LOAD) */
      if (cachedResponse) {
        return cachedResponse;
      }

      /* 2. NETWORK FALLBACK */
      return fetch(event.request).then((response) => {

        // ignore invalid responses
        if (
          !response ||
          response.status !== 200 ||
          response.type === "opaque"
        ) {
          return response;
        }

        const clone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });

        return response;

      }).catch(() => {

        /* 3. OFFLINE PAGE FOR NAVIGATION */
        if (event.request.mode === "navigate") {
          return caches.match("./offline.html");
        }

        /* 4. FORCE OFFLINE SUPPORT FOR PDF + VIDEO */
        if (
          requestUrl.includes(".pdf") ||
          requestUrl.includes(".mp4")
        ) {
          return caches.match(event.request);
        }

      });

    })

  );

});

self.addEventListener("message", (event) => {

if(event.data === "SKIP_WAITING"){

self.skipWaiting();

}

});
