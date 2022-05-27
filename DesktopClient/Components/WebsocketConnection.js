const websocketServerPortNumber = 8500
const localWebsocketServer = `ws://localhost:${websocketServerPortNumber}/`
const outsideWebsocketServer = `wss://lobster-app-r3ifa.ondigitalocean.app/`


class WebsocketConnection {
    constructor(thisWebsocketClass) {
        this.websocket = new thisWebsocketClass(outsideWebsocketServer)
    }

    sendDataToWebSocketServer(thisMessage, thisContent) {
        this.websocket.send(JSON.stringify({message: thisMessage, content: thisContent}));
    }
}

let WebSocketConnection = new WebsocketConnection(WebSocket)

WebSocketConnection.websocket.onopen = function() {
    WebSocketConnection.sendDataToWebSocketServer("hello, this is desktop client", "no content")
};

WebSocketConnection.websocket.onmessage = function incoming(info) {
    let parsedInfo = JSON.parse(info.data);
    let message = parsedInfo.message;
    let content = parsedInfo.content;
    console.log(parsedInfo);

    if (message === "nice to meet you, desktop client") {
        console.log("everything is working as expected, server connected")
    };

};

module.exports = WebSocketConnection