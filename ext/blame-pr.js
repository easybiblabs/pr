function blamePR() {

    function collectMainDiffLines() {
        var out = {};
        var files = document.getElementsByClassName('file');
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var filename = file.getElementsByClassName('user-select-contain')[0].textContent.trim();
            var lines = file.getElementsByClassName('blob-code-inner');
            var section = '';
            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];
                var text = line.textContent;
                if (text[0] === '@' && text[1] === '@') {
                    section = text;
                    continue;
                }
                if (text[0] !== '-' && text[0] !== '+') {
                    continue;
                }
                out[filename + section + text] = line;
            }
        }
        return out;
    }

    function getPatchFile(cb) {
        var port = chrome.runtime.connect({name: 'blame-pr'})
        port.onMessage.addListener(function(msg) {
            if (msg.command !== 'get-patch-file') {
                return;
            }
            cb(msg.response);
        });
        port.postMessage({
          command: 'get-patch-file',
          url: document.location.href.replace(/\/files$/, '.patch')
        })
    }

    function collectPatchInfo(cb) {
        getPatchFile(function(data) {
            var out = {};
            var parts = data.split(/From [0-9a-f]{40} /);
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                var message = part.match(/Subject: \[[^\]]+\] (.*)/);
                if (!message || !message[1] || message[1].length < 1) {
                    continue;
                }
                message = message[1];

                var lines = part.split("\n");
                var filename = '';
                var section = '';
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j];
                    if (line.match(/^\+\+\+/)) {
                        continue;
                    }
                    var m;
                    if (m = line.match(/^--- (.*)$/)) {
                        if (!m[1]) {
                            continue;
                        }
                        // m[1] is something like a/frontend/src/myfile.js
                        filename = m[1].replace(/^a\//, '');
                        continue;
                    }
                    if (line.match(/^@@ /)) {
                        section = line;
                        continue;
                    }
                    if (line[0] === '-' || line[0] === '+') {
                        out[filename + section + line] = {
                            message: message 
                        };
                    }
                }
            }

            cb(out);
        });
    }

    // main

    var documentLines = collectMainDiffLines();
    collectPatchInfo(function(patchInfo) {
        for (var k in patchInfo) {
            var info = patchInfo[k];
            var line = documentLines[k];
            if (!line) {
                continue;
            }
            line.innerHTML += '<aside>' + info.message + '</aside>';
        }
    });
}
