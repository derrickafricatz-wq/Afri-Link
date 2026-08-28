// AfriLink - Lightweight Offline Service Worker

const APP_VERSION = "1.1.5";
const CACHE_NAME = `afrilink-${APP_VERSION}`;


/* =========================
   SMALL APP SHELL ONLY
========================= */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",

  "./service.js",
  "./bg.js",
  "./books.js",
  "./bookings.js",
  "./verse.js",
  "./ui.js",
  "./market.js",
  "./library.js",

  "./offline.html",

  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"

];


/* =========================
   INSTALL
========================= */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        console.log("Installing lightweight AfriLink cache");

        return cache.addAll(APP_SHELL);

      })

  );

  self.skipWaiting();

});


/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(keys => {

        return Promise.all(

          keys.map(key => {

            if (key !== CACHE_NAME) {

              console.log(
                "Deleting old cache:",
                key
              );

              return caches.delete(key);

            }

          })

        );

      })

  );

  self.clients.claim();

});


/* =========================
   FETCH
========================= */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }


  const requestUrl = event.request.url;


  /* =========================
     NEVER CACHE SUPABASE
  ========================= */

  if (requestUrl.includes("supabase.co")) {

    event.respondWith(
      fetch(event.request)
    );

    return;

  }


  /* =========================
     APP NAVIGATION
     NETWORK FIRST
========================= */

  if (event.request.mode === "navigate") {

    event.respondWith(

      fetch(event.request)

        .then(response => {

          if (
            response &&
            response.status === 200
          ) {

            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {

                cache.put(
                  event.request,
                  copy
                );

              });

          }

          return response;

        })

        .catch(() => {

          return caches.match(event.request)

            .then(cached => {

              return cached ||
                caches.match("./index.html") ||
                caches.match("./offline.html");

            });

        })

    );

    return;

  }


  /* =========================
     CACHE-FIRST RESOURCES
========================= */

  event.respondWith(

    caches.match(event.request)

      .then(cached => {

        if (cached) {
          return cached;
        }


        return fetch(event.request)

          .then(response => {

            if (
              !response ||
              response.status !== 200 ||
              response.type === "opaque"
            ) {

              return response;

            }


            /*
              Cache resources only
              after they are actually used.
            */

            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {

                cache.put(
                  event.request,
                  copy
                );

              });


            return response;

          })

          .catch(() => {

            return caches.match(event.request);

          });

      })

  );

});


/* =========================
   MESSAGE
========================= */

self.addEventListener("message", event => {

  if (event.data === "SKIP_WAITING") {

    self.skipWaiting();

  }

});
