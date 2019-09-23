'use strict';

var CACHE_NAME = 'pwa-sample-caches';

var urlsToCache = [
    '/index.html',
    '/p.html',
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

self.addEventListener('activate', function(event) {
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