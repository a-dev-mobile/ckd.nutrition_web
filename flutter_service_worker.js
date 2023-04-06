'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "26630845bea0c6ded9e1d56df3532e4d",
"assets/assets/icons/app_icons.ttf": "7be1b828c6e4af457ddf2762de1c1cd1",
"assets/assets/image/onboarding_remind_you.svg": "2329ea46a68bd2bd47b2c52c710540c6",
"assets/assets/image/splash.png": "7b6d93acbea15a21cb3c8b93de820dac",
"assets/assets/lottie/load_btn.json": "4903663f0dfca40522c8d2185a8e9412",
"assets/assets/lottie/load_page.json": "4e36b5f36734b5e5432b73a1babbb8cf",
"assets/assets/lottie/water_down.json": "087ba1183e610cd243167b71a75593c3",
"assets/assets/lottie/water_up.json": "e09b5cf5a7c12b3f9cbe79e6a2cb6c46",
"assets/assets/svg/ic_error.svg": "d74448a130aa9259ad4c17547b47879f",
"assets/assets/svg/ic_error_close.svg": "379e05920337c2f8eefb8f1d86cc740c",
"assets/assets/svg/ic_info.svg": "dd0f2b165b92f37153467c6f07ff22b3",
"assets/assets/svg/ic_info_close.svg": "0d3119c0b7ce5fdbe863a3864f411740",
"assets/assets/svg/ic_success.svg": "657e63a6e8f94bee59853da59e08e31e",
"assets/assets/svg/ic_success_close.svg": "b8667d768e418df7b56038f138b6391e",
"assets/assets/svg/ic_warning.svg": "133bf6fc6b174bfd8846ec97783a578d",
"assets/assets/svg/ic_warning_close.svg": "9fb9c3ebbf523cb4365e0db1b6d54ea8",
"assets/assets/svg/logo.svg": "c2f22cde0879400440eb87954b090c99",
"assets/assets/svg/onb_1.svg": "4f5e109c6540f4bf4f8c888433dcaff7",
"assets/assets/svg/onb_2.svg": "25286ac072fafc4a1fa22ed0d52c0dd3",
"assets/assets/svg/onb_3.svg": "f450b8b146e0d01345d212c1ff10ac73",
"assets/assets/svg/onb_4.svg": "9fc3e57f2e970f5f9100aa07adc36565",
"assets/assets/svg/sort_asc.svg": "d58168a491f8bd0579d220b2197cefc6",
"assets/assets/svg/sort_desc.svg": "3a92e16b089e9e41983cb25df3fde600",
"assets/FontManifest.json": "fcc51b36fb50fcdc26c16f4d15f84b82",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "b61ec99a4e656db4c802e5935fd4144f",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/apple-touch-icon.png": "ced0918507a962177cc33239b3fb49ed",
"icons/favicon.ico": "d0ed047030946ec32c64018cb5403b43",
"icons/icon-192-maskable.png": "9f7350b8a6a62a66b7083087eb9029dd",
"icons/Icon-192.png": "e4ec2bce4257922cee71a9acdf5f88d3",
"icons/icon-512-maskable.png": "cb1f73970fe652d1f32a9c232800d8bc",
"icons/Icon-512.png": "ad6342679f68d6ba12f07eb51273c0a4",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/README.txt": "d3df3991a31f034bfa98afdfa3c622e1",
"index.html": "000c5b5a98ca89e9b1763c9731fcb708",
"/": "000c5b5a98ca89e9b1763c9731fcb708",
"main.dart.js": "7907493d5f7a1c3a9248d12ba47c181f",
"manifest.json": "eab95e6e8fd79ea565049ff0190d4351",
"splash/img/dark-1x.png": "994751e4acef66831123b6e8cc3d66b7",
"splash/img/dark-2x.png": "ccf9ce07dbb0498e5d4597c95b3a550c",
"splash/img/dark-3x.png": "b3519ff9db54f56888973fbd36ed6229",
"splash/img/dark-4x.png": "1cde8e0b2726a867358f4f2a0de35877",
"splash/img/light-1x.png": "994751e4acef66831123b6e8cc3d66b7",
"splash/img/light-2x.png": "ccf9ce07dbb0498e5d4597c95b3a550c",
"splash/img/light-3x.png": "b3519ff9db54f56888973fbd36ed6229",
"splash/img/light-4x.png": "1cde8e0b2726a867358f4f2a0de35877",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "c94c38ff00a9d487c353a2d78989ea08",
"version.json": "053fb5efed7fbab49b3b099d4997a76d"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
