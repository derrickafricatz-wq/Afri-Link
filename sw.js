// ============================================================
// AFRI|LINK SERVICE WORKER
// FAST CACHE-FIRST APP
// PERMANENT OFFLINE FILE CACHE
// ============================================================


/* ============================================================
   VERSION
============================================================ */

const APP_VERSION = "1.0.29";

const APP_CACHE = `afrilink-app-${APP_VERSION}`;

/*
  IMPORTANT:
  This cache does NOT contain the version number.

  Therefore old offline files will NOT be deleted
  when APP_VERSION changes.
*/
const OFFLINE_CACHE = "afrilink-offline-files";


/* ============================================================
   NORMAL APP FILES
============================================================ */

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

  /* PAGES */
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

  /* BRAND / MARKET IMAGES */
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
    
    
  /* SCREENSHOTS */
  "./screenshots/home 1.jpg",
  "./screenshots/home.jpg",
  "./screenshots/sponsor.jpg",
  "./screenshots/market.jpg",
  "./screenshots/bookstore.jpg",
  "./screenshots/reader.jpg",

  /* BANNER */
  "./banner.txt"

];


/* ============================================================
   PERMANENT OFFLINE FILES
============================================================ */

/*
  THESE FILES ARE SEPARATE FROM THE APP VERSION CACHE.

  They remain available when APP_VERSION changes.
*/

const OFFLINE_FILES = [

  /* PDF BOOKS */
  "./books/voice of god.pdf",
  "./books/spiritual.pdf",
  "./books/wito wa kumtumikia mungu.pdf",
  "./books/siri za mafanikio ya maisha.pdf",

  /* OFFLINE AUDIO */
  "./afrilink.mp3",
  "./silence.mp3"

];


/* ============================================================
   INSTALL
============================================================ */

self.addEventListener("install", (event) => {

  event.waitUntil(

    Promise.all([

      /*
        Normal app cache
      */

      caches.open(APP_CACHE)
        .then((cache) => {

          console.log(
            "Afri|Link: caching app shell..."
          );

          return cache.addAll(APP_SHELL);

        }),


      /*
        Permanent offline cache
      */

      caches.open(OFFLINE_CACHE)
        .then(async (cache) => {

          console.log(
            "Afri|Link: checking permanent offline files..."
          );

          /*
            Cache each file separately.

            If one file fails, the entire service
            worker installation does NOT fail.
          */

          for (const file of OFFLINE_FILES) {

            try {

              const existing =
                await cache.match(file);

              /*
                If already stored, keep it.
              */

              if (existing) {

                console.log(
                  "Offline file already stored:",
                  file
                );

                continue;

              }


              /*
                Download the file.
              */

              const response =
                await fetch(file);

              if (
                response &&
                response.ok
              ) {

                await cache.put(
                  file,
                  response
                );

                console.log(
                  "Offline file stored:",
                  file
                );

              }

            } catch (error) {

              console.log(
                "Offline file could not be stored:",
                file
              );

            }

          }

        })

    ])

  );


  /*
    Activate immediately.
  */

  self.skipWaiting();

});


/* ============================================================
   ACTIVATE
============================================================ */

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys()
      .then((keys) => {

        return Promise.all(

          keys.map((key) => {

            /*
              Only delete OLD APP caches.

              NEVER delete OFFLINE_CACHE.
            */

            if (
              key.startsWith("afrilink-app-") &&
              key !== APP_CACHE
            ) {

              console.log(
                "Deleting old app cache:",
                key
              );

              return caches.delete(key);

            }

          })

        );

      })

  );


  /*
    Take control immediately.
  */

  self.clients.claim();

});


/* ============================================================
   FETCH
============================================================ */

