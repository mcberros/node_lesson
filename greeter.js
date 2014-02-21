exports.version = "0.1.0";

exports.hello_world = function (lang) {
	if (lang == 'en')
		return "Hello world";
	else if (lang == 'fr')
		return "Bonjour tout le monde";
	else if (lang == 'it')
		return "Buongiorno a tutti!";

	return "We don't speak that language.";
};

exports.goodbye = function (lang) {
	if (lang == 'en')
		return "Bye";
	else if (lang == 'fr')
		return "Au revoir";
	else if (lang == 'it')
		return "Ciao!";

	return "We don't speak that language booo.";
};