// Holly Echo - Offline Service Worker
// ONLINE-FIRST NAVIGATION + CACHE-FIRST RESOURCES

const APP_VERSION = "1.0.42";
const CACHE_NAME = `voiceofgod-${APP_VERSION}`;


/* =========================
   FILES TO CACHE
   APP SHELL
========================= */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./service.js",
  "./seat-dashboard.html",
  "./service-data.js",
  "./company-login.html",
  "./bg.js",
  "./books.js",
  "./bookings.js",
  "./verse.js",
  "./ui.js",
  "./market.js",
  "./library.js",

  /* VOICES */
  "./afrilink.mp3",
  "./silence.mp3",

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

   "./images/s1.png",

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
    "./images/l1.jpg",
   "./images/l2.jpg",
    "./images/ha.jpg",
   "./images/hb.jpg",
    "./images/hc.jpg",
   "./images/hd.jpg",
   "./images/qa.jpg",
   "./images/qb.jpg",
   "./images/qc.jpg",
   "./images/qd.jpg",
   "./images/qe.jpg",
   
   "./images/qf.jpg",
   "./images/qg.jpg",
  "./images/qh.jpg",
  "./images/aa.png",
   "./images/ab.jpg",
  "./images/ac.jpg",
  "./images/ad.jpg",
  "./images/ae.jpg",
 "./images/af.jpg",
 "./images/ag.jpg",
 "./images/ah.jpg",
   
  "./images/ai.jpg",
 "./images/aj.jpg",
"./images/ak.jpg",
 "./images/al.jpg",
 "./images/am.jpg",
 "./images/an.jpg",
  "./images/ao.jpg",
 "./images/ap.jpg",
"./images/ca.jpg",
 "./images/cb.jpg",
"./images/cc.jpg",
"./images/cd.jpg",
"./images/ce.jpg",
   
   "./images/cf.jpg",
   "./images/cg.jpg",
   "./images/ya.png",
   "./images/yb.png",
   "./images/yc.png",
   "./images/za.png",
    "./images/zb.png",
    "./images/zc.png",
    "./images/zd.png",
    "./images/ze.png",
    "./images/zf.png",
    "./images/zg.png",
   
    "./images/zh.png",
    "./images/zi.png",
    "./images/zj.png",
    "./images/zk.png",
    "./images/zl.png",
    "./images/zm.png",
    "./images/zn.png",
    "./images/zo.png",  
   
   

  /* SCREENSHOTS*/
  "./screenshots/home 1.jpg",
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
   INSTALL
========================= */

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then((cache) => {

        console.log(
          "Caching Afri|Link app shell..."
        );

        return cache.addAll(APP_SHELL);

      })

  );

  /*
    Activate the new service worker
    immediately.
  */

  self.skipWaiting();

});


/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys()

      .then((keys) => {

        return Promise.all(

          keys.map((key) => {

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

  /*
    Take control of open pages
    immediately.
  */

  self.clients.claim();

});


/* =========================
   FETCH
========================= */

self.addEventListener("fetch", (event) => {

  /*
    Only handle GET requests.
  */

  if (event.request.method !== "GET") {
    return;
  }


  const requestUrl =
    event.request.url;


  /* =========================
     NEVER CACHE SUPABASE
  ========================= */

  if (
    requestUrl.includes("supabase.co")
  ) {

    event.respondWith(
      fetch(event.request)
    );

    return;
  }


  /* =========================
     NAVIGATION / HTML
     ONLINE FIRST
  ========================= */

  /*
    This is the important fix.

    When a user opens the app:

    ONLINE
      ↓
    Get newest index.html
      ↓
    Save newest version to cache

    OFFLINE
      ↓
    Use cached page
  */

  if (event.request.mode === "navigate") {

    event.respondWith(

      fetch(event.request)

        .then((response) => {

          /*
            Save the newest HTML page.
          */

          if (
            response &&
            response.status === 200
          ) {

            const clone =
              response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {

                cache.put(
                  event.request,
                  clone
                );

              });

          }

          return response;

        })

        .catch(() => {

          /*
            If internet fails,
            use the cached page.
          */

          return caches
            .match(event.request)

            .then((cachedPage) => {

              if (cachedPage) {
                return cachedPage;
              }

              /*
                Final offline fallback.
              */

              return caches.match(
                "./offline.html"
              );

            });

        })

    );

    return;
  }


  /* =========================
     VIDEO
     CACHE FIRST
  ========================= */

  if (
    event.request.destination === "video" ||
    requestUrl.endsWith(".mp4")
  ) {

    event.respondWith(

      caches.match(event.request)

        .then((cached) => {

          if (cached) {
            return cached;
          }

          return fetch(event.request)

            .then((response) => {

              if (
                response &&
                response.status === 200
              ) {

                const clone =
                  response.clone();

                caches.open(CACHE_NAME)
                  .then((cache) => {

                    cache.put(
                      event.request,
                      clone
                    );

                  });

              }

              return response;

            });

        })

    );

    return;
  }


  /* =========================
     EVERYTHING ELSE
     CACHE FIRST
  ========================= */

  /*
    Images
    JavaScript
    CSS
    MP3
    PDF
    Fonts
    Other resources
  */

  event.respondWith(

    caches.match(event.request)

      .then((cachedResponse) => {

        /*
          1. Use cache immediately
        */

        if (cachedResponse) {

          return cachedResponse;

        }


        /*
          2. Not cached?
             Get it from internet.
        */

        return fetch(event.request)

          .then((response) => {

            /*
              Don't cache invalid responses.
            */

            if (
              !response ||
              response.status !== 200 ||
              response.type === "opaque"
            ) {

              return response;

            }


            /*
              Save successful resource.
            */

            const clone =
              response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {

                cache.put(
                  event.request,
                  clone
                );

              });


            return response;

          })

          .catch(() => {

            /*
              If the resource is unavailable
              and was not cached, return nothing.
            */

            if (
              requestUrl.includes(".pdf") ||
              requestUrl.includes(".mp4") ||
              requestUrl.includes(".mp3")
            ) {

              return caches.match(
                event.request
              );

            }

          });

      })

  );

});


/* =========================
   MESSAGE
========================= */

self.addEventListener("message", (event) => {

  if (
    event.data === "SKIP_WAITING"
  ) {

    self.skipWaiting();

  }

});
