var http = require('http');

var server = http.createServer(function (req, res) {
	console.log('This will print in the server console');
	res.end('This will print on the webpage localhost:3000');
});

server.listen(3000);