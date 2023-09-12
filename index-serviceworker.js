console.log(6)

const cacheMap = new Map();

// Install Service Worker
self.addEventListener('install', function (event) {
    console.log('installed!');
});

//  jump wait
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', async function (event) {
    // const client = await self.clients.get(event.source.id)
    console.log("event.source", event.source, "SW Received Message: " + event.data);
    if (event.data.action === "write") {
        const { key, value } = event.data.payload
        cacheMap.set(key, value)
        return
    }
    if (event.data.action === "read") {
        // TODO auth check
        const key = event.data.key
        if (cacheMap.has(key)) {
            event.ports[0].postMessage(cacheMap.get(key));
        } else {
            event.ports[0].postMessage(new Error("NOT_FOUND"));
        }

        // client.postMessage(cache[key])
        return
    }
    if (event.data.action === "clear") {
        cacheMap.delete()
        return
    }
    if (event.data.action === "delete") {
        const key = event.data.key
        cacheMap.delete(key)
        return
    }
});
