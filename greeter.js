function Greeter (lang) {
	this.language = lang;

	this.greet = function () {
		if (this.language == 'en')
			return "Hello world";
		else if (this.language == 'fr')
			return "Bonjour tout le monde";
		else if (this.language == 'it')
			return "Buongiorno a tutti!";

		return "We don't speak that language.";
	};
}


exports.version = "0.1.0";

exports.create_greeter = function(lang) {
	return new Greeter(lang);
}

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