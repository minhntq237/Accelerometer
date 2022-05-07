const websocketServerPortNumber = 8500
const localWebsocketServer = `ws://localhost:${websocketServerPortNumber}/`
const outsideWebsocketServer = `wss://web-socket-server-4gv9m.ondigitalocean.app/`


class WebsocketConnection {
    constructor(thisWebsocketClass) {
        this.websocket = new thisWebsocketClass(outsideWebsocketServer)
    }
    sendDataToWebSocketServer(thisMessage, thisContent) {
        this.websocket.send(JSON.stringify({message: thisMessage, content: thisContent}));
    }
}

module.exports = new WebsocketConnection(WebSocket)