const WebSocketConnection = require("./WebsocketConnection.js")

class DeviceInfoList {
    constructor() {
        this.phoneCount = 0
        this.desktopCount = 0
        this.deviceInfoListElement = document.createElement("ul")
        this.phoneList = document.createElement("ol")
        this.desktopList = document.createElement("ol")
    }

    initialize() {
        this.deviceInfoListElement.appendChild(this.phoneList)
        this.deviceInfoListElement.appendChild(this.desktopList)

        return this.deviceInfoListElement
    }

    updatePhoneCount() {
        this.phoneCount += 1
    }
    updateDesktopCount() {
        this.desktopCount += 1
    }
}

class addDeviceButtons {
    constructor() {
        this.AddDeviceButtonsElement = document.createElement("div")
        this.AddPhoneButtonElement = document.createElement("button")
        this.AddDesktopButtonElement = document.createElement("button")
    }

    initialize() {
        this.AddDesktopButtonElement.style.position = "relative"
        this.AddDesktopButtonElement.innerHTML = "Add Desktop"
        this.AddPhoneButtonElement.style.position = "relative"
        this.AddPhoneButtonElement.innerHTML = "Add Phone"
        this.AddDeviceButtonsElement.appendChild(this.AddDesktopButtonElement)
        this.AddDeviceButtonsElement.appendChild(this.AddPhoneButtonElement)

        return this.AddPhoneButtonElement

    }
}

class WaitingRoomPage {
    constructor() {
        this.waitingRoomPageElement = document.createElement("div")
        this.deviceInfoList = new DeviceInfoList()
        this.addDeviceButtons = new addDeviceButtons()
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

        this.waitingRoomPageElement.appendChild(this.deviceInfoList)
        this.waitingRoomPageElement.appendChild(this.addDeviceButtons)

        return this.waitingRoomPageElement
    }

    displayUniqueIDfromServer(uniqueID) {
        this.waitingRoomPageElement.innerHTML = "Room ID: " + uniqueID
    }
}

module.exports = new WaitingRoomPage();