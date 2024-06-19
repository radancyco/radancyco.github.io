---
layout: null
---

// This is the "Offline copy of pages" service worker

// Install stage sets up the index page (home page) in the cache and opens a new cache

self.addEventListener("install", function(event) {

  var indexPage = new Request("/");

  event.waitUntil(

    fetch(indexPage).then(function(response) {

      if (response.status === 200) {

        return caches.open("radancy-offline").then(function(cache) {

          console.log("Radancy cached index page during install: " + response.url);

          return cache.put(indexPage, response);

        });

      } else {

        console.warn("Failed to cache index page during install: " + response.status);

      }

    }).catch(function(error) {

      console.error("Fetch error during install: ", error);

    })

  );

});

// If any fetch fails, it will look for the request in the cache and serve it from there first

self.addEventListener("fetch", function(event) {

  var updateCache = function(request) {

    return caches.open("radancy-offline").then(function(cache) {

      return fetch(request).then(function(response) {

        if (response.status === 200) {

          console.log("Radancy added page to offline: " + response.url);

          return cache.put(request, response);

        } else {

          console.warn("Failed to cache request: " + response.url + " with status: " + response.status);

        }

      }).catch(function(error) {

        console.error("Fetch error: ", error);

      });

    });

  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(

    fetch(event.request).catch(function(error) {

      console.log("Radancy network request failed. Serving content from cache: " + error);

      // Check to see if you have it in the cache

      // Return response

      // If not in the cache, then return error page

      return caches.open("radancy-offline").then(function(cache) {

        return cache.match(event.request).then(function(matching) {

          var report = !matching || matching.status == 404 ? Promise.reject("no-match") : matching;

          return report;

        });

      });

    })

  );

});

