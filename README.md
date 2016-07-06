# PR

A browser extension to add some things to Github.

* show contributors to the files changed in a PR
* show commit messages for the respective changes in a PR
* show the full Travis CI matrix, instead of just the PR's build status
* change the color of the page's favicon depending on the PR build status
* ignore the changes of selected commits in the diff view

## Setup

Currently (this will change):

* go to https://github.com/settings/tokens
* create a new token, copy it
* open the console, do `localStorage.setItem('GH_TOKEN', 'copy-your-token-here');`
* in Chrome/Chromium, go to chrome://extensions/
* check "Developer mode"
* click "Load unpacked extension..."
* select the `ext/` directory here

## License

Everything, except for things in `ext/vendor`:

Copyright 2016 Chegg Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Other than that:

- `ext/vendor/page-detect.js` supplied under MIT license © Sindre Sorhus
   https://github.com/sindresorhus/refined-github
- `ext/vendor/gh-injection.js` supplied under MIT license © Stefan Buck
   https://github.com/OctoLinker/injection
- `ext/vendor/jquery.min.js` supplied under MIT license © jQuery Foundation 
   https://jquery.org/license/

