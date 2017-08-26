var CACHE_NAME = 'translator-site-cache-v1';
var urlsToCache = [
    '',
    'react.min.js',
    'react-dom.min.js',
    'style.css',
    'translator.js',
    'registersw.js',
    'translations.json',
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                var fetchRequest = event.request.clone();

                fetchResponse = fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );

                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetchResponse;
            })
    );
});