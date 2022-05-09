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
        this.waitingRoomPageElement.style.backgroundColor = "red"
        return this.waitingRoomPageElement
    }
}

module.exports = new WaitingRoomPage();