self.addEventListener("fetch", (event) => {

  /*
    Only GET requests.
  */

  if (event.request.method !== "GET") {
    return;
  }


  const requestUrl =
    event.request.url;


  /* ==========================================================
     NEVER CACHE SUPABASE
  ========================================================== */

  if (
    requestUrl.includes("supabase.co")
  ) {

    event.respondWith(

      fetch(event.request)

    );

    return;
  }


  /* ==========================================================
     NAVIGATION / HTML
     CACHE FIRST
  ========================================================== */

  if (event.request.mode === "navigate") {

    event.respondWith(

      caches.match(event.request)

        .then((cachedPage) => {

          /*
            APP OPENS IMMEDIATELY
            FROM CACHE
          */

          if (cachedPage) {

            /*
              Update quietly in background.

              IMPORTANT:
              This does NOT delay the page.
            */

            fetch(event.request)
              .then((response) => {

                if (
                  response &&
                  response.status === 200
                ) {

                  caches.open(APP_CACHE)
                    .then((cache) => {

                      cache.put(
                        event.request,
                        response
                      );

                    });

                }

              })
              .catch(() => {});


            return cachedPage;

          }


          /* ==================================================
             FIRST VISIT / NO CACHED PAGE
          ================================================== */

          return fetch(event.request)

            .then((response) => {

              if (
                response &&
                response.status === 200
              ) {

                const clone =
                  response.clone();

                caches.open(APP_CACHE)
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
                Final offline page.
              */

              return caches.match(
                "./offline.html"
              );

            });

        })

    );

    return;
  }


  /* ==========================================================
     PERMANENT OFFLINE FILES
  ========================================================== */

  /*
    Check the permanent offline cache first.

    This is especially important for PDFs and audio.
  */

  const isOfflineFile =
    OFFLINE_FILES.some((file) =>
      requestUrl.endsWith(
        file.replace("./", "")
      )
    );


  if (isOfflineFile) {

    event.respondWith(

      caches.open(OFFLINE_CACHE)

        .then(async (cache) => {

          const cached =
            await cache.match(event.request);

          if (cached) {

            return cached;

          }


          /*
            File is not stored yet.
            Try internet.
          */

          try {

            const response =
              await fetch(event.request);

            if (
              response &&
              response.ok
            ) {

              await cache.put(
                event.request,
                response.clone()
              );

            }

            return response;

          } catch (error) {

            return new Response(
              "Offline file is not available yet.",
              {
                status: 503,
                statusText: "Offline"
              }
            );

          }

        })

    );

    return;
  }


  /* ==========================================================
     VIDEO
     CACHE FIRST
  ========================================================== */

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
                response.status === 200 &&
                response.type !== "opaque"
              ) {

                const clone =
                  response.clone();

                caches.open(APP_CACHE)
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


  /* ==========================================================
     EVERYTHING ELSE
     CACHE FIRST
  ========================================================== */

  event.respondWith(

    caches.match(event.request)

      .then((cachedResponse) => {

        /*
          CACHE HIT
          Return immediately.
        */

        if (cachedResponse) {

          return cachedResponse;

        }


        /*
          CACHE MISS
          Go online.
        */

        return fetch(event.request)

          .then((response) => {

            /*
              Don't cache bad responses.
            */

            if (
              !response ||
              response.status !== 200 ||
              response.type === "opaque"
            ) {

              return response;

            }


            /*
              Store successful resource.
            */

            const clone =
              response.clone();

            caches.open(APP_CACHE)
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
              Nothing available.
            */

            return undefined;

          });

      })

  );

});

/* =========================
   AUDIO
   NETWORK FIRST + OFFLINE CACHE
========================= */

if (
  event.request.destination === "audio" ||
  requestUrl.endsWith(".mp3")
) {

  event.respondWith(

    fetch(event.request)

      .then((response) => {

        if (
          response &&
          response.status === 200
        ) {

          const clone = response.clone();

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

        return caches.match(event.request);

      })

  );

  return;
}


/* ============================================================
   MESSAGE
============================================================ */

self.addEventListener("message", (event) => {

  if (
    event.data === "SKIP_WAITING"
  ) {

    self.skipWaiting();

  }

});
