all: ext/vendor/jquery.min.js

ext/vendor/jquery.min.js:
	mkdir -p ext/vendor
	wget https://code.jquery.com/jquery-3.0.0.min.js -O ext/vendor/jquery.min.js
