all: ext/vendor

clean: 
	rm -r ext/vendor/*

ext/vendor: ext/vendor/jquery.min.js ext/vendor/page-detect.js ext/vendor/gh-injection.js

ext/vendor/jquery.min.js:
	mkdir -p ext/vendor
	wget https://code.jquery.com/jquery-3.0.0.min.js -O ext/vendor/jquery.min.js

ext/vendor/page-detect.js:
	mkdir -p ext/vendor
	wget https://raw.githubusercontent.com/sindresorhus/refined-github/1.3.0/extension/page-detect.js -O ext/vendor/page-detect.js

ext/vendor/gh-injection.js:
	mkdir -p ext/vendor
	wget https://raw.githubusercontent.com/OctoLinker/injection/v0.2.0/index.js -O ext/vendor/gh-injection.js
