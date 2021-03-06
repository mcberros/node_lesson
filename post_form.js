var http = require('http'),
	  qs = require('querystring');

function handle_incoming_request(req, res){

	console.log("Incoming request: (" + req.method + ")" + req.url);

	var form_data = "";

	req.on(
		"readable",
		function(){
			var d = req.read();
			if (typeof d == 'string')
				form_data += d;
			else if (typeof d == 'object' && d instanceof Buffer)
				form_data += d.toString("utf8");
		}
	);

	req.on(
		"end",
		function(){
			var out = "";
			if (!form_data)
				out = "No Form data";
			else {
				var obj = qs.parse(form_data);
				if(!obj)
					out = "Form data didnt parse";
				else
					out = "Form data " + JSON.stringify(obj);
			}

			res.end(out);
		}
	);

}

var s = http.createServer(handle_incoming_request);
s.listen(8080);