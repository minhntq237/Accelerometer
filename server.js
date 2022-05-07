let express = require('express');
let app = express();

var path = require('path')

app.get('/desktop.html', (req, res) => {
	res.sendFile(path.resolve('./DesktopClient/desktop.html'));
});

app.get('/desktop.js', (req, res) => {
	res.sendFile(path.resolve('./DesktopClient/desktop.js'));
});

app.get('/phone.html', (req, res) => {
    res.sendFile(path.resolve('./PhoneClient/phone.html'));
});

app.get('/phone.js', (req, res) => {
	console.log("aaa");
	res.sendFile(path.resolve('./PhoneClient/phone.js'));
});

app.listen(7500, function (err) {
  if (err) {
    throw err;
  }
  console.log('express server running');
});

