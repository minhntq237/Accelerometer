const PhoneRotationPage = require("./Components/PhoneRotationPage.js")
const WaitingRoomPage = require("./Components/WaitingRoomPage.js")

class PageBody {
    constructor() {
        this.pageBodyElement = document.createElement("div");
    }

    initialize() {
        this.pageBodyElement.style.position = "absolute"
        this.pageBodyElement.style.top = "0"
        this.pageBodyElement.style.left = "0"
        this.pageBodyElement.style.width = "100%"
        this.pageBodyElement.style.height = "auto"
        this.pageBodyElement.style.minHeight = "100%"
        this.pageBodyElement.style.zIndex = "-1"
        this.pageBodyElement.style.overflow = "auto"
        this.pageBodyElement.appendChild(PhoneRotationPage.initialize())
        //this.pageBodyElement.appendChild(WaitingRoomPage.initialize())
        document.body.appendChild(this.pageBodyElement);
    }
}

let pageBody = new PageBody()
pageBody.initialize()


