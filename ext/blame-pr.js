    var SEPERATOR = '||||||~~~~~~~~~~~~~||||||'

        var documentLines = {};
        var linesWithoutSection = {};
                documentLines[filename + section + text] = line;
                if (!linesWithoutSection[filename]) {
                    linesWithoutSection[filename] = [];
                }
                linesWithoutSection[filename].push({
                    text: text,
                    element: line
                });
        return [documentLines, linesWithoutSection];
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
            var patchInfo = {};
            var patchInfoWithoutSection = {};
                var author = part.match(/From: (.*)/)[1];
                var date = part.match(/Date: (.*)/)[1];
                    if (line.match(/^---/)) {
                    if (m = line.match(/^\+\+\+ (.*)$/)) {
                        filename = m[1].replace(/^b\//, '');
                        var info = {
                            author: author,
                            date: date,
                            message: message,
                            filename: filename,
                            line: line
                        patchInfo[filename + section + line] = info;
                        if (!patchInfoWithoutSection[filename]) {
                            patchInfoWithoutSection[filename] = [];
                        }
                        patchInfoWithoutSection[filename].push(info);
            cb(patchInfo, patchInfoWithoutSection);
    var [documentLines, linesWithoutSection] = collectMainDiffLines();
    collectPatchInfo(function(patchInfo, patchInfoWithoutSection) {
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
            line.innerHTML += '<aside>' +
                info.author + '<br>' +
                info.filename + '<br>' +
                '<strong>' + info.message + '</strong>' +
                '</aside>';