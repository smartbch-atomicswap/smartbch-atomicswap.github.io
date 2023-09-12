console.log("SW Startup!");

bc = new BroadcastChannel('broadCast')
bc.onmessage = function (e) {
    console.log('receive:', e.data);
};
bc.onmessageerror = function (e) {
    console.warn('error:', e);
};

// Install Service Worker
self.addEventListener('install', function(event){
    console.log('installed!');
});

// Service Worker Active
// self.addEventListener('activate', function(event){
//     console.log('activated!');
// });

console.log(1231112)
// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
    bc.postMessage("213123")
    event.ports[0].postMessage("SW Says 'Hello back!'");
    send_message_to_all_clients("xxxxxx")
});


function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage("SW Says: '"+msg+"'", [msg_chan.port2]);
    });
}

function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}