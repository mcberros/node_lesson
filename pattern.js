var arr;
var results;

(function iterator(i) {
	if (i >= arr.length)
		callback(null, results);
	else {
		async_work(funtion (err, res) {
			if (err)
				callback(err);
			else {
				results.push(res);
				iterator(i + 1);
			}
		});
	}
})(0);