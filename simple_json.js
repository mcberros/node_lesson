var http = require('http');
fs = require('fs');

// albums/italy2012.json

function handle_incoming_request(req, res){
	console.log("Incoming request: (" + req.method + ")" + req.url);

	if(req.url == '/albums.json') {
		handle_load_albums(req, res);
	} else if (req.url.substr(0, 7) == '/albums' && req.url.substr(req.url.length - 5) == '.json') {
		handle_get_album(req, res);
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "unknow_resource" }));
	}
}

function handle_get_album(req, res) {
	var album_name = req.url.slice(8, req.url.length - 5);

	console.log(album_name);

	load_album(album_name, function(err, album) {

		if (err != null) {
			res.writeHead(503, { "Content-Type" : "application/json" });
			res.end(JSON.stringify({ error: "file_error", message: err.message }) + "\n");
			return;
		}

		res.writeHead(200, { "Content-Type" : "application/json" });
		res.end(JSON.stringify({ error: null, data: { album: album}}) + "\n");
	});
}

function load_album(album_name, callback){
	fs.readdir('albums/' + album_name, function (err, file_list) {
 		if (err) {
 			callback(err);
 			return;
 		}

 		var files_only = [];

 		(function iterator (i) {
 			if (i >= file_list.length)
 				callback(null, files_only);
 			else {
 				fs.stat("albums/" + album_name + "/" + file_list[i], function (err, stats) {
 				if (err) {
 					callback(err);
 					return;
 				}

 				if (stats.isFile())
 					files_only.push(file_list[i]);

 				iterator(i + 1);
 				});
 			}
 		})(0);
 	});
}

function handle_load_albums(req, res) {
	load_album_list(function(err, albums) {
		console.log(albums);
   	console.log(err);

		if (err != null) {
			res.writeHead(503, { "Content-Type" : "application/json" });
			res.end(JSON.stringify({ error: "file_error", message: err.message }) + "\n");
			return;
		}

		res.writeHead(200, { "Content-Type" : "application/json" });
		res.end(JSON.stringify({ error: null, data: { albums: albums}}) + "\n");
	});
}

function load_album_list(callback){
	fs.readdir('albums/', function (err, file_list) {
 		if (err) {
 			callback(err);
 			return;
 		}

 		var dirs_only = [];

 		(function iterator (i) {
 			if (i >= file_list.length)
 				callback(null, dirs_only);
 			else {
 				fs.stat("albums/" + file_list[i], function (err, stats) {
 				if (err) {
 					callback(err);
 					return;
 				}

 				if (stats.isDirectory())
 					dirs_only.push(file_list[i]);

 				iterator(i + 1);
 				});
 			}
 		})(0);
 	});
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);