const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port:8500 });

let express = require('express');
let app = express();

app.get('/desktop.html', (req, res) => {
  res.sendFile('DeskstopClient/desktop.html', { root: __dirname });
});

app.get('/phone.html', (req, res) => {
    res.sendFile('PhoneClient/phone.html', { root: __dirname });
});

app.listen(7500, function (err) {
  if (err) {
    throw err;
  }
  console.log('express server running');
});

let phoneClient = []
let desktopClient = []

webSocketServer.on('connection', (webSocketConnection) => {
    console.log("websocket server is running")

	webSocketConnection.on('message', async (data) => {
		let parsedData = JSON.parse(data)

		let message = parsedData.message
		let content = parsedData.content

		console.log('received: %s', message);

		if (message == "hello, this is phone client") {
			phoneClient.push(webSocketConnection)
            sendMessageAndContentToAllClients(phoneClient, "nice to meet you, phone client", "")
		}

        if (message == "hello, this is desktop client") {
			desktopClient.push(webSocketConnection)
		}
    
    });

	webSocketConnection.on('close', () => {
		removeElementFromArray(webSocketConnection, imageSubscribingClients)
		removeElementFromArray(webSocketConnection, capturedImageSubscribingClients)
	});

});


function sendMessageAndContentToAllClients(listOfClients, thisMessage, thisContent) {
	console.log("SERVER SENDING MESSAGE TO WINDOWS")
	listOfClients.forEach((client) => {
		client.send(JSON.stringify({message: thisMessage, content: thisContent}));
	})
}