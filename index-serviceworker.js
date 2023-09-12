console.log(1)

const cache = {}

// Install Service Worker
self.addEventListener('install', function (event) {
    console.log('installed!');
});

// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', async function (event) {
    const client = await self.clients.get(event.clientId)
    console.log(client, "clientId", event.clientId, "SW Received Message: " + event.data);
    if (event.data.action === "write") {
        const data = event.data.data
        Object.entries(data).map(([key, value]) => cache[key] = value)
        return
    }
    if (event.data.action === "read") {
        const key = event.data.key
        client.postMessage(cache[key])
        return
    }
});
