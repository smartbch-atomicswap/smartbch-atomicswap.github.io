console.log(1)

// Install Service Worker
self.addEventListener('install', function (event) {
    console.log('installed!');
});

//  jump wait
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', async function (event) {
    event.ports[0].postMessage(new Error("NOT_FOUND"));
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage(event.data);
        })
    })
});
