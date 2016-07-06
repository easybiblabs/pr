function blamePR() {

    var SEPERATOR = '||||||~~~~~~~~~~~~~||||||'

    function collectMainDiffLines() {
        var documentLines = {};
        var linesWithoutSection = {};
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
                documentLines[filename + section + text] = line;
                if (!linesWithoutSection[filename]) {
                    linesWithoutSection[filename] = [];
                }
                linesWithoutSection[filename].push({
                    text: text,
                    element: line
                });
            }
        }
        return [documentLines, linesWithoutSection];
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
            var patchInfo = {};
            var patchInfoWithoutSection = {};
            var parts = data.split(/From [0-9a-f]{40} /);
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                var message = part.match(/Subject: \[[^\]]+\] (.*)/);
                if (!message || !message[1] || message[1].length < 1) {
                    continue;
                }
                message = message[1];
                var author = part.match(/From: (.*)/)[1];
                var date = part.match(/Date: (.*)/)[1];

                var lines = part.split("\n");
                var filename = '';
                var section = '';
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j];
                    if (line.match(/^---/)) {
                        continue;
                    }
                    var m;
                    if (m = line.match(/^\+\+\+ (.*)$/)) {
                        if (!m[1]) {
                            continue;
                        }
                        // m[1] is something like a/frontend/src/myfile.js
                        filename = m[1].replace(/^b\//, '');
                        continue;
                    }
                    if (line.match(/^@@ /)) {
                        section = line;
                        continue;
                    }
                    if (line[0] === '-' || line[0] === '+') {
                        var info = {
                            author: author,
                            date: date,
                            message: message,
                            filename: filename,
                            line: line
                        };
                        patchInfo[filename + section + line] = info;
                        if (!patchInfoWithoutSection[filename]) {
                            patchInfoWithoutSection[filename] = [];
                        }
                        patchInfoWithoutSection[filename].push(info);
                    }
                }
            }

            cb(patchInfo, patchInfoWithoutSection);
        });
    }

    // main

    var [documentLines, linesWithoutSection] = collectMainDiffLines();
    collectPatchInfo(function(patchInfo, patchInfoWithoutSection) {
        for (var k in patchInfo) {
            var info = patchInfo[k];
            var line = documentLines[k];
            if (!line) {
                // not found -> the displayed diff is probably a combination of multiple patches
                // Ignore the section, and just search the patch for matching lines in this file
                var matchingLines = linesWithoutSection[info.filename];
                if (!matchingLines) {
                    continue;
                }
                for (var i = 0; i < matchingLines.length; i++) {
                    var match = matchingLines[i];
                    if (match.text === info.line) {
                        line = match.element;
                        break;
                    }
                }
                if (!line) {
                    continue;
                }
            }
            line.innerHTML += '<aside>' +
                info.author + '<br>' +
                info.filename + '<br>' +
                '<strong>' + info.message + '</strong>' +
                '</aside>';
        }
    });
}
