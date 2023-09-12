console.log(2)

// Install Service Worker
self.addEventListener('install', function (event) {
    console.log('installed!');
});

//  jump wait
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', async function (event) {
    console.log("serviceworker event:", event)
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            var msg_chan = new MessageChannel();
            client.postMessage(event.data, [msg_chan.port2]);
            msg_chan.port1.onmessage = function (_event) {
                console.log("_event", _event)
                if (_event.data) {
                    event.ports[0].postMessage(_event.data);
                }
            };
        })
    })
});
