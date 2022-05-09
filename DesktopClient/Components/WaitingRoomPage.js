const WebSocketConnection = require("./WebsocketConnection.js")

class WaitingRoomPage {
    constructor() {
        this.waitingRoomPageElement = document.createElement("div")
    }

    initialize() {
        this.waitingRoomPageElement.style.position = "relative"
        this.waitingRoomPageElement.style.display = "flex"
        this.waitingRoomPageElement.style.alignContent = "center"
        this.waitingRoomPageElement.style.justifyContent = "center"
        this.waitingRoomPageElement.style.height = "auto"
        this.waitingRoomPageElement.style.minHeight = "100%"
        this.waitingRoomPageElement.innerHTML = "TEST TEST TEST"
        this.waitingRoomPageElement.style.backgroundColor = "red"

        return this.waitingRoomPageElement
    }

    displayUniqueIDfromServer(uniqueID) {
        this.waitingRoomPageElement.innerHTML = "Room ID: " + uniqueID
    }
}

module.exports = new WaitingRoomPage();