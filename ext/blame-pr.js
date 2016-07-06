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
                }
                if (text[0] !== '-' && text[0] !== '+') {
                    continue;
                }
                out[filename + section + text] = line;
            }
        }
        return out;
    }

    //function

    // main

    var documentLines = collectMainDiffLines();
    //var patchInfo = collectPatchInfo();

    console.log(documentLines);

return;
    ///// XXX parse patch file
    // 
    // collect all changed lines
    //
    ///// split into From sections
        //
        // for each added / removed line:
        //  add commit info

    
    function getCurrentPRData() {
        var [_1, owner, repo, _2, pr, _3] = document.location.pathname.split('/');
        var changedFiles = document.getElementsByClassName('file-actions');
        var out = [];
        for (var i = 0; i < changedFiles.length; i++) {
            var e = changedFiles[i];
            var viewURL = e.getElementsByTagName('a')[0].href;
            out[i] = {
                viewLink: 'https://github.com/easybib/scholar/blame/fa76545305421ff81fb09cf5f82a7cc75ed58bf1/frontend/src/modules/gdocaddon/fixtures/bullet.js'
                // viewLink = // 'easybib/scholar/blob/fa76545305421ff81fb09cf5f82a7cc75ed58bf1/frontend/src/modules/gdocaddon/fixtures/bullet.js';
                // https://github.com/easybib/scholar/blame/fa76545305421ff81fb09cf5f82a7cc75ed58bf1/frontend/src/modules/gdocaddon/fixtures/bullet.js
            };
        }
        return [owner, repo, pr, out];
    }


    // main

    if (!isOnPRFiles()) {
        return;
    }

    var [owner, repo, pr, changedFiles] = getCurrentPRData();

    console.log(changedFiles);


    /*
    $.get('https://api.github.com/repos/' + owner + '/' + repo + '/pulls/' + pr + '/commits', { access_token: GH_TOKEN })
    .done(function(data) {
        console.log(data);
    });
    */

}
