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
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            var msg_chan = new MessageChannel();
            client.postMessage(event.data, [msg_chan.port2]);
            msg_chan.port1.onmessage = function (event) {
                if (event.data) {
                    event.ports[0].postMessage(event.data);
                }
            };
        })
    })
});
