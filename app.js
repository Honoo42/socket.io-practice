var express = require('express');
var fs = require('fs');
var http = require('http');
var socketio = require ('socket.io');
// Change port to allow Heroku to set it manually
var port = process.env.PORT || 5600;
var app = express();




app.get('/', function(req, res) {
	res.send('<h1>Hello Boulder</h1>');
	app.use(express.static(__dirname + '/public'));
});
app.get('/chat', function(req, res) {
	fs.readFile('index.html',function(err,data) {
		if (err) throw err;
 		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
	app.use(express.static(__dirname + '/public'));
})

var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});

socketio.listen(server).on('connection', function (socket) {

	socket.on('message', function (msg) {

		console.log('Message Received: ', msg);

		socket.broadcast.emit('message', msg);
});
});
