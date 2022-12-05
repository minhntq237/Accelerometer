(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const WebSocketConnection = require("./WebsocketConnection.js")

class PhoneModel {
    constructor() {
        this.phoneModelElement = document.createElement("div")
        this.phoneRotationDegree = 0 
    }

    updatePhoneRotation(rotationDegree) {
        this.phoneRotationDegree = rotationDegree
        /* 
        if (this.phoneRotationDegree > 180) {
            this.phoneRotationDegree = 0
        } 
        */
        this.phoneModelElement.style.transform = `rotate(${this.phoneRotationDegree}deg)`
    }

    initialize() {
        this.phoneModelElement.style.position = "relative"
        this.phoneModelElement.style.width = "300px"
        this.phoneModelElement.style.border = "15px solid black"
        this.phoneModelElement.style.backgroundColor = "blue"
        this.phoneModelElement.style.padding = "50px"
        this.phoneModelElement.style.margin = "20px"
        return this.phoneModelElement
    }
}

class InfoList {
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


class changeRotationButton {
    constructor() {
        this.changeRotationButtonElement = document.createElement("button")
    }

    initialize() {
        this.changeRotationButtonElement.style.position = "relative"

        this.changeRotationButtonElement.innerHTML = "Change phone rotation"
        return this.changeRotationButtonElement
    }
}

class PhoneRotationPage {
    constructor() {
        this.phoneRotationElement = document.createElement("div");
        this.phoneModel = new PhoneModel()
        this.changeRotationButton = new changeRotationButton()
        this.infoList = new InfoList()
    }

    initialize() {
        this.phoneRotationElement.style.position = "relative"
        this.phoneRotationElement.style.display = "flex"
        this.phoneRotationElement.style.alignContent = "center"
        this.phoneRotationElement.style.justifyContent = "center"
        this.phoneRotationElement.style.height = "auto"
        this.phoneRotationElement.style.minHeight = "100%"
        this.phoneRotationElement.appendChild(this.phoneModel.initialize())
        this.phoneRotationElement.appendChild(this.changeRotationButton.initialize())
        this.phoneRotationElement.appendChild(this.infoList.initialize())
        // this.updateInfoList()
        this.updatePhoneModel()
        this.listenToDeviceOrientation()
        return this.phoneRotationElement
    }

    listenToDeviceOrientation() {
        window.addEventListener("deviceorientation", (event) => {
            let alpha = event.alpha;
            let beta = event.beta;
            let gamma = event.gamma;
            
            this.infoList.updateInfo(0, 0, 0, alpha, beta, gamma) 
        });
    }

    updateInfoList() {
        const updateValue = () => {
            WebSocketConnection.on('message', async (data) => {
                let parsedData = JSON.parse(data)
                let message = parsedData.message
                let content = parsedData.content
                console.log(message)
            this.infoList.updateInfo(0, 0, 0, content.alpha, content.beta, content.gamma)
        });
        setInterval(updateValue, 300)
    }}

    updatePhoneModel = () => {
        
        /* 
        function returnGammaValuesArray() {
            let numberArray = []
            for (let i=-90;i<90;i++) {
                numberArray.push(i)
            }
            return numberArray
        }

        function selectRandomElementInArray(arrayOfChoice) {
            // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
            const randomElement = arrayOfChoice[Math.floor(Math.random()*arrayOfChoice.length)] 
            return randomElement
        } 
        */
        const updateValue = () => {
            /* 
            let gammaValueArray = returnGammaValuesArray()
            let randomGammaValue = selectRandomElementInArray(gammaValueArray) 
            */

            WebSocketConnection.websocket.onmessage = (data) => {
                let parsedData = JSON.parse(data.data);
                let message = parsedData.message;
                var content = parsedData.content;
                console.log(parsedData)
                
                if (message === "Orientation Data") {
                    this.phoneModel.updatePhoneRotation(content.gamma)
                };
            };
            
        }
        setInterval(updateValue, 300)
    }
}

module.exports = new PhoneRotationPage()

},{"./WebsocketConnection.js":3}],2:[function(require,module,exports){
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
},{"./WebsocketConnection.js":3}],3:[function(require,module,exports){
const websocketServerPortNumber = 8500
const localWebsocketServer = `ws://localhost:${websocketServerPortNumber}/`
const outsideWebsocketServer = `wss://stingray-app-s8sep.ondigitalocean.app/`


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
},{}],4:[function(require,module,exports){
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

},{"./Components/PhoneRotationPage.js":1,"./Components/WaitingRoomPage.js":2}]},{},[4]);
