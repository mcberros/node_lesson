var http = require('http');

function request_handler(req, res) {
	var body = "Hey, Thanks for calling!";
	var content_length = body.lenggth;
	res.writeHead(200, {
		'Content-Type': "text/plain",
		'Content-Lenght': content_length
	});
	res.end(body);
}

var s = http.createServer(request_handler);

s.listen(8080);
