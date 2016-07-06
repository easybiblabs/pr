chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.command !== 'get-patch-file') {
            return;
        }
        fetch(msg.url).then(function(response) {
            response.text().then(function(text) {
                port.postMessage({
                    command: 'get-patch-file',
                    response: text
                });
            });
        });
    });
})
