const WebSocketConnection = require("./WebsocketConnection.js")

WebSocketConnection.websocket.onopen = function() {
    WebSocketConnection.sendDataToWebSocketServer("hello, this is phone client", "no content")
};

WebSocketConnection.websocket.onmessage = function incoming(info) {
    let parsedInfo = JSON.parse(info.data)
    let message = parsedInfo.message
    let content = parsedInfo.content
    console.log(parsedInfo)

    if (message === "nice to meet you, phone client") {
        console.log("everything is working as expected, server connected")
    }
};

class RotationInfoList {
    constructor() { //maybe remove value variable
        this.infoListElement = document.createElement("ul")
        this.accelerationX = document.createElement("li")
        this.accelerationXvalue = 0
        this.accelerationY = document.createElement("li")
        this.accelerationYvalue = 0
        this.accelerationZ = document.createElement("li")
        this.accelerationZvalue = 0
        this.rotationAlpha = document.createElement("li")
        this.rotationAlphaValue = 0
        this.rotationBeta = document.createElement("li")
        this.rotationBetaValue = 0
        this.rotationGamma = document.createElement("li")
        this.rotationGammaValue = 0
    }

    updateInfo(accelerationX, accelerationY, accelerationZ, rotationAlpha, rotationBeta, rotationGamma) {
        this.accelerationX.innerHTML = `acceleration x: ${accelerationX} g`
        this.accelerationY.innerHTML = `acceleration y: ${accelerationX} g`
        this.accelerationZ.innerHTML = `acceleration z: ${accelerationX} g`

        this.rotationAlpha.innerHTML = `rotation alpha: ${rotationAlpha} degree` 
        this.rotationBeta.innerHTML = `rotation beta: ${rotationBeta} degree`
        this.rotationGamma.innerHTML = `rotation gamma: ${rotationGamma} degree`
    }

    updateInfoList() {
        const updateValue = () => {
            const randArray = [0, 0, 0, 0, 0, 0]
            const randomArray = randArray.map(() => Math.random());
            this.updateInfo(randomArray[0], randomArray[1], randomArray[2], randomArray[3], randomArray[4], randomArray[5])
        }
        setInterval(updateValue, 300)
    }

    listenToDeviceOrientation() {
        window.addEventListener("deviceorientation", (event) => {
            let alpha = event.alpha;
            let beta = event.beta;
            let gamma = event.gamma;
            
            this.updateInfo(0, 0, 0, alpha, beta, gamma) 
            WebSocketConnection.sendDataToWebSocketServer("Orientation Data", [0, 0, 0, alpha, beta, gamma])
        });
    }

    initialize() {
        this.infoListElement.style.position = "relative"

        this.accelerationX.innerHTML = "acceleration x: g" 
        this.infoListElement.appendChild(this.accelerationX)

        this.accelerationY.innerHTML = "acceleration y: g" 
        this.infoListElement.appendChild(this.accelerationY)

        this.accelerationZ.innerHTML = "acceleration z: g" 
        this.infoListElement.appendChild(this.accelerationZ)
        
        this.rotationAlpha.innerHTML = "rotation alpha: degree"
        this.infoListElement.appendChild(this.rotationAlpha)
        
        this.rotationBeta.innerHTML = "rotation beta: degree"
        this.infoListElement.appendChild(this.rotationBeta)

        this.rotationGamma.innerHTML = "rotation gamma: degree"
        this.infoListElement.appendChild(this.rotationGamma)
        
        return this.infoListElement
    }
}


module.exports = new RotationInfoList()







//Phone UI