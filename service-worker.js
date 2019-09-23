var CACHE_NAME = 'pwa-sample-caches';

var urlsToCache = [
    '/maruko1230.github.io/',
];

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    )
});